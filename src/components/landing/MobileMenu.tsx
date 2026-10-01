'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const MobileMenu = (props: { links: { href: string; label: string }[] }) => {
  const t = useTranslations('LandingNav');
  const [isOpen, setIsOpen] = useState(false);

  const closeOnEscape = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="min-[961px]:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? t('close_menu_label') : t('open_menu_label')}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        onKeyDown={closeOnEscape}
        className="flex size-11 cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-graphite-600 bg-transparent text-paper transition-colors duration-200 hover:bg-paper hover:text-graphite-950"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          aria-hidden="true"
        >
          {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-20 animate-fade-in rounded-2xl border border-graphite-850 bg-graphite-900 p-2 shadow-lift"
        >
          <ul className="m-0 flex list-none flex-col p-0">
            {props.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  onKeyDown={closeOnEscape}
                  className="flex min-h-12 items-center rounded-[10px] px-4 text-base font-semibold text-graphite-200 no-underline hover:bg-graphite-850 hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
