import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
   ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'app'),
      exclude: ['/api*'],
      serveStaticOptions: {
        index: 'index.html'
      }
    }),
//   ServeStaticModule.forRoot({
//   rootPath: join(__dirname,  'api'),
//   // exclude: ['/api*'], // ✅ Don't override API routes
// }),
  // exclude: ['/api*'],
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 