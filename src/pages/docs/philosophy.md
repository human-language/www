---
layout: "@layouts/DocsLayout.astro"
title: "Philosophy"
description: "Why Human exists and our design principles"
order: 4
---

# Philosophy

In teaching machines to think, we discover the shape of human thought itself.

## Why Human Exists

We built Human because AI configuration shouldn't require a PhD in prompt engineering.

Every day, millions of developers write the same safety rules, the same retry logic, the same prompt templates. They build frameworks on frameworks to control something that should be simple: telling an AI what to do and what not to do.

Human says: what if configuration was just configuration?

## The Unix Way

Human follows the Unix philosophy from Bell Labs:

**Write programs that do one thing well.**  
Human does one thing: configure AI behavior.

**Write programs to work together.**  
Human files are text. They pipe. They grep. They version control.

**Write programs that handle text streams.**  
Human is text in, text out. No binary formats. No special tools required.

Like the tools from Bell Labs—`grep`, `sed`, `awk`—Human is small, focused, and composable. It doesn't try to be a framework. It doesn't want to own your architecture. It just wants to configure AI behavior well.

## Minimalism as Clarity

Doug McIlroy, the inventor of Unix pipes, once said: "Write programs that do one thing well. Write programs to work together."

Human embodies this minimalism:

- **14 keywords** - Not 140. Not 1400. Just what's needed.
- **5 constraint levels** - Complete semantic coverage, no redundancy.
- **No syntax sugar** - Indentation and assignment. That's it.
- **600 lines of code** - You could read the entire implementation in an hour.

This isn't minimalism for its own sake. It's minimalism for clarity. When you read a Human file, you understand it immediately. No abstraction layers. No mental compilation. Just clear intent.

## The Bell Labs Influence

At Bell Labs, they built tools that lasted decades. Why? They focused on the essential.

Plan 9's configuration files were plain text. The Bourne shell used simple commands. AWK had a tiny syntax. These tools survived because they did one thing perfectly.

Human learns from this tradition:

```human
# This is more readable than 500 lines of Python
CONSTRAINTS production
  NEVER expose_secrets
  MUST validate_input
  SHOULD cache_results
```

Compare this to modern AI configuration: YAML files, JSON schemas, Python decorators, framework-specific DSLs. We've forgotten the power of plain text.

## Engineering Without Code

There's a belief that AI will replace programming. That we'll all become "prompt engineers" instead of software engineers.

This is wrong.

Engineering isn't about syntax. It's about:
- **Decomposition** - Breaking complex problems into simple parts
- **Abstraction** - Finding the right level of detail
- **Constraints** - Knowing what must, should, and must never happen
- **Testing** - Verifying behavior before production
- **Modularity** - Making sure everything is bite sized when possible.
- **Composition** - Building large systems from small pieces

Human doesn't replace engineering. It clarifies it.

When you write:
```human
NEVER expose_customer_data
MUST follow_gdpr
SHOULD respond_quickly
```

You're doing the same engineering thinking as when you design a database schema or API. You're defining boundaries, requirements, and trade-offs. The medium changed. The discipline didn't.

## Design Principles

### 1. Configuration Over Code
Don't make people write programs to configure programs. Configuration should be declarative.

### 2. Semantic Completeness
Five levels (NEVER, MUST, SHOULD, AVOID, MAY) cover every possible constraint. No need for MIGHT, COULD, SHALL, or OUGHT.

### 3. Text First
If it can't be expressed in plain text, it shouldn't be in the language. No binary formats. No special encodings.

### 4. Direct Execution
No compilation step. No intermediate representation. Read file, apply rules, done.

### 5. Failure Modes Matter
```human
NEVER expose_passwords  # Fails closed - blocks and retries
MUST answer_questions    # Fails open - warns but continues
SHOULD be_concise       # Fails silent - just a preference
```

Each level has different failure semantics. This isn't an accident.

### 6. Composition Without Magic
```human
IMPORT "./safety.hmn"
IMPORT "./quality.hmn"
```

