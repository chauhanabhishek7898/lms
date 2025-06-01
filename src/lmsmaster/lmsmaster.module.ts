import { Module } from '@nestjs/common';
import { LmsmasterService } from './lmsmaster.service';
import { LmsmasterController } from './lmsmaster.controller';

@Module({
  controllers: [LmsmasterController],
  providers: [LmsmasterService],
})
export class LmsmasterModule {}
