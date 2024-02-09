import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository'

interface CheckInUseCaseRequest {
	userId: string
	gymId: string
}


export class CheckInsUseCase {
	constructor(private checkInsRepository: CheckInsRepository) { }

	async execute({ gymId, userId }: CheckInUseCaseRequest) {
		const checkIn = await this.checkInsRepository.create({
			gym_id: gymId,
			user_id: userId
		})

		return { checkIn }
	}
}