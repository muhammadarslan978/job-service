import { Test, TestingModule } from '@nestjs/testing';
import { JobServiceService } from './job-service.service';

describe('JobServiceService', () => {
  let service: JobServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobServiceService],
    }).compile();

    service = module.get<JobServiceService>(JobServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
