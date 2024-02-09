import { Prisma, User } from 'prisma/prisma-client'
import { UsersRepository } from '../interfaces/users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
	users: User[] = []

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date()
		} as User

		this.users.push(user)

		return user
	}

	async findUserByEmail(email: string) {
		const user = this.users.find(user => user.email === email)

		if (!user) {
			return null
		}

		return user
	}

	async findUserById(id: string) {
		const user = this.users.find(user => user.id === id)

		if (!user) {
			return null
		}

		return user
	}
}