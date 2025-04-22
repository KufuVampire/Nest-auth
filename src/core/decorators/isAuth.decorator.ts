import { UserRole } from "@/prisma/generated";
import { applyDecorators, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guards/auth.guard";

export function IsAuth(...roles: UserRole[]) {
	if ( roles.length > 0) {
		return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard))
	}

	return applyDecorators(UseGuards(AuthGuard));
}