import { CheckIn, Prisma } from 'prisma/prisma-client'
import { CheckInsRepository } from '../interfaces/check-ins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRespository implements CheckInsRepository {
	checkIns: CheckIn[] = []

	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkInCreated: CheckIn = {
			id: randomUUID(),
			gym_id: data.gym_id,
			user_id: data.user_id,
			validated_at: data.validated_at ? new Date(data.validated_at) : null,
			created_at: new Date(),
		}

		this.checkIns.push(checkInCreated)

		return checkInCreated
	}
}