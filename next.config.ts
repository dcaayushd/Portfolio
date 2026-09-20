import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  outputFileTracingRoot: process.cwd(),
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;
