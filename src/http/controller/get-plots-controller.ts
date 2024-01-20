import { FastifyReply, FastifyRequest } from 'fastify'

import { getPlotsUseCase } from '@/use-cases/get-plots'
import { z } from 'zod'

export async function getPlots(request: FastifyRequest, reply: FastifyReply) {
  const plotsSchema = z.object({
    propertyId: z.string().uuid(),
  })

  const plotsParams = plotsSchema.parse(request.params)

  try {
    const plots = await getPlotsUseCase({
      propertyId: plotsParams.propertyId,
    })

    if (!plots || plots.length === 0) {
      return reply.status(404).send({
        message: 'Nenhum lote encontrado para esta propriedade.',
      })
    }

    return reply.status(200).send({
      plots,
    })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao buscar lotes.',
    })
  }
}
