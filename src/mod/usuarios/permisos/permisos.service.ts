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

  async findPermiso(nombre: string, userId: number, moduloId: number, tipo: number): Promise<Permisos>{
    return this.moduloRepository.createQueryBuilder("mod_usuarios_permisos")
    .where("mod_usuarios_permisos.nombre = :nombre", { nombre })
    .andWhere("mod_usuarios_permisos.userId = :userId", { userId })
    .andWhere("mod_usuarios_permisos.moduloId = :moduloId", { moduloId })
    .andWhere("mod_usuarios_permisos.tipo = :tipo", { tipo })
    .getOne();
  }

  async create(createPermisoDto: CreatePermisoDto) {
    const encontrarPermiso = await this.findPermiso(createPermisoDto.nombre, createPermisoDto.userId, createPermisoDto.moduloId, createPermisoDto.tipo)

    if(encontrarPermiso) throw new NotFoundException(`
      El permiso con ya fue asignado
    `)
    
    return this.moduloRepository.save(createPermisoDto);
  }

  async remove(deletePermisoDto: DeletePermisoDto) {
    const encontrarPermiso = await this.findPermiso(deletePermisoDto.nombre, deletePermisoDto.userId, deletePermisoDto.moduloId, deletePermisoDto.tipo)

    if(encontrarPermiso) {
      return this.moduloRepository.delete(encontrarPermiso.id);
    }else{
      throw new NotFoundException(`No se encontro ningun permiso`)
    }
  }

  async permisosModulo(idUsuario: number): Promise<Permisos[]>{
    return this.moduloRepository.find({
      where: { 
        userId: idUsuario,
        tipo: 1
      }
    })
  }

  async permisosSobreModulo(idUsuario: number, module: number): Promise<Permisos[]>{
    return this.moduloRepository.find({
      where: { 
        userId: idUsuario,
        moduloId: module,
        tipo: 2
      }
    })
  }
  
  async findOne(idUsuario: number, idModulo:number, nombrePermiso: string): Promise<Permisos[]>{
    return this.moduloRepository.find({
      where: { 
        userId: idUsuario,
        moduloId: idModulo,
        nombre: nombrePermiso
      }
    })
  }

}
  