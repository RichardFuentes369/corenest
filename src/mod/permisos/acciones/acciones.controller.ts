import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermisoAccionesService } from './acciones.service';
import { CreateAccionesDto } from './dto/create-accione.dto';
import { UpdateAccioneDto } from './dto/update-accione.dto';
import { DeleteAccionesDto } from './dto/delete-acciones.dto';

import { PaginationDto } from '../../../global/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('acciones')
export class AccionesController {
  constructor(private readonly accionesModuloService: PermisoAccionesService) {}

  @ApiTags('permisos')
  @Get('mis-permisos/:idUser/por-modulo/:idModulo/por-tipo/:idTipo/permisos')
  // @UseGuards(AdminGuard)
  permisosOpcionesModulo(@Param('idUser') idUser: string, @Param('idModulo') idModulo: string, @Param('idTipo') idTipo: string) {
    return this.accionesModuloService.permisos(+idUser, +idModulo, +idTipo);
  }

  @ApiTags('permisos')
  @Post('asignar-permiso')
  create(@Body() createAccionesPermisoDto: CreateAccionesDto) {
    return this.accionesModuloService.create(createAccionesPermisoDto);
  }

  @ApiTags('permisos')
  @Delete('eliminar-permiso')
  remove(@Body() deleteAccionesPermisoDto: DeleteAccionesDto) {
    return this.accionesModuloService.remove(deleteAccionesPermisoDto);
  }
}
