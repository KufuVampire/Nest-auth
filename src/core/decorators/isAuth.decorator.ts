import { UserRole } from "@/prisma/generated";
import { applyDecorators, UseGuards } from "@nestjs/common";
import { RoleGuard } from "../guards/role.guard";
import { Role } from "./role.decorator";
import { AuthGuard } from "../guards/auth.guard";

export function IsAuth(role?: UserRole) {
	if (role) {
		return applyDecorators(Role(role), UseGuards(AuthGuard, RoleGuard))
	}

	return applyDecorators(UseGuards(AuthGuard));
}