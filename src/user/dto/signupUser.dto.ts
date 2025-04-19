import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class SignupUserDto {
	@IsString({ message: 'Email должен быть строкой' })
	@IsEmail({}, { message: 'Некорретный формат email' })
	@IsNotEmpty({ message: 'Email обязателен к заполнению' })
	@ApiProperty({
		example: 'shark@test.ru',
		required: true
	})
	email: string

	@IsOptional()
	@MinLength(4, { message: 'Имя пользователя должно быть как минимум 4 символа' })
	@ApiProperty({
		example: 'shark',
		required: false,
	})
	username: string

	@IsString({ message: 'Пароль должен быть строкой' })
	@IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
	@MinLength(8, { message: 'Пароль должен состоять как минимум из 8 символов' })
	@ApiProperty({
		example: '12345678',
		required: true,
	})
	password: string
}