import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

import { Repository } from 'typeorm';
import { Modulo } from './entities/modulos.entity';
import { PaginationDto } from '../../global/dto/pagination.dto';

@Injectable()
export class ModulosService {
  constructor(
    @Inject('MODULES_REPOSITORY')
    private moduloRepository: Repository<Modulo>,
  ) {}

  async findNameModule(nombre: string): Promise<Modulo>{
    return this.moduloRepository.findOne({
      where: [ {nombre : nombre}]
    });
  }

  async create(createModuloDto: CreateModuloDto) {
    const encontrarModulo = await this.findNameModule(createModuloDto.nombre)

    if(encontrarModulo) throw new NotFoundException(`
      El modulo con nombre ${createModuloDto.nombre}, ya esta registrado en nuestra base de datos
    `)
    return this.moduloRepository.save(createModuloDto);
  }

  listarPropiedadesTabla(T) {
    const metadata = T.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAllPaginado(paginationDto: PaginationDto) {

    const { limit, page, field = 'id' , order = 'Asc' } = paginationDto
    
    if(!paginationDto.page && !paginationDto.limit) throw new NotFoundException(`
      Recuerde que debe enviar los parametros page, limit
    `)

    if(field == '') throw new NotFoundException(`Debe enviar el campo por el que desea filtrar`)
    if(!paginationDto.page) throw new NotFoundException(`Debe enviar el parametro page`)
    if(!paginationDto.limit) throw new NotFoundException(`Debe enviar el parametro limit`)

    if(field != ''){
      const propiedades = this.listarPropiedadesTabla(this.moduloRepository)
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(`El parametro de busqueda ${field} no existe en la base de datos`)
    }

    const skipeReal = (page == 1) ? 0 : (page - 1) * limit

    const peticion = async (page) => {
      return await this.moduloRepository.find({
        skip: page,
        take: limit,
        order: {
          [field]: order
        }
      })
    }

    return [{
      'result': await peticion(skipeReal),
      'pagination': {
        'page': page,
        'perPage': limit,
        'previou': (page == 1) ? null : page-1,
        'next': (await peticion(page*limit)).length == 0 ? null : page+1 
      },
      'order':{
        'order': order,
        'field': field
      }
    }]
  }

  async findAll() {
    return await this.moduloRepository.find()
  }

  async update(id: number, updateModuloDto: UpdateModuloDto) {

    const property = await this.moduloRepository.findOne({
      where: { id }
    });

    if(updateModuloDto.nombre){
      const encontrarModulo = await this.findNameModule(updateModuloDto.nombre)
      if(encontrarModulo && encontrarModulo.id != id) throw new NotFoundException(`
        Este nombre ${updateModuloDto.nombre} ya esta registrado
      `)
    }
    


    return this.moduloRepository.save({
      ...property, // existing fields
      ...updateModuloDto // updated fields
    });
  }

  remove(id: number) {
    return this.moduloRepository.delete(id);
  }


}
