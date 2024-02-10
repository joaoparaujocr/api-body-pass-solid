import { Gym, Prisma } from 'prisma/prisma-client'
import { GymsRepository } from '../interfaces/gyms-repository'
import { randomUUID } from 'node:crypto'

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
			description: date.description,
			latitude: date.latitude,
			longitude: date.longitude,
			phone: date.phone,
			title: date.title
		} as Gym

		this.gyms.push(gym)

		return gym
	}
}