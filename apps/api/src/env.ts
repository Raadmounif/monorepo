import { createEnv, sharedServerEnv } from '@raadmounif/env'
import { z } from 'zod'

export const env = createEnv({
  server: {
    ...sharedServerEnv,
    PORT: z.coerce.number().int().positive().default(4000),
    CORS_ORIGIN: z.string().default('http://localhost:3000'),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
