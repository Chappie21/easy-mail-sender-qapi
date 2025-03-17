import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('boostrap')

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  app.setGlobalPrefix('/api')

  app.enableCors({
    origin: [process.env.ADMITED_ORIGIN]
  });

  await app.listen(Number(process.env.PORT));

  logger.log(`API is running on port: ${process.env.PORT}`);
}
bootstrap();
