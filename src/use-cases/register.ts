import { AppError } from '@/error/appError'
import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUserCaseRequest {
	name: string
	email: string
	password: string
}

export class RegisterUserCase {
	constructor(private usersRepository: UsersRepository) { }

	async execute({ email, name, password }: RegisterUserCaseRequest) {
		const userWithSameEmail = await this.usersRepository.findUserByEmail(email)

		if (userWithSameEmail) {
			throw new AppError(409, 'Email already exists')
		}

		const password_hash = await hash(password, 6)

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash
		})

		return { user }
	}
}
