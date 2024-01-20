import { prisma } from '@/lib/prisma'

export async function postConsultationRequestUseCase(consultationData: {
  fullName: string
  telephone: string
  email: string
  propertyName: string
  typeOfConsultancy: string
  userId: string
}) {
  const consultationRequest = await prisma.consultationRequest.create({
    data: consultationData,
  })

  return consultationRequest
}
