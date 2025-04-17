import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { Request, Response } from 'express';
import { User } from '@/prisma/generated';
import { verify } from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly configService: ConfigService) { }

	async singUp(req: Request, dto: UserDto) {
		const isExist = await this.userService.findByUsername(dto.username);

		if (isExist) {
			throw new ConflictException('Ошибка регистрации. Пользователь с таким именем пользователя уже существует. Пожалуйста, используйте другое имя пользователя или войдите в уже существующий аккаунт.');
		}

		const newUser = await this.userService.create(dto);

		return await this.saveSession(req, newUser);
	}

	async singIn(req: Request, dto: UserDto) {
		const user = await this.userService.findByUsername(dto.username);

		if (!user) {
			throw new NotFoundException('Пользователь не найден. Пожалуйста, проверьте входные данные.')
		}

		const isValidPassword = await verify(user.password, dto.password);
		if (!isValidPassword) {
			throw new UnauthorizedException('Неправильное имя пользователя или пароль.')
		}

		return await this.saveSession(req, user);
	}

	async singOut(req: Request, res: Response): Promise<void> {
		req.session.destroy(err => {
			if (err) {
				new InternalServerErrorException('Не удалось завершить сессию. Возможно, возникла проблема с сервером или сессия была завершена.')
			}
		})
		res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
	}

	private async saveSession(req: Request, user: User) {
		req.session.userId = user.id.toString();
		req.session.save(err => {
			if (err) {
				new InternalServerErrorException('Не удалось сохранить сессию')
			}
		})

		return user;
	}
}
