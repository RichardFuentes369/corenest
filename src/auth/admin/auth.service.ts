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
      throw new NotFoundException('Error!', { cause: new Error(), description: 'El usuario no se encuentra registrado en nuesta base de datos' })
    }
    if(user.isActive == false){
      throw new NotFoundException('Error!', { cause: new Error(), description: 'El usuario se encuentra desactivado, contactar con el administrador' })
    }
    if (user.password !== createAdminDto.pass) {
      throw new NotFoundException('Error!', { cause: new Error(), description: 'La contraseña no es correcta' })
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }

  async refreshToken(tokenDto: TokenDto): Promise<any> {
    const tokenUsuario = await this.jwtService.decode(tokenDto.token)
    if(!tokenUsuario){
      throw new NotFoundException('Error!', { cause: new Error(), description: 'token invalido' })
    }
    const user = await this.adminService.findUsernameEmail(tokenUsuario.email);
    const payload = { sub: user.id, email: user.email };
    const token = await  this.jwtService.sign(payload);
    return token;
  }
}
