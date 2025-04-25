import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Req, Res } from "@nestjs/common";
import { IsAuth } from '../core/decorators/isAuth.decorator';
import { UserField } from '../core/decorators/userField.decorator';
import { ProfileUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';
import { Request, Response } from 'express';

@Controller('users')
@ApiTags('User')
export class UserController {
	constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

	@IsAuth()
	@Get('profile')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: HttpStatus.OK, description: 'Данный путь доступен если пользователь авторизован в свой аккаунт. Возвращает данные аккаунта пользователя.', type: ProfileUserDto })
	async getProfile(@UserField("id") id: number) {
		return this.userService.findById(id);
	}

	@IsAuth()
	@Patch(':id/update')
	@HttpCode(HttpStatus.OK)
	@ApiBody({ type: UpdateUserDto, description: 'Данный путь доступен если пользователь авторизован. Обновляет данные о пользователе. Любое поле необязательное' })
	@ApiResponse({ status: HttpStatus.OK })
	async updateUser(@Param("id") id: string, @Body() dto: UpdateUserDto) {
		return this.userService.updateById(parseInt(id), dto);
	}

	@IsAuth()
	@Delete(':id/delete')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: HttpStatus.OK, description: 'Данный путь доступен если пользователь авторизован. Удаляет пользователя.' })
	async deleteUser(@Param("id") id: string, @Req() req: Request, @Res() res: Response) {
		this.authService.singOut(req, res);
		this.userService.deleteById(parseInt(id));
	}
}