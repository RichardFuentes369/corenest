import { Module } from '@nestjs/common';

import { GlobalModule } from '../../../global/global.module';
import { permisoProvider } from './entities/permisos.provider'
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';

@Module({
  imports: [GlobalModule],
  controllers: [PermisosController],
  providers: [
    ...permisoProvider,
    PermisosService
  ],
  exports: [
    PermisosService
  ]
})
export class PermisosModule {}
