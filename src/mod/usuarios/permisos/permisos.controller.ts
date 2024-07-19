import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';

import { PaginationDto } from '../../../global/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { DeletePermisoDto } from './dto/delete-permiso.dto';

// import { AuthGuard } from '../../mod-auth/authadmin/auth.guard';

@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @ApiTags('permisos')
  @Get('mis-permisos/:idUser/por-modulo/:idModulo/por-tipo/:idTipo/permisos')
  // @UseGuards(AdminGuard)
  permisosOpcionesModulo(@Param('idUser') idUser: string, @Param('idModulo') idModulo: string, @Param('idTipo') idTipo: string) {
    return this.permisosService.permisos(+idUser, +idModulo, +idTipo);
  }

  @ApiTags('permisos')
  @Post('asignar-permiso')
  create(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisosService.create(createPermisoDto);
  }

  @ApiTags('permisos')
  @Delete('eliminar-permiso')
  remove(@Body() deletePermisoDto: DeletePermisoDto) {
    return this.permisosService.remove(deletePermisoDto);
  }
}
