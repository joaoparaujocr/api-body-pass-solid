import { GymsRepository } from '@/repositories/interfaces/gyms-repository'
import { Gym } from 'prisma/prisma-client'

interface CreateGymUseCaseRequest {
	title: string
	description?: string | null
	phone?: string | null
	latitude: number
	longitude: number
}

interface CreateGymUseCaseResponse {
	gym: Gym
}

export class CreateGymUseCase {
	constructor(private gymRepository: GymsRepository) { }

	async execute(data: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
		const gym = await this.gymRepository.create(data)

		return { gym }
	}
}