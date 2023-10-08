import { FastifyReply, FastifyRequest } from 'fastify'

import { deletePropertyByIdUseCase } from '@/use-cases/delete-property-id'
import { z } from 'zod'

export async function deletePropertyById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const propertyByIdSchema = z.object({
    id: z.string().uuid(),
  })

  const propertyByIdData = propertyByIdSchema.parse(request.params)

  try {
    await deletePropertyByIdUseCase({
      id: propertyByIdData.id,
    })

    return reply.status(200).send({
      message: 'Propriedade deletada com sucesso.',
    })
  } catch (error) {
    console.log(error)
    return reply.status(500).send({
      message: 'Erro ao buscar propriedade.',
    })
  }
}
