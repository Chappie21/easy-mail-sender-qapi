import { Controller, Post, Body, UseInterceptors, UploadedFiles, HttpStatus, HttpCode, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MailerService } from './mailer.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
const maxSizeFiles: number = 20971520;
const admitedFilesRegex: RegExp =  /^(image\/(jpeg|png|svg\+xml)|application\/pdf|image\/jpg)$/;

@Controller('mailer')
@UseGuards(ThrottlerGuard)
export class MailerController {

  constructor(private readonly mailerService: MailerService){}
      
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('files'))
  async createNewEmail(
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
    return await this.mailerService.sendNotificationEmail(createMailerDto, files);
  }

}
