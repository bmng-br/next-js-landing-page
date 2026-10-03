import { getTranslations } from 'next-intl/server';
import { AppConfig } from '@/utils/AppConfig';
import { ContactForm } from './ContactForm';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';
import { SectionIds } from './SectionIds';

export const ContactSection = async () => {
  const t = await getTranslations('ContactSection');

  return (
    <section id={SectionIds.contact} className="dark bg-graphite-950 pb-section text-paper">
      <Container>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-x-20 gap-y-12 border-t border-graphite-850 pt-section">
          <div className="flex flex-col gap-6">
            <Eyebrow className="text-aqua">{t('eyebrow')}</Eyebrow>
            <h2 className="m-0 text-[clamp(40px,5vw,72px)] leading-none font-bold tracking-[-0.045em]">
              {t.rich('title', {
                dot: (chunks) => <span className="text-pink">{chunks}</span>,
              })}
            </h2>
            <p className="m-0 text-lg leading-[29px] text-graphite-300">{t('description')}</p>
            <div className="flex flex-col gap-2 pt-2 text-base font-bold">
              <a href={`mailto:${AppConfig.contact.email}`} className="text-aqua hover:text-paper">
                {AppConfig.contact.email}
              </a>
              {AppConfig.contact.phones.map((phone) => (
                <a
                  key={phone.region}
                  href={`tel:${phone.tel}`}
                  className="text-paper no-underline hover:text-aqua"
                >
                  <span className="text-graphite-400">{t(`phone_${phone.region}_label`)}</span>{' '}
                  {phone.display}
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
};
