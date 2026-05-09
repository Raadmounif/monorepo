import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@raadmounif/ui', '@raadmounif/contracts', '@raadmounif/env'],
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
