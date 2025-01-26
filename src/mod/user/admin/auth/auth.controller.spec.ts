import { Test, TestingModule } from '@nestjs/testing';
import { AuthadminController } from './auth.controller';
import { AuthadminService } from './auth.service';

describe('AuthadminController', () => {
  let controller: AuthadminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthadminController],
      providers: [AuthadminService],
    }).compile();

    controller = module.get<AuthadminController>(AuthadminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});