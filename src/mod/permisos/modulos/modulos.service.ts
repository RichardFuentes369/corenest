import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateModulosDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { DeleteModulosDto } from './dto/delete-modulo.dto';

import { Repository } from 'typeorm';
import { PermisosModulos } from './entities/modulo.entity';
import { PaginationDto } from '../../../global/dto/pagination.dto';

@Injectable()
export class PermisoModulosService {

  constructor(
    @Inject('PERMISO_MODULOS_REPOSITORY')
    private moduloRepository: Repository<PermisosModulos>,
  ) {}

  async findPermiso(nombre: string, userId: number, moduloId: number, tipo: number): Promise<PermisosModulos>{
    return this.moduloRepository.createQueryBuilder("mod_permisos_modulo")
    .where("mod_permisos_modulo.nombre = :nombre", { nombre })
    .andWhere("mod_permisos_modulo.userId = :userId", { userId })
    .andWhere("mod_usuarios_permisos.moduloId = :moduloId", { moduloId })
    .andWhere("mod_permisos_modulo.tipo = :tipo", { tipo })
    .getOne();
  }

  async create(createPermisoModuloDto: CreateModulosDto) {
    const encontrarPermiso = await this.findPermiso(createPermisoModuloDto.nombre, createPermisoModuloDto.userId, createPermisoModuloDto.moduloId, createPermisoModuloDto.tipo)

    if(encontrarPermiso) throw new NotFoundException(`
      El permiso con ya fue asignado
    `)
    
    return this.moduloRepository.save(createPermisoModuloDto);
  }

  async remove(deletePermismoModuloDto: DeleteModulosDto) {
    const encontrarPermiso = await this.findPermiso(deletePermismoModuloDto.nombre, deletePermismoModuloDto.userId, deletePermismoModuloDto.moduloId, deletePermismoModuloDto.tipo)

    if(encontrarPermiso) {
      return this.moduloRepository.delete(encontrarPermiso.id);
    }else{
      throw new NotFoundException(`No se encontro ningun permiso`)
    }
  }

  async permisos(idUsuario: number, module: number, tipo: number): Promise<PermisosModulos[]>{

    if(module == 0){
      return this.moduloRepository.find({
        where: { 
          userId: idUsuario,
          tipo: 1
        },
        relations: ["modulo"],
        select: {
          modulo:{
                nombre: true,
                url: true,
          }
        }
      })
    }else{
      return this.moduloRepository.find({
        where: { 
          userId: idUsuario,
          moduloId: module,
          tipo: tipo
        }
      })
    }

  }

}
