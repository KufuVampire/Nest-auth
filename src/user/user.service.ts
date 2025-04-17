import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'argon2';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) { }

	async findById(id: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			}
		})

		if (!user) throw new NotFoundException('Пользователь не найден. Убедитесь что используете верные данные')

		return user;
	}

	async findByUsername(username: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				username
			}
		});

		return user
	}

	async create({ username, password }: UserDto) {
		const user = await this.prisma.user.create({
			data: {
				username,
				password: await hash(password)
			}
		});

		return user;
	}
}
