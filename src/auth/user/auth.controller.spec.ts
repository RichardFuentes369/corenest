import { Test, TestingModule } from '@nestjs/testing';
import { AuthuserController } from './auth.controller';
import { AuthuserService } from './auth.service';

describe('AuthuserController', () => {
  let controller: AuthuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthuserController],
      providers: [AuthuserService],
    }).compile();

    controller = module.get<AuthuserController>(AuthuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
