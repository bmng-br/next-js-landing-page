'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from '@/libs/I18nNavigation';

type Language = { locale: string; code: string; name: string };

export const LanguageMenu = (props: {
  label: string;
  currentLocale: string;
  languages: readonly Language[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const current = props.languages.find((language) => language.locale === props.currentLocale);

  // Close on Escape (returning focus to the button) and on any press outside the menu
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (isOpen && event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsidePress);

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsidePress);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={`${props.label}: ${current?.code} (${current?.name})`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex min-h-11 cursor-pointer items-center gap-1 border-0 bg-transparent px-2 text-sm font-bold text-graphite-200 transition-colors duration-200 hover:text-paper"
      >
        {current?.code}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute top-full right-0 z-50 m-0 mt-2 w-44 animate-fade-in list-none rounded-2xl border border-graphite-850 bg-graphite-900 p-2 shadow-lift">
          {props.languages.map((language) => {
            const isCurrent = language.locale === props.currentLocale;

            return (
              <li key={language.locale}>
                <Link
                  href="/"
                  locale={language.locale}
                  lang={language.locale}
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className={`flex min-h-11 items-center justify-between gap-3 rounded-[10px] px-4 text-sm font-semibold no-underline hover:bg-graphite-850 hover:text-paper ${
                    isCurrent ? 'text-paper' : 'text-graphite-200'
                  }`}
                >
                  {language.name}
                  {isCurrent && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="text-aqua"
                    >
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
