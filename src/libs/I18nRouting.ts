import { defineRouting } from 'next-intl/routing';
import { AppConfig } from '@/utils/AppConfig';

export const routing = defineRouting({
  locales: AppConfig.i18n.locales,
  localePrefix: AppConfig.i18n.localePrefix,
  defaultLocale: AppConfig.i18n.defaultLocale,
  // The locale is always in the URL, so no cookie is needed; setting one would make every
  // page response uncacheable at the edge (Workers Cache skips responses with Set-Cookie)
  localeCookie: false,
});
