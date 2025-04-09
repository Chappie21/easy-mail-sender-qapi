import { Module } from '@nestjs/common';
import { CaptchaValidatorService } from './captcha-validator.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CaptchaValidatorService],
  exports: [CaptchaValidatorService]
})
export class CaptchaValidatorModule {}
