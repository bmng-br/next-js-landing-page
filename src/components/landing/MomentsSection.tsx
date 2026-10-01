import { getTranslations } from 'next-intl/server';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';
import { MomentPicker } from './MomentPicker';
import { SectionIds } from './SectionIds';

export const MomentsSection = async () => {
  const t = await getTranslations('MomentsSection');

  return (
    <section id={SectionIds.moments} className="scroll-mt-4 bg-mist-100 py-32">
      <Container className="flex flex-col gap-14">
        <div className="flex max-w-[820px] flex-col gap-5">
          <Eyebrow className="text-graphite-700">{t('eyebrow')}</Eyebrow>
          <h2 className="m-0 text-[clamp(36px,4.6vw,64px)] leading-[1.02] font-bold tracking-[-0.04em]">
            {t('title')}
          </h2>
          <p className="m-0 text-lg leading-[29px] text-graphite-700">{t('description')}</p>
        </div>
        <MomentPicker />
      </Container>
    </section>
  );
};
