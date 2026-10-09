import { getTranslations } from 'next-intl/server';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';
import { RotatingWord } from './RotatingWord';
import { SectionIds } from './SectionIds';

export const DnaSection = async () => {
  const t = await getTranslations('DnaSection');
  const pillars = [
    { title: t('management_title'), body: t('management_body'), items: [] },
    { title: t('processes_title'), body: t('processes_body'), items: [] },
    {
      title: t('technology_title'),
      body: t('technology_body'),
      items: [t('technology_item_1'), t('technology_item_2'), t('technology_item_3')],
    },
  ];

  return (
    <section id={SectionIds.dna} className="dark bg-graphite-950 py-section text-paper">
      <Container className="flex flex-col gap-section-gap">
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
              {pillar.items.length > 0 && (
                <ul className="m-0 mt-2 flex list-none flex-col gap-2.5 p-0">
                  {pillar.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-base leading-6 font-semibold"
                    >
                      <span className="size-[7px] shrink-0 -translate-y-0.5 bg-aqua" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
