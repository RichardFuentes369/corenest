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


  async permisos(idUsuario: number, idModulo: number, tipo: number, idSubmodulo: number): Promise<PermisosModulos[]>{

    if(idModulo == 0 && tipo == 1){
      return this.moduloRepository.find({
        where: { 
          userId: idUsuario,
          tipo: tipo,
          submoduloId: null,
        },
        relations: ["modulo"],
        select: {
          modulo:{
                nombre: true,
                url: true,
          }
        }
      })
    }

    if(idModulo != 0 && tipo == 2 && idSubmodulo == 0){
      return this.moduloRepository.find({
        where: { 
          userId: idUsuario,
          moduloId: idModulo,
          tipo: tipo,
          submoduloId: null,
        }
      })
    }

    if(idModulo != 0 && tipo == 3 && idSubmodulo != 0){
      return this.moduloRepository.find({
        where: { 
          userId: idUsuario,
          moduloId: idModulo,
          tipo: tipo,
          submoduloId: idSubmodulo,
        }
      })
    }
    
  }

  async idPermiso(nombre: string, idUsuario: number): Promise<PermisosModulos[]>{

    return this.moduloRepository.find({
      where: { 
        userId: idUsuario,
        nombre: nombre
      }
    })
    
  }

  async findPermiso(
    nombre: string, 
    idUsuario: number, 
    idModulo: number, 
    tipo: number, 
    idSubmodulo: number
  ): Promise<PermisosModulos>{
    const consulta =  this.moduloRepository.createQueryBuilder("mod_permisos_modulos")
    .where("mod_permisos_modulos.nombre = :nombre", { nombre })
    .andWhere("mod_permisos_modulos.userId = :idUsuario", { idUsuario })
    .andWhere("mod_permisos_modulos.moduloId = :idModulo", { idModulo })
    .andWhere("mod_permisos_modulos.tipo = :tipo", { tipo });

    if(idSubmodulo!=null){
      consulta.andWhere("mod_permisos_modulos.submoduloId = :idSubmodulo", { idSubmodulo });
    }else{
      consulta.andWhere("mod_permisos_modulos.submoduloId IS NULL");
    }

    return consulta.getOne();
  }

  async create(createPermisoModuloDto: CreateModulosDto) {
    const encontrarPermiso = await this.findPermiso(
      createPermisoModuloDto.nombre, 
      createPermisoModuloDto.userId, 
      createPermisoModuloDto.moduloId, 
      createPermisoModuloDto.tipo,
      createPermisoModuloDto.submoduloId
    )

    if(encontrarPermiso) throw new NotFoundException(`
      El permiso con ya fue asignado
    `)

    return this.moduloRepository.save(createPermisoModuloDto);
  }

  async remove(deletePermismoModuloDto: DeleteModulosDto) {
    const encontrarPermiso = await this.findPermiso(
      deletePermismoModuloDto.nombre, 
      deletePermismoModuloDto.userId, 
      deletePermismoModuloDto.moduloId, 
      deletePermismoModuloDto.tipo,
      deletePermismoModuloDto.submoduloId
    )

    if(encontrarPermiso) {
      return this.moduloRepository.delete(encontrarPermiso.id);
    }else{
      throw new NotFoundException(`No se encontro ningun permiso`)
    }
  }

}
