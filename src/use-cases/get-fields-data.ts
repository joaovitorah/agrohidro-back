import { prisma } from '@/lib/prisma'

export async function getFieldsDataUseCase({
  propertyId,
}: {
  propertyId: string
}) {
  const fieldsData = await prisma.field.findMany({
    where: {
      propertyId,
    },
  })

  return fieldsData
}
