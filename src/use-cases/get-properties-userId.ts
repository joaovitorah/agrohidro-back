import { prisma } from '@/lib/prisma'

export async function getPropertiesFromUserIdUseCase({
  userId,
}: {
  userId: string
}) {
  const response = await prisma.property.findMany({
    where: {
      userId,
    },
  })

  if (!response) {
    return null
  }

  return response
}
