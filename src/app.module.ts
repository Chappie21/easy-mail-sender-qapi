import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { EnvConfigLoader, JoiValidationSchema } from './common/config';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfigLoader],
      validationSchema: JoiValidationSchema
    }),
    CommonModule,
    MailerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
