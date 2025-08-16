import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://human-lang.com',
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: { 
        theme: 'github-dark-dimmed',
        wrap: true 
      },
      gfm: true,
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    robotsTxt({
      sitemap: true,
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
  prefetch: {
    prefetchAll: true
  },
  vite: {
    ssr: {
      noExternal: ['@phosphor-icons/react']
    }
  }
});
