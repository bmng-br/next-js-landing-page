import { getTranslations } from 'next-intl/server';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';
import { RotatingWord } from './RotatingWord';
import { SectionIds } from './SectionIds';

export const DnaSection = async () => {
  const t = await getTranslations('DnaSection');
  const pillars = [
    { title: t('engineering_title'), body: t('engineering_body') },
    { title: t('it_title'), body: t('it_body') },
    { title: t('management_title'), body: t('management_body') },
  ];

  return (
    <section
      id={SectionIds.dna}
      className="dark scroll-mt-4 bg-graphite-950 pt-32 pb-24 text-paper"
    >
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <Eyebrow className="text-aqua">{t('eyebrow')}</Eyebrow>
          <h2
            aria-label={t('title_label')}
            className="m-0 text-[clamp(40px,6vw,88px)] leading-[1.02] font-bold tracking-[-0.045em]"
          >
            {t.rich('title', {
              br: () => <br />,
              word: () => <RotatingWord />,
            })}
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-10 gap-y-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col gap-2.5 border-t border-graphite-800 pt-6"
            >
              <div className="text-xl leading-7 font-bold">{pillar.title}</div>
              <div className="text-base leading-[25px] text-graphite-300">{pillar.body}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
