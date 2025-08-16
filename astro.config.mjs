import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots';
import sitemap from '@astrojs/sitemap';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://human-lang.com',
  output: 'static',
  build: {
    inlineStylesheets: 'auto', // Smart inlining based on size
    format: 'directory', // Clean URLs without .html
    assets: '_astro' // Consistent asset naming
  },
  compressHTML: true,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
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
  prefetch: {
    // Smart prefetching on hover/tap
    prefetchAll: false,
    defaultStrategy: 'hover',
    // Throttle prefetch requests
    throttle: 3
  },
  vite: {
    build: {
      cssCodeSplit: true, // Split CSS for better caching
      cssMinify: true, // Enable CSS minification
      rollupOptions: {
        output: {
          // Manual chunks for optimal splitting
          manualChunks: (id) => {
            // Keep framework code separate
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react';
              if (id.includes('@astrojs')) return 'astro';
              return 'vendor';
            }
          },
          assetFileNames: (assetInfo) => {
            // Hash assets for cache busting
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext)) {
              return `_astro/img/[name].[hash][extname]`;
            }
            if (/woff2?|ttf|eot|otf/i.test(ext)) {
              return `_astro/fonts/[name].[hash][extname]`;
            }
            return `_astro/[name].[hash][extname]`;
          },
          chunkFileNames: '_astro/js/[name].[hash].js',
          entryFileNames: '_astro/js/[name].[hash].js'
        },
        treeshake: {
          // Aggressive tree shaking
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          passes: 3
        },
        mangle: {
          safari10: true
        },
        format: {
          comments: false,
          ecma: 2020
        }
      },
      target: 'es2020', // Modern browsers only
      sourcemap: false,
      // Report compressed size
      reportCompressedSize: false,
      // Chunk size warnings
      chunkSizeWarningLimit: 500
    },
    // Optimize deps
    optimizeDeps: {
      entries: ['src/**/*.{astro,js,jsx,ts,tsx}'],
      exclude: ['@astrojs/image', '@astrojs/mdx']
    },
    // Enable build optimizations
    esbuild: {
      legalComments: 'none',
      treeShaking: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true
    },
    // Preview compression
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600'
      }
    }
  },
  // Image optimization is handled automatically by Astro
});
