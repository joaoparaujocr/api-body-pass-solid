import { CheckIn, Prisma } from 'prisma/prisma-client'
import { CheckInsRepository } from '../interfaces/check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

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

	async findUserIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date')
		const endOfTheDay = dayjs(date).endOf('date')

		const checkInOnSameDate = this.checkIns.find(checkIn => {
			const checkInDate = dayjs(checkIn.created_at)
			const isSameOnDate = checkInDate.isBefore(endOfTheDay) && checkInDate.isAfter(startOfTheDay)

			return userId === checkIn.user_id && isSameOnDate
		})

		if (!checkInOnSameDate) {
			return null
		}

		return checkInOnSameDate
	}
}