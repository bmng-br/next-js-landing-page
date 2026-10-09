'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { prefersReducedMotion } from './ReducedMotion';
import { useInView } from './useInView';

const INTERVAL_MS = 2400;

export const RotatingWord = () => {
  const t = useTranslations('RotatingWord');
  const words = [t('engineer'), t('developer'), t('owner')];
  const lastIndex = words.length - 1;
  const [index, setIndex] = useState(0);
  const { ref, isInView } = useInView<HTMLSpanElement>({ once: true });

  // Cycle once when the word first scrolls into view, then rest on the last word (the business owner).
  // With reduced motion, the word stays on the first one
  useEffect(() => {
    const shouldAdvance = isInView && index !== lastIndex && !prefersReducedMotion();
    const timeout = shouldAdvance
      ? setTimeout(() => {
          setIndex(index + 1);
        }, INTERVAL_MS)
      : undefined;

    return () => {
      clearTimeout(timeout);
    };
  }, [isInView, index, lastIndex]);

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
