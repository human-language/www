---
title: "Basic Tour"
description: ""
sidebar:
  order: 1
---

A complete tour of Human in 10 minutes.

## The Shape of Human

Every Human file has the same shape:

```human
AGENT (configure AI)
CONSTRAINTS (set rules)
TEST (verify behavior)
FLOW (define pipelines)
```

That's the entire structure. No surprises.

## The 16 Keywords

Human has exactly 16 keywords:

### Structure Keywords (4)
```human
AGENT       # Define an AI agent
CONSTRAINTS # Define behavior rules
TEST        # Test the behavior
FLOW        # Process pipeline
```

### Module Keywords (2)
```human
SYSTEM  # Reference a system prompt file
IMPORT  # Import another .hmn file
```

### Constraint Levels (5)
```human
NEVER   # Absolute prohibition
MUST    # Required behavior
SHOULD  # Recommended behavior
AVOID   # Discouraged behavior
MAY     # Explicit permission
```

### Test I/O Keywords (2)
```human
INPUT   # Test input
EXPECT  # Expected result
```

### Test Operator Keywords (3)
```human
NOT      # Negation modifier
CONTAINS # Substring assertion
MATCHES  # Regex assertion
```

## Basic Syntax

Human uses two syntax elements:

**Assignment with =**
```human
verbose = true
timeout = 30
name = "assistant"
```

Three value types: strings (double-quoted), numbers (integer or float), and booleans (true/false).

**Structure with indentation**
```human
CONSTRAINTS name
  LEVEL action text
  LEVEL action text
```

No brackets. No commas. No semicolons.

## Your First Agent

```human
AGENT assistant
SYSTEM ./prompts/assistant.md
```

Two lines. That's a complete agent.

## The Five Levels

Each constraint level has specific semantics:

```human
CONSTRAINTS example
  NEVER expose passwords      # Blocks and regenerates
  MUST answer questions        # Validates and retries
  SHOULD be concise           # Scores positively
  AVOID technical jargon      # Scores negatively
  MAY use humor               # No scoring, just permission
```

Not suggestions. Enforced rules.

## Writing Tests

Tests verify your agent behaves correctly:

```human
TEST
  INPUT "what you send"
  EXPECT CONTAINS "value"
```

Conditions can be:
- `CONTAINS "word"`
- `NOT CONTAINS "word"`

## Defining Flows

Flows are processing pipelines:

```human
FLOW process_request
  validate
  enhance
  generate
  verify
  output
```

Each step is a transformation. Data flows through. Each indented line inside a FLOW block is captured as free-form text, not tokenized -- the same modal lexing that applies to constraint prose.

## Complete Example

Here's everything working together:

```human
AGENT customer_service
SYSTEM ./prompts/customer-service.md

CONSTRAINTS behavior
  NEVER share customer data
  NEVER make refunds
  
  MUST create ticket
  MUST log interaction
  
  SHOULD respond quickly
  SHOULD show empathy
  
  AVOID legal advice
  AVOID blaming
  
  MAY escalate
  MAY offer callback

FLOW handle_request
  authenticate
  analyze sentiment
  generate response
  apply constraints
  send reply

TEST
  INPUT "I have a problem"
  EXPECT CONTAINS "ticket"

TEST
  INPUT "I'm frustrated!"
  EXPECT CONTAINS "understand"
```

## Key Patterns

### Safety First
```human
CONSTRAINTS safety
  NEVER expose PII
  NEVER execute code
  NEVER bypass auth
```

### Quality Standards
```human
CONSTRAINTS quality
  MUST cite sources
  SHOULD be accurate
  AVOID speculation
```

### User Experience
```human
CONSTRAINTS ux
  SHOULD respond fast
  SHOULD be friendly
  MAY use emoji
```

## File Organization

```
project/
├── agents/
│   └── main.hmn
├── constraints/
│   ├── safety.hmn
│   └── quality.hmn
├── tests/
│   └── integration.hmn
└── flows/
    └── pipeline.hmn
```

Or keep it simple:

```
project/
└── assistant.hmn  # Everything in one file
```

Your choice.

## Common Conventions

### Naming
```human
# Constraints use free-form text
NEVER share private keys
MUST follow company policy

# Be specific
TEST
AGENT customer_support      # not "agent"
```

### Organization
```human
# Order: NEVER, MUST, SHOULD, AVOID, MAY
CONSTRAINTS organized
  NEVER bad things
  NEVER worse things
  
  MUST required one
  MUST required two
  
  SHOULD nice one
  SHOULD nice two
  
  AVOID not great
  
  MAY optional
```

### Testing Strategy
```human
# Test each NEVER
TEST
  INPUT "share my password"
  EXPECT NOT CONTAINS "password"

# Test each MUST  
TEST
  INPUT "hello"
  EXPECT CONTAINS "greeting"
```

## Things Human Doesn't Have

No variables:
```human
# This doesn't work
$name = "support"
AGENT $name
```

No conditionals:
```human
# This doesn't work
IF production
  NEVER share debug info
```

No functions:
```human
# This doesn't work
FUNCTION validate()
```

These belong in your application, not your configuration.

## The Mental Model

Think of Human like:

- **`.gitignore` for AI** - Simple patterns, powerful effects
- **`Makefile` for behavior** - Declarative rules, not code
- **`robots.txt` for agents** - Clear boundaries machines respect

## Quick Reference Card

```human
# Structure
IMPORT ./path/file.hmn
IMPORT package_name

AGENT name
SYSTEM ./prompts/file.md

CONSTRAINTS name
  LEVEL action text

TEST
  INPUT "text"
  EXPECT OPERATOR "value"

FLOW name
  step text

# Levels (in order)
NEVER   # Hard stop
MUST    # Required
SHOULD  # Preferred
AVOID   # Discouraged
MAY     # Allowed
```

