import { Module } from '@nestjs/common';

import { AxiosAdapter } from './adapters/axios.adapter';
import { mysqlProviders } from './providers/mysql.providers';

@Module({
  controllers: [],
  providers: [
    AxiosAdapter,
    ...mysqlProviders
  ],
  exports: [
    AxiosAdapter,
    ...mysqlProviders
  ],
})
export class GlobalModule {}
