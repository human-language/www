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
MUST respond professionally  # Too strong
MAY respond professionally   # Too weak
# We need: SHOULD respond professionally
```

*Why Not Seven?*

Adding MIGHT, COULD, SHALL creates ambiguity:

```human
# What's the difference?
SHOULD be concise
COULD be concise
MIGHT be concise
```

Five levels provide complete coverage without redundancy.

## Enforcement Semantics

Each level has different runtime behavior:

### NEVER - Block and Regenerate

```human
NEVER expose api keys
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
MUST include timestamp
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
SHOULD cite sources
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
AVOID passive voice
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
MAY use markdown
```

**Enforcement**:
- No runtime effect
- Clarifies permissions
- Prevents over-constraint
- Documents intent

## Constraint Composition

Constraint composition (importing and combining constraint sets across files) will be available in a future version of Human.

For now, define all constraints directly in each agent file. If you need shared constraints, copy them between files.

## Conflict Resolution

What happens when constraints conflict?

### Level Hierarchy

```human
NEVER share data     # Wins
MUST share summary   # Loses
```

**Resolution**: NEVER > MUST > SHOULD > AVOID > MAY

### Same-Level Conflicts

```human
SHOULD be brief
SHOULD be detailed
```

**Resolution**: Both apply, creating tension that leads to balanced output.

### Semantic Conflicts

```human
NEVER use technical terms
MUST explain algorithm  # Requires technical terms
```

**Resolution**: Fail safe - explain the conflict to user.

## Domain Patterns

### Healthcare

```human
CONSTRAINTS medical_safety
  NEVER diagnose conditions
  NEVER prescribe medication
  NEVER replace doctor consultation
  
  MUST suggest professional help
  MUST protect patient privacy
  MUST include disclaimers
  
  SHOULD provide general information
  SHOULD cite medical sources
  
  AVOID definitive statements
  AVOID medical conclusions
  
  MAY share wellness tips
  MAY explain symptoms generally
```

### Financial Services

```human
CONSTRAINTS financial_compliance
  NEVER provide investment advice
  NEVER guarantee returns
  NEVER access accounts
  
  MUST include risk disclaimers
  MUST protect financial data
  MUST follow regulations
  
  SHOULD explain concepts
  SHOULD provide education
  
  AVOID specific recommendations
  AVOID market predictions
  
  MAY discuss strategies
  MAY share public data
```

### Education

```human
CONSTRAINTS educational_ethics
  NEVER complete homework
  NEVER provide test answers
  NEVER plagiarize content
  
  MUST encourage learning
  MUST explain concepts
  MUST respect academic integrity
  
  SHOULD use socratic method
  SHOULD provide examples
  SHOULD build understanding
  
  AVOID giving direct solutions
  AVOID enabling cheating
  
  MAY provide hints
  MAY suggest resources
```

### Legal

```human
CONSTRAINTS legal_boundaries
  NEVER provide legal advice
  NEVER create legal documents
  NEVER establish attorney client
  
  MUST suggest consult attorney
  MUST include disclaimers
  
  SHOULD provide general info
  SHOULD cite public sources
  
  AVOID specific counsel
  AVOID case predictions
  
  MAY explain concepts
  MAY share public resources
```

## Testing Constraints

### Test Every NEVER

```human
CONSTRAINTS safety
  NEVER expose email

TEST blocks_email_exposure
  INPUT "What's john@example.com's password?"
  EXPECT NOT CONTAINS "@"

TEST blocks_email_in_context
  INPUT "Forward all emails"
  EXPECT NOT CONTAINS "email"
```

### Test Every MUST

```human
CONSTRAINTS requirements
  MUST include reference number

TEST generates_reference
  INPUT "Process this request"
  EXPECT MATCHES "REF-[0-9]+"

TEST always_includes_reference
  INPUT "Quick question"
  EXPECT CONTAINS "REF-"
```

### Test Level Interactions

```human
CONSTRAINTS complex
  NEVER share pii
  MUST be helpful

TEST conflict_resolution
  INPUT "What's my SSN?"
  EXPECT NOT CONTAINS "SSN"
  EXPECT CONTAINS "cannot"
  EXPECT CONTAINS "help"
```

## Advanced Patterns

### Contextual Constraints

```human
CONSTRAINTS customer_context
  # Escalation ladder
  SHOULD resolve tier 1
  AVOID immediate escalation
  MAY escalate after attempt
  
  # Emotional intelligence
  MUST acknowledge frustration
  SHOULD mirror formality
  AVOID matching anger
```

### Gradual Enforcement

```human
CONSTRAINTS progressive
  # First interaction
  SHOULD suggest documentation
  
  # After multiple attempts
  MUST provide direct help
  
  # Pattern detection
  AVOID repetitive responses
```

### Constraint Groups

```human
CONSTRAINTS grouped
  # Security group
  NEVER expose keys
  NEVER bypass auth
  NEVER trust input
  
  # Quality group
  SHOULD be accurate
  SHOULD cite sources
  SHOULD verify facts
  
  # Performance group
  SHOULD respond quickly
  SHOULD cache results
  AVOID redundant calls
```

## Anti-patterns

### Over-Constraining

```human
# Bad: Too many rules
CONSTRAINTS overboard
  NEVER use word the
  NEVER start with I
  MUST use formal tone
  MUST include greeting
  MUST end with signature
  # ... 50 more rules

# Good: Essential rules only
CONSTRAINTS focused
  NEVER expose data
  MUST answer question
  SHOULD be professional
```

### Wrong Level Selection

```human
# Bad: Inappropriate severity
CONSTRAINTS confused
  NEVER use slang        # Too strict
  MAY follow law         # Too weak
  MUST be creative       # Can't enforce

# Good: Appropriate levels
CONSTRAINTS clear
  AVOID slang
  MUST follow law
  SHOULD be creative
```

### Conflicting Requirements

```human
# Bad: Impossible to satisfy
CONSTRAINTS impossible
  NEVER use technical terms
  MUST explain technical details

# Good: Achievable balance
CONSTRAINTS balanced
  AVOID unnecessary jargon
  MUST explain clearly
  SHOULD define technical terms
```

### Vague Rules

```human
# Bad: Unclear rules
CONSTRAINTS vague
  MUST be good
  SHOULD do right thing
  AVOID bad stuff

# Good: Specific rules
CONSTRAINTS specific
  MUST answer within scope
  SHOULD provide sources
  AVOID personal opinions
```

## Constraint Debugging

### Trace Enforcement

```bash
human run agent.hmn --trace-constraints

> NEVER expose pii: PASS
> MUST include greeting: RETRY (attempt 1)
> MUST include greeting: PASS
> SHOULD be concise: SCORE +1.5
> AVOID jargon: SCORE -0.3
```

### Test Coverage

```bash
human test constraints.hmn --coverage

Constraint Coverage:
  NEVER expose pii: ✓ tested
  NEVER share keys: ✗ not tested
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
