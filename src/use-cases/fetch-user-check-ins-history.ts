import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository'

export class FetchUserCheckInsHistoryUseCase {
	constructor(private checkInRepository: CheckInsRepository) { }

	async execute(userId: string, page: number) {
		const checkIns = await this.checkInRepository.findManyUserId(userId, page)

		return { checkIns }
	}
}