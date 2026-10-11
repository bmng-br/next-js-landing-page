'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { prefersReducedMotion } from './ReducedMotion';
import { useInView } from './useInView';

const INTERVAL_MS = 2400;

export const RotatingWord = () => {
  const t = useTranslations('RotatingWord');
  const words = [t('engineer'), t('developer'), t('supplier'), t('owner')];
  const [index, setIndex] = useState(0);
  const { ref, isInView } = useInView<HTMLSpanElement>({ initial: true });

  // Keep cycling while the word is on screen. With reduced motion, the word stays on the first one
  useEffect(() => {
    const shouldAdvance = isInView && !prefersReducedMotion();
    const timeout = shouldAdvance
      ? setTimeout(() => {
          setIndex((index + 1) % words.length);
        }, INTERVAL_MS)
      : undefined;

    return () => {
      clearTimeout(timeout);
    };
  }, [isInView, index, words.length]);

  return (
    <span
      key={index}
      ref={ref}
      aria-hidden="true"
      className="inline-block animate-word-in text-aqua"
    >
      {words[index]}
    </span>
  );
};
