import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // Files to exclude from Knip analysis
  // The DB client, form and test-data libraries are kept for upcoming features (e.g. contact form backend)
  ignore: ['src/libs/I18n.ts', 'src/types/I18n.ts', 'src/libs/DB.ts', 'src/utils/DBConnection.ts'],
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
