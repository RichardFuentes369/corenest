import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';

import { Repository } from 'typeorm';
import { Permisos } from './entities/permisos.entity';
import { PaginationDto } from '../../../global/dto/pagination.dto';
import { DeletePermisoDto } from './dto/delete-permiso.dto';

@Injectable()
export class PermisosService {
  constructor(
    @Inject('PERMISO_REPOSITORY')
    private moduloRepository: Repository<Permisos>,
  ) {}

  async findPermiso(nombre: string, userId: number, moduloId: number): Promise<Permisos>{
    return this.moduloRepository.createQueryBuilder("mod_usuarios_permisos")
    .where("mod_usuarios_permisos.nombre = :nombre", { nombre })
    .andWhere("mod_usuarios_permisos.userId = :userId", { userId })
    .andWhere("mod_usuarios_permisos.moduloId = :moduloId", { moduloId })
    .getOne();
  }

  async create(createPermisoDto: CreatePermisoDto) {
    const encontrarPermiso = await this.findPermiso(createPermisoDto.nombre, createPermisoDto.userId, createPermisoDto.moduloId)

    if(encontrarPermiso) throw new NotFoundException(`
      El permiso con ya fue asignado
    `)
    
    return this.moduloRepository.save(createPermisoDto);
  }

  async remove(deletePermisoDto: DeletePermisoDto) {
    const encontrarPermiso = await this.findPermiso(deletePermisoDto.nombre, deletePermisoDto.userId, deletePermisoDto.moduloId)

    if(encontrarPermiso) {
      return this.moduloRepository.delete(encontrarPermiso.id);
    }else{
      throw new NotFoundException(`No se encontro ningun permiso`)
    }
  }

  async findAll(id: number): Promise<Permisos[]>{
    return this.moduloRepository.find({
      where: { 
        userId: id
      }
    })
  }
  
  async findOne(id: number, nombrePermiso: string): Promise<Permisos[]>{
    return this.moduloRepository.find({
      where: { 
        userId: id,
        nombre: nombrePermiso
      }
    })
  }

}
  