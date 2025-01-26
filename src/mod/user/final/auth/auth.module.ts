import { Module } from '@nestjs/common';
import { AuthuserService } from './auth.service';
import { AuthuserController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@guard/secret_key';

import { UserModule } from '@module/user/final/user/user.module';
@Module({
  imports: [
    UserModule, 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secretUser,
      signOptions: { expiresIn: '1m' },
    }),
  ],
  controllers: [AuthuserController],
  providers: [AuthuserService],
  exports: [AuthuserService],
})
export class AuthuserModule {}
