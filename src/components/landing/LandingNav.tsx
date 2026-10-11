import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import logo from '@/public/assets/images/boomerang-logo-light.png';
import { ButtonLink } from './ButtonLink';
import { Container } from './Container';
import { LanguageMenu } from './LanguageMenu';
import { MobileMenu } from './MobileMenu';
import { SectionIds } from './SectionIds';

export const LandingNav = async () => {
  const t = await getTranslations('LandingNav');
  const locale = await getLocale();

  // Each language is named in its own language, so every visitor can recognize theirs
  const languages = [
    { locale: 'pt-BR', code: 'PT', name: t('locale_pt_name') },
    { locale: 'en', code: 'EN', name: t('locale_en_name') },
    { locale: 'es', code: 'ES', name: t('locale_es_name') },
  ] as const;

  const links = [
    { href: `#${SectionIds.problem}`, label: t('problem_link') },
    { href: `#${SectionIds.moments}`, label: t('moments_link') },
    { href: `#${SectionIds.journey}`, label: t('journey_link') },
  ];

  return (
    <div className="dark sticky top-0 z-40 border-b border-graphite-850 bg-graphite-950/90 text-paper backdrop-blur-md">
      <Container>
        <nav
          aria-label={t('main_navigation_label')}
          className="relative flex h-nav items-center justify-between gap-6"
        >
          <a
            href={`#${SectionIds.top}`}
            aria-label={t('home_label')}
            className="flex min-h-11 items-center"
          >
            <Image
              src={logo}
              alt={t('logo_alt')}
              className="block h-auto w-[150px] sm:w-[180px]"
              preload
            />
          </a>

          <ul className="m-0 hidden list-none items-center gap-9 p-0 text-sm font-semibold min-[961px]:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-graphite-200 no-underline hover:text-paper">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-3">
            <LanguageMenu
              label={t('language_menu_label')}
              currentLocale={locale}
              languages={languages}
            />
            <div className="hidden sm:block">
              <ButtonLink href={`#${SectionIds.contact}`} variant="ghost" size="sm">
                {t('contact_button')}
              </ButtonLink>
            </div>
            <MobileMenu
              links={[...links, { href: `#${SectionIds.contact}`, label: t('contact_button') }]}
            />
          </div>
        </nav>
      </Container>
    </div>
  );
};
