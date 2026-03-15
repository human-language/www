---
title: "Installation"
description: "How to install and set up Human"
sidebar:
  order: 2
---

Human is a plain-text format. You can write `.hmn` files in any editor without installing anything. But the tooling makes it better.

## CLI (`hmn`)

The `hmn` binary validates, compiles, and formats `.hmn` files. Install from source:

```bash
cargo install --path human/cli
```

Verify:

```bash
hmn --help
```

```
usage: hmn <command> [flags] file...

commands:
  validate   check .hmn files for errors
  compile    compile .hmn to prompt, json, yaml, toml, txt, hmn
  fmt        normalize .hmn source formatting
```

Homebrew and npm packages are planned but not yet available.

## VS Code Extension

The `vscode-human` extension provides syntax highlighting and on-save diagnostics for `.hmn` files.

Install from VSIX:

1. Open VS Code or Cursor
2. Open the Command Palette (`Cmd+Shift+P`)
3. Run **Extensions: Install from VSIX...**
4. Select the `human-language-0.1.0.vsix` file from the `vscode-human/` directory

The extension runs `hmn validate` on save and reports errors inline.

## No Install Required

You don't need the CLI or extension to use Human. It's a plain-text configuration format. You can write it in Notepad, Vim, or on paper.

```human
AGENT helper

CONSTRAINTS rules
  NEVER lie
  MUST help
```

Save it as a `.hmn` file. That's a valid Human configuration.

The CLI adds validation (`hmn validate`), compilation to various output formats (`hmn compile`), and source formatting (`hmn fmt`). The VS Code extension adds syntax highlighting and error reporting. But the format stands on its own.

## Platform Support

Human (the specification) works everywhere text works.

The `hmn` CLI currently builds from source via Cargo on:
- macOS (arm64, x86_64)
- Linux (arm64, x86_64)
- Windows (x86_64)

Pre-built binaries are planned.

## Tree-sitter Grammar

A Tree-sitter grammar is available in `tree-sitter-human/` for editor plugin authors who want to build integrations beyond VS Code. It handles indentation-sensitive parsing via an external scanner and provides `highlights.scm` queries for syntax coloring.

## Getting Updates

Human is experimental. Watch the GitHub for updates: [github.com/human-language](https://github.com/human-language)

## Questions

**Q: Can I use Human without the CLI?**
A: Yes. It's just text. Write it, share it, version control it.

**Q: When will brew/npm packages be ready?**
A: Follow the repo for updates.

**Q: What if the spec changes?**
A: The five constraint levels are permanent. Everything else might evolve.

**Q: Can I contribute?**
A: Yes. The spec and implementation are open source.
