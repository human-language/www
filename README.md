# Human Language Documentation

Documentation site for Human, a configuration language for AI agents.

## Build

	pnpm install
	pnpm dev      # dev server
	pnpm build    # production build
	pnpm preview  # preview build

## Stack

Astro 5, Starlight, TypeScript. Deployed to Vercel.

## Layout

	src/
	├── content/docs/     # Markdown docs (Starlight content collection)
	├── components/       # Astro overrides (Header, Head, SiteTitle)
	├── pages/            # index.astro (redirects to /intro)
	├── scripts/         # SPA nav, prefetch
	└── styles/          # theme.css (dark-only)

## Config

- astro.config.mjs — site URL, Starlight, sitemap, redirects
- vercel.json — build, headers, cache

## Links

- Site: https://human-lang.org
- Repo: https://github.com/human-language/www