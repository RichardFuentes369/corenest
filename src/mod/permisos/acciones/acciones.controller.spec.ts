import { Test, TestingModule } from '@nestjs/testing';
import { AccionesController } from './acciones.controller';
import { PermisoAccionesService } from './acciones.service';

describe('AccionesController', () => {
  let controller: AccionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccionesController],
      providers: [PermisoAccionesService],
    }).compile();

    controller = module.get<AccionesController>(AccionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
