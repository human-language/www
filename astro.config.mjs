import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://human-lang.org',
  trailingSlash: 'never',
  redirects: {
    '/docs':                           '/intro',
    '/docs/introduction':              '/intro',
    '/docs/installation':              '/installation',
    '/docs/quickstart':                '/quickstart',
    '/docs/philosophy':                '/philosophy',
    '/docs/guide/basic-tour':          '/guide/basic-tour',
    '/docs/guide/first-agent':         '/guide/first-agent',
    '/docs/guide/constraints':         '/guide/constraints',
    '/docs/guide/flows':               '/guide/flows',
    '/docs/guide/modules':             '/guide/modules',
    '/docs/guide/testing':             '/guide/testing',
    '/docs/reference/syntax':          '/reference/syntax',
    '/docs/reference/keywords':        '/reference/keywords',
    '/docs/reference/cli':             '/reference/cli',
    '/docs/reference/stdlib':          '/reference/stdlib',
    '/docs/examples/code-reviewer':    '/examples/code-reviewer',
    '/docs/examples/creative-writer':  '/examples/creative-writer',
    '/docs/examples/customer-service': '/examples/customer-service',
    '/docs/examples/data-processor':   '/examples/data-processor',
    '/docs/examples/react-todo-app':   '/examples/react-todo-app',
  },
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [
    starlight({
      title: 'Human',
      defaultLocale: 'root',
      customCss: ['./src/styles/theme.css'],
      lastUpdated: true,
      expressiveCode: {
        themes: ['one-dark-pro'],
      },
      components: {
        Header:    './src/components/overrides/Header.astro',
        Head:      './src/components/overrides/Head.astro',
        SiteTitle: './src/components/overrides/SiteTitle.astro',
      },
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            href: '/fonts/FiraCode-Regular.woff2',
            as: 'font',
            type: 'font/woff2',
            crossorigin: 'anonymous',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap',
            as: 'style',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap',
          },
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/intro' },
            { label: 'Installation', link: '/installation' },
            { label: 'Quickstart', link: '/quickstart' },
            { label: 'Philosophy', link: '/philosophy' },
          ],
        },
        {
          label: 'Guide',
          items: [
            { label: 'Basic Tour', link: '/guide/basic-tour' },
            { label: 'Your First Agent', link: '/guide/first-agent' },
            { label: 'Constraints', link: '/guide/constraints' },
            { label: 'Flows', link: '/guide/flows' },
            { label: 'Modules', link: '/guide/modules' },
            { label: 'Testing', link: '/guide/testing' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Syntax', link: '/reference/syntax' },
            { label: 'Keywords', link: '/reference/keywords' },
            { label: 'CLI', link: '/reference/cli' },
            { label: 'Standard Library', link: '/reference/stdlib' },
          ],
        },
        {
          label: 'Examples',
          items: [
            { label: 'Code Reviewer', link: '/examples/code-reviewer' },
            { label: 'Creative Writer', link: '/examples/creative-writer' },
            { label: 'Customer Service', link: '/examples/customer-service' },
            { label: 'Data Processor', link: '/examples/data-processor' },
            { label: 'React Todo App', link: '/examples/react-todo-app' },
          ],
        },
      ],
    }),
    sitemap(),
  ],
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
