import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gym'

let gymsRepository: InMemoryGymsRepository
let searchGymsUseCase: SearchGymsUseCase

describe('Search Gym Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		searchGymsUseCase = new SearchGymsUseCase(gymsRepository)
	})

	it('should be possible to search for gyms using a query', async () => {
		await gymsRepository.create({
			title: 'Javascript academy',
			latitude: -3.100634,
			longitude: -60.0653841,
		})
		await gymsRepository.create({
			title: 'Typescript academy',
			latitude: -3.100634,
			longitude: -60.0653841,
		})

		const { gyms } = await searchGymsUseCase.execute('Javascript')

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Javascript academy', })
		])
	})

	it('should be able possible for the return to be paged', async () => {
		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `gym-${i}`,
				latitude: -3.100634,
				longitude: -60.0653841,
			})
		}

		const { gyms } = await searchGymsUseCase.execute('gym', 2)

		expect(gyms).toHaveLength(2)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'gym-21' }),
			expect.objectContaining({ title: 'gym-22' })
		])
	})
})