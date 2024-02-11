import { GymsRepository } from '@/repositories/interfaces/gyms-repository'
import { Coordinates } from '@/utils/get-distance-between-coordinates'

export class SearchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) { }
  async execute(params: Coordinates) {
    const gyms = await this.gymsRepository.findGymsNearby(params)

    return { gyms }
  }

}