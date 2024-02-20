import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(number => {
      return Math.abs(number) <= 90
    }),
    longitude: z.number().refine(number => {
      return Math.abs(number) <= 180
    }),
  })

  const data = createGymBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute(data)

  return reply.status(201).send()
}