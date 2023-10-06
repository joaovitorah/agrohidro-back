import { FastifyReply, FastifyRequest } from 'fastify'

import { getPropertiesFromUserIdUseCase } from '@/use-cases/get-properties-userId'

export async function getPropertiesListFromUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  try {
    const properties = await getPropertiesFromUserIdUseCase({
      userId: request.user.sub,
    })

    return reply.status(200).send({
      properties,
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(401).send({
        message: error.message,
      })
    }
  }

  return reply.status(500).send({
    message: 'Internal Server Error',
  })
}
