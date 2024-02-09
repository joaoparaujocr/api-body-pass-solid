import { AppError } from '@/error/appError'
import { UsersRepository } from '@/repositories/interfaces/users-repository'

interface GetUserProfileUseCaseRequest {
	id: string
}

export class GetUserProfileUseCase {
	constructor(private usersRepository: UsersRepository) { }

	async execute({ id }: GetUserProfileUseCaseRequest) {
		const user = await this.usersRepository.findUserById(id)

		if (!user) {
			throw new AppError(404, 'User not found')
		}

		return {
			user
		}
	}
}