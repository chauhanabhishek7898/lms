import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MasterModule } from './master/master.module';
import { OrderModule } from './order/order.module';
import { LmsmasterModule } from './lmsmaster/lmsmaster.module';

@Module({
  imports: [MasterModule, OrderModule, LmsmasterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
