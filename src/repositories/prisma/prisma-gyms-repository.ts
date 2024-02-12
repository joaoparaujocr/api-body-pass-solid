import { Coordinates } from "@/utils/get-distance-between-coordinates";
import { Gym, Prisma } from "prisma/prisma-client";
import { GymsRepository } from "../interfaces/gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data
    })

    return gym
  }

  async findGymById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId
      }
    })

    return gym
  }

  async searchGymsByQuery(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query
        }
      }
    })

    return gyms
  }

  async findGymsNearby({ latitude, longitude }: Coordinates) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}