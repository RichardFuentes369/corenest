import { Module } from '@nestjs/common';

import { GlobalModule } from '../../../global/global.module';
import { permisoProvider } from './entities/modulo.provider'
import { PermisoModulosService } from './modulos.service';
import { PermisosModulosController } from './modulos.controller';

@Module({
  imports: [GlobalModule],
  controllers: [PermisosModulosController],
  providers: [
    ...permisoProvider,
    PermisoModulosService
  ],
  exports: [
    PermisoModulosService
  ]
})
export class ModulosModule {}
