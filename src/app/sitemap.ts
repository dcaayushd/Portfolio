import { MetadataRoute } from 'next';
import { caseStudies } from '@/data/case-studies';
import { portfolio } from '@/data/portfolio';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${portfolio.domain}`;
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${baseUrl}/projects`,
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ];

  return [
    ...pages,
    ...caseStudies.map((study) => ({
      url: `${baseUrl}/projects/${study.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }))
  ];
}
