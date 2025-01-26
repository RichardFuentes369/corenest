import { Module } from '@nestjs/common';
import { AuthadminService } from './auth.service';
import { AuthadminController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@guard/secret_key';

import { AdminModule } from '@module/user/admin/user/admin.module';

@Module({
  imports: [
    AdminModule, 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secretAdmin,
      signOptions: { expiresIn: '1m' },
    }),
  ],
  controllers: [AuthadminController],
  providers: [AuthadminService],
  exports: [AuthadminService],
})
export class AuthadminModule {}
