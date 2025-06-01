import { Test, TestingModule } from '@nestjs/testing';
import { LmsmasterService } from './lmsmaster.service';

describe('LmsmasterService', () => {
  let service: LmsmasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LmsmasterService],
    }).compile();

    service = module.get<LmsmasterService>(LmsmasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
