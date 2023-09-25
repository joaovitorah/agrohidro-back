import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().default('secret'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('🚨 Variáveis de ambiente inválidas', _env.error.format())

  throw new Error('Variáveis de ambiente inválidas')
}

export const env = _env.data
