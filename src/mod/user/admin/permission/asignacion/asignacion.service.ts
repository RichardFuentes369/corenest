import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';

import { Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Modulo } from '@module/modules/entities/modulo.entity';

@Injectable()
export class AsignacionService {
  constructor(
    @Inject('PERMISO_MODULO_REPOSITORY')
    private moduloRepository: Repository<Modulo>,
    @Inject('PERMISO_ASIGNACION_REPOSITORY')
    private asignacionRepository: Repository<Asignacion>,
  ) {}

  async findOne(moduloId: number, nombrePermiso: string, userId: number): Promise<Asignacion>{

    if(moduloId == 0){
      return this.asignacionRepository.findOne({
        where: {
          nombre_permiso: nombrePermiso,
          user_id: userId
        },
      });
    }else{
      return this.asignacionRepository.findOne({
        where: {
          nombre_permiso: nombrePermiso,
          modulo_padre_id: moduloId,
          user_id: userId
        },
      });
    }

  }

  async findAll(userId: number, permiso: string) {

    if(permiso != ''){
      const Permiso = await this.moduloRepository.createQueryBuilder('modulo')
      .where('modulo.nombre_permiso = :permiso', { permiso:permiso })
      .getOne();
      
      const Modulos = await this.asignacionRepository.createQueryBuilder('permiso')
      .where('permiso.user_id = :userId', { userId:userId })
      .andWhere('permiso.modulo_padre_id = :id_permiso', { id_permiso:Permiso.id })
      .getRawMany();
      
      return Modulos;
    }

    const Modulos = await this.asignacionRepository.createQueryBuilder('permiso')
    .where('permiso.modulo_padre_id  Is Null')
    .andWhere('permiso.user_id = :userId', { userId:userId })
    .getRawMany();

    return Modulos;
  }

  async updateAsignacion(idPermiso: number, idPadre: string, opcion: number, idUser: number){

    const permisoMaestro = await this.moduloRepository.findOne({
      where: {
        id: idPermiso
      },
    });

    if(opcion == 0){
      let model = {
        'nombre_permiso': permisoMaestro.nombre_permiso,
        'modulo_padre_id':  (permisoMaestro.modulo_padre_id) ? permisoMaestro.modulo_padre_id : null,
        'user_id': idUser
      }
      return this.asignacionRepository.save(model);
    }

    if(permisoMaestro){
      const permisoAsignado = await this.asignacionRepository.findOne({
        where: {
          'nombre_permiso': permisoMaestro.nombre_permiso,
          'modulo_padre_id': (permisoMaestro.modulo_padre_id) ? permisoMaestro.modulo_padre_id : null,
          'user_id': idUser
        },  
      });
      return this.asignacionRepository.delete(permisoAsignado.id);
    }

  }

  
}
