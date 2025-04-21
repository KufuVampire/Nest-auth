import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNumber, IsString } from "class-validator"

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