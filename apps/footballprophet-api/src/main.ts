import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ResponseInterceptor } from './app/reponse.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Setup Swagger
function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('FootballProphet API')
    .setDescription(
      'This swagger documentation contains all the endpoints for the FootballProphet API'
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

// Bootstrap application
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();

  setupSwagger(app);

  const port = process.env.PORT || 3333;
  await app.listen(port);

  // TODO: Return document on create/edit methods
  // TODO: Error handling
  // TODO: Swagger documentation (entities per request)
  Logger.log(
    `⚽ Footballprophet API is running on: http://localhost:${port}/${globalPrefix}`
  );
}

// Execute application
(async (): Promise<void> => {
  try {
    await bootstrap();
  } catch (error) {
    Logger.error(`⚠️ Something went wrong: ${error}`);
  }
})();
