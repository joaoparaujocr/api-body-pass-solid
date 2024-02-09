import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsUseCase } from './checkin'

let checkInsRepository: InMemoryCheckInsRespository
let checkInUseCase: CheckInsUseCase

describe('Resgister Use Case', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRespository()
		checkInUseCase = new CheckInsUseCase(checkInsRepository)
	})
	it('should be possible to create a checkin', async () => {
		const { checkIn } = await checkInUseCase.execute({ gymId: 'id-1', userId: 'id-1' })

		expect(checkIn.id).toEqual(expect.any(String))
	})
})