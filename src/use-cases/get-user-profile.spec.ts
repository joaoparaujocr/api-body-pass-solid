import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { hash } from 'bcryptjs'
import { AppError } from '@/error/appError'
import { UsersRepository } from '@/repositories/interfaces/users-repository'

let usersRepository: UsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('GetUserProfile Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
	})

	it('should be possible to get the users profile created', async () => {
		const userCreated = await usersRepository.create({ name: 'John Doe', email: 'johndoe@test.com', password_hash: await hash('123456', 6) })
		const { user } = await getUserProfileUseCase.execute({ id: userCreated.id })

		expect(user.email).toBe('johndoe@test.com')
	})

	it('should not be possible to get a profile from a user with an missing id', async () => {
		await usersRepository.create({ name: 'John Doe', email: 'johndoe@test.com', password_hash: await hash('123456', 6) })

		await expect(() => getUserProfileUseCase.execute({ id: 'id-not-found' })).rejects.toBeInstanceOf(AppError)
	})
})