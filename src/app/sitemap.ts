import { MetadataRoute } from 'next';
import { bits } from '@/utils/bits';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://parthesh.in';

  const bitUrls = bits.map((bit) => ({
    url: `${baseUrl}/bits/${bit.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bits`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...bitUrls,
  ];
}
