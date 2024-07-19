import { Module } from '@nestjs/common';

import { GlobalModule } from '../../global/global.module';
import { modulosProvider } from './entities/modulos.provider';
import { ModulosService } from './modulos.service';
import { ModulosController } from './modulos.controller';

@Module({
  imports: [GlobalModule],
  controllers: [ModulosController],
  providers: [
    ...modulosProvider,
    ModulosService
  ],
  exports: [
    ModulosService
  ]
})
export class ModulosModule {}
