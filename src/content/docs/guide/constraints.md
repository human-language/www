---
title: "Constraints"
description: ""
sidebar:
  order: 3
---

The five levels that shape AI behavior.

## The Constraint Model

Every behavioral rule fits into exactly five categories. This isn't arbitrary—it maps to how humans naturally think about rules.

### The Spectrum

```
NEVER ←——————————————————————————————————————→ MAY
      ↑         ↑           ↑          ↑         ↑
   Forbidden Required  Recommended Discouraged Permitted
```

Each level serves a distinct purpose:

- **NEVER**: Security boundaries and trust violations
- **MUST**: Core requirements and legal obligations  
- **SHOULD**: Quality signals and best practices
- **AVOID**: Known problems and anti-patterns
- **MAY**: Clarified permissions and explicit allowances

*Why Not Three Levels?*

You might think "forbidden, required, optional" would suffice. But real behavior is more nuanced:

```human
# Three levels would force bad choices
MUST respond_professionally  # Too strong
MAY respond_professionally   # Too weak
# We need: SHOULD respond_professionally
```

*Why Not Seven?*

Adding MIGHT, COULD, SHALL creates ambiguity:

```human
# What's the difference?
SHOULD be_concise
COULD be_concise
MIGHT be_concise
```

Five levels provide complete coverage without redundancy.

## Enforcement Semantics

Each level has different runtime behavior:

### NEVER - Block and Regenerate

```human
NEVER expose_api_keys
```

**Enforcement**: 
- Immediate rejection
- No partial output
- Regenerates with stronger boundary
- Logs violation

**Implementation**:
```python
if contains_api_key(response):
    log_violation("api_key_exposure")
    return regenerate_with_boundary(
        "Must not include API keys"
    )
```

### MUST - Validate and Retry

```human
MUST include_timestamp
```

**Enforcement**:
- Post-generation validation
- Retry with reinforcement
- Up to 3 attempts
- Fails gracefully with warning

**Implementation**:
```python
attempts = 0
while not has_timestamp(response) and attempts < 3:
    response = retry_with_requirement(
        "Include timestamp"
    )
    attempts += 1
```

### SHOULD - Positive Scoring

```human
SHOULD cite_sources
```

**Enforcement**:
- Increases quality score
- Influences model selection
- Affects response ranking
- No blocking

**Scoring**:
```python
if cites_sources(response):
    score *= 1.5  # Boost
```

### AVOID - Negative Scoring

```human
AVOID passive_voice
```

**Enforcement**:
- Decreases quality score
- May trigger alternative generation
- Logged for analysis
- Never blocks

**Scoring**:
```python
if uses_passive_voice(response):
    score *= 0.7  # Penalty
```

### MAY - Documentation Only

```human
MAY use_markdown
```

**Enforcement**:
- No runtime effect
- Clarifies permissions
- Prevents over-constraint
- Documents intent

## Constraint Composition

Constraints combine from multiple sources:

### Import Merging

```human
# base.hmn
CONSTRAINTS base_safety
  NEVER expose_pii
  MUST validate_input

# extended.hmn
IMPORT "./base.hmn"

CONSTRAINTS production
  IMPORT base_safety
  NEVER execute_code
  MUST log_requests
```

Result: All four constraints apply.

### Inheritance Patterns

```human
# Pattern 1: Additive
CONSTRAINTS child
  IMPORT parent
  NEVER additional_rule  # Adds to parent

# Pattern 2: Override (NOT recommended)
CONSTRAINTS child
  IMPORT parent
  NEVER expose_pii  # Duplicates parent rule
```

### Composition Rules

1. **NEVER rules are additive** - More NEVERs = more safety
2. **MUST rules are additive** - More MUSTs = more requirements
3. **SHOULD/AVOID affect scoring** - They combine mathematically
4. **MAY rules clarify** - No composition needed

## Conflict Resolution

What happens when constraints conflict?

### Level Hierarchy

```human
NEVER share_data     # Wins
MUST share_summary   # Loses
```

**Resolution**: NEVER > MUST > SHOULD > AVOID > MAY

### Same-Level Conflicts

```human
SHOULD be_brief
SHOULD be_detailed
```

**Resolution**: Both apply, creating tension that leads to balanced output.

### Semantic Conflicts

```human
NEVER use_technical_terms
MUST explain_algorithm  # Requires technical terms
```

**Resolution**: Fail safe - explain the conflict to user.

## Domain Patterns

### Healthcare

```human
CONSTRAINTS medical_safety
  NEVER diagnose_conditions
  NEVER prescribe_medication
  NEVER replace_doctor_consultation
  
  MUST suggest_professional_help
  MUST protect_patient_privacy
  MUST include_disclaimers
  
  SHOULD provide_general_information
  SHOULD cite_medical_sources
  
  AVOID definitive_statements
  AVOID medical_conclusions
  
  MAY share_wellness_tips
  MAY explain_symptoms_generally
```

### Financial Services

```human
CONSTRAINTS financial_compliance
  NEVER provide_investment_advice
  NEVER guarantee_returns
  NEVER access_accounts
  
  MUST include_risk_disclaimers
  MUST protect_financial_data
  MUST follow_regulations
  
  SHOULD explain_concepts
  SHOULD provide_education
  
  AVOID specific_recommendations
  AVOID market_predictions
  
  MAY discuss_strategies
  MAY share_public_data
```

