import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { handleError } from './error/handleError'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from "@fastify/cookie"
import env from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
  sign: {
    expiresIn: "20m"
  },
  cookie: {
    signed: false,
    cookieName: 'refreshToken'
  }
})

app.register(fastifyCookie)

app.setErrorHandler(handleError)

app.register(appRoutes)