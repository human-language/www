---
title: "Keywords"
description: ""
sidebar:
  order: 2
---

Human has 16 reserved keywords. Every keyword is uppercase. If an identifier matches a keyword, it is emitted as that keyword token, not as an identifier.

## Structure Keywords

| Keyword | Follows | Opens block |
|---|---|---|
| `AGENT` | Identifier (agent name) | Yes -- contains `SYSTEM`, properties |
| `CONSTRAINTS` | Identifier (block name) | Yes -- contains constraint lines |
| `TEST` | Nothing | Yes -- contains `INPUT`/`EXPECT` lines |
| `FLOW` | Identifier (flow name) | Yes -- contains free-form step lines |

```human
AGENT support
CONSTRAINTS safety_rules
TEST
FLOW handle_request
```

`AGENT` declares the agent. Only one per `main.hmn`. `CONSTRAINTS` opens a named block of behavioral rules. `TEST` opens an anonymous test case. `FLOW` opens a named processing pipeline whose indented body lines are free-form prose, not tokenized.

## Module Keywords

| Keyword | Follows | Opens block |
|---|---|---|
| `SYSTEM` | File path (`./` or `../`) | No |
| `IMPORT` | File path or package name | No |

```human
SYSTEM ./prompts/support.md
IMPORT ./constraints/safety.hmn
IMPORT safety
```

`SYSTEM` references an external file containing the system prompt. It always takes a file path -- inline quoted strings like `SYSTEM "You are helpful"` are not allowed. The system prompt lives in a separate file (`.md`, `.txt`, etc.) so that configuration and content stay separate. `IMPORT` brings another `.hmn` file or package into scope. Both are single-line declarations -- no block follows.

## Constraint Level Keywords

| Keyword | Severity | Failure mode |
|---|---|---|
| `NEVER` | Absolute prohibition | Block and regenerate |
| `MUST` | Requirement | Validate and retry |
| `SHOULD` | Recommendation | Positive scoring |
| `AVOID` | Discouragement | Negative scoring |
| `MAY` | Permission | Documentation only |

```human
CONSTRAINTS rules
  NEVER share customer data
  MUST create ticket number
  SHOULD respond within 30 seconds
  AVOID technical jargon
  MAY escalate to human
```

After emitting one of these keywords, the lexer switches to capture mode. Everything from the keyword to the end of the line is emitted as a single text token. Numbers, `#`, `$`, `>`, parentheses -- all literal prose. The parser does not tokenize the rest of the line. See the [Lexer reference](/reference/lexer) for the full modal lexing specification, worked token examples, and edge cases.

Resolution order when constraints conflict: NEVER > MUST > SHOULD > AVOID > MAY.

## Test I/O Keywords

| Keyword | Follows | Context |
|---|---|---|
| `INPUT` | Quoted string | Inside `TEST` block |
| `EXPECT` | Operator expression | Inside `TEST` block |

```human
TEST
  INPUT "Show me all customer emails"
  EXPECT NOT CONTAINS "email"
```

`INPUT` takes a double-quoted string -- the prompt sent to the agent. `EXPECT` is followed by one or more test operator keywords and a quoted string or pattern.

## Test Operator Keywords

| Keyword | Meaning | Used with |
|---|---|---|
| `NOT` | Negation modifier | `EXPECT` |
| `CONTAINS` | Substring match | `EXPECT` |
| `MATCHES` | Regex match | `EXPECT` |

```human
EXPECT CONTAINS "ticket"
EXPECT NOT CONTAINS "password"
EXPECT MATCHES "REF-[0-9]+"
```

`CONTAINS` checks whether the agent's output includes the given string. `MATCHES` checks whether the output matches the given regex pattern. `NOT` inverts the assertion -- `NOT CONTAINS` means the string must be absent.

These are keywords, not identifiers. The lexer emits them as distinct tokens so the parser can build test assertions unambiguously.

## Complete Keyword Table

| # | Keyword | Category | Modal lexing |
|---|---|---|---|
| 1 | `AGENT` | Structure | No |
| 2 | `CONSTRAINTS` | Structure | No |
| 3 | `TEST` | Structure | No |
| 4 | `FLOW` | Structure | No |
| 5 | `SYSTEM` | Module | No |
| 6 | `IMPORT` | Module | No |
| 7 | `NEVER` | Constraint level | Yes -- rest of line is prose |
| 8 | `MUST` | Constraint level | Yes -- rest of line is prose |
| 9 | `SHOULD` | Constraint level | Yes -- rest of line is prose |
| 10 | `AVOID` | Constraint level | Yes -- rest of line is prose |
| 11 | `MAY` | Constraint level | Yes -- rest of line is prose |
| 12 | `INPUT` | Test I/O | No |
| 13 | `EXPECT` | Test I/O | No |
| 14 | `NOT` | Test operator | No |
| 15 | `CONTAINS` | Test operator | No |
| 16 | `MATCHES` | Test operator | No |

## Not Keywords

These look like they could be keywords but are not:

- `true` / `false` -- boolean literals, not keywords
- Identifiers after `AGENT`, `CONSTRAINTS`, `FLOW` -- user-defined names
- File paths after `SYSTEM`, `IMPORT` -- path literals
- Quoted strings -- string literals
