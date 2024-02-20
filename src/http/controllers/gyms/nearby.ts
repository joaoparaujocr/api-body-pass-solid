import { makeSearchNearbyGymsUseCase } from "@/use-cases/factories/make-search-nearby-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine(number => {
      return Math.abs(number) <= 90
    }),
    longitude: z.number().refine(number => {
      return Math.abs(number) <= 180
    }),
  })

  const query = nearbyGymsQuerySchema.parse(request.body)

  const searchNearbyGymsUseCase = makeSearchNearbyGymsUseCase()

  const { gyms } = await searchNearbyGymsUseCase.execute(query)

  return reply.send({ gyms })
}