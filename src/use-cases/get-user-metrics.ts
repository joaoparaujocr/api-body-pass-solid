import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository'

export class GetUserMetricsUseCase {
	constructor(private checkInsRepository: CheckInsRepository) { }
	
	async execute(userId: string) {
		const count = await this.checkInsRepository.countUserId(userId)

		return { count }
	}
}