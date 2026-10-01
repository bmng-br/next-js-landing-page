'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { prefersReducedMotion } from './ReducedMotion';

const INTERVAL_MS = 2400;

export const RotatingWord = () => {
  const t = useTranslations('RotatingWord');
  const words = [t('engineer'), t('developer'), t('owner')];
  const [index, setIndex] = useState(0);

  // With reduced motion, the word stays on the first one
  useEffect(() => {
    const interval = prefersReducedMotion()
      ? undefined
      : setInterval(() => {
          setIndex((current) => (current + 1) % words.length);
        }, INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [words.length]);

  return (
    <span key={index} aria-hidden="true" className="inline-block animate-word-in text-aqua">
      {words[index]}
    </span>
  );
};
