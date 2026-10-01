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

type IndexPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IndexPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'IndexPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function IndexPage(props: IndexPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection nav={<LandingNav />} />
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
