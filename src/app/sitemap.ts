import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseDate = new Date('2026-02-10');
  const onboardingRoutes: MetadataRoute.Sitemap = [
    {
      url: 'https://openclaw.mx/onboarding/self-hosted',
      lastModified: baseDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://openclaw.mx/onboarding/managed-admin',
      lastModified: baseDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://openclaw.mx/onboarding/managed-vps',
      lastModified: baseDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const blogPosts = getAllPosts();
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `https://openclaw.mx/blog/${post.slug}`,
    lastModified: baseDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: 'https://openclaw.mx',
      lastModified: baseDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://openclaw.mx/blog',
      lastModified: baseDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...onboardingRoutes,
    ...blogRoutes,
  ]
}
