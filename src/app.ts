import { appRoutes } from './http/routes'
import cors from '@fastify/cors'
import { env } from './env'
import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()
app.register(cors, {
  origin: '*',
})
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(appRoutes)
