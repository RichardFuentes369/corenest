import { DataSource } from 'typeorm';
import { Asignacion } from './asignacion.entity';

export const asignacionProviders = [
  {
    provide: 'PERMISO_ASIGNACION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Asignacion),
    inject: ['DATA_SOURCE'],
  },
];