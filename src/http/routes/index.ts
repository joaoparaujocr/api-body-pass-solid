import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users'
import { gymsRoutes } from './gyms'

export async function appRoutes(app: FastifyInstance) {
	app.register(usersRoutes)
	app.register(gymsRoutes)
}