import { Module } from '@nestjs/common';

import { GlobalModule } from '../../../global/global.module';
import { permisoProvider } from './entities/acciones.provider'
import { PermisoAccionesService } from './acciones.service';
import { AccionesController } from './acciones.controller';

@Module({
  imports: [GlobalModule],
  controllers: [AccionesController],
  providers: [
    ...permisoProvider,
    PermisoAccionesService
  ],
  exports: [
    PermisoAccionesService
  ]
})
export class AccionesModule {}
