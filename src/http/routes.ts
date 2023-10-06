import { FastifyInstance } from 'fastify'
import { getPropertiesListFromUserId } from './controller/get-properties-controller'
import { login } from './controller/login-controller'
import { newProperty } from './controller/new-property-controller'
import { profile } from './controller/profile-controller'
import { register } from './controller/register-controller'

export async function appRoutes(app: FastifyInstance) {
  app.get('/health', async () => {
    return 'ok'
  })

  app.post('/register', register)
  app.post('/login', login)
  app.get('/profile', profile)

  app.post('/properties', newProperty)
  app.get('/properties', getPropertiesListFromUserId)
}
