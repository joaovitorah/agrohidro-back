import { FastifyReply, FastifyRequest } from 'fastify'

import { registerUseCase } from '@/use-cases/register'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    zipcode: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    city: z.string(),
    uf: z.string(),
    identifyProfile: z.string(),
    mainAgriculturalActivity: z.string(),
    hectaresCultivationArea: z.string(),
    haveInternetDailyAccess: z.string(),
  })

  const registerData = registerBodySchema.parse(request.body)

  try {
    await registerUseCase({ data: registerData })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(401).send({
        message: error.message,
      })
    }
  }

  return reply.status(201).send()
}
