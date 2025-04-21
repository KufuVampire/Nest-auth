import { User } from "@/prisma/generated";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserField = createParamDecorator(
	(data: keyof User, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		return data ? user[data] : user;
	}
)