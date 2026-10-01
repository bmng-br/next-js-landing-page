/**
 * Checks whether the visitor asked the system to minimize animations.
 * @returns True when the reduced motion preference is set.
 */
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
