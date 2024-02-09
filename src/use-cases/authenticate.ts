import { AppError } from '@/error/appError'
import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
	email: string
	password: string
}

export class AuthenticateUseCase {
	constructor(private usersRepository: UsersRepository) { }

	async execute({ email, password }: AuthenticateUseCaseRequest) {
		const user = await this.usersRepository.findUserByEmail(email)

		if (!user) {
			throw new AppError(401, 'Invalid credentials')
		}

		const doesPasswordMatch = await compare(password, user.password_hash)

		if (!doesPasswordMatch) {
			throw new AppError(401, 'Invalid credentials')
		}

		return {
			user
		}
	}
}