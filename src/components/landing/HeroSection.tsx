import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import monogram from '@/public/assets/images/bmng-monogram.png';
import { BoomerangJourney } from './BoomerangJourney';
import { ButtonLink } from './ButtonLink';
import { Container } from './Container';
import { SectionIds } from './SectionIds';

const MARQUEE_KEYS = [
  'marquee_item_1',
  'marquee_item_2',
  'marquee_item_3',
  'marquee_item_4',
  'marquee_item_5',
  'marquee_item_6',
  'marquee_item_7',
  'marquee_item_8',
] as const;

const MarqueeGroup = (props: { items: string[] }) => (
  <ul className="m-0 flex list-none items-center gap-7 p-0 pr-7">
    {props.items.map((item) => (
      <li key={item} className="flex items-center gap-7">
        {item}
        <span className="size-1.5 bg-aqua" />
      </li>
    ))}
  </ul>
);

export const HeroSection = async (props: { nav: React.ReactNode }) => {
  const t = await getTranslations('Hero');
  const marqueeItems = MARQUEE_KEYS.map((key) => t(key));

  return (
    <header className="dark relative overflow-hidden bg-graphite-950 text-paper">
      <Image
        src={monogram}
        alt=""
        className="pointer-events-none absolute -top-40 -left-[220px] h-[1240px] w-auto max-w-none"
      />

      <Container className="relative">
        {props.nav}

        <BoomerangJourney>
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-3 text-xs leading-4 font-bold tracking-[0.14em] text-aqua uppercase">
              <span className="h-0.5 w-7 bg-aqua" />
              {t('eyebrow')}
            </div>
            <h1 className="m-0 text-[clamp(46px,6.6vw,96px)] leading-[0.98] font-bold tracking-[-0.045em]">
              {t.rich('title', {
                dot: (chunks) => <span className="text-pink">{chunks}</span>,
              })}
            </h1>
            <p className="m-0 max-w-[560px] text-[19px] leading-[30px] text-graphite-200">
              {t('description')}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3.5">
              <ButtonLink href={`#${SectionIds.contact}`} variant="primary" size="lg">
                {t('primary_cta')}
              </ButtonLink>
              <a
                href={`#${SectionIds.problem}`}
                className="text-base font-semibold text-paper underline hover:text-aqua"
              >
                {t('secondary_cta')}
              </a>
            </div>
          </div>
        </BoomerangJourney>
      </Container>

      <div
        aria-hidden="true"
        className="relative overflow-hidden border-t border-graphite-850 py-4"
      >
        <div className="flex w-max animate-marquee text-[15px] leading-[22px] font-semibold whitespace-nowrap text-graphite-400">
          <MarqueeGroup items={marqueeItems} />
          <MarqueeGroup items={marqueeItems} />
        </div>
      </div>
    </header>
  );
};
