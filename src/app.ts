import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { handleError } from './error/handleError'

export const app = fastify()

app.setErrorHandler(handleError)

app.register(appRoutes)