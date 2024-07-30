import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ModulosService } from './modulos.service'
import { CreateModuloDto } from './dto/create-modulo.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/global/dto/pagination.dto';

@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}

  @ApiTags('permisos_modulos')
  @Get()
  findAll() {
    return this.modulosService.findAll();
  }
  
  @ApiTags('permisos_modulos')
  @Get('lista/:padreId')
  // @UseGuards(AdminGuard)
  findPaginada(@Param('padreId') padreId: string, @Query() paginationDto: PaginationDto) {
    return this.modulosService.findPaginada(+padreId, paginationDto);
  }

  @ApiTags('permisos_modulos')
  @Get('buscar-permiso/:idModulo/:nombre')
  findOne(@Param('idModulo') idModulo: string, @Param('nombre') nombre: string) {
    return this.modulosService.findPermiso(+idModulo, nombre);
  }

  @ApiTags('permisos_modulos')
  @Post('crear-permiso-modulo')
  create(@Body() createModuloDto: CreateModuloDto) {
    return this.modulosService.create(createModuloDto);
  }

  @ApiTags('permisos_modulos')
  @Delete('eliminar-permiso-modulo/:idModulo/:nombre')
  delete(@Param('idModulo') idModulo: string, @Param('nombre') nombre: string) {
    return this.modulosService.delete(+idModulo, nombre);
  }
}
