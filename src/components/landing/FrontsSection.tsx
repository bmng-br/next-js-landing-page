import { getTranslations } from 'next-intl/server';
import { Container } from './Container';
import { FrontsAccordion } from './FrontsAccordion';
import { SectionIds } from './SectionIds';
import { SectionIntro } from './SectionIntro';

export const FrontsSection = async () => {
  const t = await getTranslations('FrontsSection');

  return (
    <section id={SectionIds.fronts} className="scroll-mt-4 pb-32">
      <Container className="flex flex-col gap-12">
        <SectionIntro eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
        <FrontsAccordion />
      </Container>
    </section>
  );
};
