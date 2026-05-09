import { describe, expect, it } from 'vitest'

import { UsersService } from './users.service'

describe('UsersService', () => {
  it('creates and lists users', () => {
    const svc = new UsersService()
    const before = svc.list().length

    const created = svc.create({ email: 'a@b.com', name: 'Test' })

    expect(created.email).toBe('a@b.com')
    expect(svc.list().length).toBe(before + 1)
  })
})
