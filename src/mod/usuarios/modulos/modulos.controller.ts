import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

import { PaginationDto } from '../../../global/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

// import { AuthGuard } from '../../mod-auth/authadmin/auth.guard';

@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}

  @ApiTags('modulos')
  @Post('crear-modulo')
  create(@Body() createModuloDto: CreateModuloDto) {
    return this.modulosService.create(createModuloDto);
  }

  @ApiTags('modulos')
  @Get('')
  // @UseGuards(AdminGuard)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.modulosService.findAll(paginationDto);
  }

  @ApiTags('modulos')
  @Patch('editar-modulo/:id')
  update(@Param('id') id: string, @Body() updateModuloDto: UpdateModuloDto) {
    return this.modulosService.update(+id, updateModuloDto);
  }

  @ApiTags('modulos')
  @Delete('eliminar-modulo/:id')
  remove(@Param('id') id: string) {
    return this.modulosService.remove(+id);
  }

}
