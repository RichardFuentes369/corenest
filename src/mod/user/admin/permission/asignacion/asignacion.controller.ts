import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @ApiTags('asignacion_permiso')
  @Get('mis-permisos')
  findAll(@Query() query) {
    if(query.heredadosDe){
      return this.asignacionService.findAll(+query.idUser, query.heredadosDe);
    }
    return this.asignacionService.findAll(+query.idUser, '');
  }

  @ApiTags('asignacion_permiso')
  @Get('getAsignacionMePertenece')
  findOne(@Query() query) {
    return this.asignacionService.findOne(+query.idModulo, query.nombre, +query.idUser);
  }

  @ApiTags('asignacion_permiso')
  @Put('updateAsignacionPermiso')
  updateAsignacion(@Query() query) {
    return this.asignacionService.updateAsignacion(+query.idPermiso, query.idPadre, +query.opcion, +query.idUser);
  }


}

