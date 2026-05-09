import { BadRequestException, type PipeTransform } from '@nestjs/common'
import { ZodError, type ZodSchema } from 'zod'

export class ZodValidationPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodSchema<T>) {}

  transform(value: unknown): T {
    try {
      return this.schema.parse(value)
    } catch (err) {
      if (err instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          issues: err.issues,
        })
      }
      throw err
    }
  }
}
