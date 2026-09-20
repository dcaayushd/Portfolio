import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { portfolio } from '@/data/portfolio';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${portfolio.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: portfolio.seo.title,
    template: '%s | Aayush D. C. Dangi'
  },
  description: portfolio.seo.description,
  applicationName: portfolio.name,
  authors: [{ name: 'Aayush D. C. Dangi', url: siteUrl }],
  creator: 'Aayush D. C. Dangi',
  publisher: 'Aayush D. C. Dangi',
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  formatDetection: { email: false, address: false, telephone: false },
  keywords: [
    'Aayush D. C. Dangi',
    'AI/ML Engineer',
    'Python Backend Developer',
    'Flutter Developer',
    'Computer Vision Engineer',
    'RAG Developer',
    'FastAPI Developer',
    'Django REST Framework',
    'AI Product Engineer',
    'Kathmandu, Nepal'
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: portfolio.seo.title,
    description: portfolio.seo.description,
    url: siteUrl,
    siteName: portfolio.name,
    type: 'website',
    locale: 'en_NP',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Aayush D. C. Dangi — AI/ML Engineer, Python Backend Developer, and Flutter Developer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolio.seo.title,
    description: portfolio.seo.description,
    images: ['/opengraph-image']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  other: {
    'geo.region': 'NP-3',
    'geo.placename': 'Kathmandu'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const saved = localStorage.getItem('theme-mode');
                  const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                  const theme = saved === 'light' || saved === 'dark' ? saved : system;
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.style.colorScheme = theme;
                } catch {
                  document.documentElement.dataset.theme = 'dark';
                  document.documentElement.style.colorScheme = 'dark';
                }
              })();
            `
          }}
        />
        {children}
      </body>
    </html>
  );
}
