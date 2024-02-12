import { Prisma, CheckIn } from 'prisma/prisma-client'


export interface CheckInsRepository {
	create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
	findUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>
	findManyUserId: (userId: string, page: number) => Promise<CheckIn[]>
	countUserId: (userId: string) => Promise<number>
	findCheckInById: (checkInId: string) => Promise<CheckIn | null>
	save: (checkIn: CheckIn) => Promise<CheckIn | null>
}