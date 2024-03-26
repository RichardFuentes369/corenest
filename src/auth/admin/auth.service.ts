import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AdminService } from '../../users/admin/admin.service';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthadminDto } from './dto/create-auth.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthadminService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService
  ) {}
  
  async signIn(createAdminDto: CreateAuthadminDto): Promise<any> {
    
    const user = await this.adminService.findUsernameEmail(createAdminDto.username);
    if(!user || user == null){
      throw new NotFoundException('User not exist!', { cause: new Error(), description: 'Some error description' })
    }
    if(user.isActive == false){
      throw new NotFoundException('User no is active!', { cause: new Error(), description: 'Some error description' })
    }
    if (user.password !== createAdminDto.pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }

  async refreshToken(tokenDto: TokenDto): Promise<any> {
    const tokenUsuario = await this.jwtService.decode(tokenDto.token)
    const user = await this.adminService.findUsernameEmail(tokenUsuario.email);
    const payload = { sub: user.id, email: user.email };
    const token = await  this.jwtService.sign(payload);
    return token;
  }
}
