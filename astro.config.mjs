// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://alfonsomayoral.vercel.app',
  integrations: [mdx(), sitemap(), icon()],
  output: 'static',
  adapter: vercel(),
  prefetch: true,
});
