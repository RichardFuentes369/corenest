import { DataSource } from 'typeorm';
import { Asignacion } from './asignacion.entity';

export const userProviders = [
  {
    provide: 'MODULO_ASIGNACION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Asignacion),
    inject: ['DATA_SOURCE'],
  },
];