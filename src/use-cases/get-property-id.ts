import { prisma } from '@/lib/prisma'

export async function getPropertyByIdUseCase({ id }: { id: string }) {
  const response = await prisma.property.findUnique({
    where: {
      id,
    },
  })

  if (!response) {
    return null
  }

  return response
}
