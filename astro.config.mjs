import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://scots-catalogue.pages.dev',
  output: 'static',
  integrations: [
    tailwind(),
    alpinejs(),
    sitemap(),
  ],
});
