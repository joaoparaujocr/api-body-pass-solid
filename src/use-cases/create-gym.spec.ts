import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase


describe('Create Gym Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		createGymUseCase = new CreateGymUseCase(gymsRepository)
	})

	it('should be possible to create a user', async () => {
		const { gym } = await createGymUseCase.execute({
			latitude: -3.100634,
			longitude: -60.0653841,
			title: 'Javascript academy',
		})

		expect(gym.id).toEqual(expect.any(String))
	})
})