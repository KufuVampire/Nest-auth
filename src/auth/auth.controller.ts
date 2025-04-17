import { UserDto } from './../user/dto/user.dto';
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: UserDto,
    description: 'Объект полей регистрации пользователя'
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Регистрация' })
  async singUp(@Req() req: Request, @Body() dto: UserDto) {
    return this.authService.singUp(req, dto)
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: UserDto,
    description: 'Объект полей регистрации пользователя'
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Вход в аккаунт' })
  async singIn(@Req() req: Request, @Body() dto: UserDto) {
    return this.authService.singIn(req, dto);
  }

  @Post('sign-out')
  @ApiResponse({ status: HttpStatus.OK, description: 'Выход из аккаунта' })
  async singOut(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.authService.singOut(req, res);
  }
}
