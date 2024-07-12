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
  @Get(':idUser/:nombre')
  findOne(@Param('idUser') idUser: string, @Param('nombre') nombre: string) {
    return this.permisosService.findOne(+idUser, nombre);
  }

  @ApiTags('permisos')
  @Get(':id')
  // @UseGuards(AdminGuard)
  findAll(@Param('id') id: string) {
    return this.permisosService.findAll(+id);
  }

  @ApiTags('permisos')
  @Post()
  create(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisosService.create(createPermisoDto);
  }

  @ApiTags('permisos')
  @Delete()
  remove(@Body() deletePermisoDto: DeletePermisoDto) {
    return this.permisosService.remove(deletePermisoDto);
  }
}
