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
  system = "You are an expert React developer who 
  writes clean, modern todo applications"
```

Low temperature (0.3) because we want consistent, reliable code. High token limit because React components need space.

## The Constraints

Now the interesting part—shaping behavior:

```human
CONSTRAINTS react_patterns
  # Security first
  NEVER use_dangerouslySetInnerHTML
  NEVER use_eval
  NEVER trust_user_input_directly
  
  # Modern React requirements
  MUST use_functional_components
  MUST use_hooks_for_state
  MUST handle_errors
  MUST include_key_props
  
  # Code quality
  SHOULD use_semantic_html
  SHOULD include_aria_labels
  SHOULD implement_local_storage
  SHOULD add_empty_state
  
  # Avoid common mistakes
  AVOID inline_styles
  AVOID direct_dom_manipulation
  AVOID class_components
  
  # Permissions
  MAY use_typescript
  MAY add_animations
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
  |> understand_requirements
  |> design_component_structure
  |> implement_state_management
  |> add_event_handlers
  |> apply_accessibility
  |> optimize_performance
```

This pipeline ensures systematic thinking, not random code generation.

## The Tests

Verify the agent produces quality code:

```human
TEST "uses hooks"
  INPUT "Create a React todo app"
  EXPECT contains useState

TEST "no class components"
  INPUT "Create a React todo app"
  EXPECT not contains extends React.Component

TEST "handles empty state"
  INPUT "Create a React todo app with good UX"
  EXPECT contains "No todos" or "empty"

TEST "includes accessibility"
  INPUT "Create an accessible React todo app"
  EXPECT contains aria- or role=

TEST "saves to localStorage"
  INPUT "Create a React todo app with persistence"
  EXPECT contains localStorage
```

## Complete Agent

Here's everything together:

```human
# react_todo_agent.hmn
AGENT react_todo_builder
  model = "GPT-X"
  temperature = 0.3
  max_tokens = 3000
  system = "You are an expert React developer who writes clean, modern todo applications"

CONSTRAINTS react_patterns
  # Security boundaries
  NEVER use_dangerouslySetInnerHTML
  NEVER use_eval
  NEVER expose_api_keys
  NEVER trust_user_input_directly
  
  # React requirements
  MUST use_functional_components
  MUST use_hooks_for_state
  MUST handle_errors
  MUST include_key_props
  MUST validate_props
  
  # Quality standards
  SHOULD use_semantic_html
  SHOULD include_aria_labels
  SHOULD implement_local_storage
  SHOULD add_empty_state
  SHOULD handle_edge_cases
  
  # Anti-patterns
  AVOID inline_styles
  AVOID direct_dom_manipulation
  AVOID class_components
  AVOID global_variables
  
  # Explicit permissions
  MAY use_typescript
  MAY add_animations
  MAY include_css_modules

FLOW generate_todo_app
  |> understand_requirements
  |> design_component_structure
  |> implement_state_management
  |> add_event_handlers
  |> apply_accessibility
  |> optimize_performance

TEST "uses modern React"
  INPUT "Create a React todo app"
  EXPECT contains useState and useEffect

TEST "prevents XSS"
  INPUT "Create a React todo app"
  EXPECT not contains dangerouslySetInnerHTML

TEST "handles persistence"
  INPUT "Create a persistent React todo app"
  EXPECT contains localStorage
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

### Why NEVER use_eval?
`eval()` is a security nightmare in JavaScript. Any user input that reaches eval can execute arbitrary code. This is a hard boundary.

### Why MUST use_functional_components?
Class components are legacy React. Functional components with hooks are the modern standard. This isn't preference—it's best practice.

### Why SHOULD include_aria_labels?
Accessibility should be default, but sometimes a quick prototype doesn't need it. SHOULD makes it preferred but not blocking.

### Why AVOID inline_styles?
They're not wrong, just not ideal. CSS modules or styled-components are better, but inline styles won't break anything.

### Why MAY use_typescript?
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

1. **Too verbose?** Add `SHOULD be_concise`
2. **Missing features?** Add `MUST include_delete_functionality`
3. **Wrong styling approach?** Add `SHOULD use_css_modules`
4. **Too many comments?** Add `AVOID excessive_comments`

## Common Adjustments

### For Production Code
```human
MUST include_error_boundaries
MUST add_loading_states
SHOULD implement_optimistic_updates
```

### For Learning/Tutorials
```human
MUST include_explanatory_comments
SHOULD show_alternative_approaches
MAY include_console_logs
```

### For Accessibility Focus
```human
MUST follow_wcag_guidelines
MUST include_keyboard_navigation
SHOULD announce_state_changes
```

## The Result

This agent consistently produces React todo apps that are:
- Secure (no XSS vulnerabilities)
- Modern (hooks, functional components)
- Accessible (ARIA labels, semantic HTML)
- Persistent (localStorage integration)
- User-friendly (empty states, error handling)

Not because we wrote complex prompt engineering, but because we declared what matters.
