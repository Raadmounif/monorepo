import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(120),
  createdAt: z.string().datetime(),
})

export type User = z.infer<typeof userSchema>

export const createUserInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(120),
})

export type CreateUserInput = z.infer<typeof createUserInputSchema>

export const listUsersResponseSchema = z.object({
  users: z.array(userSchema),
})

export type ListUsersResponse = z.infer<typeof listUsersResponseSchema>
