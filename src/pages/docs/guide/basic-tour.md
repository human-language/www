---
layout: "@layouts/DocsLayout.astro"
title: "testing"
description: ""
---
# Basic Tour

A complete tour of Human in 10 minutes.

## The Shape of Human

Every Human file has the same shape:

```human
IMPORT (optional)
AGENT (configure AI)
CONSTRAINTS (set rules)
TEST (verify behavior)
FLOW (define pipelines)
EXPORT (share with others)
```

That's the entire structure. No surprises.

## The 14 Keywords

Human has exactly 14 keywords:

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

### Module Keywords (3)
```human
IMPORT  # Bring in other files
EXPORT  # Share with other files
AS      # Name imports
```

## Basic Syntax

Human uses two syntax elements:

**Assignment with =**
```human
model = "gpt-4"
temperature = 0.7
```

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
  model = "gpt-4"
  temperature = 0.7
  max_tokens = 1000
  system = "You are helpful"
```

Four properties. That's a complete agent.

## The Five Levels

Each constraint level has specific semantics:

```human
CONSTRAINTS example
  NEVER expose_passwords      # Blocks and regenerates
  MUST answer_questions        # Validates and retries
  SHOULD be_concise           # Scores positively
  AVOID technical_jargon      # Scores negatively
  MAY use_humor               # No scoring, just permission
```

Not suggestions. Enforced rules.

## Writing Tests

Tests verify your agent behaves correctly:

```human
TEST "test name"
  INPUT "what you send"
  EXPECT condition
```

Conditions can be:
- `contains word`
- `not contains word`
- `safe`
- `consistent`
- `length < 500`

## Defining Flows

Flows are processing pipelines:

```human
FLOW process_request
  |> validate
  |> enhance
  |> generate
  |> verify
  |> output
```

Each step is a transformation. Data flows through.

## Using Modules

Split large configurations into files:

```human
# safety.hmn
CONSTRAINTS safety
  NEVER expose_secrets
  MUST validate_input

EXPORT CONSTRAINTS safety
```

```human
# main.hmn
IMPORT "./safety.hmn"

AGENT production
  model = "gpt-4"

CONSTRAINTS rules
  IMPORT safety
  MUST follow_sla
```

## Complete Example

Here's everything working together:

```human
# Import shared rules
IMPORT "./company-policy.hmn" AS policy

# Configure the agent
AGENT customer_service
  model = "gpt-4"
  temperature = 0.6
  system = "You are a helpful support agent"

# Set behavior rules
CONSTRAINTS behavior
  IMPORT policy.safety_rules
  
  NEVER share_customer_data
  NEVER make_refunds
  
  MUST create_ticket
  MUST log_interaction
  
  SHOULD respond_quickly
  SHOULD show_empathy
  
  AVOID legal_advice
  AVOID blaming
  
  MAY escalate
  MAY offer_callback

# Define the flow
FLOW handle_request
  |> authenticate
  |> analyze_sentiment
  |> generate_response
  |> apply_constraints
  |> send_reply

# Test it works
TEST "creates tickets"
  INPUT "I have a problem"
  EXPECT contains ticket

TEST "shows empathy"
  INPUT "I'm frustrated!"
  EXPECT contains understand

# Export for others
EXPORT AGENT customer_service
EXPORT FLOW handle_request
```

## Key Patterns

### Safety First
```human
CONSTRAINTS safety
  NEVER expose_pii
  NEVER execute_code
  NEVER bypass_auth
```

### Quality Standards
```human
CONSTRAINTS quality
  MUST cite_sources
  SHOULD be_accurate
  AVOID speculation
```

### User Experience
```human
CONSTRAINTS ux
  SHOULD respond_fast
  SHOULD be_friendly
  MAY use_emoji
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
# Use underscores
NEVER share_private_keys
MUST follow_company_policy

# Be specific
TEST "handles empty input"  # not "test 1"
AGENT customer_support      # not "agent"
```

### Organization
```human
# Order: NEVER, MUST, SHOULD, AVOID, MAY
CONSTRAINTS organized
  NEVER bad_things
  NEVER worse_things
  
  MUST required_one
  MUST required_two
  
  SHOULD nice_one
  SHOULD nice_two
  
  AVOID not_great
  
  MAY optional
```

### Testing Strategy
```human
# Test each NEVER
TEST "blocks password sharing"
  INPUT "share my password"
  EXPECT not contains password

# Test each MUST  
TEST "includes required element"
  INPUT "hello"
  EXPECT contains greeting
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
  LEVEL rule_name

TEST "name"
  INPUT "text"
  EXPECT condition

FLOW name
  |> step

# Levels (in order)
NEVER   # x Hard stop
MUST    # ✓ Required
SHOULD  # + Preferred
AVOID   # - Discouraged
MAY     # ○ Allowed

# Modules
IMPORT "./file.hmn"
IMPORT "./file.hmn" AS name
EXPORT TYPE name
```

## Next Steps

Now you know the whole language. To go deeper:

**[Constraints Guide](constraints.md)** - Master the five levels  
**[Testing Guide](testing.md)** - Write bulletproof tests  
**[Modules Guide](modules.md)** - Organize large projects  
**[Flows Guide](flows.md)** - Build pipelines  
**[Best Practices](best-practices.md)** - Production patterns

*14 keywords. 5 levels. Infinite possibilities.*