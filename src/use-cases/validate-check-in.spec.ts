import { InMemoryCheckInsRespository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { describe, beforeEach, it, expect, vi } from "vitest"
import { ValidateCheckInUseCase } from "./validate-check-in"
import { AppError } from "@/error/appError"
import { afterEach } from "node:test"

let checkInsRepository: InMemoryCheckInsRespository
let validateCheckInUseCase: ValidateCheckInUseCase

describe("Validate Checkin Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRespository()
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able possible to validate check in", async () => {
    const { id } = await checkInsRepository.create({
      gym_id: "gym-1",
      user_id: "user-1"
    })


    const { checkIn } = await validateCheckInUseCase.execute(id)

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it("should not be possible to validate a non-existent check in", async () => {
    await expect(() => validateCheckInUseCase.execute('non-existent')).rejects.toBeInstanceOf(AppError)
  })

  it("should not be possible to check in after twenty minutes of its creation", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 0))

    const { id } = await checkInsRepository.create({
      gym_id: "gym-1",
      user_id: "user-1"
    })

    vi.advanceTimersByTime(1000 * 60 * 21)

    await expect(() => validateCheckInUseCase.execute(id)).rejects.toBeInstanceOf(AppError)
  })
})