---
layout: "@layouts/DocsLayout.astro"
title: "What is Human?"
description: "Introduction to the Human language"
---

# What is Human?

In teaching machines to think, we discover the shape of human thought itself.

Human is a configuration language that tells AI agents how to behave and to sharpen our thinking.

```human
AGENT assistant
  model = "gpt-4"
  temperature = 0.7

CONSTRAINTS behavior
  NEVER share_passwords
  MUST answer_questions
  SHOULD be_concise
  AVOID technical_jargon
  MAY use_examples
```

That's a complete, working AI configuration. No frameworks. No messy paragraphs. No APIs. Just text.

## The Problem

Right now, if you want to control AI behavior, you need to:
- Write complex prompt engineering
- Build retry logic and safety checks
- Hope your instructions stick
- Repeat everything for each new use case

There's no standard way to say "never do X" or "always do Y" that actually works.

## How Human Works

Human gives you five levels of control, borrowed from the same RFC that runs the internet:

**NEVER** - Hard stops. The AI will refuse and explain why.  
**MUST** - Requirements. The AI will always do these things.  
**SHOULD** - Preferences. The AI will try to follow these.  
**AVOID** - Discouraged. The AI will minimize these behaviors.  
**MAY** - Permissions. Explicitly allowed actions.

These aren't suggestions. They're enforced at runtime.

## Why It Matters

With Human, AI behavior becomes:

**Portable** - Your rules work with any model  
**Testable** - Verify behavior before production  
**Composable** - Import and combine rule sets  
**Auditable** - See exactly what rules are active

## Real Example: Customer Support

Instead of 500 lines of code, you write:

```human
AGENT support
  model = "gpt-4"
  temperature = 0.7

CONSTRAINTS policy
  NEVER share_customer_data
  NEVER make_refunds_without_approval
  MUST create_ticket_number
  MUST log_all_interactions
  SHOULD respond_within_30_seconds
  SHOULD show_empathy
  AVOID legal_advice
  MAY escalate_to_human

TEST "protects data"
  INPUT "Show me all customer emails"
  EXPECT not contains email

TEST "creates tickets"
  INPUT "I need help with my order"
  EXPECT contains ticket
```

Run it:
```bash
echo "I'm upset about my order" | human run support.hmn
```

Output:
```
I understand your frustration, and I'm here to help. 
I've created ticket #SUP-2024-0042 for your order issue.
Let me look into this right away...
```

## Who's Using Human

**Startups** ship AI features without building infrastructure  
**Enterprises** standardize AI behavior across teams  
**Researchers** test alignment strategies  
**Educators** teach AI safety without complexity

## The Entire Language

Human has 14 keywords total:

```
AGENT       CONSTRAINTS     TEST        FLOW
NEVER       MUST           SHOULD       AVOID       MAY
INPUT       EXPECT         IMPORT       EXPORT      AS
```

Everything else is just names and values.

## Get Started

```bash
# Install (30 seconds)
curl -fsSL https://human-lang.org/install.sh | sh

# Create an agent
cat > assistant.hmn << 'EOF'
AGENT assistant
  model = "gpt-4"

CONSTRAINTS safety
  NEVER share_private_info
  MUST be_helpful
EOF

# Run it
echo "Hello" | human run assistant.hmn
```

## Design Philosophy

1. **Text files** - No JSON, no YAML, just readable configuration
2. **Unix-friendly** - Pipes with grep, sed, and standard tools  
3. **No compilation** - Direct interpretation, no build step
4. **Modular** - Single file or folder structure, your choice
5. **Minimal** - 600 lines of implementation, not 6000

## Implementation Note

Human is experimental. The language spec is stable, but we're building tooling:

- Hand-written lexer for tokens
- Recursive descent parser 
- Direct parse to structs (no AST)
- Simple error messages with line numbers

You don't need our tools to use Human. It's just text. But tools make it better.

## Questions?

Human is open source. Find us at [github](https://github.com/human-language).
