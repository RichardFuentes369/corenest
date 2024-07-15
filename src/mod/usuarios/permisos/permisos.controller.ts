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
  @Get('mis-permisos/:idUser')
  // @UseGuards(AdminGuard)
  permisosModulo(@Param('idUser') idUser: string) {
    return this.permisosService.permisosModulo(+idUser);
  }

  @ApiTags('permisos')
  @Get('mis-permisos/:idUser/por-modulo/:idModulo')
  // @UseGuards(AdminGuard)
  permisosOpcionesModulo(@Param('idUser') idUser: string, @Param('idModulo') idModulo: string) {
    return this.permisosService.permisosSobreModulo(+idUser, +idModulo);
  }

  @ApiTags('permisos')
  @Get('yo/:idUser/tengo-permiso-a/:idModulo/para/:nombre')
  findOne(@Param('idUser') idUser: string, @Param('idModulo') idModulo: string, @Param('nombre') nombre: string) {
    return this.permisosService.findOne(+idUser, +idModulo, nombre);
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
