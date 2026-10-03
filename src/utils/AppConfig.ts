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
  contact: {
    email: 'contato@bmng.com.br',
    phones: [
      { region: 'sp', display: '+55 31 93624-5393', tel: '+5531936245393' },
      { region: 'mg', display: '+55 31 93618-3916', tel: '+5531936183916' },
    ] as const,
    linkedinUrl: 'https://www.linkedin.com/company/boomerangsolucoes',
  },
  // Alerts for new contact form leads, sent through the Worker's EMAIL binding
  leadNotifications: {
    from: 'site@avisos.bmng.com.br',
    to: 'contato@bmng.com.br',
  },
  company: {
    legalName: 'Boomerang Soluções em Tecnologia LTDA',
    cnpj: '46.994.388/0001-94',
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
