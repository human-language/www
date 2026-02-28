# Astro Starlight Migration Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the Human programming language docs site from a custom Astro + Tailwind setup to Astro Starlight with a monochrome black/white theme.

**Architecture:** Install Starlight and remove the custom docs layout system; migrate content from `src/pages/docs/` to `src/content/docs/`; apply black/white CSS theme overrides via custom CSS; add performance optimizations (prefetch, SPA nav, font preloading, cache headers). Legal pages move into Starlight content too.

**Tech Stack:** Astro 5, @astrojs/starlight, @astrojs/sitemap, sharp, Fira Code WOFF2 + TTF, Vercel static hosting

---

## Audit Summary (Already Complete)

**Current URL → New URL mapping** (all old `/docs/` prefix routes need redirects):

| Old | New |
|-----|-----|
| `/docs/introduction` | `/intro` |
| `/docs/installation` | `/installation` |
| `/docs/quickstart` | `/quickstart` |
| `/docs/philosophy` | `/philosophy` |
| `/docs/guide/*` | `/guide/*` |
| `/docs/reference/*` | `/reference/*` |
| `/docs/examples/*` | `/examples/*` |
| `/legal/privacy` | `/legal/privacy` |
| `/legal/terms` | `/legal/terms` |
| `/legal/license` | `/legal/license` |

**Content files to migrate (22 total):**
- Getting Started: `introduction.md` (→ `intro.md`), `installation.md`, `quickstart.md`, `philosophy.md`
- Guide: `basic-tour.md`, `first-agent.md`, `constraints.md`, `flows.md`, `modules.md`, `testing.md`
- Reference: `syntax.md`, `keywords.md`, `cli.md`, `stdlib.md`
- Examples: `code-reviewer.md`, `creative-writer.md`, `customer-service.md`, `data-processor.md`, `react-todo-app.md`
- Legal: `privacy.md`, `terms.md`, `license.md`

**Packages to remove:** `@astrojs/tailwind`, `@astrojs/react`, `@astrojs/mdx`, `astro-robots`, `astro-seo`, `@astrojs/vercel`, `react`, `react-dom`, `tailwindcss`, `@tailwindcss/typography`, `tailwind-merge`, `clsx`, `@lucide/astro`, `dotenv`

**Fonts needed:** Fira Code Regular + Medium in WOFF2 + TTF (current project only has a single `FiraCode.ttf` and Inter fonts; Inter is being dropped — Helvetica is system font)

---

## Task 1: Install Starlight & Remove Unneeded Dependencies

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml`

**Step 1: Install Starlight**

```bash
cd /Users/tristan/Documents/dev/human/www && pnpm add @astrojs/starlight
```

**Step 2: Remove unneeded packages**

```bash
pnpm remove @astrojs/tailwind @astrojs/react @astrojs/mdx astro-robots astro-seo @astrojs/vercel react react-dom tailwindcss tailwind-merge clsx @lucide/astro dotenv
```

Dev deps:
```bash
pnpm remove @tailwindcss/typography
```

**Step 3: Verify package.json has what's needed**

```bash
node -e "const p = require('./package.json'); console.log(Object.keys(p.dependencies))"
```

Expected: `astro`, `@astrojs/starlight`, `@astrojs/sitemap`, `sharp` at minimum

**Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: install starlight, remove tailwind/react/mdx/seo deps"
```

---

## Task 2: Download Fira Code WOFF2 Fonts

**Files:**
- Create: `public/fonts/FiraCode-Regular.woff2`
- Create: `public/fonts/FiraCode-Medium.woff2`
- Create: `public/fonts/FiraCode-Regular.ttf`
- Create: `public/fonts/FiraCode-Medium.ttf`
- Delete: `public/fonts/FiraCode.ttf` (replaced by weight-specific files)
- Delete: `public/fonts/Inter-Variable.ttf` (Inter dropped; Helvetica is system font)
- Delete: `public/fonts/Inter-Italic-Variable.ttf`

**Step 1: Download Fira Code release**

