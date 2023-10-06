import { FastifyReply, FastifyRequest } from 'fastify'

import { registerNewPropertyUseCase } from '@/use-cases/register-new-property'
import { z } from 'zod'

export async function newProperty(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const registerNewProperty = z.object({
    name: z.string(),
    nickname: z.string(),
    description: z.string(),
    carNumber: z.string(),
    address: z.string(),
    uf: z.string(),
    cep: z.string(),
    imageUrl: z.string(),
  })

  const registerData = registerNewProperty.parse(request.body)

  try {
    await registerNewPropertyUseCase({
      data: registerData,
      userId: request.user.sub,
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(401).send({
        message: error.message,
      })
    }
  }

  return reply.status(201).send()
}
