import { randomUUID } from 'node:crypto'

import { type CreateUserInput, type User } from '@raadmounif/contracts'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: randomUUID(),
      email: 'ada@example.com',
      name: 'Ada Lovelace',
      createdAt: new Date().toISOString(),
    },
  ]

  list(): User[] {
    return this.users
  }

  create(input: CreateUserInput): User {
    const user: User = {
      id: randomUUID(),
      email: input.email,
      name: input.name,
      createdAt: new Date().toISOString(),
    }
    this.users.push(user)
    return user
  }
}
