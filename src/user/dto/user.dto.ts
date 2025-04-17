import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class UserDto {
	@IsString({message: 'Имя пользователя должно быть строкой'})
	@IsNotEmpty({message: 'Имя пользователя обязательно для заполнения'})
	@Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/, {
		message: 'Имя пользователя должно состоять только из латинских букв и цифр'
	})
	@ApiProperty({
		example: 'shark',
		required: true,
	})
	username: string
	
	@IsString({ message: 'Пароль должен быть строкой' })
	@IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
	@MinLength(8, {
		message: 'Пароль должен состоять как минимум из 8 символов'
	})
	@ApiProperty({
		example: '12345678',
		required: true,
	})
	password: string
}