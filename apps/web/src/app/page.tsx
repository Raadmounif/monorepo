import { Button, Card, CardContent, CardHeader, CardTitle } from '@raadmounif/ui'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Monorepo</h1>
      <p className="mt-2 text-neutral-600">Next.js + NestJS, sharing typed contracts.</p>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Try the example</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-neutral-600">
            The page below fetches users from the NestJS API using the typed client in{' '}
            <code className="rounded bg-neutral-100 px-1 py-0.5">@raadmounif/contracts</code>.
          </p>
          <Link href="/users">
            <Button>Open users</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
