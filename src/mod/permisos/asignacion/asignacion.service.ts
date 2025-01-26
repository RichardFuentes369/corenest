import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';

import { Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Modulo } from '../modulos/entities/modulo.entity';

@Injectable()
export class AsignacionService {
  constructor(
    @Inject('PERMISO_MODULO_REPOSITORY')
    private moduloRepository: Repository<Modulo>,
    @Inject('PERMISO_ASIGNACION_REPOSITORY')
    private asignacionRepository: Repository<Asignacion>,
  ) {}

  async findPermiso(moduloId: number, nombrePermiso: string, userId: number): Promise<Asignacion>{

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

  async create(createAsignacionDto: CreateAsignacionDto) {

    let moduloId = null
    if(createAsignacionDto.modulo_padre_id){
      moduloId = createAsignacionDto.modulo_padre_id
    }else{
      moduloId = 0
    }

    let busquedaPermiso = await this.findPermiso(moduloId, createAsignacionDto.nombre_permiso, createAsignacionDto.user_id)

    if(busquedaPermiso) throw new NotFoundException(`
      Este permiso, ya existe en nuestra base de datos
    `)

    return this.asignacionRepository.save(createAsignacionDto);

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

  async delete(query: any){

    let idRegistro = (await this.findPermiso(+query.idModulo, query.nombrePermiso, +query.userId))?.id
    let msj = ''
    if(idRegistro){
      this.asignacionRepository.delete(idRegistro)
      msj = 'Registro eliminado'
    }else{
      msj = 'No se encontro registro'
    }
    return msj;
    
  }
  
}
