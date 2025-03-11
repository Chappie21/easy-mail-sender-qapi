import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('boostrap')

  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.PORT));

  logger.log(`API is running on port: ${process.env.PORT}`);
}
bootstrap();
