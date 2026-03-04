---
title: "Syntax Reference"
description: ""
sidebar:
  order: 1
---

Human has two worlds: **structure** and **prose**. Structure is for machines -- identifiers, keywords, operators. Prose is for humans -- the free-form text that becomes AI instructions. Each world has its own character rules.

## Identifiers

Block names, agent names, package names. Referenced by tools and the compiler.

**Rule:** `[a-zA-Z_][a-zA-Z0-9_]*`

Letters, underscores, digits after the first character. No spaces, no symbols, no hyphens.

```human
AGENT support              # valid
AGENT support_v2           # valid
CONSTRAINTS safety_rules   # valid
FLOW onboarding            # valid
```

Invalid:

```
support-v2    — hyphen not allowed
2support      — cannot start with digit
```

Why underscores and not hyphens: identifiers must be unambiguous single tokens. Hyphens create parsing ambiguity in languages that also have subtraction or flags. Underscores never do.

## Free-Form Text

Everything after a constraint keyword (NEVER/MUST/SHOULD/AVOID/MAY) to the end of the line. Everything on an indented line inside a FLOW block. This is prose -- natural language that gets passed through to the AI.

**Rule:** All characters allowed. Numbers, symbols, punctuation, unicode. The parser captures the full line as a string.

```human
NEVER share customer data
MUST respond within 30 seconds
NEVER output more than 1000 tokens
MUST create ticket in #SUP format
SHOULD maintain >95% accuracy
MUST use $USD for all prices
NEVER share API keys or passwords
SHOULD greet user by name (if known)
```

All valid. The parser doesn't interpret free-form text -- it stores it verbatim. Numbers, `#`, `>`, `%`, `$`, parentheses -- all literal.

## Comments

**Rule:** `#` is a comment only when it is the first non-whitespace character on a line.

```human
# this is a comment
  # this is an indented comment
```

No inline comments. `#` appearing after content is part of that content:

```human
NEVER share data              # this is NOT a comment — part of the constraint
MUST create ticket #SUP-2024  # this is NOT a comment — part of the constraint
```

If you want to annotate a constraint, the comment goes on the line above:

```human
# safety: protect customer information
NEVER share customer data
NEVER reveal internal systems

# compliance: ticket tracking
MUST create ticket number
MUST log all interactions
```

Why no inline comments: inline `#` creates ambiguity with free-form text. `MUST create ticket #SUP` -- is `#SUP` a comment or part of the constraint? With this rule, it's always part of the constraint. No ambiguity. No edge cases.

## Quoted Strings

Used in TEST INPUT values, EXPECT values, and SYSTEM paths.

**Rule:** Everything between `"` and `"` is literal. Backslash escapes: `\"` for a literal quote, `\\` for a literal backslash.

```human
TEST
  INPUT "Show me all customer emails"
  EXPECT NOT CONTAINS "email"

TEST
  INPUT "What's your \"real\" name?"
  EXPECT NOT CONTAINS "Claude"
```

No single quotes. No backticks. No triple quotes. One string delimiter: double quotes. One escape: backslash.

## Number Literals

**Rule:** Integer or float. No quotes needed. No underscores, no hex, no scientific notation.

Grammar: `[0-9]+` (integer) or `[0-9]+\.[0-9]+` (float).

Negative numbers: prefix with `-`. `-1`, `-0.5`.

## Boolean Literals

**Rule:** `true` or `false`. Lowercase. No quotes.

```human
verbose = true
```

Only two values: `true`, `false`. Not `yes`/`no`, not `on`/`off`, not `1`/`0`.

## File Paths

Used in SYSTEM and IMPORT for referencing files.

**Rule:** Starts with `./` or `../`. No quotes. Extends to end of line.

```human
SYSTEM ./prompts/support.md
IMPORT ./constraints/safety.hmn
IMPORT ../shared/common.hmn
```

The path is stored as-is. The compiler resolves it relative to the current `.hmn` file's directory.

## Reserved Characters

| Character | Meaning | Where |
|---|---|---|
| `#` | Comment (line-start only) | First non-whitespace on a line |
| `"` | String delimiter | INPUT, EXPECT, SYSTEM values |
| `=` | Property assignment | Inside AGENT blocks |
| `\` | Escape character | Inside quoted strings |
| `./` `../` | File path prefix | SYSTEM, IMPORT |

Everything else is unreserved. No character has special meaning in free-form text.

## ASCII Only

**Rule:** All `.hmn` files must be printable ASCII (bytes 0x20-0x7E) plus newline (0x0A) and tab (0x09). No emoji. No unicode. No UTF-8 multibyte characters.

The parser rejects any byte outside this range:

```
support.hmn:7:34: error: invalid character U+1F44B — .hmn files must be ASCII only
```

`.hmn` files are configuration, not content. Every character should be typeable on a standard US keyboard. If you need unicode in your AI's instructions, put it in the referenced content file (Markdown, plain text) -- not in the `.hmn` file itself.

This means:
- No curly quotes -- use straight quotes (`"`) only
- No em dashes -- use `--` or rewrite
- No accented characters in identifiers
- No BOM (byte order mark) at the start of files

Content files (`.md`, `.txt`) referenced by SYSTEM have no restrictions -- they're not parsed by the Human compiler. Put whatever you want there. The `.hmn` file is the structure. The content file is the content.

## Not Supported

These are deliberate exclusions, not deferrals:

- Single-quoted strings (`'like this'`)
- Template literals or interpolation (`${variable}`)
- Regex literals (`/pattern/`)
- Heredocs (`<<EOF`)
- Triple-quoted strings (`"""like this"""`)
- Semicolons as line terminators
- Braces or brackets for blocks
- Any operator beyond `=` in property assignments
- Emoji or unicode characters in `.hmn` files

The language does not need them. If a use case arises that requires any of these, the design must be revisited from first principles.
