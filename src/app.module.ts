import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { EnvConfigLoader, JoiValidationSchema } from './common/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfigLoader],
      validationSchema: JoiValidationSchema
    }),
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
