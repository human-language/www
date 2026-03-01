---
title: "React Todo App"
description: "Building a React Todo application with Human"
---

Learn how to build a complete React Todo application using Human.

```human
# React Todo App Generator
# Creates modern, accessible, and feature-rich todo applications
# Version: 1.0
# Last Updated: 2024-01-15

AGENT react_todo_generator
  model = "gpt-4"
  temperature = 0.3
  max_tokens = 5000
  system = ./prompts/react-todo-generator.md

CONSTRAINTS react_best_practices
  # Security boundaries - prevent vulnerabilities
  NEVER use dangerouslySetInnerHTML
  NEVER use eval or Function constructor
  NEVER trust user input without sanitization
  NEVER store sensitive data in localStorage
  NEVER use inline event handlers with strings
  
  # Modern React requirements - enforce current standards
  MUST use functional components only
  MUST use hooks for state management
  MUST include unique key props
  MUST handle errors with boundaries
  MUST validate prop types or typescript
  MUST prevent XSS vulnerabilities
  MUST use controlled components
  
  # Accessibility requirements - WCAG compliance
  SHOULD include aria labels
  SHOULD support keyboard navigation
  SHOULD announce state changes
  SHOULD use semantic html
  SHOULD provide focus management
  SHOULD include skip links
  SHOULD maintain focus visible
  
  # Code quality standards - maintainable code
  AVOID inline styles except dynamic
  AVOID direct dom manipulation
  AVOID unnecessary re-renders
  AVOID prop drilling beyond two levels
  AVOID magic numbers
  AVOID console logs in production
  AVOID any type in typescript
  
  # Feature permissions - allowed enhancements
  MAY use typescript
  MAY add animations with framer
  MAY implement drag and drop
  MAY add dark mode
  MAY use css modules or styled
  MAY include testing setup

FLOW component_architecture
  design component tree
  identify shared state
  plan prop flow
  determine context needs
  structure file organization
  implement components
  connect state management
  add side effects

FLOW feature_implementation
  implement add todo
  implement delete todo
  implement toggle complete
  implement edit todo
  add filtering options
  add sorting options
  implement bulk actions
  add persistence
  implement undo redo
  add search functionality

FLOW accessibility_enhancement
  add aria attributes
  implement keyboard shortcuts
  add screen reader announcements
  ensure focus management
  test with keyboard only
  validate color contrast
  add reduced motion support

# Component structure tests
TEST uses_functional_components
  INPUT "Create a React todo app"
  EXPECT CONTAINS "function"
  EXPECT NOT CONTAINS "class"

TEST implements_proper_hooks
  INPUT "Create a React todo app with state"
  EXPECT CONTAINS "useState"
  EXPECT CONTAINS "useEffect"
  EXPECT proper hook usage

TEST includes_key_props
  INPUT "Create a todo list with multiple items"
  EXPECT CONTAINS "key="
  EXPECT NOT CONTAINS "key={index}"

# Feature implementation tests
TEST implements_add_functionality
  INPUT "Create todo app with add feature"
  EXPECT CONTAINS "addTodo"
  EXPECT contains input validation
  EXPECT CONTAINS "preventDefault"

TEST implements_delete_functionality
  INPUT "Create todo app with delete feature"
  EXPECT CONTAINS "filter"
  EXPECT contains confirmation or immediate

TEST implements_toggle_complete
  INPUT "Create todo app with completion toggling"
  EXPECT CONTAINS "completed"
  EXPECT contains checkbox or toggle

TEST implements_edit_functionality
  INPUT "Create todo app with inline editing"
  EXPECT CONTAINS "edit"
  EXPECT contains save and cancel

# State management tests
TEST uses_controlled_components
  INPUT "Create todo input form"
  EXPECT CONTAINS "value="
  EXPECT NOT CONTAINS "ref"

TEST handles_empty_state
  INPUT "Create todo app with good UX"
  EXPECT CONTAINS "no todos"

TEST prevents_memory_leaks
  INPUT "Create todo app with subscriptions"
  EXPECT contains cleanup in useEffect
  EXPECT CONTAINS "return () =>"

# Persistence tests
TEST implements_local_storage
  INPUT "Create persistent todo app"
  EXPECT CONTAINS "localStorage.setItem"
  EXPECT CONTAINS "localStorage.getItem"
  EXPECT CONTAINS "JSON.parse"

TEST handles_local_storage_errors
  INPUT "Create robust persistent todo app"
  EXPECT CONTAINS "try"
  EXPECT handles quota exceeded

# Accessibility tests
TEST includes_aria_labels
  INPUT "Create accessible todo app"
  EXPECT CONTAINS "aria-label"
  EXPECT CONTAINS "role"

TEST supports_keyboard_navigation
  INPUT "Create keyboard-navigable todo app"
  EXPECT CONTAINS "onKeyDown"
  EXPECT CONTAINS "Enter"

TEST announces_changes
  INPUT "Create screen-reader friendly todo app"
  EXPECT CONTAINS "aria-live"
  EXPECT contains status updates

# Security tests
TEST prevents_xss
  INPUT "Create secure todo app"
  EXPECT NOT CONTAINS "dangerouslySetInnerHTML"
  EXPECT sanitizes user input

TEST validates_input
  INPUT "Create todo app with input validation"
  EXPECT CONTAINS "trim()"
  EXPECT prevents empty todos

# Performance tests
TEST optimizes_re_renders
  INPUT "Create performant todo app"
  EXPECT CONTAINS "useCallback"
  EXPECT explains optimization

TEST handles_large_lists
  INPUT "Create todo app that handles 1000+ items"
  EXPECT CONTAINS "virtualization"
  EXPECT mentions performance

# UI/UX tests
TEST includes_filtering
  INPUT "Create todo app with filters (all/active/completed)"
  EXPECT contains filter logic
  EXPECT CONTAINS "all"

TEST shows_todo_count
  INPUT "Create todo app with statistics"
  EXPECT CONTAINS "count"
  EXPECT shows remaining or completed

TEST implements_clear_completed
  INPUT "Create todo app with bulk actions"
  EXPECT CONTAINS "clear"
  EXPECT contains batch operation

# Style and responsiveness tests
TEST includes_responsive_design
  INPUT "Create mobile-friendly todo app"
  EXPECT CONTAINS "responsive"
  EXPECT mentions viewport or breakpoints

TEST implements_dark_mode_option
  INPUT "Create todo app with dark mode"
  EXPECT contains theme switching
  EXPECT contains CSS variables or theme context

# Complete app test
TEST creates_production_ready_app
  INPUT "Create a complete, production-ready React todo app with all features"
  EXPECT contains add, delete, edit, toggle
  EXPECT CONTAINS "localStorage"
  EXPECT contains accessibility features
  EXPECT contains error handling
  EXPECT contains responsive design
  EXPECT proper component structure
  EXPECT clean code patterns
  EXPECT length > 200 lines

```
