import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { env } from './env'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: env.NODE_ENV !== 'production' }),
  )

  app.enableCors({
    origin: env.CORS_ORIGIN.split(',').map((s: string) => s.trim()),
    credentials: true,
  })

  app.setGlobalPrefix('api')

  await app.listen({ port: env.PORT, host: '0.0.0.0' })

  console.log(`api listening on http://localhost:${env.PORT}/api`)
}

bootstrap().catch((err) => {
  console.error('failed to start', err)
  process.exit(1)
})
