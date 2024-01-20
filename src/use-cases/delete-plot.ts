import { prisma } from '@/lib/prisma'

export async function deletePlotUseCase({ plotId }: { plotId: string }) {
  const plot = await prisma.plot.findUnique({
    where: { id: plotId },
  })

  if (!plot) {
    return false
  }

  await prisma.plot.delete({
    where: { id: plotId },
  })

  return true
}
