import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import IORedis from 'ioredis';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { parseBoolean } from './core/utils/parseBoolean.util';
import { RedisStore } from 'connect-redis';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ms, StringValue } from './core/utils/ms.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const redis = new IORedis(config.getOrThrow<string>('REDIS_URL'));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API only for auth')
    .setVersion('1.0')
    .build();

  app.use(cookieParser(config.getOrThrow<string>('SESSION_SECRET')));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(
    session({
      secret: config.getOrThrow<string>('SESSION_SECRET'),
      name: config.getOrThrow<string>('SESSION_NAME'),
      resave: true,
      saveUninitialized: false,
      cookie: {
        domain: config.getOrThrow<string>('SESSION_DOMAIN'),
        maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
        httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
        secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
        sameSite: 'lax',
      },
      store: new RedisStore({
        client: redis,
        prefix: config.getOrThrow<string>('SESSION_FOLDER'),
      })
    }),
  );
  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookies'],
  });

  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, documentFactory);

  app.setGlobalPrefix('api');
  await app.listen(config.getOrThrow<number>('APPLICATION_PORT') ?? 4100);
}
bootstrap();
