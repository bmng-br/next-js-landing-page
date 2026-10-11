import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './I18nRouting';

// The message files live in `src/locales`, one per language, and are edited in the repository.
// `pt-BR` is the source: `npm run check:i18n` fails when another language misses a key.

export default getRequestConfig(async (params) => {
  // Prefer an explicitly passed locale (e.g. `getTranslations({ locale })` in metadata): awaiting
  // `requestLocale` may read request headers, which makes the page uncacheable at the edge.
  // Otherwise it typically corresponds to the `[locale]` segment.
  const requested = params.locale ?? (await params.requestLocale);
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    // oxlint-disable-next-line unicorn/no-await-expression-member
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
