import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermisoModulosService } from './modulos.service';
import { CreateModulosDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { DeleteModulosDto } from './dto/delete-modulo.dto';

import { PaginationDto } from '../../../global/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('permisos-modulo')
export class PermisosModulosController {
  constructor(private readonly permisoModuloService: PermisoModulosService) {}

  @ApiTags('permisos')
  @Get('mis-permisos/:idUser/por-modulo/:idModulo/por-tipo/:idTipo/permisos')
  // @UseGuards(AdminGuard)
  permisosOpcionesModulo(@Param('idUser') idUser: string, @Param('idModulo') idModulo: string, @Param('idTipo') idTipo: string) {
    return this.permisoModuloService.permisos(+idUser, +idModulo, +idTipo);
  }

  @ApiTags('permisos')
  @Post('asignar-permiso')
  create(@Body() createModulosPermisoDto: CreateModulosDto) {
    return this.permisoModuloService.create(createModulosPermisoDto);
  }

  @ApiTags('permisos')
  @Delete('eliminar-permiso')
  remove(@Body() deleteModulosPermisoDto: DeleteModulosDto) {
    return this.permisoModuloService.remove(deleteModulosPermisoDto);
  }
}
