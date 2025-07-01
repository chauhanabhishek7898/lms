import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('DIMG Api ')
    .setDescription('List of all DIMG Api')
    .setVersion('1.0')
    .addBearerAuth({
      type: "http",
      scheme: 'bearer',
      bearerFormat: 'JWT',

    }, 'access-token')
    .addTag('Travel')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 5000);
  // await app.listen(5000, '0.0.0.0');
}
bootstrap();