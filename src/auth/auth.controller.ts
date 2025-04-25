import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { SigninUserDto, SignupUserDto } from '../user/dto/user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: SignupUserDto,
    description: 'Объект полей регистрации. Username необязательное поле для заполнения.'
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Создает сессию после успешной регистраци, устанавливаются куки' })
  async singUp(@Req() req: Request, @Body() dto: SignupUserDto) {
    return this.authService.singUp(req, dto)
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: SigninUserDto,
    description: 'Объект полей авторизации. Вход можно осуществить по email, либо по username.'
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Создает сессию после успешного входа, устанавливаются куки' })
  async singIn(@Req() req: Request, @Body() dto: SigninUserDto) {
    return this.authService.singIn(req, dto);
  }

  @Post('sign-out')
  @ApiResponse({ status: HttpStatus.OK, description: 'Выход из аккаунта.' })
  async singOut(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.authService.singOut(req, res);
  }
}
