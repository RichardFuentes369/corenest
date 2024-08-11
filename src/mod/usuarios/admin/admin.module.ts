import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { userProviders } from './entities/admin.provider';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [GlobalModule],
  controllers: [AdminController],
  providers: [
    ...userProviders,
    AdminService
  ],
  exports: [
    AdminService
  ]
})
export class AdminModule {}
