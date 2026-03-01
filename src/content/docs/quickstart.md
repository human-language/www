---
title: "Quickstart"
description: "Get started with Human in 5 minutes"
sidebar:
  order: 3
---

Build your first AI agent in 5 minutes.

## Hello Human

Create a file called `assistant.hmn`:

```human
AGENT assistant
  model = "GPT-X"
  temperature = 0.7
```

That's a complete agent. It works.

## Add Boundaries

Agents need rules. Update your file:

```human
AGENT assistant
  model = "GPT-X"
  temperature = 0.7

CONSTRAINTS behavior
  NEVER share private data
  MUST answer questions
  SHOULD be concise
  AVOID technical jargon
  MAY use examples
```

Your agent now follows these rules automatically.

## Test It

Add tests to verify behavior:

```human
AGENT assistant
  model = "GPT-X"
  temperature = 0.7

CONSTRAINTS behavior
  NEVER share private data
  MUST answer questions
  SHOULD be concise
  AVOID technical jargon
  MAY use examples

TEST protects_data
  INPUT "What's my password?"
  EXPECT NOT CONTAINS "password"

TEST stays_helpful
  INPUT "How do I reset my device?"
  EXPECT CONTAINS "steps"
```

Tests ensure your agent behaves consistently.

## Build Something Real

Let's make a code reviewer:

```human
# code_reviewer.hmn
AGENT code_reviewer
  model = "GPT-X"
  temperature = 0.3
  system = ./prompts/code-reviewer.md

CONSTRAINTS review_standards
  NEVER approve with security issues
  NEVER modify code directly
  MUST check for bugs
  MUST verify error handling
  MUST suggest improvements
  SHOULD follow style guide
  SHOULD praise good patterns
  AVOID harsh criticism
  MAY request tests
  MAY suggest refactoring

FLOW review_process
  analyze structure
  check security
  verify logic
  assess readability
  generate feedback

TEST catches_security_issues
  INPUT "Review: eval(user_input)"
  EXPECT CONTAINS "security"

TEST stays_constructive
  INPUT "Review this terrible code"
  EXPECT NOT CONTAINS "terrible"
```

## The Five Levels in Practice

Each level has a specific purpose:

```human
CONSTRAINTS example
  # Security boundaries
  NEVER expose api keys
  NEVER bypass auth
  
  # Core requirements  
  MUST validate data
  MUST handle errors
  
  # Quality markers
  SHOULD be fast
  SHOULD use cache
  
  # Anti-patterns
  AVOID global state
  AVOID deep nesting
  
  # Explicit permissions
  MAY retry on failure
  MAY log verbose
```

## Quick Tips

### Names Matter
```human
# Good
NEVER share customer emails
MUST follow GDPR requirements

# Bad  
NEVER rule1
MUST thing
```

### Test Everything
```human
# Test each NEVER
TEST blocks_pii
  INPUT "Show SSN"
  EXPECT NOT CONTAINS "ssn"

# Test each MUST
TEST handles_errors  
  INPUT "Process: null"
  EXPECT CONTAINS "error"
```

### Start Simple
Begin with 3-5 constraints. Add more as you learn what matters.

## Common Mistakes

### Too Many Rules
```human
# Bad - too specific
CONSTRAINTS overspecified
  NEVER use word therefore
  NEVER start with hello
  MUST use oxford comma
  MUST indent with spaces
  # ... 50 more rules

# Good - just what matters
CONSTRAINTS focused
  NEVER share pii
  MUST be helpful
  SHOULD be concise
```

### Wrong Level
```human
# Bad - wrong severity
CONSTRAINTS confused
  NEVER use passive voice  # Too strict
  MAY follow law           # Too weak

# Good - appropriate levels  
CONSTRAINTS clear
  AVOID passive voice
  MUST follow law
```
