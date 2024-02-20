import { makeCheckinUseCase } from "@/use-cases/factories/make-checkin-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(number => {
      return Math.abs(number) <= 90
    }),
    longitude: z.number().refine(number => {
      return Math.abs(number) <= 180
    })
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const checkinUseCase = makeCheckinUseCase()

  await checkinUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  })

  return reply.status(201).send()
}