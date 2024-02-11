import { Gym, Prisma } from 'prisma/prisma-client'
import { GymsRepository } from '../interfaces/gyms-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryGymsRepository implements GymsRepository {
	gyms: Gym[] = []

	async findGymById(gymId: string) {
		const gym = this.gyms.find(gym => gym.id === gymId)

		if (!gym) {
			return null
		}

		return gym
	}

	async create(date: Prisma.GymCreateInput) {
		const gym = {
			id: randomUUID(),
			description: date.description ?? null,
			latitude: new Decimal(date.latitude.toString()),
			longitude: new Decimal(date.longitude.toString()),
			phone: date.phone ?? null,
			title: date.title
		}

		this.gyms.push(gym)

		return gym
	}

	async searchGymsByQuery(query: string, page: number) {
		return this.gyms.filter(gym => gym.title.includes(query)).slice((page - 1) * 20, 20 * page)
	}
}