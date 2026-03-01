---
title: "Your First Agent"
description: ""
sidebar:
  order: 2
---

Let's build an AI that writes a React todo app. One example, deeply understood.

## The Goal

We want an AI that generates working React todo apps with these qualities:
- Modern React (hooks, functional components)
- Clean, readable code
- Proper state management
- No security issues
- Accessible by default

Here's how Human makes this happen.

## The Agent

```human
# react_todo_agent.hmn
AGENT react_todo_builder
  model = "GPT-X"
  temperature = 0.3
  max_tokens = 3000
  system = ./prompts/react-todo-builder.md
```

Low temperature (0.3) because we want consistent, reliable code. High token limit because React components need space.

## The Constraints

Now the interesting part—shaping behavior:

```human
CONSTRAINTS react_patterns
  # Security first
  NEVER use dangerouslySetInnerHTML
  NEVER use eval
  NEVER trust user input directly
  
  # Modern React requirements
  MUST use functional components
  MUST use hooks for state
  MUST handle errors
  MUST include key props
  
  # Code quality
  SHOULD use semantic html
  SHOULD include aria labels
  SHOULD implement local storage
  SHOULD add empty state
  
  # Avoid common mistakes
  AVOID inline styles
  AVOID direct dom manipulation
  AVOID class components
  
  # Permissions
  MAY use typescript
  MAY add animations
```

Each level serves a purpose:
- **NEVER** rules prevent security vulnerabilities
- **MUST** rules ensure modern React patterns
- **SHOULD** rules improve user experience
- **AVOID** rules prevent bad practices
- **MAY** rules clarify what's allowed

## The Flow

Define how the agent processes requests:

```human
FLOW generate_todo_app
  understand requirements
  design component structure
  implement state management
  add event handlers
  apply accessibility
  optimize performance
```

This pipeline ensures systematic thinking, not random code generation.

## The Tests

Verify the agent produces quality code:

```human
TEST uses_hooks
  INPUT "Create a React todo app"
  EXPECT CONTAINS "useState"

TEST no_class_components
  INPUT "Create a React todo app"
  EXPECT NOT CONTAINS "extends React.Component"

TEST handles_empty_state
  INPUT "Create a React todo app with good UX"
  EXPECT CONTAINS "No todos"

TEST includes_accessibility
  INPUT "Create an accessible React todo app"
  EXPECT CONTAINS "aria-"

TEST saves_to_local_storage
  INPUT "Create a React todo app with persistence"
  EXPECT CONTAINS "localStorage"
```

## Complete Agent

Here's everything together:

```human
# react_todo_agent.hmn
AGENT react_todo_builder
  model = "GPT-X"
  temperature = 0.3
  max_tokens = 3000
  system = ./prompts/react-todo-builder.md

CONSTRAINTS react_patterns
  # Security boundaries
  NEVER use dangerouslySetInnerHTML
  NEVER use eval
  NEVER expose api keys
  NEVER trust user input directly
  
  # React requirements
  MUST use functional components
  MUST use hooks for state
  MUST handle errors
  MUST include key props
  MUST validate props
  
  # Quality standards
  SHOULD use semantic html
  SHOULD include aria labels
  SHOULD implement local storage
  SHOULD add empty state
  SHOULD handle edge cases
  
  # Anti-patterns
  AVOID inline styles
  AVOID direct dom manipulation
  AVOID class components
  AVOID global variables
  
  # Explicit permissions
  MAY use typescript
  MAY add animations
  MAY include css modules

FLOW generate_todo_app
  understand requirements
  design component structure
  implement state management
  add event handlers
  apply accessibility
  optimize performance

TEST uses_modern_react
  INPUT "Create a React todo app"
  EXPECT CONTAINS "useState"

TEST prevents_xss
  INPUT "Create a React todo app"
  EXPECT NOT CONTAINS "dangerouslySetInnerHTML"

TEST handles_persistence
  INPUT "Create a persistent React todo app"
  EXPECT CONTAINS "localStorage"
```

## What This Agent Produces

Given the prompt "Create a simple React todo app", this agent will generate:

```jsx
// Clean, modern React with:
// ✓ Functional components
// ✓ Hooks for state
// ✓ Proper key props
// ✓ Accessibility attributes
// ✓ LocalStorage persistence
// ✓ Empty state handling
// ✗ No eval or dangerous HTML
// ✗ No class components
```

## Understanding Each Decision

### Why temperature = 0.3?
Code needs consistency. Higher temperatures (0.7-0.9) are for creative writing. Lower temperatures produce more deterministic, reliable code.

### Why NEVER use eval?
`eval()` is a security nightmare in JavaScript. Any user input that reaches eval can execute arbitrary code. This is a hard boundary.

### Why MUST use functional components?
Class components are legacy React. Functional components with hooks are the modern standard. This isn't preference—it's best practice.

### Why SHOULD include aria labels?
Accessibility should be default, but sometimes a quick prototype doesn't need it. SHOULD makes it preferred but not blocking.

### Why AVOID inline styles?
They're not wrong, just not ideal. CSS modules or styled-components are better, but inline styles won't break anything.

### Why MAY use typescript?
It's explicitly allowed but not required. This prevents over-constraint while clarifying that TypeScript is acceptable.

## Testing Your Agent

Run these scenarios:

```bash
# Basic generation
echo "Create a React todo app" | human run react_todo_agent.hmn

# With specific requirements
echo "Create a React todo app with drag-and-drop" | human run react_todo_agent.hmn

# Test the constraints
human test react_todo_agent.hmn
```

## Iterating on Your Agent

Start simple, then refine based on output:

1. **Too verbose?** Add `SHOULD be concise`
2. **Missing features?** Add `MUST include delete functionality`
3. **Wrong styling approach?** Add `SHOULD use css modules`
4. **Too many comments?** Add `AVOID excessive comments`

## Common Adjustments

### For Production Code
```human
MUST include error boundaries
MUST add loading states
SHOULD implement optimistic updates
```

### For Learning/Tutorials
```human
MUST include explanatory comments
SHOULD show alternative approaches
MAY include console logs
```

### For Accessibility Focus
```human
MUST follow WCAG guidelines
MUST include keyboard navigation
SHOULD announce state changes
```

## The Result

This agent consistently produces React todo apps that are:
- Secure (no XSS vulnerabilities)
- Modern (hooks, functional components)
- Accessible (ARIA labels, semantic HTML)
- Persistent (localStorage integration)
- User-friendly (empty states, error handling)

Not because we wrote complex prompt engineering, but because we declared what matters.
