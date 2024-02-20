import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { query, page } = searchGymsQuerySchema.parse(req.query)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute(query, page)

  return reply.send({
    gyms
  })
}