Go to github.com/tonsky/FiraCode → Releases → download `Fira_Code_v6.2.zip` (or latest). Extract. Copy:
- `woff2/FiraCode-Regular.woff2` → `public/fonts/FiraCode-Regular.woff2`
- `woff2/FiraCode-Medium.woff2` → `public/fonts/FiraCode-Medium.woff2`
- `ttf/FiraCode-Regular.ttf` → `public/fonts/FiraCode-Regular.ttf`
- `ttf/FiraCode-Medium.ttf` → `public/fonts/FiraCode-Medium.ttf`

**Step 2: Remove old fonts**

```bash
rm public/fonts/FiraCode.ttf public/fonts/Inter-Variable.ttf public/fonts/Inter-Italic-Variable.ttf
```

**Step 3: Verify**

```bash
ls -lh public/fonts/
```

Expected: 4 files — FiraCode-Regular.woff2, FiraCode-Medium.woff2, FiraCode-Regular.ttf, FiraCode-Medium.ttf

**Step 4: Commit**

```bash
git add public/fonts/
git commit -m "chore: replace fonts with Fira Code Regular+Medium WOFF2+TTF, drop Inter"
```

---

## Task 3: Create Content Collection Config

**Files:**
- Create: `src/content/config.ts`
- Create dirs: `src/content/docs/guide/`, `src/content/docs/reference/`, `src/content/docs/examples/`, `src/content/docs/legal/`

**Step 1: Create directories**

```bash
mkdir -p src/content/docs/guide src/content/docs/reference src/content/docs/examples src/content/docs/legal
```

**Step 2: Create `src/content/config.ts`**

```typescript
import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
};
```

**Step 3: Commit**

```bash
git add src/content/
git commit -m "chore: scaffold starlight content collection"
```

---

## Task 4: Migrate Getting Started Content Files

**Files:**
- Create: `src/content/docs/intro.md` (from `src/pages/docs/introduction.md`)
- Create: `src/content/docs/installation.md` (from `src/pages/docs/installation.md`)
- Create: `src/content/docs/quickstart.md` (from `src/pages/docs/quickstart.md`)
- Create: `src/content/docs/philosophy.md` (from `src/pages/docs/philosophy.md`)

**Step 1: Copy each file and update frontmatter**

