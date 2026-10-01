import { getTranslations } from 'next-intl/server';
import { Container } from './Container';
import { ScenarioComparison } from './ScenarioComparison';
import { SectionIds } from './SectionIds';
import { SectionIntro } from './SectionIntro';

export const ProblemSection = async () => {
  const t = await getTranslations('ProblemSection');

  return (
    <section id={SectionIds.problem} className="py-section">
      <Container className="flex flex-col gap-section-gap">
        <SectionIntro eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
        <ScenarioComparison />
      </Container>
    </section>
  );
};
