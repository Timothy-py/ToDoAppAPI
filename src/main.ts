import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // whitelist: true
  }))

  // specify global prefix
  app.setGlobalPrefix('/api/v1');

  // setup swagger
  // const config = new DocumentBuilder()
  //     .setTitle('TodoVista API')
  //     .setDescription('OpenAPI documentation for TodoVista API')
  //     .setVersion('1.0')
  //     .addBearerAuth()
  //     .build()

  // const document = SwaggerModule.createDocument(app, config)
  // SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
