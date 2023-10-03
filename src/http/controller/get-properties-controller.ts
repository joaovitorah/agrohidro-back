import { FastifyReply, FastifyRequest } from 'fastify'

import { getPropertiesFromUserIdUseCase } from '@/use-cases/get-properties-userId'
import { z } from 'zod'

export async function getPropertiesListFromUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getProperties = z.object({
    id: z.string(),
  })

  const { id } = getProperties.parse(request.params)

  try {
    const properties = await getPropertiesFromUserIdUseCase({ userId: id })

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
