import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port);
  console.log(`Servidor corriendo en http://localhost:${port}`);
}
bootstrap();
