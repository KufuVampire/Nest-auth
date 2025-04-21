import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ProfileUserDto } from './dto/profileUser.dto';
import { IsAuth } from '../core/decorators/isAuth.decorator';
import { UserField } from '../core/decorators/userField.decorator';

@Controller('')
@ApiTags('User')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@IsAuth()
	@Get('profile')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: HttpStatus.OK, description: 'Данный путь доступен если пользователь авторизован в свой аккаунт. Возвращает данные аккаунта пользователя.', type: ProfileUserDto })
	async getProfile(@UserField("id") id: number) {
		return this.userService.findById(id)
	}
}