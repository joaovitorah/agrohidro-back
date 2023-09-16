import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

export const app = fastify()
export const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Gerson',
    phone: '11999999999',
    email: 'gersonrocha9@gmail.com',
    password: '123456',
    zipcode: '12345678',
    street: 'Rua 1',
    number: '123',
    complement: 'Casa',
    city: 'São Paulo',
    uf: 'SP',
    identifyProfile: 'PRODUCER',
    mainAgriculturalActivity: 'CROPS',
    hectaresCultivationArea: 100,
    haveInternetDailyAccess: true,
  },
})
