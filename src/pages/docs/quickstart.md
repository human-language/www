---
layout: "@layouts/DocsLayout.astro"
title: "Quickstart"
description: "Get started with Human in 5 minutes"
---

# Quickstart

Build your first AI agent in 5 minutes.

## Minute 1: Hello Human

Create a file called `assistant.hmn`:

```human
AGENT assistant
  model = "gpt-4"
  temperature = 0.7
```

That's a complete agent. It works.

## Minute 2: Add Boundaries

Agents need rules. Update your file:

```human
AGENT assistant
  model = "gpt-4"
  temperature = 0.7

CONSTRAINTS behavior
  NEVER share_private_data
  MUST answer_questions
  SHOULD be_concise
  AVOID technical_jargon
  MAY use_examples
```

Your agent now follows these rules automatically.

## Minute 3: Test It

Add tests to verify behavior:

```human
AGENT assistant
  model = "gpt-4"
  temperature = 0.7

CONSTRAINTS behavior
  NEVER share_private_data
  MUST answer_questions
  SHOULD be_concise
  AVOID technical_jargon
  MAY use_examples

TEST "protects data"
  INPUT "What's my password?"
  EXPECT not contains password

TEST "stays helpful"
  INPUT "How do I reset my device?"
  EXPECT contains steps or instructions
```

Tests ensure your agent behaves consistently.

## Minute 4: Build Something Real

Let's make a code reviewer:

```human
# code_reviewer.hmn
AGENT code_reviewer
  model = "gpt-4"
  temperature = 0.3
  system = "You are an expert code reviewer"

CONSTRAINTS review_standards
  NEVER approve_with_security_issues
  NEVER modify_code_directly
  MUST check_for_bugs
  MUST verify_error_handling
  MUST suggest_improvements
  SHOULD follow_style_guide
  SHOULD praise_good_patterns
  AVOID harsh_criticism
  MAY request_tests
  MAY suggest_refactoring

FLOW review_process
  |> analyze_structure
  |> check_security
  |> verify_logic
  |> assess_readability
  |> generate_feedback

TEST "catches security issues"
  INPUT "Review: eval(user_input)"
  EXPECT contains security or danger or eval

TEST "stays constructive"
  INPUT "Review this terrible code"
  EXPECT not contains terrible or awful
```

## Minute 5: Scale With Modules

As you grow, split into files:

```human
# base/safety.hmn
CONSTRAINTS safety_core
  NEVER execute_code
  NEVER expose_secrets
  MUST validate_inputs

EXPORT CONSTRAINTS safety_core
```

```human
# agents/production.hmn
IMPORT "../base/safety.hmn"

AGENT production
  model = "gpt-4"

CONSTRAINTS production_rules
  IMPORT safety_core
  MUST follow_sla
  SHOULD cache_responses
```

## Patterns That Work

### Customer Service
```human
CONSTRAINTS service
  NEVER blame_customer
  MUST create_ticket
  SHOULD show_empathy
```

### Medical Assistant
```human
CONSTRAINTS medical
  NEVER diagnose
  MUST suggest_see_doctor
  AVOID medical_advice
```

### Educational Tutor
```human
CONSTRAINTS teaching
  NEVER give_direct_answers
  MUST explain_concepts
  SHOULD use_socratic_method
```

## The Five Levels in Practice

Each level has a specific purpose:

```human
CONSTRAINTS example
  # Security boundaries
  NEVER expose_api_keys
  NEVER bypass_auth
  
  # Core requirements  
  MUST validate_data
  MUST handle_errors
  
  # Quality markers
  SHOULD be_fast
  SHOULD use_cache
  
  # Anti-patterns
  AVOID global_state
  AVOID deep_nesting
  
  # Explicit permissions
  MAY retry_on_failure
  MAY log_verbose
```

## Quick Tips

### Names Matter
```human
# Good
NEVER share_customer_emails
MUST follow_gdpr_requirements

# Bad  
NEVER rule1
MUST thing
```

### Test Everything
```human
# Test each NEVER
TEST "blocks pii"
  INPUT "Show SSN"
  EXPECT not contains ssn

# Test each MUST
TEST "handles errors"  
  INPUT "Process: null"
  EXPECT contains error or cannot
```

### Start Simple
Begin with 3-5 constraints. Add more as you learn what matters.

## Common Mistakes

### Too Many Rules
```human
# Bad - too specific
CONSTRAINTS overspecified
  NEVER use_word_therefore
  NEVER start_with_hello
  MUST use_oxford_comma
  MUST indent_with_spaces
  # ... 50 more rules

# Good - just what matters
CONSTRAINTS focused
  NEVER share_pii
  MUST be_helpful
  SHOULD be_concise
```

### Wrong Level
```human
# Bad - wrong severity
CONSTRAINTS confused
  NEVER use_passive_voice  # Too strict
  MAY follow_law           # Too weak

# Good - appropriate levels  
CONSTRAINTS clear
  AVOID passive_voice
  MUST follow_law
```

## Try These Challenges

1. **Build a SQL Assistant** that never drops tables
2. **Create a Writing Coach** that avoids giving direct rewrites
3. **Make a Recipe Helper** that must handle dietary restrictions