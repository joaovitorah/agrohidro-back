import { prisma } from '@/lib/prisma'

interface NewPropertyUseCaseParams {
  userId: string
}

export async function getPropertiesFromUserIdUseCase({
  userId,
}: NewPropertyUseCaseParams) {
  const response = await prisma.user.findMany({
    where: {
      id: userId,
    },
    select: {
      properties: true,
    },
  })

  if (!response) {
    return null
  }

  return response[0].properties
}
