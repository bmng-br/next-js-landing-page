import { getTranslations } from 'next-intl/server';
import { AppConfig } from '@/utils/AppConfig';
import { getBaseUrl, getLocalizedUrl } from '@/utils/Helpers';

const STAGE_KEYS = ['diagnosis', 'design', 'processes', 'implementation', 'delivery'] as const;

/**
 * Describes the business to search engines (schema.org JSON-LD) for rich results.
 * @param props The component props.
 * @param props.locale The page locale.
 * @returns A JSON-LD script tag.
 */
export const StructuredData = async (props: { locale: string }) => {
  const t = await getTranslations({ locale: props.locale, namespace: 'IndexPage' });
  const tJourney = await getTranslations({ locale: props.locale, namespace: 'JourneySection' });
  const baseUrl = getBaseUrl();
  const organizationId = `${baseUrl}/#organization`;

  const organization = {
    '@type': 'ProfessionalService',
    '@id': organizationId,
    name: AppConfig.name,
    legalName: AppConfig.company.legalName,
    url: getLocalizedUrl(props.locale),
    logo: `${baseUrl}/assets/images/bmng-logo-512.png`,
    image: `${baseUrl}/og/${props.locale}.png`,
    description: t('meta_description'),
    email: AppConfig.contact.email,
    telephone: AppConfig.contact.phones[0].tel,
    areaServed: { '@type': 'Country', name: 'Brazil' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: AppConfig.company.address.locality,
      addressRegion: AppConfig.company.address.region,
      addressCountry: AppConfig.company.address.country,
    },
    taxID: AppConfig.company.cnpj,
    sameAs: [AppConfig.contact.linkedinUrl],
    contactPoint: AppConfig.contact.phones.map((phone) => ({
      '@type': 'ContactPoint',
      telephone: phone.tel,
      email: AppConfig.contact.email,
      contactType: 'sales',
      areaServed: 'BR',
      availableLanguage: ['Portuguese', 'English'],
    })),
    // The five stages of the journey, from the journey section copy
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: tJourney('title'),
      itemListElement: STAGE_KEYS.map((key) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: tJourney(`stages.${key}.name`),
          description: tJourney(`stages.${key}.do`),
          provider: { '@id': organizationId },
        },
      })),
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: AppConfig.name,
    inLanguage: props.locale,
    publisher: { '@id': organizationId },
  };

  const data = { '@context': 'https://schema.org', '@graph': [organization, website] };

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be inlined; escaping `<` keeps the content from closing the script tag
      // oxlint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll('<', String.raw`<`) }}
    />
  );
};
