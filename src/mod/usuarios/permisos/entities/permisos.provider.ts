import { DataSource } from 'typeorm';
import { Permisos } from './permisos.entity';

export const permisoProvider = [
  {
    provide: 'PERMISO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Permisos),
    inject: ['DATA_SOURCE'],
  },
];