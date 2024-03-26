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
      throw new NotFoundException('User not exist!', { cause: new Error(), description: 'Some error description' })
    }
    if(user.isActive == false){
      throw new NotFoundException('User no is active!', { cause: new Error(), description: 'Some error description' })
    }
    if (user.password !== createUserDto.pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };

    // throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })

  }

  async refreshToken(tokenDto: TokenDto): Promise<any> {
    const tokenUsuario = await this.jwtService.decode(tokenDto.token)
    const user = await this.userService.findUsernameEmail(tokenUsuario.email);
    const payload = { sub: user.id, email: user.email };
    const token = await  this.jwtService.sign(payload);
    return token;
  }
}
