import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';

import { IsNull, Repository } from 'typeorm';
import { Modulo } from './entities/modulo.entity';
import { PaginationDto } from '@global/dto/pagination.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ModulosService {
  constructor(
    @Inject('PERMISO_MODULO_REPOSITORY')
    private moduloRepository: Repository<Modulo>,
    private i18n: I18nService
  ) {}
  
  listarPropiedadesTabla(T) {
    const metadata = T.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

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

  organizarJerarquia(data) {
    // Crear un mapa de todos los elementos por ID para acceder fácilmente
    const map = new Map();
    const roots = [];
  
    // Crear los nodos base (padres, hijos, nietos)
    data.forEach(item => {
      if (!item.mpm_modulo_padre_id) {
        map.set(item.mpm_id, { ...item, 'mpm_toogle': false, children: [] });
      }else{
        map.set(item.mpm_id, { ...item, children: [] });
      }
  
      // Si no tiene 'mpm_modulo_padre_id', es un padre y lo agregamos a roots
      if (!item.mpm_modulo_padre_id) {
        roots.push(map.get(item.mpm_id));
      }
    });
  
    // Ahora asignamos a cada hijo a su correspondiente padre
    data.forEach(item => {
      if (item.mpm_modulo_padre_id) {
        const parent = map.get(item.mpm_modulo_padre_id);
        if (parent) {
          parent.children.push(map.get(item.mpm_id));
        }
      }
    });
  
    return roots;
  }

  async findAllForUser(queryParams) {

    // Realizar la consulta
    const query = await this.moduloRepository.createQueryBuilder('mpm')
    .select([
      'mpm.modulo_padre_id',
      'mpm.id',
      'mpm.nombre_permiso',
    ])
    .addSelect(subQuery => {
      return subQuery
        .select('CASE WHEN mpma.nombre_permiso IS NOT NULL THEN 1 ELSE 0 END as asignado')
        .from('mod_permisos_modulo_asignacion', 'mpma')
        .andWhere(`
          CASE WHEN mpm.modulo_padre_id IS NULL THEN
            mpma.modulo_padre_id IS NULL AND
            mpma.nombre_permiso = mpm.nombre_permiso
          ELSE
            mpma.nombre_permiso = mpm.nombre_permiso AND
            mpma.modulo_padre_id = mpm.modulo_padre_id
          END
        `)
        .andWhere('mpma.user_id = :userId', { userId: queryParams.userId })
    }, 'asignado')
    .getRawMany();

    const result = this.organizarJerarquia(query)
    return result;
  }

  async findPermiso(moduloId: number, nombrePermiso: string, opcion?: string){

    let consulta = []

    if(moduloId == 0 && opcion == 'CREATE'){
      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id IS NULL")
      .andWhere("modulo.nombre_permiso  = :nombrePermiso", { nombrePermiso: nombrePermiso })
      .getMany();
      
      if(consulta.length > 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR'), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_EXISTENTE') }
      )
    }
    if(moduloId != 0 && opcion == 'CREATE'){
      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.id = :idPadre", { idPadre: moduloId })
      .getMany();

      if(consulta.length == 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR'), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_PADRE_NO_EXISTENTE') }
      )

      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id = :idPadre", { idPadre: moduloId })
      .andWhere("modulo.nombre_permiso = :nombrePermiso", { nombrePermiso: nombrePermiso })
      .getMany();

      if(consulta.length > 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR'), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_EXISTENTE') }
      )
    }
    
    if(moduloId == 0 && opcion == 'DELETE'){
      
      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id IS NULL")
      .andWhere("modulo.nombre_permiso = :nombrePermiso", { nombrePermiso: nombrePermiso })
      .getMany();
        
      if(consulta.length == 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR'), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_NO_EXISTENTE') }
      )

      let consulta2 = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id = :idPadre", { idPadre: consulta[0].id })
      .getMany();
      
      if(consulta2.length > 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR'), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_TIENE_PERMISOS_HIJOS') }
      )

    }
    if(moduloId != 0 && opcion == 'DELETE'){
      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id = :idPadre", { idPadre: moduloId })
      .getMany();

      if(consulta.length == 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR'), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_PADRE_NO_EXISTENTE') }
      )

      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id = :idPadre", { idPadre: consulta[0].id })
      .getMany();

      if(consulta.length > 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR'), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_TIENE_PERMISOS_HIJOS') }
      )

      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id = :idPadre", { idPadre: moduloId })
      .andWhere("modulo.nombre_permiso = :nombrePermiso", { nombrePermiso: nombrePermiso })
      .getMany();

      if(consulta.length == 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR'), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_NO_EXISTENTE') }
      )
    }

    return consulta
  }

  async create(createModuleDto: CreateModuloDto) {
    
    let busquedaPermiso = await this.findPermiso(createModuleDto.modulo_padre_id, createModuleDto.nombre_permiso, 'CREATE')

    try {

      let model = {
        'modulo_padre_id': (createModuleDto.modulo_padre_id == 0) ? null : createModuleDto.modulo_padre_id,
        'nombre_permiso': createModuleDto.nombre_permiso,
      }

      const crearModulo = await this.moduloRepository.save(model);

      return {
        'title': this.i18n.t('modulo.MSJ_PERMISO_TITTLE'),
        'message': this.i18n.t('modulo.MSJ_PERMISO_CREADO_OK'),
        'status': 200,
      }
    } catch (error) {
      console.log(error)
    }

  }

  async delete(query: any){

    let idRegistro = await this.findPermiso(query.idModulo, query.nombre, 'DELETE')
    const elimiarModulo = this.moduloRepository.delete(idRegistro[0].id);
    
    return {
      'title': this.i18n.t('modulo.MSJ_PERMISO_TITTLE'),
      'message': this.i18n.t('modulo.MSN_PERMISO_REMOVIDO_OK'),
      'status': 200,
    }
    
  }

  async findPaginada(padreId:number, paginationDto: PaginationDto){

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
    const padreIdReal = (padreId == 0) ? IsNull() : padreId

    const peticion = async (page) => {
      return await this.moduloRepository.find({
        where: {
          modulo_padre_id: padreIdReal
        },
        skip: page,
        take: limit,
        order: {
          [field]: order
        }
      })
    }

    const totalRecords = async () => {
      return await this.moduloRepository.count({
        where: {
          modulo_padre_id: padreIdReal
        }
      })
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
}
