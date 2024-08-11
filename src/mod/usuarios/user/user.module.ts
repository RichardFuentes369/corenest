import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { userProviders } from './entities/user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [GlobalModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserService
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
