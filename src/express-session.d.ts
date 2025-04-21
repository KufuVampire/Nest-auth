import { User } from '@/prisma/generated'
import 'express-session'

declare module 'express-session' {
	interface SessionData {
		userId?: string
	}
}