The migration pattern for every content file:
- **Remove** `layout:` field (Starlight applies layout automatically)
- **Remove** `order:` field (replace with `sidebar.order`)
- **Ensure** `title:` is present (if it's only in the `# h1` heading, move it to frontmatter)
- **Keep** `description:`

For `src/content/docs/intro.md`:
```yaml
---
title: "What is Human?"
description: "Introduction to the Human programming language"
sidebar:
  order: 1
---
```
Then paste the full body content from `src/pages/docs/introduction.md` below the frontmatter.

For `src/content/docs/installation.md`:
```yaml
---
title: "Installation"
description: "How to install and set up Human"
sidebar:
  order: 2
---
```

For `src/content/docs/quickstart.md`:
```yaml
---
title: "Quickstart"
description: "Get started with Human in 5 minutes"
sidebar:
  order: 3
---
```

For `src/content/docs/philosophy.md`:
```yaml
---
title: "Philosophy"
description: "Why Human exists and our design principles"
sidebar:
  order: 4
---
```

**Step 2: Commit**

```bash
git add src/content/docs/intro.md src/content/docs/installation.md src/content/docs/quickstart.md src/content/docs/philosophy.md
git commit -m "feat: migrate getting started docs to starlight content"
```

---

## Task 5: Migrate Guide, Reference, Examples, and Legal Content Files

**Files:**
- Create: `src/content/docs/guide/{basic-tour,first-agent,constraints,flows,modules,testing}.md`
- Create: `src/content/docs/reference/{syntax,keywords,cli,stdlib}.md`
- Create: `src/content/docs/examples/{code-reviewer,creative-writer,customer-service,data-processor,react-todo-app}.md`
- Create: `src/content/docs/legal/{privacy,terms,license}.md`

**Step 1: Copy guide files**

For each file in `src/pages/docs/guide/`, copy to `src/content/docs/guide/` with updated frontmatter (remove `layout:`, ensure `title:` is set, add `sidebar.order` 1–6 in reading order):

```yaml
---
title: "Basic Tour"        # or "Your First Agent", "Constraints", etc.
description: ""
sidebar:
  order: 1                 # increment for each file
---
```

Guide ordering: basic-tour(1), first-agent(2), constraints(3), flows(4), modules(5), testing(6)

Reference ordering: syntax(1), keywords(2), cli(3), stdlib(4)

Examples: no strict ordering needed; use alphabetical or leave sidebar.order out.

**Step 2: Copy legal files**

For each file in `src/pages/legal/`, copy to `src/content/docs/legal/`. Frontmatter:
```yaml
---
title: "Privacy Policy"    # or "Terms of Service", "License"
lastUpdated: 2024-01-01   # keep existing date value; Starlight accepts ISO date
---
```
Remove `layout:` field.

**Step 3: Commit**

```bash
git add src/content/docs/
git commit -m "feat: migrate guide, reference, examples, and legal to starlight content"
```

---

## Task 6: Write astro.config.mjs

**Files:**
- Modify: `astro.config.mjs`

**Step 1: Replace the entire file**

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

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
      lastUpdated: true,
      components: {
        Header: './src/components/overrides/Header.astro',
        Head:   './src/components/overrides/Head.astro',
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
      redirects: {
        '/docs':                          '/intro',
        '/docs/introduction':             '/intro',
        '/docs/installation':             '/installation',
        '/docs/quickstart':               '/quickstart',
        '/docs/philosophy':               '/philosophy',
        '/docs/guide/basic-tour':         '/guide/basic-tour',
        '/docs/guide/first-agent':        '/guide/first-agent',
        '/docs/guide/constraints':        '/guide/constraints',
        '/docs/guide/flows':              '/guide/flows',
        '/docs/guide/modules':            '/guide/modules',
        '/docs/guide/testing':            '/guide/testing',
        '/docs/reference/syntax':         '/reference/syntax',
        '/docs/reference/keywords':       '/reference/keywords',
        '/docs/reference/cli':            '/reference/cli',
        '/docs/reference/stdlib':         '/reference/stdlib',
        '/docs/examples/code-reviewer':   '/examples/code-reviewer',
        '/docs/examples/creative-writer': '/examples/creative-writer',
        '/docs/examples/customer-service':'/examples/customer-service',
        '/docs/examples/data-processor':  '/examples/data-processor',
        '/docs/examples/react-todo-app':  '/examples/react-todo-app',
      },
    }),
    sitemap(),
  ],
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
```

**Step 2: Try a build to catch config errors**

```bash
pnpm astro check 2>&1 | head -60
```

**Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: astro.config.mjs — starlight config with sidebar + redirects"
```

---

## Task 7: Create Root Redirect Page

**Files:**
- Modify: `src/pages/index.astro` (replace existing homepage)

**Step 1: Replace `src/pages/index.astro` entirely**

```astro
---
return Astro.redirect('/intro', 301);
---
```

**Step 2: Remove the old docs redirect page (no longer needed)**

```bash
rm src/pages/docs.astro
```

**Step 3: Commit**

```bash
git add src/pages/index.astro
git rm src/pages/docs.astro
git commit -m "feat: replace homepage with 301 redirect to /intro"
```

---

## Task 8: Create Starlight Component Overrides

**Files:**
- Create: `src/components/overrides/Header.astro`
- Create: `src/components/overrides/Head.astro`

**Step 1: Create `src/components/overrides/Header.astro`**

Removes the theme toggle (hidden via CSS; this also removes the DOM node):

```astro
---
import type { Props } from '@astrojs/starlight/props';
import Default from '@astrojs/starlight/components/Header.astro';
---
<Default {...Astro.props}>
  <slot slot="before-title" />
</Default>
```

**Step 2: Create `src/components/overrides/Head.astro`**

Loads the prefetch and SPA nav scripts that Vite/Astro will bundle:

