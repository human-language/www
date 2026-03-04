---
title: "CLI Reference"
description: ""
sidebar:
  order: 4
---

The `human` command line tool.

## human run

Run an agent.

```bash
human run main.hmn
echo "Review this code" | human run main.hmn
```

## human test

Run tests defined in `.hmn` files.

```bash
human test main.hmn
human test main.hmn --verbose
human test *.hmn
```

Flags:
- `--verbose` — show input, output, and expectations for each test
- `--coverage` — report which constraints are tested
- `--strict` — exit 1 on any failure

## human compile

Resolve all imports and output the fully merged `.hmn` file.

```bash
human compile main.hmn
human compile main.hmn > resolved.hmn
```

Useful for debugging import resolution and seeing the final configuration.

## human init

Create a new project with an empty `human.json`.

```bash
human init
```

Generates:
```json
{
  "dependencies": {}
}
```

## human install

Fetch dependencies into `human_modules/`.

```bash
human install                      # fetch all from human.json
human install safety               # fetch one dependency
human install github:user/repo     # add + fetch new dependency
```

## human update

Refresh dependencies to latest.

```bash
human update                       # update all
human update safety                # update one
```

Ignores `human.lock`, fetches latest for each ref, rewrites the lockfile.

## human check

Validate `.hmn` files without running them.

```bash
human check main.hmn
human check *.hmn
```

Reports syntax errors, duplicate blocks, circular imports, and constraint conflicts.

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Runtime error or test failure |
| 2 | Syntax error |

## Global Flags

```bash
human --version
human --help
```
