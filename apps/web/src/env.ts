import { createEnv } from '@raadmounif/env'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:4000/api'),
  },
  clientPrefix: 'NEXT_PUBLIC_',
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true,
})
