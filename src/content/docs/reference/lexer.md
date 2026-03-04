---
title: "Lexer"
description: "Free-form text boundary and modal lexing specification"
sidebar:
  order: 3
---

Human has two worlds: structure and prose. The lexer must know exactly when to stop tokenizing structure and start capturing prose as a single raw string.

## The Problem

Without a mode switch, `MUST respond within 30 seconds` would tokenize `30` as a number literal and `seconds` as an identifier. That's wrong. Everything after `MUST` is a single blob of text: `respond within 30 seconds`.

The same applies to `MUST create ticket in #SUP format` -- without modal lexing, `#SUP format` would be consumed as a comment. It's not. It's prose.

## The Rule

**After emitting a constraint-level keyword, the lexer captures the rest of the line (trimmed of leading/trailing whitespace) as a single `TEXT` token.**

Constraint-level keywords that trigger this mode switch:

```
NEVER  MUST  SHOULD  AVOID  MAY
```

The lexer sees `NEVER`, emits a `NEVER` token, then switches to text-capture mode for the remainder of that line. It emits one `TEXT` token. Then it returns to normal mode on the next line.

## Worked Examples

### Constraint with plain text

Input:

```
NEVER share customer data
```

Tokens:

```
NEVER                          (keyword)
"share customer data"          (TEXT)
NEWLINE
```

### Constraint with a number

Input:

```
MUST respond within 30 seconds
```

Tokens:

```
MUST                           (keyword)
"respond within 30 seconds"    (TEXT)
NEWLINE
```

`30` is not a number literal. It's part of the prose.

### Constraint with `#`

Input:

```
MUST create ticket in #SUP format
```

Tokens:

```
MUST                               (keyword)
"create ticket in #SUP format"     (TEXT)
NEWLINE
```

The `#` is not a comment here. It's inside free-form text. The comment rule (`#` as first non-whitespace on a line) was already handled before the lexer reaches this point -- if the line started with `#`, it would have been captured as a comment, not reached the keyword check.

## FLOW Body Lines

Inside a `FLOW` block, indented lines are also prose -- but the lexer handles them differently.

Input:

```
FLOW mentorship_session
  assess existing work
  identify current phase
  critique and question
```

Tokens:

```
FLOW                           (keyword)
"mentorship_session"           (IDENTIFIER)
NEWLINE
INDENT
"assess existing work"         (TEXT)
NEWLINE
"identify current phase"       (TEXT)
NEWLINE
"critique and question"        (TEXT)
NEWLINE
DEDENT
```

### How the lexer knows

The lexer doesn't track parser-level block context. So there are three possible approaches:

**Option A: Lexer emits raw tokens, parser reassembles.** The lexer tokenizes everything normally. The parser, knowing it's inside a `FLOW` block, concatenates child-line tokens back into a string. Problem: `respond in 30 seconds` would produce a number token for `30`. The parser has to un-tokenize it. Ugly.

**Option B: Lexer uses a heuristic.** An indented line that doesn't start with a keyword is captured as `TEXT`. This works because keywords are case-sensitive and all-caps -- `avoid the main road` won't confuse `avoid` with `AVOID`. But it adds heuristic logic to the lexer.

**Option C: Constraint keywords trigger text-capture; everything else tokenizes normally.** The lexer has exactly one modal rule. `FLOW` body lines get tokenized into identifiers. The parser reassembles if needed. `FLOW` body lines are plain English words -- they tokenize cleanly as identifiers.

### Decision: Option C (Minimal Modal Lexing)

Option C is the simplest. The lexer has exactly one special rule:

> After emitting a constraint-level keyword (`NEVER`/`MUST`/`SHOULD`/`AVOID`/`MAY`), switch to text-capture mode for the rest of the line.

Everything else tokenizes normally. This is the right trade-off because:

1. **Minimal lexer complexity.** One mode switch triggered by five keywords. No block-context tracking.
2. **Constraint lines are the hard case.** They contain `#`, `>`, `%`, `$`, numbers, parentheses -- all of which would mis-tokenize. `FLOW` body lines are plain English words that tokenize cleanly as identifiers.
3. **Follows the C precedent.** The C preprocessor has modal lexing (`#include <stdio.h>` -- the `<stdio.h>` is not tokenized as less-than, identifier, dot, identifier, greater-than). Minimal, targeted mode switches for known contexts.

## Edge Cases

### Empty constraint (keyword with no text)

```
NEVER
```

Tokens: `NEVER` (keyword), `NEWLINE`. No `TEXT` token emitted. The parser rejects this as an error -- a constraint keyword without a constraint is meaningless.

### Constraint with only whitespace after keyword

```
MUST     
```

Same as above. After trimming, there's no text. No `TEXT` token. Parser error.

### Constraint text that looks like a keyword

```
NEVER MUST do two things at once
```

Tokens: `NEVER` (keyword), `"MUST do two things at once"` (TEXT). The text-capture mode is greedy -- once triggered, it takes the whole rest of the line. `MUST` inside the text is just text.

### Comment line inside a block

```
CONSTRAINTS policy
  # safety rules
  NEVER share data
```

The `# safety rules` line: `#` is first non-whitespace after indentation. Lexer emits `COMMENT` token. Not a `TEXT` token. Not a constraint. The comment rule takes priority and is checked before keyword detection.

## Summary

**The lexer has one modal rule: constraint-level keywords (`NEVER`/`MUST`/`SHOULD`/`AVOID`/`MAY`) trigger rest-of-line text capture. All other lines tokenize normally.**

Spaces only, no tabs. Indentation is 2 spaces per level. The lexer emits INDENT/DEDENT tokens based on indentation changes.

## Token Types

| Token | Example | Trigger |
|---|---|---|
| KEYWORD | `AGENT`, `NEVER`, `MUST`, etc. | Reserved word match |
| IDENTIFIER | `support`, `policy_v2` | `[a-zA-Z_][a-zA-Z0-9_]*` not in keyword set |
| TEXT | `share customer data` | Rest-of-line after constraint keyword |
| STRING | `"gpt-4"` | Double-quote delimited |
| NUMBER | `3`, `0.5`, `-1` | Digit sequence, optional dot/negative |
| BOOLEAN | `true`, `false` | Exact lowercase match |
| PATH | `./prompts/support.md` | Starts with `./` or `../` |
| EQUALS | `=` | Single character |
| COMMENT | `# safety rules` | `#` as first non-whitespace |
| INDENT | _(implicit)_ | Indentation increase |
| DEDENT | _(implicit)_ | Indentation decrease |
| NEWLINE | _(implicit)_ | End of line |
| EOF | _(implicit)_ | End of file |
