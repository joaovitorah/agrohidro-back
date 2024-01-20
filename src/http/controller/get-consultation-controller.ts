import { FastifyReply, FastifyRequest } from 'fastify'

import { getConsultationRequestsUseCase } from '@/use-cases/get-consultation-requests'

export async function getConsultationRequests(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const consultationRequests = await getConsultationRequestsUseCase()

    return reply.status(200).send({
      consultationRequests,
    })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao buscar solicitações de consulta.',
    })
  }
}
