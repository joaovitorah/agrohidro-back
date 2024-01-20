import { FastifyReply, FastifyRequest } from 'fastify'

import { getPropertyByIdUseCase } from '@/use-cases/get-property-id'
import { z } from 'zod'

export async function getPropertyById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const propertyByIdSchema = z.object({
    id: z.string().uuid(),
  })

  const propertyByIdData = propertyByIdSchema.parse(request.params)

  try {
    const property = await getPropertyByIdUseCase({
      id: propertyByIdData.id,
    })

    if (!property) {
      return reply.status(404).send({
        message: 'Não há propriedades cadastradas para este usuário.',
      })
    }

    return reply.status(200).send({
      property,
    })
  } catch (error) {
    console.log(error)
    return reply.status(500).send({
      message: 'Erro ao buscar propriedade.',
    })
  }
}
