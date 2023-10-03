import { prisma } from '@/lib/prisma'

interface NewPropertyUseCaseParams {
  userId: string
}

export async function getPropertiesFromUserIdUseCase({
  userId,
}: NewPropertyUseCaseParams) {
  const properties = await prisma.property.findMany({
    where: {
      userId,
    },
  })

  return properties
}
