import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common";
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Request');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(morgan('tiny', {
    stream: {
      write: (message) => logger.log(message.replace('\n', '')),
    },
  }));

  const config = new DocumentBuilder().setTitle('Demo Application')
      .setDescription("Demo API Application")
      .setVersion('v2')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
