import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Gatla').setDescription('Gatla endpoints').setVersion('1.0').addTag('endpoints').build();
  const document = SwaggerModule.createDocument(app, config);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
