import type { MetadataRoute } from 'next';
import { routing } from '@/libs/I18nRouting';
import { getLanguageAlternates, getLocalizedUrl } from '@/utils/Helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [''];

  // One entry per page and locale, each listing every language version (hreflang)
  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: getLocalizedUrl(locale, route),
      lastModified: new Date(),
      alternates: {
        languages: getLanguageAlternates(route),
      },
    })),
  );
}
