import { defineConfig } from 'astro/config';

// The production origin is deliberately unset until the domain is confirmed.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  vite: { server: { allowedHosts: ['terminal.local'] } },
});
