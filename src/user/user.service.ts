import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'argon2';
import { SignupUserDto, UpdateUserDto } from './dto/user.dto';

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

	async findByEmail(email: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email
			}
		})

		return user;
	}

	async findByUsername(username: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				username
			}
		})

		return user;
	}

	async create({ email, username, password }: SignupUserDto) {
		const user = await this.prisma.user.create({
			data: {
				email,
				username,
				password: await hash(password)
			}
		});

		return user;
	}

	async updateById(id: number, updatedField: UpdateUserDto) {
		const updatedUser = await this.prisma.user.update({
			where: {
				id
			},
			data: {
				...updatedField
			}
		});

		return updatedUser;
	}

	async deleteById(id: number) {
		await this.prisma.user.delete({
			where: {
				id
			}
		})
	}
}
