import { type CreateUserInput, createUserInputSchema } from '@raadmounif/contracts'
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'

import { ZodValidationPipe } from '../common/zod-validation.pipe'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  list() {
    return { users: this.users.list() }
  }

  @Post()
  @HttpCode(201)
  create(
    @Body(new ZodValidationPipe(createUserInputSchema))
    input: CreateUserInput,
  ) {
    return this.users.create(input)
  }
}
