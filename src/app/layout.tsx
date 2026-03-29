import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ScrollProgress } from '@/components/scroll-progress';
import { portfolio } from '@/data/portfolio';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${portfolio.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: portfolio.seo.title,
  description: portfolio.seo.description,
  applicationName: portfolio.name,
  keywords: [
    'Aayush D.C Dangi',
    'AI Engineer',
    'ML Engineer',
    'Flutter Developer',
    'Portfolio',
    'Next.js portfolio'
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: portfolio.seo.title,
    description: portfolio.seo.description,
    url: siteUrl,
    siteName: portfolio.name,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolio.seo.title,
    description: portfolio.seo.description
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ScrollProgress />
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
