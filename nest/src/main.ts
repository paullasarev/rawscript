import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get('ConfigService');
  const port = config.get('API_PORT');
  const prefix = config.get('API_PREFIX');
  const swagger = `${prefix}/info`;
  app.setGlobalPrefix(prefix);

  const options = new DocumentBuilder()
    .setTitle('rawscsript')
    .setDescription('The rawscript API description')
    .setVersion('1.0')
    .setBasePath(prefix)
    .addTag('rawscript')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swagger, app, document);

  console.log('listen', port);
  console.log('swagger', swagger);
  await app.listen(port);
}

bootstrap();
