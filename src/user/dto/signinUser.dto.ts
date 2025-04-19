import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class SigninUserDto {
	@IsOptional()
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