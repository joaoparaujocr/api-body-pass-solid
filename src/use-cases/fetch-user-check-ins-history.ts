import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository'

export class FetchUserCheckInsHistoryUseCase {
	constructor(private checkInsRepository: CheckInsRepository) { }

	async execute(userId: string, page: number = 1) {
		const checkIns = await this.checkInsRepository.findManyUserId(userId, page)

		return { checkIns }
	}
}