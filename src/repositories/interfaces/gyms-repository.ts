import { Gym, Prisma } from 'prisma/prisma-client'

export interface GymsRepository {
	findGymById: (gymId: string) => Promise<Gym | null>
	create: (data: Prisma.GymCreateInput) => Promise<Gym>
}