import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationDto } from '@global/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const encontrarCorreo = await this.findUsernameEmail(createUserDto.email)

    if(encontrarCorreo) throw new NotFoundException(`
      Este correo ${createUserDto.email}, ya esta registrado en nuestra base de datos
    `)
    return this.userRepository.save(createUserDto);
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
      const propiedades = this.listarPropiedadesTabla(this.userRepository)
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(`El parametro de busqueda ${field} no existe en la base de datos`)
    }

   
    const skipeReal = (page == 1) ? 0 : (page - 1) * limit

    const peticion = async (page) => {
      return await this.userRepository.find({
        skip: page,
        take: limit,
        order: {
          [field]: order
        }
      })
    }

    const totalRecords = async () => {
      return await this.userRepository.count()
    }

    return [{
      'result': await peticion(skipeReal),
      'pagination': {
        'page': page,
        'perPage': limit,
        'previou': (page == 1) ? null : page-1,
        'next': (await peticion(page*limit)).length == 0 ? null : page+1 ,
        'totalRecord': await totalRecords()
      },
      'order':{
        'order': order,
        'field': field
      }
    }]
  }


  findOne(id: number) {
    return this.userRepository.findOne({
      where: [ {id : id}],
      order: { id: 'DESC' }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const property = await this.userRepository.findOne({
      where: { id }
    });

    if(updateUserDto.email){
      if(updateUserDto.email != property.email){
  
        let concidencia = await this.userRepository.findOne({
          where: [ {email : updateUserDto.email}]
        });
        
        if(concidencia) throw new NotFoundException(`
          El correo que esta intentando actualizar ya existe
        `)
        
      }
    }
    
    return this.userRepository.save({
      ...property, // existing fields
      ...updateUserDto // updated fields
    });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async findUsernameEmail(username: string): Promise<User>{
    return this.userRepository.findOne({
      where: [ {email : username}]
    });
  }
}
