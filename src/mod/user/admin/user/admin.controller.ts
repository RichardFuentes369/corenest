import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import { PaginationDto } from '@global/dto/pagination.dto';

import { AdminGuard } from '@guard/admin/admin.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiTags('admin')
  @Post('crear-admininistrador')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
  
  @ApiTags('admin')
  @Get()
  // @UseGuards(AdminGuard)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.adminService.findAll(paginationDto);
  }

  @ApiTags('admin')
  @Get('obtener-administrador/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiTags('admin')
  @Patch('editar-administrador/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiTags('admin')
  @Delete('eliminar-admininistrador/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
