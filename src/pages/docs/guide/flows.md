---
layout: "@layouts/DocsLayout.astro"
title: "flows"
description: ""
---
# Flows

Processing pipelines for AI operations.

## What Are Flows?

Flows define step-by-step processing pipelines. Think Unix pipes, but for AI operations.

```human
FLOW handle_request
  |> validate_input
  |> fetch_context
  |> generate_response
  |> apply_constraints
  |> format_output
```

Each step transforms data. The output of one step becomes the input of the next.

## Basic Syntax

```human
FLOW name
  |> step_one
  |> step_two
  |> step_three
```

Rules:
- Each step starts with `|>`
- Steps execute in order
- Steps are named operations
- Indentation matters (2 spaces)

## How Flows Execute

### Sequential Processing

```human
FLOW document_analyzer
  |> extract_text        # First: get the text
  |> detect_language     # Then: identify language
  |> analyze_sentiment   # Then: assess tone
  |> summarize_content   # Finally: create summary
```

Each step completes before the next begins. No parallel execution.

### Data Transformation

```human
FLOW enhance_response
  |> original_response   # "The capital is Paris"
  |> add_context         # "The capital of France is Paris"
  |> add_sources         # "The capital of France is Paris (Source: Wikipedia)"
  |> format_markdown     # "The capital of France is **Paris** *(Source: Wikipedia)*"
```

Each step enriches or transforms the data.

## Common Flow Patterns

### Input Validation Flow

```human
FLOW validate_and_process
  |> check_rate_limit
  |> validate_schema
  |> sanitize_input
  |> check_permissions
  |> process_request
```

Fail fast. If any validation step fails, the flow stops.

### Enhancement Flow

```human
FLOW enhance_output
  |> generate_base_response
  |> add_examples
  |> include_references
  |> apply_formatting
  |> add_metadata
```

Progressive enhancement. Each step adds value.

### Safety Flow

```human
FLOW safety_pipeline
  |> scan_for_pii
  |> check_content_policy
  |> validate_against_rules
  |> apply_filters
  |> final_review
```

Multiple safety checks. Defense in depth.

### Context Flow

```human
FLOW contextual_response
  |> fetch_user_history
  |> fetch_relevant_docs
  |> merge_context
  |> generate_with_context
  |> personalize
```

Build context before generation.

## Flows with Constraints

Flows and constraints work together:

```human
AGENT support
  model = "GPT-X"

CONSTRAINTS rules
  NEVER expose_pii
  MUST be_helpful

FLOW support_flow
  |> identify_issue      # Understand the problem
  |> check_knowledge     # Search for solutions
  |> generate_response   # Create response
  |> apply_constraints   # Apply NEVER/MUST rules
  |> send_reply          # Deliver to user
```

The `apply_constraints` step enforces your rules.

## Flow Composition

### Importing Flows

```human
# base_flow.hmn
FLOW base_validation
  |> check_format
  |> validate_data

EXPORT FLOW base_validation
```

```human
# extended.hmn
IMPORT "./base_flow.hmn"

FLOW full_validation
  |> base_validation
  |> additional_checks
  |> final_verification
```

### Nested Flows

```human
FLOW main_process
  |> initial_setup
  |> validation_flow    # Another flow
  |> processing_flow    # Another flow
  |> cleanup

FLOW validation_flow
  |> check_input
  |> verify_access

FLOW processing_flow
  |> transform_data
  |> apply_rules
```

## Real-World Examples

### Customer Service Flow

```human
FLOW handle_complaint
  |> acknowledge_customer
  |> extract_issue
  |> check_previous_tickets
  |> determine_severity
  |> generate_solution
  |> create_ticket
  |> send_response
  |> schedule_followup
```

### Code Review Flow

```human
FLOW review_code
  |> parse_syntax
  |> check_style_guide
  |> scan_security_issues
  |> analyze_complexity
  |> generate_feedback
  |> format_comments
```

### Content Moderation Flow

```human
FLOW moderate_content
  |> detect_language
  |> scan_inappropriate
  |> check_copyright
  |> verify_facts
  |> apply_policy
  |> generate_decision
```

### Research Flow

```human
FLOW research_topic
  |> understand_query
  |> search_sources
  |> evaluate_credibility
  |> extract_facts
  |> synthesize_findings
  |> cite_references
```

## Flow Control

### Error Handling

While Human doesn't have explicit error handling syntax, flows naturally handle errors:

```human
FLOW safe_process
  |> validate_or_fail    # Stops flow if validation fails
  |> process_if_valid    # Only runs if validation passed
  |> return_result       # Only runs if processing succeeded
```

### Conditional Steps

Steps can be smart about when they apply:

```human
FLOW adaptive_flow
  |> detect_content_type
  |> process_text        # Runs for text
  |> process_code        # Runs for code
  |> process_data        # Runs for data
  |> format_output       # Always runs
```

## Testing Flows

Test that your flow produces expected results:

```human
FLOW parsing_flow
  |> extract_entities
  |> validate_entities
  |> format_entities

TEST "extracts names"
  INPUT "John Smith visited New York"
  EXPECT contains "John Smith" and "New York"

TEST "validates format"
  INPUT "Invalid data: @#$%"
  EXPECT contains error or invalid
```

## Best Practices

### 1. Single Responsibility
Each step should do one thing:

```human
# Good
FLOW clear_flow
  |> validate_input
  |> fetch_data
  |> process_data
  |> format_output

# Bad
FLOW unclear_flow
  |> validate_and_fetch_and_process
  |> do_everything_else
```

### 2. Descriptive Names
Step names should be verbs that describe actions:

```human
# Good
FLOW descriptive
  |> authenticate_user
  |> fetch_permissions
  |> apply_access_control

# Bad
FLOW vague
  |> step1
  |> process
  |> finish
```

### 3. Fail Early
Put validation and checks first:

```human
# Good
FLOW fail_fast
  |> validate_input      # First
  |> check_permissions   # Second
  |> expensive_operation # Last

# Bad
FLOW fail_late
  |> expensive_operation # Wastes resources
  |> validate_input      # Should be first
```

### 4. Keep Flows Focused
One flow, one purpose:

```human
# Good: Separate flows
FLOW validate_input
  |> check_format
  |> verify_completeness

FLOW process_input
  |> transform_data
  |> apply_business_logic

# Bad: Mixed concerns
FLOW do_everything
  |> validate
  |> process
  |> send_email
  |> update_database
```

## Common Mistakes

### Missing Steps

```human
# Bad: Jumps straight to generation
FLOW incomplete
  |> generate_response
  |> send_response

# Good: Includes necessary steps
FLOW complete
  |> validate_request
  |> check_rate_limit
  |> generate_response
  |> apply_safety_checks
  |> send_response
```

### Wrong Order

```human
# Bad: Generates before validating
FLOW wrong_order
  |> generate_content
  |> check_if_allowed

# Good: Validates first
FLOW right_order
  |> check_if_allowed
  |> generate_content
```

## The Philosophy of Flows

Flows make AI behavior predictable. Instead of a black box that takes input and produces output, you have a glass pipeline where each transformation is visible.

