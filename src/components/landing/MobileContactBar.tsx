import { getTranslations } from 'next-intl/server';
import { ButtonLink } from './ButtonLink';
import { SectionIds } from './SectionIds';

// Phone-only contact bar: sticks to the viewport bottom while the sections above it are on screen.
export const MobileContactBar = async () => {
  const t = await getTranslations('LandingNav');

  return (
    <div className="dark sticky bottom-0 z-30 border-t border-graphite-850 bg-graphite-950/90 p-3 backdrop-blur-md sm:hidden">
      <ButtonLink href={`#${SectionIds.contact}`} variant="primary" size="sm" className="w-full">
        {t('contact_button')}
      </ButtonLink>
    </div>
  );
};
