import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MasterModule } from './master/master.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [MasterModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
