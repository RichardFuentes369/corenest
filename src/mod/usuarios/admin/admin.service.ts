import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { PaginationDto } from '@global/dto/pagination.dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {

    const encontrarCorreo = await this.findUsernameEmail(createAdminDto.email)

    if(encontrarCorreo) throw new NotFoundException(`
      Este correo ${createAdminDto.email}, ya esta registrado en nuestra base de datos
    `)

    return this.adminRepository.save(createAdminDto);
  }
  
  listarPropiedadesTabla(T) {
    const metadata = T.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit, page, field = 'id' , order = 'Asc' } = paginationDto
    
    if(!paginationDto.page && !paginationDto.limit) throw new NotFoundException(`
      Recuerde que debe enviar los parametros page, limit
    `)

    if(field == '') throw new NotFoundException(`Debe enviar el campo por el que desea filtrar`)
    if(!paginationDto.page) throw new NotFoundException(`Debe enviar el parametro page`)
    if(!paginationDto.limit) throw new NotFoundException(`Debe enviar el parametro limit`)

    if(field != ''){
      const propiedades = this.listarPropiedadesTabla(this.adminRepository)
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(`El parametro de busqueda ${field} no existe en la base de datos`)
    }

    const skipeReal = (page == 1) ? 0 : (page - 1) * limit

    const peticion = async (page) => {
      return await this.adminRepository.find({
        skip: page,
        take: limit,
        order: {
          [field]: order
        }
      })
    }

    const totalRecords = async () => {
      return await this.adminRepository.count()
    }

    return [{
      'result': await peticion(skipeReal),
      'pagination': {
        'page': page,
        'perPage': limit,
        'previou': (page == 1) ? null : page-1,
        'next': (await peticion(page*limit)).length == 0 ? null : page+1,
        'totalRecord': await totalRecords()
      },
      'order':{
        'order': order,
        'field': field
      }
    }]
  }

  findOne(id: number) {
    return this.adminRepository.findOne({
      where: [ {id : id}],
      order: { id: 'DESC' }
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const property = await this.adminRepository.findOne({
      where: { id }
    });

    if(updateAdminDto.email){
      if(updateAdminDto.email != property.email){
  
        let concidencia = await this.adminRepository.findOne({
          where: [ {email : updateAdminDto.email}]
        });
        
        if(concidencia) throw new NotFoundException(`
          El correo que esta intentando actualizar ya existe
        `)
        
      }
    }

    return this.adminRepository.save({
      ...property, // existing fields
      ...updateAdminDto // updated fields
    });
  }

  remove(id: number) {
    return this.adminRepository.delete(id);
  }

  async findUsernameEmail(username: string): Promise<Admin>{
    return this.adminRepository.findOne({
      where: [ {email : username}]
    });
  }
}
