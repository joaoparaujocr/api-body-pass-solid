import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'
import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: CheckInsRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRespository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be possible to search for user checkin metrics', async () => {
    for (let i = 1; i <= 5; i++) {
      await checkInsRepository.create({
        user_id: 'user-01',
        gym_id: `gym-${i}`
      })
    }

    const { count } = await getUserMetricsUseCase.execute('user-01')

    expect(count).toBe(5)
  })
})