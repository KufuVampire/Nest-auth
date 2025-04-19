import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignupUserDto } from '../user/dto/signupUser.dto';
import { Request, Response } from 'express';
import { User } from '@/prisma/generated';
import { verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { SigninUserDto } from '../user/dto/signinUser.dto';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly configService: ConfigService) { }

	async singUp(req: Request, dto: SignupUserDto) {
		const isExist = await this.userService.findByEmail(dto.email);

		if (isExist) {
			throw new ConflictException('Ошибка регистрации. Пользователь с такой почтой уже существует. Пожалуйста, используйте другую почту или войдите в уже существующий аккаунт.');
		}

		const newUser = await this.userService.create(dto);

		return await this.saveSession(req, newUser);
	}

	async singIn(req: Request, dto: SigninUserDto) {
		const user = dto.email ?
			await this.userService.findByEmail(dto.email) :
			await this.userService.findByUsername(dto.username);

		if (!user) {
			throw new NotFoundException('Пользователь не найден. Пожалуйста, проверьте входные данные.')
		}

		const isValidPassword = await verify(user.password, dto.password);
		if (!isValidPassword) {
			throw new UnauthorizedException('Ошибка входа, проверьте входные данные.')
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
