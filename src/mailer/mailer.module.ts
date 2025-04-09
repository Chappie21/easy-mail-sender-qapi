import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { ConfigModule } from '@nestjs/config';
import { CaptchaValidatorModule } from 'src/captcha-validator/captcha-validator.module';

@Module({
  imports: [
    ConfigModule,
    CaptchaValidatorModule
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
