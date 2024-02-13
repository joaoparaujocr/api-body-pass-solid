import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { handleError } from './error/handleError'
import fastifyJwt from '@fastify/jwt'
import env from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.SECRET_KEY
})

app.setErrorHandler(handleError)

app.register(appRoutes)