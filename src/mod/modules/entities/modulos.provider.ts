import { DataSource } from 'typeorm';
import { Modulo } from './modulo.entity';

export const moduloProviders = [
  {
    provide: 'PERMISO_MODULO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Modulo),
    inject: ['DATA_SOURCE'],
  },
];