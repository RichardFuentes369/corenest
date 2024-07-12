
import { DataSource } from 'typeorm';
import { Modulo } from './modulos.entity';

export const modulosProvider = [
  {
    provide: 'MODULES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Modulo),
    inject: ['DATA_SOURCE'],
  },
];