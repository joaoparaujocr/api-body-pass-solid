import { FastifyInstance } from 'fastify'
import { register } from '../controllers/users/register'
import { authenticate } from '../controllers/users/authenticate'
import { profile } from '../controllers/users/profile'
import { JWTVerify } from '../middlewares/jwt-verify'
import { refresh } from '../controllers/users/refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  app.get('/me', {
    onRequest: [JWTVerify]
  }, profile)
}