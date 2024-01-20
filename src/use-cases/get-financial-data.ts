import { prisma } from '@/lib/prisma'

export async function getFinancialDataUseCase({
  propertyId,
}: {
  propertyId: string
}) {
  const financialData = await prisma.financialData.findMany({
    where: {
      propertyId,
    },
  })

  return financialData
}
