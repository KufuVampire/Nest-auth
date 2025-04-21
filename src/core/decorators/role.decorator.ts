import { UserRole } from "@/prisma/generated";
import { SetMetadata } from "@nestjs/common";

export const ROLE_KEY = 'role';

export const Role = (role: UserRole ) => SetMetadata(ROLE_KEY, role)