import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import helmet from 'helmet';
import 'reflect-metadata';

import { AppModule } from './app.module';

let server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });

  app.use(helmet());

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
  console.log("----RUN main handler----")
  server = (await bootstrap());
  return server(event, context, callback);
};