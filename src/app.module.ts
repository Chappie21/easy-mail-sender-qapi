import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { EnvConfigLoader, JoiValidationSchema } from './common/config';
import { MailerModule } from './mailer/mailer.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CaptchaValidatorModule } from './captcha-validator/captcha-validator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfigLoader],
      validationSchema: JoiValidationSchema
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          name: 'medium',
          ttl: +configService.get('RATE_LIMIT_TIME'),
          limit: +configService.get('RATE_LIMIT_REQUESTS'),
        }
      ]
    }),
    CommonModule,
    MailerModule,
    CaptchaValidatorModule
  ],
  controllers: [],
  providers: [ThrottlerGuard],
})
export class AppModule {}
