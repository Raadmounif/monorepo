import { type CreateUserInput, listUsersResponseSchema, userSchema } from './users.js'

export interface ApiClientOptions {
  baseUrl: string
  fetch?: typeof fetch
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export function createApiClient(options: ApiClientOptions) {
  const fetchImpl = options.fetch ?? fetch
  const base = options.baseUrl.replace(/\/+$/, '')

  async function request(path: string, init?: RequestInit) {
    const res = await fetchImpl(`${base}${path}`, {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...init?.headers,
      },
    })

    if (!res.ok) {
      let body: unknown
      try {
        body = await res.json()
      } catch {
        body = await res.text().catch(() => undefined)
      }
      throw new ApiError(`Request failed: ${res.status}`, res.status, body)
    }

    return res.json()
  }

  return {
    users: {
      list: async () => {
        const data = await request('/users')
        return listUsersResponseSchema.parse(data)
      },
      create: async (input: CreateUserInput) => {
        const data = await request('/users', {
          method: 'POST',
          body: JSON.stringify(input),
        })
        return userSchema.parse(data)
      },
    },
  }
}

export type ApiClient = ReturnType<typeof createApiClient>
