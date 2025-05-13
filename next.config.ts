import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ['cdn.sanity.io'],
  },
}

export default nextConfig
