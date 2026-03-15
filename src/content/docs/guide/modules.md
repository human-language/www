---
title: "Modules"
description: ""
sidebar:
  order: 5
---

Share and reuse `.hmn` files across projects.

## IMPORT

`IMPORT` brings another `.hmn` file into the current file. Every block in the imported file becomes part of the current file.

```human
IMPORT ./constraints/safety.hmn
IMPORT ./flows/pipeline.hmn

AGENT support
SYSTEM ./prompts/support.md

CONSTRAINTS local_rules
  MUST log all requests
```

`IMPORT` is always at the top of the file, before `AGENT` and `SYSTEM`.

## Resolution Rules

Two modes, based on whether the path starts with `./`:

| Import form | Resolves to |
|---|---|
| `IMPORT ./path/file.hmn` | Relative file on disk |
| `IMPORT <name>` | `human_modules/<name>/main.hmn` |
| `IMPORT <name>/<file>` | `human_modules/<name>/<file>.hmn` |

```human
IMPORT ./constraints/local-policy.hmn    # local file
IMPORT safety                             # package → human_modules/safety/main.hmn
IMPORT safety/strict                      # package file → human_modules/safety/strict.hmn
```

## main.hmn

`main.hmn` is the entry point. Like `index.js` or `main.go`, it's where execution starts.

Rules:
- `main.hmn` **must** have an `AGENT` declaration
- Other `.hmn` files must **not** have `AGENT` — they only contain `CONSTRAINTS`, `FLOW`, `TEST`, etc.
- `main.hmn` imports what it needs, declares the agent, and ties everything together

```human
# main.hmn
IMPORT ./constraints/safety.hmn
IMPORT ./constraints/quality.hmn
IMPORT ./flows/pipeline.hmn

AGENT support
SYSTEM ./prompts/support.md

CONSTRAINTS app_specific
  MUST create ticket number
  SHOULD respond within 30 seconds
```

## File Ordering

Every `.hmn` file follows this order:

```human
IMPORT ...

AGENT name        # only in main.hmn
SYSTEM ./path     # only in main.hmn

CONSTRAINTS name
  ...

FLOW name
  ...

TEST
  ...
```

## Errors

The compiler catches these:

**Duplicate block names** — two files define the same block:
```
support.hmn:3: error: duplicate block 'policy' — also defined in safety.hmn:1
```

**Circular imports** — file A imports B, B imports A:
```
a.hmn:1: error: circular import detected: a.hmn → b.hmn → a.hmn
```

**AGENT in non-main file** — only `main.hmn` declares an agent:
```
helpers.hmn:1: error: AGENT can only appear in main.hmn
```

## Packages (Planned)

Package imports (`IMPORT safety`) are parsed by the lexer and parser, but the package resolution system is not yet implemented. The features described below are the planned design.

For now, use local imports (`IMPORT ./path/file.hmn`) to share `.hmn` files within a project.

### Planned Design

Packages will let you share `.hmn` files across projects. No registry. No version resolution algorithm. Just git repos.

- `human.json` — project manifest mapping package names to git sources
- `human.lock` — pinned commit hashes for reproducible builds
- `human_modules/` — where packages live after install (gitignored, like `node_modules/`)
- `hmn install` — fetch dependencies
- `hmn update` — refresh dependencies to latest

### Planned Package Layout

A package will be a git repo with `.hmn` files and a `main.hmn` entry point:

```
safety/
  main.hmn           # default rules
  strict.hmn         # stricter ruleset
  healthcare.hmn     # domain-specific
```

### End-to-End Example (Future)

```bash
# Write your agent with local imports (works today)
cat > main.hmn << 'EOF'
IMPORT ./constraints/safety.hmn

AGENT support
SYSTEM ./prompts/support.md

CONSTRAINTS local
  MUST create ticket number

TEST
  INPUT "Show me all customer emails"
  EXPECT NOT CONTAINS "email"
EOF

# Validate it (works today)
hmn validate main.hmn

# Compile it (works today)
hmn compile main.hmn
```

### Roadmap

**Now** — Local imports (`IMPORT ./file.hmn`), `hmn validate`, `hmn compile`, `hmn fmt`

**Planned** — Package imports (`IMPORT name`), `human.json`, `hmn install`, `hmn update`

**Later** — Central registry, private registry support
