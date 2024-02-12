import { AppError } from "@/error/appError";
import { CheckInsRepository } from "@/repositories/interfaces/check-ins-repository";
import dayjs from "dayjs";

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) { }

  async execute(checkInId: string) {
    const checkIn = await this.checkInsRepository.findCheckInById(checkInId)

    if (!checkIn) {
      throw new AppError(404, "Check in not found")
    }

    checkIn.validated_at = new Date()

    const intervalInMinutesAfterCreationDate = dayjs(checkIn.validated_at).diff(checkIn.created_at, "minutes")

    if (intervalInMinutesAfterCreationDate > 20) {
      throw new AppError(400, "The checkin creation date and validation date exceeded the 20 minute interval")
    }

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}