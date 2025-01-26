import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ModulosService } from './modulos.service'
import { CreateModuloDto } from './dto/create-modulo.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@global/dto/pagination.dto';

@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}

  @ApiTags('permisos_modulos')
  @Get('getPermisosSobreModulo')
  findAll() {
    return this.modulosService.findAll();
  }
  
  @ApiTags('permisos_modulos')
  @Get('getPermisoExistente')
  findOne(@Query() query) {
    return this.modulosService.findPermiso(+query.idModulo, query.nombre);
  }
  
  @ApiTags('permisos_modulos')
  @Get('getPermisosSobrePadre/:padreId')
  findPaginada(@Param('padreId') padreId: string, @Query() paginationDto: PaginationDto) {
    return this.modulosService.findPaginada(+padreId, paginationDto);
  }

  @ApiTags('permisos_modulos')
  @Get('getPermisosPorUsuario')
  findAllForUser(@Query() query) {
    return this.modulosService.findAllForUser(query);
  }

  @ApiTags('permisos_modulos')
  @Post('postModuloPermiso')
  create(@Body() createModuloDto: CreateModuloDto) {
    return this.modulosService.create(createModuloDto);
  }

  @ApiTags('permisos_modulos')
  @Delete('deleteModuloPermiso')
  delete(@Query() queryParams) {
    return this.modulosService.delete(queryParams);
  }
}
