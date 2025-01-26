import { Test, TestingModule } from '@nestjs/testing';
import { AuthadminService } from './auth.service';

describe('AuthadminService', () => {
  let service: AuthadminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthadminService],
    }).compile();

    service = module.get<AuthadminService>(AuthadminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
