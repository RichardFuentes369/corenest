import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthadminService } from './auth.service';
import { CreateAuthadminDto } from './dto/create-auth.dto';
import { TokenDto } from './dto/token.dto';
import { UpdateAuthadminDto } from './dto/update-auth.dto';

@Controller('authadmin')
export class AuthadminController {
  constructor(private readonly authadminService: AuthadminService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  create(@Body() createAuthDto: CreateAuthadminDto) {
    return this.authadminService.signIn(createAuthDto);
  }
  
  @Post('refresh')
  refreshToken(@Body() token: TokenDto) {
    return this.authadminService.refreshToken(token);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
