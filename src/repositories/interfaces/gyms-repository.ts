import { Coordinates } from '@/utils/get-distance-between-coordinates'
import { Gym, Prisma } from 'prisma/prisma-client'

export interface GymsRepository {
	findGymById: (gymId: string) => Promise<Gym | null>
	create: (data: Prisma.GymCreateInput) => Promise<Gym>
	searchGymsByQuery: (query: string, page: number) => Promise<Gym[]>
	findGymsNearby: (params: Coordinates) => Promise<Gym[]>
}