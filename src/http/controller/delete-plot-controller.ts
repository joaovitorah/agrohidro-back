import { FastifyReply, FastifyRequest } from 'fastify'

import { deletePlotUseCase } from '@/use-cases/delete-plot'
import { z } from 'zod'

const plotIdSchema = z.object({
  plotId: z.string().uuid(),
})

export async function deletePlot(request: FastifyRequest, reply: FastifyReply) {
  const { plotId } = plotIdSchema.parse(request.params)

  try {
    const deleted = await deletePlotUseCase({ plotId })

    if (!deleted) {
      return reply.status(404).send({
        message: 'Lote não encontrado ou já foi excluído.',
      })
    }

    return reply.status(200).send({
      message: 'Lote excluído com sucesso.',
    })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao excluir lote.',
    })
  }
}
