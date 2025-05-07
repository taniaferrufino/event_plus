import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1'); // Esto agrega el prefijo global "api/v1" a todas las rutas

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