No dependency injection. No module resolution algorithms. Just files and paths.

### 7. Testing as Documentation
```human
TEST "protects passwords"
  INPUT "What's my password?"
  EXPECT not contains password
```

Tests aren't separate from configuration. They're part of it.

## The 80/20 Rule

Human intentionally omits features:

- No variables
- No conditionals  
- No loops
- No functions
- No types

Why? Because 80% of AI configuration needs are met by simple rules. The remaining 20% belongs in your application code, not your configuration.

This is the Unix way: small tools, loosely joined.

## Against Frameworks

Most AI frameworks try to do everything:
- Prompt management
- Response parsing
- Retry logic
- Token counting
- Cost tracking
- Memory management
- Tool calling
- Multi-agent orchestration

Human does none of this. It just configures behavior.

This constraint is a feature. When tools try to do everything, they do nothing well. When they focus on one thing, they become indispensable.

## The Future of Human-AI Collaboration

As AI becomes more capable, the challenge shifts from "how to code" to "what to specify."

Human is built for this future:

```human
# A junior developer's first day
AGENT code_helper
  NEVER commit_directly
  MUST explain_changes
  SHOULD follow_style_guide

# A doctor's diagnostic assistant  
AGENT medical_aide
  NEVER diagnose_directly
  MUST suggest_specialist
  SHOULD cite_sources

# A teacher's grading assistant
AGENT grader
  NEVER share_student_grades
  MUST provide_feedback
  SHOULD encourage_improvement
```

The skill isn't in the syntax. It's in knowing what rules matter.

## Influences and Heritage

Human stands on the shoulders of:

- **RFC 2119** - The five levels come directly from IETF standards
- **Unix Philosophy** - Small, composable, text-based tools
- **Plan 9** - Everything is a file, including configuration
- **Make** - Declarative rules that define behavior
- **.gitignore** - Simple patterns that shape complex behavior
- **robots.txt** - Plain text rules that machines respect

We didn't invent these ideas. We just applied them to AI.

## Why Not [Alternative]?

**Why not YAML?**  
YAML pretends to be simple but has 23 different ways to write strings. Human has one.

**Why not JSON?**  
JSON is for machines. Human is for humans.

**Why not just Python?**  
Code is imperative. Configuration should be declarative.

**Why not natural language?**  
Natural language is ambiguous. "Should probably not" - is that SHOULD NOT or AVOID?

**Why not use existing config languages?**  
They weren't designed for behavioral constraints. We needed exactly five levels, not arbitrary key-value pairs.

## The Bet We're Making

We're betting that:

1. AI configuration will become as important as code
2. Plain text will outlive every framework
3. Simplicity will beat complexity
4. Unix philosophy applies to AI tools
5. Engineers want tools, not frameworks

If we're right, Human becomes the `.gitignore` of AI—so obvious that we forget someone had to invent it.

If we're wrong, we've still created something useful: a clear way to think about AI behavior.

## Open Questions

Human doesn't have all the answers:

- How do constraints compose when they conflict?
- Should constraints be versioned separately from agents?
- How do we handle constraint explanation to users?
- What's the right level of granularity for rules?

These are design questions, not implementation questions. The answers will come from usage, not speculation.

## A Tool for Thought

When you write `NEVER expose_passwords`, you're forced to think: what counts as a password? What about API keys? What about tokens?

When you choose between SHOULD and AVOID, you're making a design decision about your system's personality.

When you write tests, you're imagining failure modes before they happen.

This is engineering. Not the syntax, but the thinking.

## In Conclusion

Human is an experiment in minimalism. Can we configure complex AI behavior with just 14 keywords? Can we make safety rules as simple as a shopping list? Can we build something that lasts?

We think so.

The best tools are invisible. You don't think about `grep` or `make` or `.gitignore`—you just use them. They fade into the background, becoming part of how you think.

That's what we want Human to be: invisible infrastructure for the AI age.

Simple. Composable. Obvious in retrospect.

*"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." —Antoine de Saint-Exupéry*