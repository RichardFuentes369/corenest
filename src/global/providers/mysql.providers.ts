import { DataSource } from 'typeorm';

export const mysqlProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASEHOST,
        port: +process.env.DATABASEPORT,
        username: process.env.DATABASEUSERNAME,
        password: process.env.DATABASEPASSWORD,
        database: process.env.DATABASENAME,
        entities: [
          __dirname + '/../../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];