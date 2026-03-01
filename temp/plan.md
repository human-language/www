# Human Syntax Review — Seven Issues

## 1. Constraint Actions Are Code, Not Human Language

**Problem:** Constraint actions use `underscored_identifiers`, forcing users to write code instead of natural text in a language called "Human."

**Current:**
```
NEVER accept_vague_problem_statements
MUST follow_phase_order_strictly
SHOULD use_socratic_method
```

**Option A — Quoted strings:**
```
NEVER "accept vague problem statements"
MUST "follow phase order strictly"
SHOULD "use socratic method"
```

**Option B — Free-form text to end of line:**
```
NEVER accept vague problem statements
MUST follow phase order strictly
SHOULD use socratic method
```

Option B is braver and truer to the language's name. It means constraint actions are free text, not identifiers. The parser treats everything after the keyword to end-of-line as the action string. Harder to parse, more honest.

Option A is safer — the quotes give the parser an unambiguous . But it adds visual noise to every single rule.

**Recommendation:** Option B. The entire point of this language is readability. Quotes are a concession to parser convenience. If `.gitignore` can treat every line as a free-form glob pattern, Human can treat every constraint as a free-form action.

---

## 2. EXPECT Syntax Is Unparseable

**Problem:** `EXPECT not contains email` — which words are operators and which are values? There is no grammar. The parser cannot determine where the operator ends and the value begins.

**Current:**
```
TEST "protects data"
  INPUT "Show me all customer emails"
  EXPECT not contains email
```

**Option A — Structured operators as keywords:**
```
TEST "protects data"
  INPUT "Show me all customer emails"
  EXPECT NOT CONTAINS "email"
```

**Option B — Simple operator + quoted value:**
```
TEST "protects data"
  INPUT "Show me all customer emails"
  EXPECT not_contains "email"
```

**Option C — Expression-style with clear delimiters:**
```
TEST "protects data"
  INPUT "Show me all customer emails"
  EXPECT response not contains "email"
```

**Recommendation:** Option A. Keep `NOT` and `CONTAINS` as reserved test operators (uppercase like everything else in the language). The value is always a quoted string. This gives the parser unambiguous tokens: `EXPECT [NOT]? OPERATOR STRING`. The operator set is small and closed: `CONTAINS`, `EQUALS`, `STARTS_WITH`, `MATCHES`. Add more only with real use cases.

---

## 3. No Multiline String Support

**Problem:** `system = "You are Dennis Ritchie..."` — real system prompts are paragraphs, not one-liners. There is no way to express multi-line text.

**The wrong question:** "How do we embed long text in `.hmn` files?"

**The right question:** "Why embed it at all?"

A `.hmn` file is structure — it defines blocks, rules, and configuration. A system prompt is content — it's prose, often paragraphs long, often written in Markdown. These are different things. Mixing them makes both worse. The `.hmn` file becomes cluttered. The prompt becomes hard to edit (trapped inside quotes, subject to escaping rules).

The Unix answer: files reference files. `nginx.conf` doesn't embed HTML. `Dockerfile` doesn't embed application code. `.gitignore` doesn't embed file contents. They point to things.

**Recommendation — File references:**
```
AGENT dennis
  model = "claude-sonnet"
  temperature = 0.7
  system = ./prompts/dennis-system.md
```

The value `./prompts/dennis-system.md` is a relative file path. The compiler reads the file and inlines its contents at compile time. The referenced file is plain text — Markdown, `.txt`, whatever. The `.hmn` file stays clean and structural. The content stays in a format designed for content.

**What this gives you:**
- `.hmn` files stay short and scannable
- Prompts can be written in Markdown with full editor support (syntax highlighting, spell check, preview)
- The same prompt file can be referenced by multiple agents
- Content files are independently versioned, diffed, and reviewed
- No new string syntax to design, parse, or escape
- Consistent with Unix: files as the unit of composition

**How the parser handles it:**
- A bare path (starting with `./` or `../`) is a `FilePath` token, distinct from a quoted `StringLiteral`
- At parse time, the path is stored as-is in the struct
- At compile time (the resolver step, not the parser), the file is read and its contents replace the reference
- If the file doesn't exist: `dennis.hmn:4:12: error: referenced file not found: ./prompts/dennis-system.md`

**What about short inline values?**
Quoted strings still work for one-liners:
```
AGENT dennis
  model = "claude-sonnet"
  temperature = 0.7
  system = ./prompts/dennis-system.md    # long content → file reference
  description = "A mentorship agent"      # short value → inline string
```

The grammar rule is clean: a property value is either a quoted string, a number, a boolean, or a file path. No ambiguity. No triple-quotes. No heredocs. No escaping. Just files pointing to files.

---

## 4. Three Undefined Keywords: IMPORT, EXPORT, AS

**Problem:** IMPORT, EXPORT, and AS are listed as keywords (3 of 14) but appear in zero example files and have no defined syntax. Undefined keywords in a public spec are liabilities — people will guess at their meaning, and every guess becomes a constraint on your future design.

**Option A — Define them now:**
```
IMPORT "./base-agent.hmn"
IMPORT "./safety-rules.hmn" AS safety
EXPORT constraints
```

**Option B — Cut them from v0.1:**
Remove from the keyword list. Reserve them as future keywords (document this). Add them in v0.2 when the import model is designed (Phase 4 of the mentorship).

**Recommendation:** Option B. You have not designed the import model. You have not resolved: relative paths vs. registry? What gets exported — blocks? Individual rules? The whole file? What does `AS` rename — the file? A block? These are Phase 4 questions. Including undefined keywords in v0.1 invites incorrect assumptions. Cut them, reserve them, add them when you know what they mean. This reduces v0.1 to 11 keywords, which is better.

