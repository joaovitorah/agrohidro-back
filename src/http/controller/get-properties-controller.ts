import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '@/lib/prisma'

export async function getPropertiesListFromUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const properties = await prisma.property.findMany({
    where: {
      userId: request.user.sub,
    },
  })

  if (!properties) {
    return reply.status(404).send({
      message: 'Não há propriedades cadastradas para este usuário.',
    })
  }

  return reply.status(200).send({
    properties,
  })
}
