import { CheckInsUseCase } from '../checkin'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckinUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInsUseCase(checkInsRepository, gymsRepository)

  return useCase
}