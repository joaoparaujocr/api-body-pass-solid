import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users'
import { gymsRoutes } from './gyms'
import { checkInsRoutes } from './checkins'

export async function appRoutes(app: FastifyInstance) {
	app.register(usersRoutes)
	app.register(gymsRoutes, {
		prefix: "gyms"
	})
	app.register(checkInsRoutes)
}