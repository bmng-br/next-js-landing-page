import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // Files to exclude from Knip analysis
  // The form and test-data libraries are kept for upcoming features
  ignore: ['src/libs/I18n.ts', 'src/types/I18n.ts'],
  // Dependencies to ignore during analysis
  ignoreDependencies: [
    '@clerk/shared',
    'react-hook-form',
    '@hookform/resolvers',
    '@faker-js/faker',
  ],
  // Include custom Playwright test file suffixes
  playwright: {
    entry: ['tests/**/*.@(integ|e2e).ts'],
  },
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/gu)].join('\n'),
  },
  treatConfigHintsAsErrors: true,
};

export default config;
