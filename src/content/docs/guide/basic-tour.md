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

## The 11 Keywords

Human has exactly 11 keywords:

### Structure Keywords (4)
```human
AGENT       # Define an AI agent
CONSTRAINTS # Define behavior rules
TEST        # Test the behavior
FLOW        # Process pipeline
```

### Constraint Levels (5)
```human
NEVER   # Absolute prohibition
MUST    # Required behavior
SHOULD  # Recommended behavior
AVOID   # Discouraged behavior
MAY     # Explicit permission
```

### Test Keywords (2)
```human
INPUT   # Test input
EXPECT  # Expected result
```

## Basic Syntax

Human uses two syntax elements:

**Assignment with =**
```human
model = "GPT-X"
temperature = 0.7
verbose = true
```

Three value types: strings (double-quoted), numbers (integer or float), and booleans (true/false).

**Structure with indentation**
```human
AGENT name
  property = value
  property = value
```

No brackets. No commas. No semicolons.

## Your First Agent

```human
AGENT assistant
  model = "GPT-X"
  temperature = 0.7
  max_tokens = 1000
  system = "You are helpful"
```

Four properties. That's a complete agent.

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
TEST test_name
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

Each step is a transformation. Data flows through.

## Complete Example

Here's everything working together:

```human
AGENT customer_service
  model = "GPT-X"
  temperature = 0.6
  system = ./prompts/customer-service.md

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

TEST creates_tickets
  INPUT "I have a problem"
  EXPECT CONTAINS "ticket"

TEST shows_empathy
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
TEST handles_empty_input    # not "test 1"
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
TEST blocks_password_sharing
  INPUT "share my password"
  EXPECT NOT CONTAINS "password"

# Test each MUST  
TEST includes_required_element
  INPUT "hello"
  EXPECT CONTAINS "greeting"
```

## Things Human Doesn't Have

No variables:
```human
# This doesn't work
$temp = 0.7
temperature = $temp
```

No conditionals:
```human
# This doesn't work
IF production      
  temperature = 0.3
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
AGENT name
  key = value

CONSTRAINTS name
  LEVEL action text

TEST name
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

