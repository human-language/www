---
title: "CLI Reference"
description: "The hmn command-line tool"
sidebar:
  order: 4
---

The `hmn` binary validates, compiles, and formats `.hmn` files.

```
usage: hmn <command> [flags] file...

commands:
  validate   check .hmn files for errors
  compile    compile .hmn to prompt, json, yaml, toml, txt, hmn
  fmt        normalize .hmn source formatting
```

## hmn validate

Check `.hmn` files for lexer, parser, and import-resolution errors. Runs the full pipeline (lex → parse → resolve) without producing output.

```bash
hmn validate main.hmn
hmn validate agents/*.hmn
```

Errors print to stderr in this format:

```
error: unknown import target: ./missing.hmn
  --> main.hmn:2:8
   |
 2 | IMPORT ./missing.hmn
   |        ^^^^^^^^^^^^^
```

Exit codes:
- `0` — all files valid
- `1` — one or more errors found
- `2` — usage error (bad arguments)

## hmn compile

Compile a `.hmn` file to an output format. Runs the full pipeline (lex → parse → resolve → compile) and prints the result to stdout.

```bash
hmn compile main.hmn                  # default: prompt format
hmn compile -f json main.hmn          # JSON output
hmn compile -f yaml main.hmn          # YAML output
hmn compile -f toml main.hmn          # TOML output
hmn compile -f txt main.hmn           # plain text output
hmn compile -f hmn main.hmn           # normalized .hmn output
```

Output formats:

| Format | Flag | Description |
|---|---|---|
| `prompt` | `-f prompt` (default) | Assembled prompt text |
| `json` | `-f json` | Structured JSON |
| `yaml` | `-f yaml` | Structured YAML |
| `toml` | `-f toml` | Structured TOML |
| `txt` | `-f txt` | Plain text |
| `hmn` | `-f hmn` | Normalized Human source |

Exit codes:
- `0` — success
- `1` — compilation error
- `2` — usage error

## hmn fmt

Format `.hmn` source files. By default, prints formatted output to stdout. With `-w`, writes back to the file in place.

```bash
hmn fmt main.hmn            # print formatted to stdout
hmn fmt -w main.hmn         # overwrite file with formatted version
hmn fmt -w agents/*.hmn     # format multiple files in place
```

Exit codes:
- `0` — success
- `1` — parse error (cannot format invalid files)
- `2` — usage error

## Planned Commands

These commands are described in the documentation but not yet implemented:

| Command | Purpose | Status |
|---|---|---|
| `hmn run` | Execute an agent interactively | Planned |
| `hmn test` | Run TEST blocks and report results | Planned |
| `hmn init` | Scaffold a new project | Planned |
| `hmn install` | Fetch package dependencies | Planned |
| `hmn update` | Update package dependencies | Planned |
