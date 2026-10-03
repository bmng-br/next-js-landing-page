import { cloudflare } from '@cloudflare/vite-plugin';
import { workersCacheCdnAdapter } from '@vinext/cloudflare/cache/workers-cache-cdn-adapter';
import vinext from 'vinext';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vinext({
      cache: { cdn: workersCacheCdnAdapter() },
    }),
    cloudflare({
      viteEnvironment: {
        name: 'rsc',
        childEnvironments: ['ssr'],
      },
    }),
  ],
});
