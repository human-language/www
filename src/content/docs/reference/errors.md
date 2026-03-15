---
title: "Error Reference"
description: "Every error code the hmn compiler can emit"
sidebar:
  order: 5
---

Every diagnostic from `hmn` includes a code, a source location, and -- where useful -- a hint telling you how to fix it.

```
error[E106]: unterminated string literal
 --> main.hmn:1:8
  |
1 | name = "hello
  |        ^~~~~
  |
help: add a closing " before end of line
```

Errors are grouped by pipeline stage:

| Range | Stage | When |
|---|---|---|
| E1xx | Lexer | Character-level scanning |
| E2xx | Parser | Syntax and structure |
| E3xx | Resolver | Imports, file resolution, merging |
| E4xx | Compiler | System prompt loading |
| E5xx | I/O | File system access |

---

## Lexer Errors (E1xx)

These fire during tokenization, before the parser sees anything. See the [Syntax Reference](/reference/syntax) for the character and indentation rules the lexer enforces.

| Code | Summary |
|---|---|
| E101 | Unexpected character |
| E102 | Non-ASCII byte |
| E103 | Tab in indentation |
| E104 | Odd indentation (not a multiple of 2) |
| E105 | Indentation mismatch |
| E106 | Unterminated string |
| E107 | Invalid number literal |

### E101 -- unexpected character

```
error[E101]: unexpected character '@'
 --> main.hmn:3:9
  |
3 |   NEVER @lie
  |         ^
```

The character is valid ASCII but not valid in this position. Check for stray punctuation.

### E102 -- non-ASCII character

```
error[E102]: invalid character U+1F44B -- .hmn files must be ASCII only
 --> main.hmn:1:14
  |
1 | AGENT support👋
  |              ^
```

