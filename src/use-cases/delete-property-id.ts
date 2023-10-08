import { prisma } from '@/lib/prisma'

export async function deletePropertyByIdUseCase({ id }: { id: string }) {
  const response = await prisma.property.delete({
    where: {
      id,
    },
  })

  if (!response) {
    return null
  }

  return response
}
