import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const createdUserSchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	})

	const bodyRequest = createdUserSchema.parse(request.body)

	const registerUserCase = makeRegisterUseCase()

	await registerUserCase.execute(bodyRequest)

	return reply.status(201).send()
}