```astro
---
import type { Props } from '@astrojs/starlight/props';
import Default from '@astrojs/starlight/components/Head.astro';
---
<Default {...Astro.props} />
<script>
  import '../../scripts/prefetch.ts';
</script>
<script>
  import '../../scripts/spa-nav.ts';
</script>
```

**Step 3: Commit**

```bash
git add src/components/overrides/
git commit -m "feat: starlight Header and Head overrides"
```

---

## Task 9: Create Theme CSS

**Files:**
- Create (or overwrite): `src/styles/theme.css`

**Step 1: Replace `src/styles/theme.css` (or create it) with:**

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
  font-feature-settings: 'liga' 1, 'calt' 1;
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

code:not(pre code) {
  background:    #111;
  color:         #e0e0e0;
  border:        1px solid #222;
  border-radius: 4px;
  padding:       0.15em 0.4em;
  font-size:     0.875em;
}

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

[aria-current='page'],
[aria-current='page']:hover {
  color:       #ffffff !important;
  font-weight: 600;
  background:  #111 !important;
  border-left: 2px solid #ffffff;
}

.sl-sidebar a       { color: #c0c0c0; }
.sl-sidebar a:hover { color: #ffffff; }

/* ============================================================
   LINKS
   ============================================================ */

a       { color: #e0e0e0; }
a:hover { color: #ffffff; text-decoration: underline; }

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

**Step 2: Commit**

```bash
git add src/styles/theme.css
git commit -m "feat: monochrome black/white theme CSS for starlight"
```

---

## Task 10: Create Prefetch Script

**Files:**
- Create: `src/scripts/prefetch.ts`

**Step 1: Create `src/scripts/prefetch.ts`**

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

function debounce<T extends (...a: unknown[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

const doPrefetch = debounce((href: string) => { if (shouldPrefetch(href)) prefetch(href); }, 65);

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

**Step 2: Commit**

```bash
git add src/scripts/prefetch.ts
git commit -m "feat: intent-based prefetch script (65ms debounce, max 2 concurrent)"
```

---

## Task 11: Create SPA Navigation Script

**Files:**
- Create: `src/scripts/spa-nav.ts`

**Step 1: Create `src/scripts/spa-nav.ts`**

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
const log   = (...a: unknown[]) => DEBUG && console.log('[perf]', ...a);

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

**Step 2: Commit**

```bash
git add src/scripts/spa-nav.ts
git commit -m "feat: SPA soft navigation with cache and popstate support"
```

---

## Task 12: Update vercel.json

**Files:**
- Modify: `vercel.json`

**Step 1: Replace vercel.json with the cache-header configuration from the spec**

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
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

**Step 2: Commit**

```bash
git add vercel.json
git commit -m "chore: update vercel.json with cache-control headers"
```

---

## Task 13: Clean Up Old Files

**Files to delete:**
- `src/pages/docs/` directory (all `.md` files — content is now in `src/content/docs/`)
- `src/pages/legal/` directory (content now in `src/content/docs/legal/`)
- `src/components/Docs/` (DocsSidebar, Document, NavigationButtons, TableOfContents — Starlight replaces these)
- `src/components/UI/` (Header, Footer, ThemeToggle, Icons — Starlight replaces these)
- `src/components/Container.astro`
- `src/layouts/` (BaseLayout, DocsLayout, LegalLayout — Starlight replaces these)
- `src/utils/cn.ts`, `src/utils/docsNavigation.ts`, `src/utils/theme.ts`
- `src/types/astro-seo.d.ts`
- `tailwind.config.mjs`
- `eslint.config.mjs` (optional; keep if you want linting)
- `scripts/compress.js` (Starlight's build handles this; no longer needed)

**Step 1: Remove old content pages**

```bash
git rm -r src/pages/docs/ src/pages/legal/
```

**Step 2: Remove old components and layouts**

```bash
git rm -r src/components/Docs/ src/components/UI/ src/components/Container.astro
git rm -r src/layouts/
```

**Step 3: Remove old utilities and config**

```bash
git rm src/utils/cn.ts src/utils/docsNavigation.ts src/utils/theme.ts
git rm src/types/astro-seo.d.ts
git rm tailwind.config.mjs
git rm scripts/compress.js
```

**Step 4: Remove old global.css (theme.css replaces it)**

```bash
git rm src/styles/global.css
```

**Step 5: Commit**

```bash
git commit -m "chore: remove old custom layout, components, utils — replaced by starlight"
```

---

## Task 14: Build & Validate

**Step 1: Run the build**

```bash
pnpm build 2>&1
```

Expected: exits 0, no errors. Fix any frontmatter parse errors (missing `title:` fields are the most likely issue — Starlight requires `title` in every content file's frontmatter).

**Step 2: Start preview and spot-check**

```bash
pnpm preview
```

Open `http://localhost:4321` — should 301 to `/intro`.

**Step 3: Check every URL in the sidebar**

Manually visit each URL or use:
```bash
for path in /intro /installation /quickstart /philosophy \
  /guide/basic-tour /guide/first-agent /guide/constraints \
  /guide/flows /guide/modules /guide/testing \
  /reference/syntax /reference/keywords /reference/cli /reference/stdlib \
  /examples/code-reviewer /examples/creative-writer /examples/customer-service \
  /examples/data-processor /examples/react-todo-app \
  /legal/privacy /legal/terms /legal/license; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4321${path}")
  echo "$status $path"
done
```

Expected: all 200.

**Step 4: Check old redirects work**

```bash
for path in /docs /docs/introduction /docs/guide/basic-tour; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4321${path}")
  echo "$status $path"
done
```

Expected: all 301 or 302.

**Step 5: Verify theme**

Open browser devtools, check:
- `document.documentElement` has `data-theme='dark'` (or background is #000)
- No blue/purple accent colors visible
- Fira Code loads in code blocks (Network tab → fonts)
- `starlight-theme-select` is hidden

**Step 6: Run Lighthouse**

```bash
npx lighthouse http://localhost:4321/intro --view
```

Target: 100/100/100/100. Common issues to fix:
- Missing `alt` attributes on images
- Missing `<meta name="description">` → set `description` in frontmatter
- Font preload mismatch → verify font filenames match exactly

**Step 7: Verify prefetch with ?perf=1**

Open `http://localhost:4321/intro?perf=1` → browser console → hover a sidebar link → should see `[perf] navigate ...ms` log.

**Step 8: Verify SPA nav**

Click a sidebar link — should swap `<main>` without full page reload. Use Network tab to confirm only the page HTML is fetched (no CSS/JS re-download).

**Step 9: Final commit**

```bash
git add -A
git commit -m "feat: starlight migration complete — monochrome theme, SPA nav, prefetch"
```

---

## Validation Checklist

### Content & Routing
- [ ] `human-lang.org` → 301 redirect to `/intro`
- [ ] Every page from the original site exists at its new URL
- [ ] No 404s on any internal link
- [ ] Old `/docs/*` URLs redirect correctly
- [ ] Sidebar navigation matches structure exactly
- [ ] All code examples render with syntax highlighting

### Theme
- [ ] Background is `#000000` on all pages
- [ ] Text is white throughout
- [ ] Zero Starlight accent colors (no blues, no purples) visible
- [ ] Code blocks have colored syntax highlighting on dark container
- [ ] Fira Code renders in code blocks (with ligatures)
- [ ] Helvetica/system font for body text
- [ ] Looks intentional — not a broken dark mode

### Performance
- [ ] Lighthouse 100/100/100/100
- [ ] Fira Code fonts are WOFF2, locally hosted, `font-display: swap`
- [ ] Font preload tag in `<head>`
- [ ] Clean URLs — no `.html`, no redirect chains
- [ ] `/_astro/` assets have `immutable` cache headers
- [ ] Prefetch fires on hover with 65ms debounce (`?perf=1`)
- [ ] Max 2 concurrent prefetches (Network tab)
- [ ] External links NOT prefetched
- [ ] SPA nav swaps `<main>` without full page reload
- [ ] Back/forward navigation works
- [ ] Modifier+click opens new tab normally

### Accessibility
- [ ] Lighthouse accessibility: 100
- [ ] All images have `alt` text
- [ ] Sidebar is keyboard-navigable
