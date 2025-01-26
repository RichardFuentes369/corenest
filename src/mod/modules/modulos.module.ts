import { Module } from '@nestjs/common';

import { ModulosService } from './modulos.service';
import { ModulosController } from './modulos.controller';
import { moduloProviders } from './entities/modulos.provider';
import { GlobalModule } from '@global/global.module';

@Module({
  imports: [GlobalModule],
  controllers: [ModulosController],
  providers: [
    ...moduloProviders,
    ModulosService
  ],
  exports: [ModulosService]
})
export class ModulosModule {}

