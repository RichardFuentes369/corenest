import { DataSource } from 'typeorm';
import { Modulos } from './modulos.entity';

export const modulosProvider = [
  {
    provide: 'MODULES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Modulos),
    inject: ['DATA_SOURCE'],
  },
];