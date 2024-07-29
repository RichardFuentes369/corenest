import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';

import { Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';

@Injectable()
export class AsignacionService {
  constructor(
    @Inject('PERMISO_ASIGNACION_REPOSITORY')
    private moduloRepository: Repository<Asignacion>,
  ) {}

  async findPermiso(moduloId: number, nombrePermiso: string, userId: number): Promise<Asignacion>{

    if(moduloId == 0){
      return this.moduloRepository.findOne({
        where: {
          nombre_permiso: nombrePermiso,
          user_id: userId
        },
      });
    }else{
      return this.moduloRepository.findOne({
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

    return this.moduloRepository.save(createAsignacionDto);

  }

  async findAll(userId: number) {

    const Modulos = await this.moduloRepository.createQueryBuilder('permiso')
    .where('permiso.modulo_padre IS NULL')
    .andWhere('permiso.user = :userId', { userId:userId })
    .getRawMany();

    const SubModulos = await Promise.all(Modulos.map(async (permisosModulos) => {
      const permisosSubmodulos = await this.moduloRepository.createQueryBuilder('permiso')
        .where('permiso.modulo_padre = :moduloPadreId', { moduloPadreId: permisosModulos.permiso_id })
        .getMany();

      const Acciones = await Promise.all(permisosSubmodulos.map(async (submodulo) => {
        const permisosAcciones = await this.moduloRepository.createQueryBuilder('modulo')
          .where('modulo.modulo_padre = :submoduloId', { submoduloId: submodulo.id })
          .getMany();
        
        return { ...submodulo, permisosAcciones };
      }));

      return { ...permisosModulos, permisosSubmodulos: Acciones };
    }));

    return SubModulos;
    
  }

  async delete(moduloId: number, nombrePermiso: string, userId: number){

    let idRegistro = (await this.findPermiso(moduloId, nombrePermiso, userId)).id
    return this.moduloRepository.delete(idRegistro);
    
  }
  
}
