import { prisma } from '@/lib/prisma'

interface NewPropertyUseCaseParams {
  data: {
    name: string
    nickname: string
    description: string
    carNumber: string
    address: string
    uf: string
    cep: string
    imageUrl: string
    userId: string
  }
}

export async function registerNewPropertyUseCase({
  data,
}: NewPropertyUseCaseParams) {
  await prisma.property.create({
    data: {
      name: data.name,
      nickname: data.nickname,
      description: data.description,
      carNumber: data.carNumber,
      address: data.address,
      uf: data.uf,
      cep: data.cep,
      imageUrl: data.imageUrl,
      userId: data.userId,
    },
  })
}
