# Human Language Documentation

Documentation site for the Human configuration language - a simple, readable way to control AI behavior.

## What is Human?

Human is an experimental configuration language that tells AI agents how to behave using constraint levels (NEVER, MUST, SHOULD, AVOID, MAY). No frameworks, no APIs - just text.

## Stack

- **Framework**: Astro (static site generator)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Language**: TypeScript

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Project Structure

```
src/
├── pages/docs/          # Documentation markdown files
├── components/          # Reusable UI components
├── layouts/            # Page layouts
└── styles/             # Global CSS and Tailwind config
```

## Development

- Documentation is written in Markdown with frontmatter
- Uses custom DocsLayout for consistent styling
- Automatic table of contents generation
- Dark/light theme support

## Deployment

Site is automatically deployed to Vercel on push to main branch.

## Links

- **Live Site**: https://human-lang.com
- **Language Repo**: https://github.com/human-language
