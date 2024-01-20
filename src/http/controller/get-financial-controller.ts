import { FastifyReply, FastifyRequest } from 'fastify'

import { getFinancialDataUseCase } from '@/use-cases/get-financial-data'
import { z } from 'zod'

export async function getFinancialData(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const financialDataSchema = z.object({
    propertyId: z.string().uuid(),
  })

  const financialDataParams = financialDataSchema.parse(request.params)

  try {
    const financialData = await getFinancialDataUseCase({
      propertyId: financialDataParams.propertyId,
    })

    if (!financialData) {
      return reply.status(404).send({
        message: 'Dados financeiros não encontrados para esta propriedade.',
      })
    }

    return reply.status(200).send({
      financialData,
    })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao buscar dados financeiros.',
    })
  }
}
