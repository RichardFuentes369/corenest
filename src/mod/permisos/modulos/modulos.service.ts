import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';

import { Repository } from 'typeorm';
import { Modulo } from './entities/modulo.entity';

@Injectable()
export class ModulosService {
  constructor(
    @Inject('PERMISO_MODULO_REPOSITORY')
    private moduloRepository: Repository<Modulo>,
  ) {}

  async findAll() {

    const Modulos = await this.moduloRepository.createQueryBuilder('permiso')
    .where('permiso.modulo_padre IS NULL')
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

  async findPermiso(moduloId: number, nombrePermiso: string): Promise<Modulo>{

    if(moduloId == 0){
      return this.moduloRepository.findOne({
        where: {
          nombre_permiso: nombrePermiso
        },
      });
    }else{
      return this.moduloRepository.findOne({
        where: {
          nombre_permiso: nombrePermiso,
          modulo_padre_id: moduloId
        },
      });
    }

  }

  async create(createModuleDto: CreateModuloDto) {

    let moduloId = null
    if(createModuleDto.modulo_padre_id){
      moduloId = createModuleDto.modulo_padre_id
    }else{
      moduloId = 0
    }

    let busquedaPermiso = await this.findPermiso(moduloId, createModuleDto.nombre_permiso)

    if(busquedaPermiso) throw new NotFoundException(`
      Este permiso, ya existe en nuestra base de datos
    `)

    return this.moduloRepository.save(createModuleDto);

  }

  async delete(moduloId: number, nombrePermiso: string){

    let idRegistro = (await this.findPermiso(moduloId, nombrePermiso)).id
    return this.moduloRepository.delete(idRegistro);
    
  }
}
