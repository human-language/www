# Claude Code Prompt: Migrate to Astro Starlight

> **Project:** Migrate existing Astro documentation site for the Human programming language to Astro Starlight  
> **Domain:** `human-lang.org`  
> **Fonts:** Helvetica (body) · Fira Code (monospace)  
> **Theme:** Black background · White text · Colored syntax highlighting only  
> **Entry point:** `human-lang.org` → auto-redirects to `/intro` (no landing page)

---

## PHASE 1 — AUDIT & INVENTORY

Before writing any code, read every file in the current project and produce a full audit report covering:

1. Every page, its slug, and its position in the sidebar hierarchy
2. All custom components used in MDX/Markdown files
3. All fonts, images, and static assets referenced
4. The complete routing structure (to catch slug changes and set up redirects)
5. All frontmatter fields used across content files
6. Current `astro.config.mjs` and `package.json` dependencies

**Do not proceed to Phase 2 until the audit report is complete.**

---

## PHASE 2 — STARLIGHT MIGRATION

### Installation & Config

```bash
npm install @astrojs/starlight
```

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://human-lang.org',
  trailingSlash: 'never',
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
      // Sidebar: reconstruct from audit — preserve exact structure
      sidebar: [
        { label: 'Introduction', link: '/intro' },
        // ... rest of sidebar from audit
      ],
      components: {
        Header: './src/components/overrides/Header.astro',
      },
      head: [
        // Font preloads — see Phase 4
      ],
    }),
  ],
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
```

### Root Redirect: `/` → `/intro`

Create `src/pages/index.astro`:

```astro
---
return Astro.redirect('/intro', 301);
---
```

This ensures `human-lang.org` immediately sends users to `/intro` with no landing page. The 301 status means search engines will index `/intro` as the canonical entry point.

### Content Migration

- Move all content files into `src/content/docs/` following Starlight conventions
- Preserve all existing URL slugs exactly
- If any slugs change, add entries to Starlight's `redirects` config:

```js
starlight({
  redirects: {
    '/old-slug': '/new-slug',
  },
})
```

---

## PHASE 3 — BLACK / WHITE THEME

Create `src/styles/theme.css`. The site must look **intentionally monochrome** — not like a broken dark mode. No Starlight accent blues or purples should bleed through anywhere. Syntax-highlighted code blocks are the only exception and should use a clean dark theme (One Dark or similar).

```css
/* ============================================================
   FORCE DARK-ONLY: no theme toggle, no light mode
   ============================================================ */

:root,
[data-theme='light'],
[data-theme='dark'] {
  /* Backgrounds */
  --sl-color-bg:             #000000;
  --sl-color-bg-nav:         #000000;
  --sl-color-bg-sidebar:     #000000;
  --sl-color-bg-inline-code: #111111;

  /* Borders */
  --sl-color-hairline:       #222222;
  --sl-color-hairline-light: #1a1a1a;

  /* Text */
  --sl-color-text:           #ffffff;
  --sl-color-text-accent:    #ffffff;
  --sl-color-heading:        #ffffff;
  --sl-color-white:          #ffffff;
  --sl-color-black:          #000000;

  /* Gray scale */
  --sl-color-gray-1: #e0e0e0;
  --sl-color-gray-2: #c0c0c0;
  --sl-color-gray-3: #808080;
  --sl-color-gray-4: #404040;
  --sl-color-gray-5: #222222;
  --sl-color-gray-6: #111111;

  /* Accent — pure white, no color */
  --sl-color-accent:      #ffffff;
  --sl-color-accent-high: #ffffff;
  --sl-color-accent-low:  #1a1a1a;
  --sl-color-text-invert: #000000;

  /* Sidebar width */
  --sl-sidebar-width: 18rem;
}

/* Remove theme toggle */
starlight-theme-select { display: none !important; }

/* ============================================================
   TYPOGRAPHY — Helvetica body, Fira Code monospace
   ============================================================ */

