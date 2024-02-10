import { AppError } from '@/error/appError'
import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository'
import { GymsRepository } from '@/repositories/interfaces/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

interface CheckInUseCaseRequest {
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
}

export class CheckInsUseCase {
	constructor(private checkInsRepository: CheckInsRepository, private gymsRepository: GymsRepository) { }

	async execute({ gymId, userId, userLatitude, userLongitude }: CheckInUseCaseRequest) {
		const gym = await this.gymsRepository.findGymById(gymId)

		if (!gym) {
			throw new AppError(404, 'Gym not found')
		}

		const distance = getDistanceBetweenCoordinates({ latitude: userLatitude, longitude: userLongitude }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() })
		const MAX_SIZE = 0.1
		
		if (distance > MAX_SIZE) {
			throw new AppError(400, 'Distance between the user and the gym is greater than permitted')
		}

		const checkInOnSameDate = await this.checkInsRepository.findUserIdOnDate(userId, new Date())

		if (checkInOnSameDate) {
			throw new AppError(409, 'There is already a check-in at a gym for that date')
		}

		const checkIn = await this.checkInsRepository.create({
			gym_id: gymId,
			user_id: userId
		})

		return { checkIn }
	}
}