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

    if (!properties) {
      return reply.status(404).send({
        message: 'Não há propriedades cadastradas para este usuário.',
      })
    }

    return reply.status(200).send({
      properties,
    })
  } catch (error) {
    console.log(error)
    return reply.status(500).send({
      message: 'Erro ao buscar propriedades.',
    })
  }
}
