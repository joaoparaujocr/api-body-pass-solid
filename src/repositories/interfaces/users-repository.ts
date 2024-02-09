import { Prisma, User } from 'prisma/prisma-client'


export interface UsersRepository {
	create: (data: Prisma.UserCreateInput) => Promise<User>
	findUserByEmail: (email: string) => Promise<User | null>
	findUserById: (id: string) => Promise<User | null>
}