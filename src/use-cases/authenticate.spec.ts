import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { AppError } from '@/error/appError'
import { UsersRepository } from '@/repositories/interfaces/users-repository'

let usersRepository: UsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		authenticateUseCase = new AuthenticateUseCase(usersRepository)
	})

	it('should be possible to authenticate the user', async () => {
		await usersRepository.create({ name: 'John Doe', email: 'johndoe@test.com', password_hash: await hash('123456', 6) })

		const { user } = await authenticateUseCase.execute({ email: 'johndoe@test.com', password: '123456' })

		expect(user.id).toEqual(expect.any(String))
	})

	it('should throw an error if the email is wrong', async () => {
		await expect(() => authenticateUseCase.execute({ email: 'johndoe@test.com', password: '123456' })).rejects.toBeInstanceOf(AppError)
	})

	it('should throw an error if the password is wrong', async () => {
		usersRepository.create({ name: 'John Doe', email: 'johndoe@test.com', password_hash: await hash('123456', 6) })

		await expect(() => authenticateUseCase.execute({ email: 'johndoe@test.com', password: '1234567' })).rejects.toBeInstanceOf(AppError)
	})

})