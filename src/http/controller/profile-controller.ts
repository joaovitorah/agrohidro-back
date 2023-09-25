import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '@/lib/prisma'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const user = await prisma.user.findUnique({
    where: {
      id: request.user.sub,
    },
  })

  return reply.status(200).send({
    ...user,
    passwordHash: undefined,
  })
}
