import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../../users/user/user.service';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthuserDto } from './dto/create-auth.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthuserService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  
  async signIn(createUserDto: CreateAuthuserDto): Promise<any> {
    
    const user = await this.userService.findUsernameEmail(createUserDto.username);
    if(!user || user == null){
      throw new NotFoundException('Error!', { cause: new Error(), description: 'El usuario no se encuentra registrado en nuesta base de datos' })
    }
    if(user.isActive == false){
      throw new NotFoundException('Error!', { cause: new Error(), description: 'El usuario se encuentra desactivado, contactar con el administrador' })
    }
    if (user.password !== createUserDto.pass) {
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
    const user = await this.userService.findUsernameEmail(tokenUsuario.email);
    const payload = { sub: user.id, email: user.email };
    const token = await  this.jwtService.sign(payload);
    return token;
  }
}