import env from '@/env'
import { PrismaClient } from 'prisma/prisma-client'

export const prisma = new PrismaClient({
	log: env.ENVIRONMENT === 'develop' ? ['query', 'error'] : ['error']
})