`.hmn` files are ASCII-only (bytes 0x20-0x7E, plus newlines). Emoji, accented characters, curly quotes, and BOM markers are all rejected. Put unicode content in your system prompt file instead. See [ASCII Only](/reference/syntax#ascii-only).

### E103 -- tabs in indentation

```
error[E103]: tabs not allowed for indentation -- use 2 spaces
 --> main.hmn:2:1
  |
2 | 	NEVER lie
  | ^
```

Human uses 2-space indentation exclusively. Tabs are rejected to avoid ambiguous visual width. See [Indentation](/reference/syntax#indentation).

### E104 -- odd indentation

```
error[E104]: indentation must be a multiple of 2 spaces
 --> main.hmn:2:1
  |
2 |    NEVER lie
  | ^~~
  |
help: use 2, 4, 6, ... spaces; found 3 spaces
```

Every indentation level is exactly 2 spaces. 1, 3, 5, etc. are never valid.

### E105 -- indentation mismatch

```
error[E105]: indentation does not match any outer level
 --> main.hmn:4:1
  |
4 |    NEVER lie
  | ^~~
  |
help: indent must match an enclosing block (expected 0 or 2 spaces)
```

When you dedent, the new indentation level must match a level already on the indent stack. The hint tells you which levels are valid.

### E106 -- unterminated string

```
error[E106]: unterminated string literal
 --> main.hmn:1:8
  |
1 | name = "hello
  |        ^~~~~
  |
help: add a closing " before end of line
```

A double-quoted string was opened but never closed before end of line. Strings cannot span multiple lines.

### E107 -- invalid number

```
error[E107]: invalid number literal '3.2.1'
 --> main.hmn:2:12
  |
2 |   version = 3.2.1
  |             ^~~~~
```

The token looks like a number but couldn't be parsed as one. Numbers are integers (`42`) or floats (`3.14`). No hex, no scientific notation, no version strings.

---

## Parser Errors (E2xx)

These fire after tokenization, when the parser is building the syntax tree. See the [Keywords](/reference/keywords) reference for what each keyword expects.

| Code | Summary |
|---|---|
| E201 | Expected newline |
| E202 | Expected indented block |
| E203 | Duplicate AGENT |
| E204 | Duplicate SYSTEM |
| E205 | SYSTEM without AGENT |
| E206 | Unexpected top-level token |
| E207 | Unexpected token in AGENT body |
| E208 | Expected path after IMPORT |
| E209 | Expected identifier after AGENT |
| E210 | Expected path after SYSTEM |
| E211 | Expected property name |
| E212 | Expected `=` |
| E213 | Expected value |
| E214 | Expected identifier after CONSTRAINTS |
| E215 | Expected constraint keyword |
| E216 | Expected constraint level |
| E217 | Expected constraint text |
| E218 | Expected identifier after FLOW |
| E219 | Expected flow step |
| E220 | Unexpected token in TEST |
| E221 | Unsupported EXPECT form |
| E222 | Expected quoted string |

### Declarations and blocks

#### E201 -- expected newline

```human
AGENT support extra_token
```

```
error[E201]: expected newline
 --> main.hmn:1:15
  |
1 | AGENT support extra_token
  |               ^~~~~~~~~~~
```

The parser expected a newline (end of statement) but found another token. Usually means extra tokens on a line that should only have one declaration.

#### E202 -- expected indented block

```human
CONSTRAINTS safety
FLOW greeting
```

```
error[E202]: expected indented block
 --> main.hmn:1:1
  |
1 | CONSTRAINTS safety
  | ^~~~~~~~~~~
  |
help: add 2-space-indented content below this line
```

A block-opening keyword (`CONSTRAINTS`, `FLOW`, `TEST`) was not followed by an indented body. Every block needs at least one indented line.

#### E203 -- duplicate AGENT

```
error[E203]: duplicate AGENT declaration
 --> main.hmn:5:1
  |
1 | AGENT my_bot
  | ----- first declared here
  ...
5 | AGENT other_bot
  | ^~~~~ duplicate
  |
help: only one AGENT is allowed per project
```

Only one `AGENT` declaration is allowed across an entire project. The secondary label shows where the first one was declared.

#### E204 -- duplicate SYSTEM

```human
AGENT my_bot
  SYSTEM ./prompts/a.md
  SYSTEM ./prompts/b.md
```

```
error[E204]: duplicate SYSTEM declaration
 --> main.hmn:3:3
  |
help: only one SYSTEM path is allowed per AGENT
```

An `AGENT` block can have at most one `SYSTEM` declaration.

#### E205 -- SYSTEM without AGENT

```human
SYSTEM ./prompts/system.md
CONSTRAINTS safety
  NEVER lie
```

```
error[E205]: SYSTEM without preceding AGENT declaration
 --> main.hmn:1:1
  |
help: add an AGENT declaration before SYSTEM
```

`SYSTEM` must appear inside or after an `AGENT` block.

### Top-level and AGENT body

#### E206 -- unexpected top-level token

```human
NEVER lie
```

```
error[E206]: unexpected token: NEVER
 --> main.hmn:1:1
  |
help: expected one of: AGENT, IMPORT, CONSTRAINTS, FLOW, TEST
```

A token appeared at the top level that isn't a valid block keyword. Constraint keywords like `NEVER` belong inside a `CONSTRAINTS` block.

#### E207 -- unexpected token in AGENT body

```human
AGENT my_bot
  NEVER lie
```

```
error[E207]: unexpected token in AGENT body: NEVER
 --> main.hmn:2:3
  |
help: expected SYSTEM or a property (key = value)
```

Inside an `AGENT` body, only `SYSTEM` declarations and `key = value` properties are allowed.

#### E208 -- expected path after IMPORT

```human
IMPORT
```

```
error[E208]: expected file path or package name after IMPORT
 --> main.hmn:1:1
  |
help: e.g. IMPORT ./rules.hmn or IMPORT my-package
```

#### E209 -- expected identifier after AGENT

```human
AGENT
```

```
error[E209]: expected identifier after AGENT
 --> main.hmn:1:1
  |
help: e.g. AGENT my_bot
```

#### E210 -- expected path after SYSTEM

```human
AGENT my_bot
  SYSTEM
```

```
error[E210]: expected file path after SYSTEM
 --> main.hmn:2:3
  |
help: e.g. SYSTEM ./prompts/system.md
```

#### E211 -- expected property name

Triggered when the parser expects a property key inside an `AGENT` body but finds something else.

```
error[E211]: expected property name
  |
help: e.g. model = "gpt-4"
```

#### E212 -- expected `=`

```human
AGENT my_bot
  model "gpt-4"
```

```
error[E212]: expected '=' after property name
 --> main.hmn:2:9
```

Property syntax is `key = value`. The `=` is required.

#### E213 -- expected value

```human
AGENT my_bot
  model =
```

```
error[E213]: expected value after '='
 --> main.hmn:2:11
  |
help: values can be strings ("..."), numbers, booleans, or paths
```

### CONSTRAINTS body

#### E214 -- expected identifier after CONSTRAINTS

```human
CONSTRAINTS
  NEVER lie
```

```
error[E214]: expected identifier after CONSTRAINTS
 --> main.hmn:1:1
  |
help: e.g. CONSTRAINTS safety
```

Every `CONSTRAINTS` block needs a name.

#### E215 -- expected constraint keyword

```human
CONSTRAINTS safety
  be helpful
```

```
error[E215]: expected constraint keyword, got: IDENT
 --> main.hmn:2:3
  |
help: valid keywords: NEVER, MUST, SHOULD, AVOID, MAY
```

Inside a `CONSTRAINTS` block, every line must start with one of the five constraint level keywords.

#### E216 -- expected constraint level

Same as E215 but fired in a different parser state. The fix is the same: use `NEVER`, `MUST`, `SHOULD`, `AVOID`, or `MAY`.

#### E217 -- expected constraint text

```human
CONSTRAINTS safety
  NEVER
```

```
error[E217]: expected constraint text after level keyword
 --> main.hmn:2:3
  |
help: e.g. NEVER share personal data
```

A constraint keyword was found but no text followed it. Write the constraint rule after the keyword.

### FLOW body

#### E218 -- expected identifier after FLOW

```human
FLOW
  greet user
```

```
error[E218]: expected identifier after FLOW
 --> main.hmn:1:1
  |
help: e.g. FLOW greeting
```

#### E219 -- expected flow step

Triggered when an empty or invalid line appears inside a `FLOW` block where a step was expected.

### TEST body

#### E220 -- unexpected token in TEST

```human
TEST
  check output
```

```
error[E220]: expected INPUT or EXPECT in TEST block, got: IDENT
 --> main.hmn:2:3
```

Inside a `TEST` block, only `INPUT` and `EXPECT` lines are valid.

#### E221 -- unsupported EXPECT form

```human
TEST
  INPUT "hello"
  EXPECT EQUALS "world"
```

```
error[E221]: unsupported EXPECT form
 --> main.hmn:3:3
  |
help: supported forms: EXPECT CONTAINS "...", EXPECT MATCHES "..."
```

`EXPECT` must be followed by `CONTAINS` or `MATCHES` (optionally preceded by `NOT`).

#### E222 -- expected quoted string

```human
TEST
  INPUT hello world
```

```
error[E222]: expected quoted string after INPUT
 --> main.hmn:2:3
  |
help: wrap the value in double quotes: "..."
```

`INPUT`, `CONTAINS`, and `MATCHES` all require a double-quoted string argument.

---

## Resolver Errors (E3xx)

These fire when the compiler resolves imports and merges multiple `.hmn` files into a single project. See the [Modules guide](/guide/modules) for how imports work.

| Code | Summary |
|---|---|
| E301 | File not found |
| E302 | Import escapes project root |
| E303 | Circular import |
| E304 | AGENT in non-root file |
| E305 | Duplicate CONSTRAINTS block |
| E306 | Duplicate FLOW block |
| E307 | No AGENT declaration |
| E308 | Cannot read file |
| E309 | Project root not found |
| E310 | Internal error |

### E301 -- file not found

```
error[E301]: file not found: ./missing.hmn (resolved to /project/missing.hmn)
 --> main.hmn:2:8
  |
2 | IMPORT ./missing.hmn
  | ^~~~~~~~~~~~~~~~~~~~~
  |
help: check the path; make sure the file exists
```

An imported file doesn't exist at the resolved path. The message shows both the path as written and the absolute path the resolver computed.

### E302 -- import escapes project root

```
error[E302]: import path escapes project root: ../../etc/passwd (resolved to /etc/passwd)
 --> main.hmn:2:8
  |
2 | IMPORT ../../etc/passwd
  | ^~~~~~~~~~~~~~~~~~~~~~~
  |
help: imports must stay within /project
```

Imports must resolve to a path inside the project directory. Path traversal with `../` that escapes the root is rejected.

### E303 -- circular import

```
error[E303]: circular import detected: a.hmn -> b.hmn -> a.hmn
 --> a.hmn
  |
help: break the cycle by removing one of these imports
```

Two or more files import each other in a cycle. The message shows the full chain.

### E304 -- AGENT in non-root file

```
error[E304]: AGENT can only appear in main.hmn
 --> rules.hmn:1:1
  |
1 | AGENT other
  | ^~~~~
  |
help: move the AGENT declaration to main.hmn
```

Only the root file (the file passed to `hmn compile`) may contain an `AGENT` declaration. Imported files can define `CONSTRAINTS`, `FLOW`, and `TEST` blocks, but not `AGENT`.

### E305 -- duplicate CONSTRAINTS block

```
error[E305]: duplicate CONSTRAINTS block 'safety' -- also defined in rules.hmn
 --> main.hmn:3:1
  |
3 | CONSTRAINTS safety
  | ^~~~~~~~~~~ duplicate
  |
 --> rules.hmn:1:1
  |
1 | CONSTRAINTS safety
  | ----------- first defined here
  |
help: rename one of the blocks or merge them
```

Two files define a `CONSTRAINTS` block with the same name. Block names must be unique across the entire project. The secondary label points to the first definition.

### E306 -- duplicate FLOW block

Same as E305 but for `FLOW` blocks. Names must be unique across the project.

### E307 -- no AGENT declaration

```
error[E307]: no AGENT declaration found
 --> main.hmn
  |
help: add AGENT my_bot to main.hmn
```

Every project needs exactly one `AGENT` declaration in the root file.

### E308 -- cannot read file

```
error[E308]: cannot read file: permission denied
 --> rules.hmn
```

The resolver found the file but couldn't read it. Check file permissions.

### E309 -- project root not found

```
error[E309]: project root not found: /nonexistent/path
 --> /nonexistent/path
```

The directory used as the project root doesn't exist or isn't accessible.

### E310 -- internal error

```
error[E310]: internal error: topological sort failed (cycle should have been caught earlier)
  |
help: this is a bug in hmn -- please report it
```

This should never appear. If it does, it's a bug in the compiler.

---

## Compiler Errors (E4xx)

These fire during the final compilation stage, when the compiler assembles the resolved project into output.

| Code | Summary |
|---|---|
| E401 | System prompt file not found |
| E402 | System prompt not UTF-8 |
| E403 | Cannot read system prompt |

### E401 -- system prompt file not found

```
error[E401]: system prompt file not found: /project/prompts/missing.md
 --> /project/prompts/missing.md
  |
help: check the path in your SYSTEM declaration
```

The file referenced by `SYSTEM` doesn't exist. The path is resolved relative to the `.hmn` file that contains the `SYSTEM` declaration.

### E402 -- system prompt not UTF-8

```
error[E402]: system prompt file is not valid UTF-8
  |
help: system prompt files must be UTF-8 text
```

The system prompt file contains bytes that aren't valid UTF-8. System prompt files (`.md`, `.txt`) must be UTF-8 encoded.

### E403 -- cannot read system prompt

A catch-all for other I/O errors when reading the system prompt file (permission denied, disk error, etc.).

---

## I/O Errors (E5xx)

These fire at the CLI level when `hmn` can't access the files you passed as arguments.

| Code | Summary |
|---|---|
| E501 | File not found |
| E502 | Permission denied |
| E503 | General I/O error |

### E501 -- file not found

```
error[E501]: file not found: nonexistent.hmn
 --> nonexistent.hmn
  |
help: check the path and try again
```

The file passed to `hmn validate`, `hmn compile`, or `hmn fmt` doesn't exist.

### E502 -- permission denied

```
error[E502]: permission denied: protected.hmn
 --> protected.hmn
  |
help: check file permissions
```

The file exists but `hmn` doesn't have permission to read it.

### E503 -- general I/O error

A catch-all for other filesystem errors (disk full, broken symlink, etc.).
