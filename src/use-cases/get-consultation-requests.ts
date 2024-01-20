import { prisma } from '@/lib/prisma'

export async function getConsultationRequestsUseCase() {
  const consultationRequests = await prisma.consultationRequest.findMany()

  return consultationRequests
}
