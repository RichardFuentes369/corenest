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
import { FinalGuard } from '@guard/final/final.guard';
import { AuthuserService } from './auth.service';
import { CreateAuthuserDto } from './dto/create-auth.dto';
import { TokenDto } from './dto/token.dto';
import { UpdateAuthuserDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('authuser')
export class AuthuserController {
  constructor(private readonly authauserService: AuthuserService) {}

  @ApiTags('autenticacion_user')
  @HttpCode(HttpStatus.OK)
  @Post('login')
  create(@Body() createAuthDto: CreateAuthuserDto) {
    return this.authauserService.signIn(createAuthDto);
  }

  @ApiTags('autenticacion_user')
  @Post('refresh')
  refreshToken(@Body() token: TokenDto) {
    return this.authauserService.refreshToken(token);
  }

  @ApiTags('autenticacion_user')
  @UseGuards(FinalGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