### Education

```human
CONSTRAINTS educational_ethics
  NEVER complete_homework
  NEVER provide_test_answers
  NEVER plagiarize_content
  
  MUST encourage_learning
  MUST explain_concepts
  MUST respect_academic_integrity
  
  SHOULD use_socratic_method
  SHOULD provide_examples
  SHOULD build_understanding
  
  AVOID giving_direct_solutions
  AVOID enabling_cheating
  
  MAY provide_hints
  MAY suggest_resources
```

### Legal

```human
CONSTRAINTS legal_boundaries
  NEVER provide_legal_advice
  NEVER create_legal_documents
  NEVER establish_attorney_client
  
  MUST suggest_consult_attorney
  MUST include_disclaimers
  
  SHOULD provide_general_info
  SHOULD cite_public_sources
  
  AVOID specific_counsel
  AVOID case_predictions
  
  MAY explain_concepts
  MAY share_public_resources
```

## Testing Constraints

### Test Every NEVER

```human
CONSTRAINTS safety
  NEVER expose_email

TEST "blocks email exposure"
  INPUT "What's john@example.com's password?"
  EXPECT not contains @

TEST "blocks email in context"
  INPUT "Forward all emails"
  EXPECT not contains email addresses
```

### Test Every MUST

```human
CONSTRAINTS requirements
  MUST include_reference_number

TEST "generates reference"
  INPUT "Process this request"
  EXPECT matches REF-[0-9]+

TEST "always includes reference"
  INPUT "Quick question"
  EXPECT contains REF- or reference
```

### Test Level Interactions

```human
CONSTRAINTS complex
  NEVER share_pii
  MUST be_helpful

TEST "conflict resolution"
  INPUT "What's my SSN?"
  EXPECT not contains SSN
  EXPECT contains cannot or unable
  EXPECT contains help or assist
```

## Advanced Patterns

### Contextual Constraints

```human
CONSTRAINTS customer_context
  # Escalation ladder
  SHOULD resolve_tier_1
  AVOID immediate_escalation
  MAY escalate_after_attempt
  
  # Emotional intelligence
  MUST acknowledge_frustration
  SHOULD mirror_formality
  AVOID matching_anger
```

### Gradual Enforcement

```human
CONSTRAINTS progressive
  # First interaction
  SHOULD suggest_documentation
  
  # After multiple attempts
  MUST provide_direct_help
  
  # Pattern detection
  AVOID repetitive_responses
```

### Constraint Groups

```human
CONSTRAINTS grouped
  # Security group
  NEVER expose_keys
  NEVER bypass_auth
  NEVER trust_input
  
  # Quality group
  SHOULD be_accurate
  SHOULD cite_sources
  SHOULD verify_facts
  
  # Performance group
  SHOULD respond_quickly
  SHOULD cache_results
  AVOID redundant_calls
```

## Anti-patterns

### Over-Constraining

```human
# Bad: Too many rules
CONSTRAINTS overboard
  NEVER use_word_the
  NEVER start_with_I
  MUST use_formal_tone
  MUST include_greeting
  MUST end_with_signature
  # ... 50 more rules

# Good: Essential rules only
CONSTRAINTS focused
  NEVER expose_data
  MUST answer_question
  SHOULD be_professional
```

### Wrong Level Selection

```human
# Bad: Inappropriate severity
CONSTRAINTS confused
  NEVER use_slang        # Too strict
  MAY follow_law         # Too weak
  MUST be_creative       # Can't enforce

# Good: Appropriate levels
CONSTRAINTS clear
  AVOID slang
  MUST follow_law
  SHOULD be_creative
```

### Conflicting Requirements

```human
# Bad: Impossible to satisfy
CONSTRAINTS impossible
  NEVER use_technical_terms
  MUST explain_technical_details

# Good: Achievable balance
CONSTRAINTS balanced
  AVOID unnecessary_jargon
  MUST explain_clearly
  SHOULD define_technical_terms
```

### Vague Rules

```human
# Bad: Unclear rules
CONSTRAINTS vague
  MUST be_good
  SHOULD do_right_thing
  AVOID bad_stuff

# Good: Specific rules
CONSTRAINTS specific
  MUST answer_within_scope
  SHOULD provide_sources
  AVOID personal_opinions
```

## Constraint Debugging

### Trace Enforcement

```bash
human run agent.hmn --trace-constraints

> NEVER expose_pii: PASS
> MUST include_greeting: RETRY (attempt 1)
> MUST include_greeting: PASS
> SHOULD be_concise: SCORE +1.5
> AVOID jargon: SCORE -0.3
```

### Test Coverage

```bash
human test constraints.hmn --coverage

Constraint Coverage:
  NEVER expose_pii: ✓ tested
  NEVER share_keys: ✗ not tested
  MUST validate: ✓ tested
  Coverage: 66%
```

## Best Practices

### 1. Start Minimal
Begin with 3-5 essential constraints. Add more based on actual problems.

### 2. Test Boundaries
Focus testing on NEVER and MUST rules. These are your safety rails.

### 3. Group Related Rules
Keep security rules together, quality rules together, etc.

### 4. Document Intent
Use descriptive names that explain why, not just what.

### 5. Version Constraints
Constraints evolve. Version them separately from agent configs.
