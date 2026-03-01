---
title: "Flows"
description: ""
sidebar:
  order: 4
---

Processing pipelines for AI operations.

## What Are Flows?

Flows define step-by-step processing pipelines. Think Unix pipes, but for AI operations.

```human
FLOW handle_request
  validate input
  fetch context
  generate response
  apply constraints
  format output
```

Each step transforms data. The output of one step becomes the input of the next.

## Basic Syntax

```human
FLOW name
  step one
  step two
  step three
```

Rules:
- Steps execute in order
- Each step is an indented line
- Steps are named operations
- Indentation matters (2 spaces)

## How Flows Execute

### Sequential Processing

```human
FLOW document_analyzer
  extract text          # First: get the text
  detect language       # Then: identify language
  analyze sentiment     # Then: assess tone
  summarize content     # Finally: create summary
```

Each step completes before the next begins. No parallel execution.

### Data Transformation

```human
FLOW enhance_response
  original response     # "The capital is Paris"
  add context           # "The capital of France is Paris"
  add sources           # "The capital of France is Paris (Source: Wikipedia)"
  format markdown       # "The capital of France is **Paris** *(Source: Wikipedia)*"
```

Each step enriches or transforms the data.

## Common Flow Patterns

### Input Validation Flow

```human
FLOW validate_and_process
  check rate limit
  validate schema
  sanitize input
  check permissions
  process request
```

Fail fast. If any validation step fails, the flow stops.

### Enhancement Flow

```human
FLOW enhance_output
  generate base response
  add examples
  include references
  apply formatting
  add metadata
```

Progressive enhancement. Each step adds value.

### Safety Flow

```human
FLOW safety_pipeline
  scan for pii
  check content policy
  validate against rules
  apply filters
  final review
```

Multiple safety checks. Defense in depth.

### Context Flow

```human
FLOW contextual_response
  fetch user history
  fetch relevant docs
  merge context
  generate with context
  personalize
```

Build context before generation.

## Flows with Constraints

Flows and constraints work together:

```human
AGENT support
  model = "GPT-X"

CONSTRAINTS rules
  NEVER expose PII
  MUST be helpful

FLOW support_flow
  identify issue        # Understand the problem
  check knowledge       # Search for solutions
  generate response     # Create response
  apply constraints     # Apply NEVER/MUST rules
  send reply            # Deliver to user
```

The `apply constraints` step enforces your rules.

## Real-World Examples

### Customer Service Flow

```human
FLOW handle_complaint
  acknowledge customer
  extract issue
  check previous tickets
  determine severity
  generate solution
  create ticket
  send response
  schedule followup
```

### Code Review Flow

```human
FLOW review_code
  parse syntax
  check style guide
  scan security issues
  analyze complexity
  generate feedback
  format comments
```

### Content Moderation Flow

```human
FLOW moderate_content
  detect language
  scan inappropriate
  check copyright
  verify facts
  apply policy
  generate decision
```

### Research Flow

```human
FLOW research_topic
  understand query
  search sources
  evaluate credibility
  extract facts
  synthesize findings
  cite references
```

## Flow Control

### Error Handling

While Human doesn't have explicit error handling syntax, flows naturally handle errors:

```human
FLOW safe_process
  validate or fail      # Stops flow if validation fails
  process if valid      # Only runs if validation passed
  return result         # Only runs if processing succeeded
```

### Conditional Steps

Steps can be smart about when they apply:

```human
FLOW adaptive_flow
  detect content type
  process text          # Runs for text
  process code          # Runs for code
  process data          # Runs for data
  format output         # Always runs
```

## Testing Flows

Test that your flow produces expected results:

```human
FLOW parsing_flow
  extract entities
  validate entities
  format entities

TEST extracts_names
  INPUT "John Smith visited New York"
  EXPECT CONTAINS "John Smith"

TEST validates_format
  INPUT "Invalid data: @#$%"
  EXPECT CONTAINS "error"
```

## Best Practices

### 1. Single Responsibility
Each step should do one thing:

```human
# Good
FLOW clear_flow
  validate input
  fetch data
  process data
  format output

# Bad
FLOW unclear_flow
  validate and fetch and process
  do everything else
```

### 2. Descriptive Names
Step names should be verbs that describe actions:

```human
# Good
FLOW descriptive
  authenticate user
  fetch permissions
  apply access control

# Bad
FLOW vague
  step1
  process
  finish
```

### 3. Fail Early
Put validation and checks first:

```human
# Good
FLOW fail_fast
  validate input        # First
  check permissions     # Second
  expensive operation   # Last

# Bad
FLOW fail_late
  expensive operation   # Wastes resources
  validate input        # Should be first
```

### 4. Keep Flows Focused
One flow, one purpose:

```human
# Good: Separate flows
FLOW validate_input
  check format
  verify completeness

FLOW process_input
  transform data
  apply business logic

# Bad: Mixed concerns
FLOW do_everything
  validate
  process
  send email
  update database
```

## Common Mistakes

### Missing Steps

```human
# Bad: Jumps straight to generation
FLOW incomplete
  generate response
  send response

# Good: Includes necessary steps
FLOW complete
  validate request
  check rate limit
  generate response
  apply safety checks
  send response
```

### Wrong Order

```human
# Bad: Generates before validating
FLOW wrong_order
  generate content
  check if allowed

# Good: Validates first
FLOW right_order
  check if allowed
  generate content
```

## The Philosophy of Flows

Flows make AI behavior predictable. Instead of a black box that takes input and produces output, you have a glass pipeline where each transformation is visible.
