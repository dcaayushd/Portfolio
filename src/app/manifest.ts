import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aayush D C Dangi — Portfolio',
    short_name: 'Aayush Dangi',
    description: 'AI/ML engineer, Python backend developer, and Flutter developer portfolio.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f1ea',
    theme_color: '#1e1b1a',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  };
}
