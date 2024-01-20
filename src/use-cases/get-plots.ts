import { prisma } from '@/lib/prisma'

export async function getPlotsUseCase({ propertyId }: { propertyId: string }) {
  const plots = await prisma.plot.findMany({
    where: {
      propertyId,
    },
  })

  return plots
}
