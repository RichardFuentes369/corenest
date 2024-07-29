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
  @Post('asignacion-permiso')
  create(@Body() createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionService.create(createAsignacionDto);
  }

}
