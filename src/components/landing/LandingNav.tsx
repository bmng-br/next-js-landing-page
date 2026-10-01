import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/libs/I18nNavigation';
import { routing } from '@/libs/I18nRouting';
import logo from '@/public/assets/images/boomerang-logo-light.png';
import { ButtonLink } from './ButtonLink';
import { MobileMenu } from './MobileMenu';
import { SectionIds } from './SectionIds';

export const LandingNav = async () => {
  const t = await getTranslations('LandingNav');
  const locale = await getLocale();
  const otherLocale = routing.locales.find((elt) => elt !== locale) ?? routing.defaultLocale;

  const links = [
    { href: `#${SectionIds.problem}`, label: t('problem_link') },
    { href: `#${SectionIds.fronts}`, label: t('fronts_link') },
    { href: `#${SectionIds.moments}`, label: t('moments_link') },
    { href: `#${SectionIds.services}`, label: t('services_link') },
  ];

  return (
    <nav
      aria-label={t('main_navigation_label')}
      className="relative flex items-center justify-between gap-6 py-[26px]"
    >
      <a href={`#${SectionIds.top}`} aria-label={t('home_label')} className="flex items-center">
        <Image
          src={logo}
          alt={t('logo_alt')}
          className="block h-auto w-[160px] sm:w-[200px]"
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

      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          locale={otherLocale}
          aria-label={t('locale_link_label')}
          className="text-sm font-bold text-graphite-200 no-underline hover:text-paper"
        >
          {t('locale_link')}
        </Link>
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
  );
};
