import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface RegisterUseCaseParams {
  data: {
    name: string
    phone: string
    email: string
    password: string
    zipcode: string
    street: string
    number: string
    complement: string
    city: string
    uf: string
    identifyProfile: string
    mainAgriculturalActivity: string
    hectaresCultivationArea: string
    haveInternetDailyAccess: string
  }
}

export async function registerUseCase({ data }: RegisterUseCaseParams) {
  const passwordHash = await hash(data.password, 8)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Usuário já cadastrado com esse email')
  }

  await prisma.user.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      passwordHash,
      zipcode: data.zipcode,
      street: data.street,
      number: data.number,
      complement: data.complement,
      city: data.city,
      uf: data.uf,
      identifyProfile: data.identifyProfile,
      mainAgriculturalActivity: data.mainAgriculturalActivity,
      hectaresCultivationArea: data.hectaresCultivationArea,
      haveInternetDailyAccess: data.haveInternetDailyAccess,
    },
  })
}
