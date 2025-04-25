import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class SigninUserDto {
	@IsOptional()
	@IsEmail({}, {message: 'Некорректный формат Email'})
	@ApiProperty({
		example: 'email@mail.ru',
		required: false,
	})
	email: string

	@IsOptional()
	@ApiProperty({
		example: 'shark',
		required: false,
	})
	username: string

	@ApiProperty({
		example: '12345678',
		required: true,
	})
	password: string
}

export class SignupUserDto {
	@IsString({ message: 'Email должен быть строкой' })
	@IsEmail({}, { message: 'Некорректный формат email' })
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

export class ProfileUserDto {
	@IsNumber()
	@ApiProperty({
		example: 1
	})
	id: string

	@IsEmail()
	@ApiProperty({
		example: 'test@test.ru'
	})
	email: string

	@IsString()
	@ApiProperty({
		example: 'testuser'
	})
	username: string
}

export class UpdateUserDto {
	@IsString({ message: 'Email должен быть строкой' })
	@IsEmail({}, { message: 'Некорректный формат Email' })
	@IsNotEmpty({ message: 'Email обязателен к заполнению' })
	@IsOptional()
	@ApiProperty({
		example: 'shark@test.ru',
		required: false
	})
	email: string

	@IsOptional()
	@MinLength(4, { message: 'Имя пользователя должно быть как минимум 4 символа' })
	@IsOptional()
	@ApiProperty({
		example: 'shark',
		required: false,
	})
	username: string

	@IsString({ message: 'Пароль должен быть строкой' })
	@IsNotEmpty({ message: 'Пароль обязателен для заполнения если' })
	@MinLength(8, { message: 'Пароль должен состоять как минимум из 8 символов' })
	@IsOptional()
	@ApiProperty({
		example: '12345678',
		required: false,
	})
	password: string
}