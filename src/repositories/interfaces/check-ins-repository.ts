import { Prisma, CheckIn } from 'prisma/prisma-client'


export interface CheckInsRepository {
	create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
}