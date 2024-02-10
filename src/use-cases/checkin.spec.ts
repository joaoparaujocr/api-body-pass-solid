import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsUseCase } from './checkin'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Gym } from 'prisma/prisma-client'
import { AppError } from '@/error/appError'

let checkInsRepository: InMemoryCheckInsRespository
let gymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInsUseCase
let gymCreate: Gym

describe('Checkin Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRespository()
		gymsRepository = new InMemoryGymsRepository()
		checkInUseCase = new CheckInsUseCase(checkInsRepository, gymsRepository)

		gymCreate = await gymsRepository.create({
			latitude: -3.100634,
			longitude: -60.0653841,
			title: 'Javascript academy',
		})

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be possible to create a checkin', async () => {
		const { checkIn } = await checkInUseCase.execute({ gymId: gymCreate.id, userId: 'id-1', userLatitude: -3.100634, userLongitude: -60.0653841 })

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be possible to check in twice on the same day', async () => {
		vi.setSystemTime(new Date(2020, 0, 20, 8, 0))

		await checkInUseCase.execute({ gymId: gymCreate.id, userId: 'id-1', userLatitude: -3.100634, userLongitude: -60.0653841 })

		await expect(() => checkInUseCase.execute({ gymId: gymCreate.id, userId: 'id-1', userLatitude: -3.100634, userLongitude: -60.0653841 })).rejects.toBeInstanceOf(AppError)
	})

	it('should be possible to check in on different days', async () => {
		vi.setSystemTime(new Date(2020, 0, 20, 8, 0))

		await checkInUseCase.execute({ gymId: gymCreate.id, userId: 'id-1', userLatitude: -3.100634, userLongitude: -60.0653841 })

		vi.setSystemTime(new Date(2020, 0, 21, 8, 0))

		const { checkIn } = await checkInUseCase.execute({ gymId: gymCreate.id, userId: 'id-1', userLatitude: -3.100634, userLongitude: -60.0653841 })

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('It should not be possible to check in from a certain distance', async () => {
		const gymCreate2 = await gymsRepository.create({
			title: 'Gym 2',
			latitude: -27.0747279,
			longitude: -49.4889672
		})

		await expect(() => checkInUseCase.execute({
			gymId: gymCreate2.id,
			userId: 'id-1',
			userLatitude: -3.1007608,
			userLongitude: -60.0654824,
		})).rejects.toBeInstanceOf(AppError)
	})
})