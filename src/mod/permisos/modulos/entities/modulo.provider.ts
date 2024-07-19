import { DataSource } from 'typeorm';
import { PermisosModulos } from './modulo.entity';

export const permisoProvider = [
  {
    provide: 'PERMISO_MODULOS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PermisosModulos),
    inject: ['DATA_SOURCE'],
  },
];