import { FastifyReply, FastifyRequest } from 'fastify'

import { getFieldsDataUseCase } from '@/use-cases/get-fields-data'
import { z } from 'zod'

export async function getFieldsData(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fieldsDataSchema = z.object({
    propertyId: z.string().uuid(),
  })

  const fieldsDataParams = fieldsDataSchema.parse(request.params)

  try {
    const fieldsData = await getFieldsDataUseCase({
      propertyId: fieldsDataParams.propertyId,
    })

    if (!fieldsData) {
      return reply.status(404).send({
        message: 'Dados dos campos não encontrados para esta propriedade.',
      })
    }

    return reply.status(200).send({
      fieldsData,
    })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao buscar dados dos campos.',
    })
  }
}
