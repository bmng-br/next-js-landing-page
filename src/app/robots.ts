import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/Helpers';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Private area and its sign-in page, in every locale
      disallow: ['/dashboard', '/*/dashboard', '/sign-in', '/*/sign-in'],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
