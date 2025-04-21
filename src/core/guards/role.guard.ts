import { UserRole } from "@/prisma/generated";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLE_KEY } from "../decorators/role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const role = this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
			context.getHandler(),
			context.getClass()
		]);
		const request = context.switchToHttp().getRequest();

		if (!role) return true;
		
		if (!role.includes(request.user.role)) {
			throw new ForbiddenException('Недостаточно прав. У вас нет доступа к этому ресурсу.')
		}

		return true;
	}
}