import { FastifyReply, FastifyRequest } from 'fastify'

import { addPlotUseCase } from '@/use-cases/add-plot'
import { z } from 'zod'

const plotSchema = z.object({
  name: z.string(),
  area: z.number(),
  typeOfCoffee: z.string(),
  typeOfSoil: z.string(),
  numberOfPlants: z.number(),
  description: z.string().optional(),
  status: z.string(),
  propertyId: z.string().uuid(),
})

export async function addPlot(request: FastifyRequest, reply: FastifyReply) {
  const plotData = plotSchema.parse(request.body)

  try {
    const newPlot = await addPlotUseCase(plotData)

    return reply.status(201).send({
      message: 'Lote adicionado com sucesso.',
      plot: newPlot,
    })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao adicionar lote.',
    })
  }
}
