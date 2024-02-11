import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { SearchNearbyGymsUseCase } from './search-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let searchNearbyGymsUseCase: SearchNearbyGymsUseCase

describe('Search Nearby Gyms Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		searchNearbyGymsUseCase = new SearchNearbyGymsUseCase(gymsRepository)
	})

	it("should be possible to search for nearby gyms", async () => {
		await gymsRepository.create({
			title: "Nearby gym",
			latitude: -3.105164,
			longitude: -60.033812
		})

		await gymsRepository.create({
			title: "Gym far away",
			latitude: -2.9968359,
			longitude: -59.9840799
		})

		const { gyms } = await searchNearbyGymsUseCase.execute({ latitude: -3.106364, longitude: -60.033548 })

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([
			expect.objectContaining({ title: "Nearby gym" })
		])
	})
})