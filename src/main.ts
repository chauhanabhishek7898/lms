import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Serve static files from React build
  // app.useStaticAssets(join(__dirname, '..', 'client', 'build'));
  
  // Set API prefix (optional)
  app.setGlobalPrefix('api');
  
  // Handle client-side routing (return index.html for unknown routes)
  // app.use((req, res) => {
  //   res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  // });

  //  app.use((req, res, next) => {
  //   if (req.originalUrl.startsWith('/api')) {
  //     next(); // Allow API routes to be handled normally
  //   } else {
  //     res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  //   }
  // });
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();