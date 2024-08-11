import { Module } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { AsignacionController } from './asignacion.controller';
import { asignacionProviders } from './entities/asignacion.provider';
import { GlobalModule } from '@global/global.module';

@Module({
  imports: [GlobalModule],
  controllers: [AsignacionController],
  providers: [
    ...asignacionProviders,
    AsignacionService
  ],
  exports: [AsignacionService]
})
export class AsignacionModule {}
