import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { getBodyParserOptions } from '@nestjs/platform-express/adapters/utils/get-body-parser-options.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  await app.listen(3000);
}
bootstrap();
