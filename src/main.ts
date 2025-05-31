import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  // Habilita el modo de depuración
  app.enableCors();
  console.log('Servidor corriendo en modo de depuración');

  await app.listen(4000);
}
bootstrap();
