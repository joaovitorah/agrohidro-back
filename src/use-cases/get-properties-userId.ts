import { prisma } from '@/lib/prisma'

interface NewPropertyUseCaseParams {
  userId: string
}

export async function getPropertiesFromUserIdUseCase({
  userId,
}: NewPropertyUseCaseParams) {
  const properties = await prisma.properties.findMany({
    where: {
      userId,
    },
  })

  return properties
}
