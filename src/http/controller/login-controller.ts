import { FastifyReply, FastifyRequest } from 'fastify'

import { loginUseCase } from '@/use-cases/login'
import { z } from 'zod'

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const loginData = loginBodySchema.parse(request.body)

  try {
    const { user } = await loginUseCase(loginData)

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({
      token,
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(401).send({
        message: error.message,
      })
    }
  }
}
