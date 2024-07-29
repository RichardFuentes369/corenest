import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @ApiTags('asignacion_permiso')
  @Get('mis-permisos/:idUser')
  findAll(@Param('idUser') idUser: string) {
    return this.asignacionService.findAll(+idUser);
  }

  @ApiTags('asignacion_permiso')
  @Get('buscar-permiso/:idModulo/:nombre/:idUsuario')
  findOne(@Param('idModulo') idModulo: string, @Param('nombre') nombre: string, @Param('idUsuario') idUsuario: string) {
    return this.asignacionService.findPermiso(+idModulo, nombre, +idUsuario);
  }

  @ApiTags('asignacion_permiso')
  @Post('asignacion-permiso')
  create(@Body() createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionService.create(createAsignacionDto);
  }

  @ApiTags('asignacion_permiso')
  @Delete('eliminar-permiso-asignado/:idModulo/:nombre/:idUsuario')
  delete(@Param('idModulo') idModulo: string, @Param('nombre') nombre: string, @Param('idUsuario') idUsuario: string) {
    return this.asignacionService.delete(+idModulo, nombre, +idUsuario);
  }

}
