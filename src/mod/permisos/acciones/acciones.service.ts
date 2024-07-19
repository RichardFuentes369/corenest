import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccionesDto } from './dto/create-accione.dto';
import { UpdateAccioneDto } from './dto/update-accione.dto';
import { DeleteAccionesDto } from './dto/delete-acciones.dto';

import { Repository } from 'typeorm';
import { AccionesModule } from './entities/accione.entity';
import { PaginationDto } from '../../../global/dto/pagination.dto';

@Injectable()
export class PermisoAccionesService {

  constructor(
    @Inject('PERMISO_ACCIONES_REPOSITORY')
    private moduloRepository: Repository<AccionesModule>,
  ) {}

  async findPermiso(nombre: string, userId: number, moduloId: number, tipo: number): Promise<AccionesModule>{
    return this.moduloRepository.createQueryBuilder("mod_permisos_acciones")
    .where("mod_permisos_acciones.nombre = :nombre", { nombre })
    .andWhere("mod_permisos_acciones.userId = :userId", { userId })
    .andWhere("mod_permisos_acciones.moduloId = :moduloId", { moduloId })
    .andWhere("mod_permisos_acciones.tipo = :tipo", { tipo })
    .getOne();
  }

  async create(createAccionesModuloDto: CreateAccionesDto) {
    const encontrarPermiso = await this.findPermiso(createAccionesModuloDto.nombre, createAccionesModuloDto.userId, createAccionesModuloDto.moduloId, createAccionesModuloDto.tipo)

    if(encontrarPermiso) throw new NotFoundException(`
      El permiso con ya fue asignado
    `)
    
    return this.moduloRepository.save(createAccionesModuloDto);
  }

  async remove(deletePermismoModuloDto: DeleteAccionesDto) {
    const encontrarPermiso = await this.findPermiso(deletePermismoModuloDto.nombre, deletePermismoModuloDto.userId, deletePermismoModuloDto.moduloId, deletePermismoModuloDto.tipo)

    if(encontrarPermiso) {
      return this.moduloRepository.delete(encontrarPermiso.id);
    }else{
      throw new NotFoundException(`No se encontro ningun permiso`)
    }
  }

  async permisos(idUsuario: number, module: number, tipo: number): Promise<AccionesModule[]>{

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
