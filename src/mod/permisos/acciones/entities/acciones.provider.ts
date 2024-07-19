import { DataSource } from 'typeorm';
import { AccionesModule } from './accione.entity';

export const permisoProvider = [
  {
    provide: 'PERMISO_ACCIONES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AccionesModule),
    inject: ['DATA_SOURCE'],
  },
];