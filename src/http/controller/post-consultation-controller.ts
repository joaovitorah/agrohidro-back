import { FastifyReply, FastifyRequest } from 'fastify'

import { postConsultationRequestUseCase } from '@/use-cases/post-consultation-request'
import { z } from 'zod'

const consultationRequestSchema = z.object({
  fullName: z.string(),
  telephone: z.string(),
  email: z.string().email(),
  propertyName: z.string(),
  typeOfConsultancy: z.string(),
  userId: z.string().uuid(),
})

export async function postConsultationRequest(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const consultationData = consultationRequestSchema.parse(request.body)

  try {
    const consultationRequest =
      await postConsultationRequestUseCase(consultationData)

    return reply.status(201).send({
      message: 'Solicitação de consulta criada com sucesso.',
      consultationRequest,
    })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao criar solicitação de consulta.',
    })
  }
}
