import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://revolis.by',
  integrations: [{
    name: 'local-component-library',
    hooks: {
      'astro:config:setup': ({ command, injectRoute }) => {
        if (command !== 'dev') return;
        injectRoute({ pattern: '/ui-kit/', entrypoint: './src/internal/ui-kit.astro' });
        injectRoute({ pattern: '/ui-kit-mobile/', entrypoint: './src/internal/ui-kit-mobile.astro' });
      },
    },
  }],
  output: 'static',
  trailingSlash: 'always',
  vite: { server: { allowedHosts: ['terminal.local'] } },
});
