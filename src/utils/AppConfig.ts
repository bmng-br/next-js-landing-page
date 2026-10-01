import { enUS, ptBR } from '@clerk/localizations';
import type { LocalizationResource } from '@clerk/shared/types';
import type { LocalePrefixMode } from 'next-intl/routing';

/** Locale prefix strategy for next-intl routing. */
const localePrefix: LocalePrefixMode = 'as-needed';

/** Centralized application configuration */
export const AppConfig = {
  name: 'Boomerang Soluções',
  i18n: {
    locales: ['pt-BR', 'en'],
    defaultLocale: 'pt-BR',
    localePrefix,
  },
  // FIXME: Replace the placeholders with the real contact and company details
  contact: {
    email: 'contato@boomerangsolucoes.com.br',
    phone: '[+55 00 00000-0000]',
    linkedinUrl: '#',
  },
  company: {
    legalName: 'Boomerang Soluções em Tecnologia LTDA',
    cnpj: '[00.000.000/0001-00]',
    domain: 'boomerangsolucoes.com.br',
  },
};

const supportedLocales: Record<string, LocalizationResource> = {
  'pt-BR': ptBR,
  en: enUS,
};

export const ClerkLocalizations = {
  defaultLocale: ptBR,
  supportedLocales,
};
