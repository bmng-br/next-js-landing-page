import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactMomentProvider } from '@/components/landing/ContactMomentContext';
import { ContactSection } from '@/components/landing/ContactSection';
import { DnaSection } from '@/components/landing/DnaSection';
import { FrontsSection } from '@/components/landing/FrontsSection';
import { HeroSection } from '@/components/landing/HeroSection';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { LandingNav } from '@/components/landing/LandingNav';
import { MomentsSection } from '@/components/landing/MomentsSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { StructuredData } from '@/components/landing/StructuredData';
import { AppConfig } from '@/utils/AppConfig';
import { getBaseUrl, getLanguageAlternates, getLocalizedUrl } from '@/utils/Helpers';

// The landing page has no per-visitor content: cache it at the edge (Workers Cache) for a day.
// The cache is keyed by Worker version, so every deploy serves fresh content immediately.
export const revalidate = 86_400;

type IndexPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IndexPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'IndexPage',
  });

  const title = t('meta_title');
  const description = t('meta_description');
  const url = getLocalizedUrl(locale);
  const image = {
    url: `/og/${locale}.png`,
    width: 1200,
    height: 630,
    alt: t('og_image_alt'),
  };

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(),
    },
    openGraph: {
      type: 'website',
      url,
      siteName: AppConfig.name,
      title,
      description,
      locale: t('og_locale'),
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function IndexPage(props: IndexPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <StructuredData locale={locale} />
      <LandingNav />
      <HeroSection />
      <main>
        <ContactMomentProvider>
          <ProblemSection />
          <FrontsSection />
          <MomentsSection />
          <ServicesSection />
          <DnaSection />
          <ContactSection />
        </ContactMomentProvider>
      </main>
      <LandingFooter />
    </>
  );
}
