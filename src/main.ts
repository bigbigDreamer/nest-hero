import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';

const env = process.env.NODE_ENV;

const port: {
  local: 3000;
  prod: 443;
};

async function bootstrap() {
  const logger = new Logger('Request');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => logger.log(message.replace('\n', '')),
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Demo Application')
    .setDescription('Demo API Application')
    .setVersion('v2')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // 配置 swagger 文档的相关配置信息，包含 自定义的 css ，以及 sagger ui 界面上显示的一些信息
  SwaggerModule.setup('api', app, document, {
    customCssUrl: 'http://localhost:3000/css/theme-material.css',
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(port[env]);
}

bootstrap();
