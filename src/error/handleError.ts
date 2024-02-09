import { FastifyRequest, FastifyReply, FastifyError } from 'fastify'
import { AppError } from './appError'
import env from '@/env'
import { ZodError } from 'zod'

export async function handleError(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
	if (error instanceof AppError) {
		return reply.status(error.statusCode).send(error)
	}

	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error',
			issues: error.format()
		})
	}

	if (env.ENVIRONMENT !== 'production') {
		console.error(error)
	}

	return reply.status(500).send({
		message: 'Internal server error'
	})
}