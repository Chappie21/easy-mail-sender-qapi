import { Controller, Post, Body, UseInterceptors, UploadedFiles, HttpStatus, HttpCode, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MailerService } from './mailer.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CaptchaValidatorService } from 'src/captcha-validator/captcha-validator.service';
const maxSizeFiles: number = 20971520;
const admitedFilesRegex: RegExp =  /^(image\/(jpeg|png|svg\+xml)|application\/pdf|image\/jpg)$/;

@Controller('mailer')
@UseGuards(ThrottlerGuard)
export class MailerController {

  constructor(
    private readonly mailerService: MailerService,
    private readonly captchaValidatorService: CaptchaValidatorService
  ){}
      
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('files'))
  async createNewEmail(
    @Req() request: Request,
    @Body() createMailerDto: CreateMailDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: maxSizeFiles }),
          new FileTypeValidator({ fileType: admitedFilesRegex }),
        ],
        fileIsRequired: false
      })
    )
    files?: Array<Express.Multer.File>
  ) {
    const ipAddress = request.headers['x-forwarded-for'];

    if (!ipAddress) throw new BadRequestException('IP no fue indicado');

    console.log(ipAddress);
    await this.captchaValidatorService.validateCaptcha(createMailerDto['cf-turnstile-response'], ipAddress);

    return await this.mailerService.sendNotificationEmail(createMailerDto, files);
  }

}
