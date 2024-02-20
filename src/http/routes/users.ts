import { FastifyInstance } from 'fastify'
import { register } from '../controllers/users/register'
import { authenticate } from '../controllers/users/authenticate'
import { profile } from '../controllers/users/profile'
import { JWTVerify } from '../middlewares/jwt-verify'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.get('/me', {
    onRequest: [JWTVerify]
  }, profile)
}