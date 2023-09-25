import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface LoginUseCaseParams {
  email: string
  password: string
}

export async function loginUseCase({ email, password }: LoginUseCaseParams) {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!userExists) {
    throw new Error('Usuário não cadastrado')
  }

  const passwordMatch = await hash(password, userExists.passwordHash)

  if (!passwordMatch) {
    throw new Error('Senha incorreta')
  }

  return {
    user: userExists,
    email,
    password,
  }
}
