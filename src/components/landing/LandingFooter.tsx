import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import logo from '@/public/assets/images/boomerang-logo-light.png';
import { AppConfig } from '@/utils/AppConfig';
import { Container } from './Container';
import { SectionIds } from './SectionIds';

export const LandingFooter = async () => {
  const t = await getTranslations('LandingFooter');
  const tNav = await getTranslations('LandingNav');

  const links = [
    { href: `#${SectionIds.problem}`, label: tNav('problem_link') },
    { href: `#${SectionIds.fronts}`, label: tNav('fronts_link') },
    { href: `#${SectionIds.moments}`, label: tNav('moments_link') },
    { href: `#${SectionIds.services}`, label: tNav('services_link') },
    { href: `#${SectionIds.contact}`, label: t('contact_link') },
    { href: AppConfig.contact.linkedinUrl, label: t('linkedin_link') },
  ];

  return (
    <footer className="dark bg-graphite-950 pb-10 text-graphite-400">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-start justify-between gap-8 border-t border-graphite-850 pt-14">
          <Image src={logo} alt={t('logo_alt')} className="block h-auto w-[220px]" />
          <nav aria-label={t('footer_navigation_label')}>
            <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-4 p-0 text-sm font-semibold">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-aqua no-underline hover:text-paper">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-3 text-[13px] leading-5">
          <div>
            {t('legal_line', {
              legalName: AppConfig.company.legalName,
              cnpj: AppConfig.company.cnpj,
            })}
          </div>
          <div>{AppConfig.company.domain}</div>
        </div>
      </Container>
    </footer>
  );
};
