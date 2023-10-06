import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '@/lib/prisma'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const user = await prisma.user.findUnique({
    where: {
      id: request.user.sub,
    },
  })

  if (!user) {
    return reply.status(404).send({
      message: 'Usuário não encontrado',
    })
  }

  return reply.status(200).send({
    ...user,
    passwordHash: undefined,
  })
}
