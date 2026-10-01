import { getTranslations } from 'next-intl/server';
import { Container } from './Container';
import { MomentPicker } from './MomentPicker';
import { SectionIds } from './SectionIds';
import { SectionIntro } from './SectionIntro';

export const MomentsSection = async () => {
  const t = await getTranslations('MomentsSection');

  return (
    <section id={SectionIds.moments} className="bg-mist-100 py-section">
      <Container className="flex flex-col gap-section-gap">
        <SectionIntro
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          eyebrowClassName="text-graphite-700"
        />
        <MomentPicker />
      </Container>
    </section>
  );
};
