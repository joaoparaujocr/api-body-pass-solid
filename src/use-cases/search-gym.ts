import { GymsRepository } from '@/repositories/interfaces/gyms-repository'

export class SearchGymsUseCase {
	constructor(private gymsRepository: GymsRepository) { }

	async execute(query: string, page: number = 1) {
		const gyms = await this.gymsRepository.searchGymsByQuery(query, page)

		return { gyms }
	}
}