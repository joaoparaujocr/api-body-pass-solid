import { makeSearchNearbyGymsUseCase } from "@/use-cases/factories/make-search-nearby-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(number => {
      return Math.abs(number) <= 90
    }),
    longitude: z.coerce.number().refine(number => {
      return Math.abs(number) <= 180
    }),
  })

  const query = nearbyGymsQuerySchema.parse(request.query)

  const searchNearbyGymsUseCase = makeSearchNearbyGymsUseCase()

  const { gyms } = await searchNearbyGymsUseCase.execute(query)

  return reply.send({ gyms })
}