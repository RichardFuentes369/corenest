import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @ApiTags('permisos_asignaciones')
  @Post()
  create(@Body() createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionService.create(createAsignacionDto);
  }

  @ApiTags('permisos_asignaciones')
  @Get()
  findAll() {
    return this.asignacionService.findAll();
  }

  @ApiTags('permisos_asignaciones')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignacionService.findOne(+id);
  }

  @ApiTags('permisos_asignaciones')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionService.update(+id, updateAsignacionDto);
  }

  @ApiTags('permisos_asignaciones')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignacionService.remove(+id);
  }
}
