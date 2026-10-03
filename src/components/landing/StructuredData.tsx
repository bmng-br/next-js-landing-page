import { getTranslations } from 'next-intl/server';
import { AppConfig } from '@/utils/AppConfig';
import { getBaseUrl, getLocalizedUrl } from '@/utils/Helpers';

/**
 * Describes the business to search engines (schema.org JSON-LD) for rich results.
 * @param props The component props.
 * @param props.locale The page locale.
 * @returns A JSON-LD script tag.
 */
export const StructuredData = async (props: { locale: string }) => {
  const t = await getTranslations({ locale: props.locale, namespace: 'IndexPage' });
  const baseUrl = getBaseUrl();

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: AppConfig.name,
    legalName: AppConfig.company.legalName,
    url: getLocalizedUrl(props.locale),
    logo: `${baseUrl}/assets/images/bmng-logo-512.png`,
    image: `${baseUrl}/og/${props.locale}.png`,
    description: t('meta_description'),
    email: AppConfig.contact.email,
    areaServed: { '@type': 'Country', name: 'Brazil' },
    contactPoint: AppConfig.contact.phones.map((phone) => ({
      '@type': 'ContactPoint',
      telephone: phone.tel,
      email: AppConfig.contact.email,
      contactType: 'sales',
      areaServed: 'BR',
      availableLanguage: ['Portuguese', 'English'],
    })),
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be inlined; escaping `<` keeps the content from closing the script tag
      // oxlint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll('<', String.raw`<`) }}
    />
  );
};
