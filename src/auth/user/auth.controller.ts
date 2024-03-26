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
import { AuthuserService } from './auth.service';
import { CreateAuthuserDto } from './dto/create-auth.dto';
import { TokenDto } from './dto/token.dto';
import { UpdateAuthuserDto } from './dto/update-auth.dto';

@Controller('authuser')
export class AuthuserController {
  constructor(private readonly authauserService: AuthuserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  create(@Body() createAuthDto: CreateAuthuserDto) {
    return this.authauserService.signIn(createAuthDto);
  }

  @Post('refresh')
  refreshToken(@Body() token: TokenDto) {
    return this.authauserService.refreshToken(token);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
