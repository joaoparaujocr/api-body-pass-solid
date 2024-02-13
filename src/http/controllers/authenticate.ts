import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
	const authenticateUserSchema = z.object({
		email: z.string().email(),
		password: z.string().min(6)
	})

	const bodyRequest = authenticateUserSchema.parse(request.body)

	const authenticateUserCase = makeAuthenticateUseCase()

	const { user } = await authenticateUserCase.execute(bodyRequest)

	const token = await reply.jwtSign({}, {
		sign: {
			sub: user.id
		}
	})

	return reply.status(200).send({
		token
	})
}