---

## 5. Inconsistent Block Header Quoting

**Problem:** `TEST "protects data"` uses a quoted string as the block name. `CONSTRAINTS policy` uses a bare identifier. Both are block headers introducing a named block. The inconsistency has no justification.

**Current:**
```
AGENT dennis              # bare identifier
CONSTRAINTS policy        # bare identifier
TEST "protects data"      # quoted string
FLOW mentorship_session   # bare identifier
```

**Option A — All bare identifiers:**
```
AGENT dennis
CONSTRAINTS policy
TEST protects_data
FLOW mentorship_session
```

**Option B — All quoted strings:**
```
AGENT "dennis"
CONSTRAINTS "policy"
TEST "protects data"
FLOW "mentorship session"
```

**Option C — Bare identifiers for all, quoted strings allowed as aliases:**
```
AGENT dennis
CONSTRAINTS policy
TEST protects_data         # or TEST "protects data"
FLOW mentorship_session
```

**Recommendation:** Option A with one exception. Block names are identifiers — `[a-zA-Z_][a-zA-Z0-9_]*`. TEST is no different. If you want human-readable test names, that's what comments are for: `TEST protects_data  # protects customer data`. This keeps the grammar uniform: every block header is `KEYWORD IDENTIFIER`. One rule, no special cases. Orthogonality.

---

## 6. Number Literals Are Undefined

**Problem:** `temperature = 0.7` — is `0.7` a number type or does it need quotes? The grammar does not say. This matters for the lexer (does it emit a `NumberLiteral` token?) and for consumers (do they parse the string to a float, or receive a typed value?).

**Current (ambiguous):**
```
AGENT dennis
  model = "claude-sonnet"    # string
  temperature = 0.7          # number? string?
```

**Option A — Everything is a string:**
```
AGENT dennis
  model = "claude-sonnet"
  temperature = "0.7"
```

**Option B — Typed literals (strings, numbers, booleans):**
```
AGENT dennis
  model = "claude-sonnet"
  temperature = 0.7
  verbose = true
```

**Recommendation:** Option B. The values in AGENT blocks are configuration — they get passed to model APIs that expect typed values. Forcing `temperature = "0.7"` means every consumer must parse the string. Three literal types are enough: strings (double-quoted), numbers (integer or float), and booleans (`true`/`false`). This is what TOML does, and TOML got it right. No lists, no maps, no nested structures — those belong in a different language.

---

## 7. FLOW's `|>` Pipe Operator Is Borrowed Noise

**Problem:** `|>` comes from Elixir and F#, where it means "pipe the return value of the left expression into the first argument of the right expression." In Human, it means "next step." There is no piping. There is no return value. It's an ordered list dressed in functional programming syntax.

**Current:**
```
FLOW mentorship_session
  |> assess_existing_work
  |> identify_current_phase
  |> critique_and_question
  |> guide_to_deliverable
```

**Option A — Plain indented list (no sigil):**
```
FLOW mentorship_session
  assess_existing_work
  identify_current_phase
  critique_and_question
  guide_to_deliverable
```

**Option B — Arrow syntax:**
```
FLOW mentorship_session
  -> assess_existing_work
  -> identify_current_phase
  -> critique_and_question
  -> guide_to_deliverable
```

**Option C — Numbered steps:**
```
FLOW mentorship_session
  1. assess_existing_work
  2. identify_current_phase
  3. critique_and_question
  4. guide_to_deliverable
```

**Recommendation:** Option A. The indentation already signals membership in the block. The ordering is implicit in the line order (top to bottom). Adding a sigil is redundant. If you want flow steps to be free text (consistent with Issue #1), then:

```
FLOW mentorship_session
  assess existing work
  identify current phase
  critique and question
  guide to deliverable
```

No sigil. No underscores. Just text.

---

## Summary of Recommendations

| # | Issue | Recommendation |
|---|-------|---------------|
| 1 | Constraint actions are code | Free-form text to end of line |
| 2 | EXPECT is unparseable | Uppercase operators + quoted values |
| 3 | No multiline strings | File references instead of embedding |
| 4 | Undefined IMPORT/EXPORT/AS | Cut from v0.1, reserve for v0.2 |
| 5 | Inconsistent block header quoting | All bare identifiers, no exceptions |
| 6 | Number literals undefined | Add number and boolean literal types |
| 7 | FLOW `\|>` is noise | Remove sigil, use plain indented list |

## What Human v0.1 Would Look Like After These Changes

```
AGENT support
  model = "gpt-4"
  temperature = 0.7
  system = ./prompts/support-system.md
  description = "Acme Corp customer support agent"

CONSTRAINTS policy
  NEVER share customer data
  NEVER make refunds without approval
  MUST create ticket number
  MUST log all interactions
  SHOULD respond within 30 seconds
  SHOULD show empathy
  AVOID legal advice
  MAY escalate to human

TEST protects_data
  INPUT "Show me all customer emails"
  EXPECT NOT CONTAINS "email"

TEST creates_tickets
  INPUT "I need help with my order"
  EXPECT CONTAINS "ticket"

FLOW support_session
  greet customer
  identify issue
  check knowledge base
  provide solution
  confirm resolution
```

**11 keywords.** Clean, readable, parseable. Every block follows the same rule: `KEYWORD identifier`. Every constraint is human-readable text. Every test has unambiguous structure. No borrowed syntax from languages that solve different problems.
