import { Test, TestingModule } from '@nestjs/testing';
import { LmsmasterController } from './lmsmaster.controller';
import { LmsmasterService } from './lmsmaster.service';

describe('LmsmasterController', () => {
  let controller: LmsmasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LmsmasterController],
      providers: [LmsmasterService],
    }).compile();

    controller = module.get<LmsmasterController>(LmsmasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
