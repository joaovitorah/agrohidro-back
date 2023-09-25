import { FastifyInstance } from 'fastify'
import { login } from './controller/login-controller'
import { profile } from './controller/profile-controller'
import { register } from './controller/register-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/login', login)
  app.post('/profile', profile)

  app.get('/health', async () => {
    return 'ok'
  })
}
