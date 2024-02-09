import { Prisma } from 'prisma/prisma-client'
import { CheckInsRepository } from '../interfaces/check-ins-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCheckInRepository implements CheckInsRepository {
	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn = await prisma.checkIn.create({
			data
		})

		return checkIn
	}
}