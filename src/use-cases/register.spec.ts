import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { AppError } from '@/error/appError'

let usersRepository: InMemoryUsersRepository
let registerUserCase: RegisterUserCase

describe('Resgister Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		registerUserCase = new RegisterUserCase(usersRepository)
	})
	it('should be possible to register the user', async () => {
		const { user } = await registerUserCase.execute({ email: 'johndoe@test.com', name: 'John Doe', password: '123456' })

		expect(user.id).toEqual(expect.any(String))
	})

	it('should be possible to have the password hash', async () => {
		const { user } = await registerUserCase.execute({ email: 'johndoe@test.com', name: 'John Doe', password: '123456' })
		const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

		expect(isPasswordCorrectlyHashed).toBeTruthy()
	})

	it('should not be possible to register a user with a similar email', async () => {
		await registerUserCase.execute({ email: 'johndoe@test.com', name: 'John Doe', password: '123456' })
		
		await expect(() => registerUserCase.execute({ email: 'johndoe@test.com', name: 'John Doe', password: '123456' })).rejects.toBeInstanceOf(AppError)
	})
})