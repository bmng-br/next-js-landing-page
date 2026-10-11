import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/Helpers';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Private area, its sign-in page (in every locale) and the form endpoint
      disallow: ['/dashboard', '/*/dashboard', '/sign-in', '/*/sign-in', '/api/'],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
