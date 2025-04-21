import { UserService } from "@/src/user/user.service";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly userService: UserService) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const userId: string = request.session.userId;

		if (typeof userId === 'undefined') {
			throw new UnauthorizedException('Пользователь не авторизован. Пожалуйста, войдите в систему, чтобы получить доступ')
		}

		const user = await this.userService.findById(parseInt(userId));
		request.user = user;

		return true;
	}
}