:root {
  --sl-font:      Helvetica, Arial, sans-serif;
  --sl-font-mono: 'Fira Code', 'Fira Mono', 'Cascadia Code', monospace;
}

body {
  font-family: var(--sl-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code,
pre,
kbd,
samp {
  font-family: var(--sl-font-mono);
  font-feature-settings: 'liga' 1, 'calt' 1; /* Fira Code ligatures */
}

/* ============================================================
   FIRA CODE — local @font-face
   ============================================================ */

@font-face {
  font-family: 'Fira Code';
  src: url('/fonts/FiraCode-Regular.woff2') format('woff2'),
       url('/fonts/FiraCode-Regular.ttf')   format('truetype');
  font-weight: 400;
  font-style:  normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
                 U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
                 U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
                 U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Fira Code';
  src: url('/fonts/FiraCode-Medium.woff2') format('woff2'),
       url('/fonts/FiraCode-Medium.ttf')   format('truetype');
  font-weight: 500 600;
  font-style:  normal;
  font-display: swap;
  unicode-range: U+0000-00FF;
}

/* ============================================================
   CODE BLOCKS
   ============================================================ */

/* Inline code */
code:not(pre code) {
  background:    #111;
  color:         #e0e0e0;
  border:        1px solid #222;
  border-radius: 4px;
  padding:       0.15em 0.4em;
  font-size:     0.875em;
}

/* Code block container */
.expressive-code .frame {
  background:    #0a0a0a !important;
  border:        1px solid #222 !important;
  border-radius: 8px !important;
}

.expressive-code .frame .header {
  background:    #111 !important;
  border-bottom: 1px solid #222 !important;
}

/* ============================================================
   NAVIGATION & SIDEBAR
   ============================================================ */

/* Active page */
[aria-current='page'],
[aria-current='page']:hover {
  color:       #ffffff !important;
  font-weight: 600;
  background:  #111 !important;
  border-left: 2px solid #ffffff;
}

/* Nav links */
.sl-sidebar a         { color: #c0c0c0; }
.sl-sidebar a:hover   { color: #ffffff; }

/* ============================================================
   LINKS
   ============================================================ */

a             { color: #e0e0e0; }
a:hover       { color: #ffffff; text-decoration: underline; }

/* ============================================================
   SCROLLBAR
   ============================================================ */

::-webkit-scrollbar        { width: 6px; }
::-webkit-scrollbar-track  { background: #000; }
::-webkit-scrollbar-thumb  { background: #333; border-radius: 3px; }

/* ============================================================
   SELECTION
   ============================================================ */

::selection { background: #333; color: #fff; }
```

---

## PHASE 4 — PERFORMANCE

### 4.1 Font Loading & Preload

Download Fira Code WOFF2 + TTF files into `public/fonts/`. Use only weights actually needed (400 + 500/600). No external font requests.

Register preload tags in `astro.config.mjs` inside the `head` array:

```js
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
],
```

Helvetica is a system font — zero load time, no font file needed.

### 4.2 Clean URLs

```js
// astro.config.mjs
trailingSlash: 'never',
build: { format: 'directory' }, // /page/index.html → clean /page URL
```

Eliminates the 50–100ms redirect penalty from `.html` → clean URL redirects.

### 4.3 Intent-Based Link Prefetch

Create `src/scripts/prefetch.ts`:

```typescript
/**
 * Intent-based prefetch system
 * Triggers:     mouseenter · focus · touchstart
 * Constraints:  same-origin only · max 2 concurrent · 65ms debounce · deduped via Set
 */

const prefetched  = new Set<string>();
const inFlight    = new Set<string>();
const MAX         = 2;

function shouldPrefetch(href: string): boolean {
  if (!href) return false;
  try {
    const url = new URL(href, location.origin);
    return (
      url.origin === location.origin &&
      !prefetched.has(url.pathname)  &&
      !inFlight.has(url.pathname)    &&
      inFlight.size < MAX
    );
  } catch { return false; }
}

function prefetch(href: string): void {
  const { pathname } = new URL(href, location.origin);
  inFlight.add(pathname);
  const link    = document.createElement('link');
  link.rel      = 'prefetch';
  link.as       = 'document';
  link.href     = href;
  link.onload   =
  link.onerror  = () => { inFlight.delete(pathname); prefetched.add(pathname); };
  document.head.appendChild(link);
}

function debounce<T extends (...a: any[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

const doPrefetch = debounce((href: string) => { if (shouldPrefetch(href)) prefetch(href); }, 65);

// IntersectionObserver: prefetch links that scroll into view
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) doPrefetch((e.target as HTMLAnchorElement).href);
  });
}, { rootMargin: '0px 0px 200px 0px' });

function attach(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(a => {
    if (a.origin !== location.origin) return;
    const h = () => doPrefetch(a.href);
    a.addEventListener('mouseenter',  h, { passive: true });
    a.addEventListener('focus',       h, { passive: true });
    a.addEventListener('touchstart',  h, { passive: true });
    observer.observe(a);
  });
}

attach();
document.addEventListener('astro:page-load', attach);
```

### 4.4 SPA-Like Navigation

Create `src/scripts/spa-nav.ts`:

```typescript
/**
 * Soft navigation: fetch → DOMParser → swap <main> → update title + URL
 * Fallback:  full navigation on any error
 * Cache:     Map<href, html> for instant back/forward via popstate
 */

const cache  = new Map<string, string>();
const parser = new DOMParser();

const isModified = (e: MouseEvent) =>
  e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

const DEBUG = new URLSearchParams(location.search).has('perf');
const log   = (...a: any[]) => DEBUG && console.log('[perf]', ...a);

async function navigate(href: string, push = true): Promise<void> {
  const t0 = performance.now();
  try {
    let html = cache.get(href);
    if (!html) {
      const res = await fetch(href, { headers: { Accept: 'text/html' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      html = await res.text();
      cache.set(href, html);
    }

    const doc        = parser.parseFromString(html, 'text/html');
    const newMain    = doc.querySelector('main');
    const curMain    = document.querySelector('main');
    if (!newMain || !curMain) throw new Error('No <main>');

    curMain.replaceWith(newMain);

    const title = doc.querySelector('title')?.textContent;
    if (title) document.title = title;

    // Update active sidebar link
    document.querySelectorAll('[aria-current="page"]')
      .forEach(el => el.removeAttribute('aria-current'));
    document
      .querySelector(`a[href="${new URL(href).pathname}"]`)
      ?.setAttribute('aria-current', 'page');

    if (push) history.pushState({ href }, '', href);
    window.scrollTo({ top: 0 });
    document.dispatchEvent(new Event('astro:page-load'));
    log(`navigate ${href} in ${(performance.now() - t0).toFixed(1)}ms`);

  } catch (err) {
    log('fallback:', err);
    location.href = href;
  }
}

document.addEventListener('click', (e: MouseEvent) => {
  if (isModified(e)) return;
  const a = (e.target as Element).closest<HTMLAnchorElement>('a');
  if (!a?.href) return;
  try {
    const url = new URL(a.href, location.origin);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) return;
    e.preventDefault();
    navigate(url.href);
  } catch { /* let it go */ }
});

window.addEventListener('popstate', e => navigate(e.state?.href ?? location.href, false));
```

Load both scripts in the Starlight `head` config with `type="module"` and `defer`.

### 4.5 Cache-Control Headers

**Vercel** — create `vercel.json` at project root:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    },
    {
      "source": "/_astro/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

**Netlify** — create `public/_headers`:

```
/*
  Cache-Control: public, max-age=0, must-revalidate

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
```

### 4.6 Astro Build Optimizations

```js
// astro.config.mjs
export default defineConfig({
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto', // inline small CSS → fewer requests
    format: 'directory',
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
```

### 4.7 Image Optimization

- Convert all PNG/JPG to WebP or AVIF
- Use `<Image />` from `astro:assets` for all images
- Set explicit `width` + `height` on every image (prevents CLS)
- `loading="lazy"` on below-fold images
- `loading="eager"` + `fetchpriority="high"` on any above-fold images

### 4.8 Minimal JS Footprint

After building, verify bundle size:

```bash
astro build && ls -lh dist/_astro/*.js
```

Target: under 2KB gzipped for the core runtime. Defer all non-critical scripts. Never load third-party scripts synchronously.

### 4.9 Performance Debug Mode

Append `?perf=1` to any URL to enable timing logs in the browser console. The SPA nav script already handles this via the `DEBUG` flag.

---

## PHASE 5 — STARLIGHT COMPONENT OVERRIDES

Override only what's necessary. Create overrides in `src/components/overrides/`:

**`Header.astro`** — remove the theme toggle, keep logo and title:

```astro
---
import type { Props } from '@astrojs/starlight/props';
import Default from '@astrojs/starlight/components/Header.astro';
---
<Default {...Astro.props}>
  <slot slot="before-title" />
  <!-- theme toggle is hidden via CSS; this removes the DOM node entirely if preferred -->
</Default>
```

Register in config:

```js
components: {
  Header: './src/components/overrides/Header.astro',
},
```

---

## PHASE 6 — VALIDATION CHECKLIST

Run through every item after building. Nothing ships until all boxes are checked.

### Content & Routing

- [ ] `human-lang.org` → 301 redirect to `/intro`
- [ ] Every page from the original site exists at the same URL
- [ ] No 404s on any internal link
- [ ] Sidebar navigation matches original structure exactly
- [ ] All code examples render with syntax highlighting

### Theme

- [ ] Background is `#000000` on all pages — sidebar, nav, mobile, all
- [ ] Text is white throughout
- [ ] Zero Starlight accent colors (no blues, no purples) visible anywhere
- [ ] Code blocks have colored syntax highlighting on dark container
- [ ] Fira Code renders correctly in all code blocks (including ligatures)
- [ ] Helvetica/system font renders for body text
- [ ] Looks intentional and polished — not a broken dark mode

### Performance

- [ ] Lighthouse: **100 / 100 / 100 / 100** (`npx lighthouse http://localhost:4321 --view`)
- [ ] JS bundle under 2KB gzipped
- [ ] Fira Code fonts are WOFF2, locally hosted, with `font-display: swap`
- [ ] Font preload tags present in `<head>`
- [ ] Clean URLs — no `.html`, no redirect chains
- [ ] `/_astro/` assets have `immutable` cache headers
- [ ] HTML has `must-revalidate` cache header
- [ ] Prefetch fires on hover with 65ms debounce (verify with `?perf=1`)
- [ ] Max 2 concurrent prefetches (verify via Network tab)
- [ ] External links are NOT prefetched
- [ ] SPA navigation swaps `<main>` without full page reload
- [ ] Back/forward navigation works correctly (`popstate`)
- [ ] Modifier + click opens new tab normally
- [ ] `?perf=1` logs timing data in console

### Accessibility

- [ ] Lighthouse accessibility: **100**
- [ ] All images have `alt` text
- [ ] Sidebar is keyboard-navigable
- [ ] Color contrast passes (white on black: ✅ trivially)

---

## DELIVERABLES

| File | Description |
|---|---|
| `astro.config.mjs` | Full Starlight config with sidebar, redirects, head tags |
| `src/pages/index.astro` | 301 redirect to `/intro` |
| `src/content/docs/**` | All migrated content |
| `src/styles/theme.css` | Complete monochrome theme |
| `src/scripts/prefetch.ts` | Intent-based prefetch system |
| `src/scripts/spa-nav.ts` | SPA soft navigation |
| `src/components/overrides/` | Starlight component overrides |
| `public/fonts/` | Fira Code WOFF2 + TTF files |
| `vercel.json` or `public/_headers` | Cache-Control headers |
| Lighthouse report | Screenshot or output showing 100/100/100/100 |

If anything from the original site cannot be migrated automatically, document it with the specific file and reason — do not silently skip it.

---

> **Do not skip any phase. Do not approximate the performance work. Implement every optimization listed.**