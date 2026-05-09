import { Card, CardContent, CardHeader, CardTitle } from '@raadmounif/ui'

import { api } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function UsersPage() {
  const { users } = await api.users.list()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
      <p className="mt-1 text-sm text-neutral-600">Fetched from the NestJS API at request time.</p>

      <div className="mt-8 grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600">{user.email}</p>
              <p className="mt-1 text-xs text-neutral-400">
                joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
