import { FastifyReply, FastifyRequest } from 'fastify'

import { updatePlotUseCase } from '@/use-cases/update-plot'
import { z } from 'zod'

const plotUpdateSchema = z.object({
  name: z.string().optional(),
  area: z.number().optional(),
  typeOfCoffee: z.string().optional(),
  typeOfSoil: z.string().optional(),
  numberOfPlants: z.number().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
})

export async function updatePlot(request: FastifyRequest, reply: FastifyReply) {
  const plotIdBySchema = z.object({
    id: z.string().uuid(),
  })

  const plottyByIdData = plotIdBySchema.parse(request.params)

  const plotData = plotUpdateSchema.parse(request.body)

  try {
    const updatedPlot = await updatePlotUseCase(plottyByIdData.id, plotData)

    if (!updatedPlot) {
      return reply.status(404).send({
        message: 'Lote não encontrado ou não atualizado.',
      })
    }

    return reply.status(200).send({
      message: 'Lote atualizado com sucesso.',
      plot: updatedPlot,
    })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao atualizar lote.',
    })
  }
}
