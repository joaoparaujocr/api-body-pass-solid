import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRespository
let fetchUserCheckInsHistoryUseCase: FetchUserCheckInsHistoryUseCase

describe('Fetch User Checkins History Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRespository()
		fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
	})

	it('should be able to fetch check-ins history', async () => {
		for (let i = 1; i <= 2; i++) {
			await checkInsRepository.create({
				gym_id: `gym-${i}`,
				user_id: 'user-1'
			})
		}

		const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute('user-1', 1)

		expect(checkIns).toHaveLength(2)
		expect(checkIns).toEqual([
			expect.objectContaining({ gym_id: 'gym-1' }),
			expect.objectContaining({ gym_id: 'gym-2' })
		])
	})

	it('should be able to fetch paginated check-ins history', async () => {
		for (let i = 1; i <= 22; i++) {
			await checkInsRepository.create({
				gym_id: `gym-${i}`,
				user_id: 'user-1'
			})
		}

		const { checkIns: checkInsPageOne } = await fetchUserCheckInsHistoryUseCase.execute('user-1', 1)
		const { checkIns: checkInsPageTwo } = await fetchUserCheckInsHistoryUseCase.execute('user-1', 2)

		expect(checkInsPageOne).toHaveLength(20)
		expect(checkInsPageTwo).toHaveLength(2)
	})
})