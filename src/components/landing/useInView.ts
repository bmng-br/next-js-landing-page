import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether an element is on screen.
 * @param options Set `once` to stay true after the first time the element is seen, and `initial` to assume it is on screen until the observer says otherwise.
 * @returns The ref to attach to the element and whether it is in view.
 */
export const useInView = <T extends Element>(
  options: { once?: boolean; initial?: boolean } = {},
) => {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(options.initial ?? false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const isIntersecting = !!entry?.isIntersecting;
      setIsInView((current) => (options.once ? current || isIntersecting : isIntersecting));
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options.once]);

  return { ref, isInView };
};
