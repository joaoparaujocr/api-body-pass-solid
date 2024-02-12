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
	constructor(private gymsRepository: GymsRepository) { }

	async execute(data: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
		const gym = await this.gymsRepository.create(data)

		return { gym }
	}
}