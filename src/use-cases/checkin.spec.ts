import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsUseCase } from './checkin'

let checkInsRepository: InMemoryCheckInsRespository
let checkInUseCase: CheckInsUseCase

describe('Resgister Use Case', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRespository()
		checkInUseCase = new CheckInsUseCase(checkInsRepository)

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be possible to create a checkin', async () => {
		const { checkIn } = await checkInUseCase.execute({ gymId: 'id-1', userId: 'id-1' })

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be possible to check in twice on the same day', async () => {
		vi.setSystemTime(new Date(2020, 0, 20, 8, 0))

		await checkInUseCase.execute({ gymId: 'id-1', userId: 'id-1' })

		await expect(() => checkInUseCase.execute({ gymId: 'id-1', userId: 'id-1' })).rejects.toBeInstanceOf(Error)
	})

	it('should be possible to check in on different days', async () => {
		vi.setSystemTime(new Date(2020, 0, 20, 8, 0))

		await checkInUseCase.execute({ gymId: 'id-1', userId: 'id-1' })

		vi.setSystemTime(new Date(2020, 0, 21, 8, 0))

		const { checkIn } = await checkInUseCase.execute({ gymId: 'id-1', userId: 'id-1' })

		expect(checkIn.id).toEqual(expect.any(String))
	})
})