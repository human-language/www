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
  system = "You are a React expert who creates clean, modern, accessible todo applications using hooks, functional components, and best practices"

CONSTRAINTS react_best_practices
  # Security boundaries - prevent vulnerabilities
  NEVER use_dangerouslySetInnerHTML
  NEVER use_eval_or_Function_constructor
  NEVER trust_user_input_without_sanitization
  NEVER store_sensitive_data_in_localStorage
  NEVER use_inline_event_handlers_with_strings
  
  # Modern React requirements - enforce current standards
  MUST use_functional_components_only
  MUST use_hooks_for_state_management
  MUST include_unique_key_props
  MUST handle_errors_with_boundaries
  MUST validate_prop_types_or_typescript
  MUST prevent_xss_vulnerabilities
  MUST use_controlled_components
  
  # Accessibility requirements - WCAG compliance
  SHOULD include_aria_labels
  SHOULD support_keyboard_navigation
  SHOULD announce_state_changes
  SHOULD use_semantic_html
  SHOULD provide_focus_management
  SHOULD include_skip_links
  SHOULD maintain_focus_visible
  
  # Code quality standards - maintainable code
  AVOID inline_styles_except_dynamic
  AVOID direct_dom_manipulation
  AVOID unnecessary_re_renders
  AVOID prop_drilling_beyond_two_levels
  AVOID magic_numbers
  AVOID console_logs_in_production
  AVOID any_type_in_typescript
  
  # Feature permissions - allowed enhancements
  MAY use_typescript
  MAY add_animations_with_framer
  MAY implement_drag_and_drop
  MAY add_dark_mode
  MAY use_css_modules_or_styled
  MAY include_testing_setup

FLOW component_architecture
  |> design_component_tree
  |> identify_shared_state
  |> plan_prop_flow
  |> determine_context_needs
  |> structure_file_organization
  |> implement_components
  |> connect_state_management
  |> add_side_effects

FLOW feature_implementation
  |> implement_add_todo
  |> implement_delete_todo
  |> implement_toggle_complete
  |> implement_edit_todo
  |> add_filtering_options
  |> add_sorting_options
  |> implement_bulk_actions
  |> add_persistence
  |> implement_undo_redo
  |> add_search_functionality

FLOW accessibility_enhancement
  |> add_aria_attributes
  |> implement_keyboard_shortcuts
  |> add_screen_reader_announcements
  |> ensure_focus_management
  |> test_with_keyboard_only
  |> validate_color_contrast
  |> add_reduced_motion_support

# Component structure tests
TEST "uses functional components"
  INPUT "Create a React todo app"
  EXPECT contains "function" or "const.*=.*=>"
  EXPECT not contains "class.*extends.*Component"

TEST "implements proper hooks"
  INPUT "Create a React todo app with state"
  EXPECT contains "useState"
  EXPECT contains "useEffect"
  EXPECT proper hook usage

TEST "includes key props"
  INPUT "Create a todo list with multiple items"
  EXPECT contains "key=" or "key:"
  EXPECT not contains "key={index}" or "key={i}"

# Feature implementation tests
TEST "implements add functionality"
  INPUT "Create todo app with add feature"
  EXPECT contains "handleAdd" or "addTodo" or "onAdd"
  EXPECT contains input validation
  EXPECT contains "preventDefault"

TEST "implements delete functionality"
  INPUT "Create todo app with delete feature"
  EXPECT contains "filter" or "delete" or "remove"
  EXPECT contains confirmation or immediate

TEST "implements toggle complete"
  INPUT "Create todo app with completion toggling"
  EXPECT contains "completed" or "done" or "checked"
  EXPECT contains checkbox or toggle

TEST "implements edit functionality"
  INPUT "Create todo app with inline editing"
  EXPECT contains "edit" or "update"
  EXPECT contains save and cancel

# State management tests
TEST "uses controlled components"
  INPUT "Create todo input form"
  EXPECT contains "value=" and "onChange"
  EXPECT not contains "ref" for input value

TEST "handles empty state"
  INPUT "Create todo app with good UX"
  EXPECT contains "no todos" or "empty" or "get started"

TEST "prevents memory leaks"
  INPUT "Create todo app with subscriptions"
  EXPECT contains cleanup in useEffect
  EXPECT contains "return () =>"

# Persistence tests
TEST "implements localStorage"
  INPUT "Create persistent todo app"
  EXPECT contains "localStorage.setItem"
  EXPECT contains "localStorage.getItem"
  EXPECT contains "JSON.parse" and "JSON.stringify"

TEST "handles localStorage errors"
  INPUT "Create robust persistent todo app"
  EXPECT contains "try" and "catch"
  EXPECT handles quota exceeded

# Accessibility tests
TEST "includes ARIA labels"
  INPUT "Create accessible todo app"
  EXPECT contains "aria-label" or "aria-describedby"
  EXPECT contains "role" where needed

TEST "supports keyboard navigation"
  INPUT "Create keyboard-navigable todo app"
  EXPECT contains "onKeyDown" or "onKeyPress"
  EXPECT contains "Enter" or "Escape" handling

TEST "announces changes"
  INPUT "Create screen-reader friendly todo app"
  EXPECT contains "aria-live" or "aria-atomic"
  EXPECT contains status updates

# Security tests
TEST "prevents XSS"
  INPUT "Create secure todo app"
  EXPECT not contains "dangerouslySetInnerHTML"
  EXPECT sanitizes user input

TEST "validates input"
  INPUT "Create todo app with input validation"
  EXPECT contains "trim()" or validation
  EXPECT prevents empty todos

# Performance tests
TEST "optimizes re-renders"
  INPUT "Create performant todo app"
  EXPECT contains "useCallback" or "useMemo" or "React.memo"
  EXPECT explains optimization

TEST "handles large lists"
  INPUT "Create todo app that handles 1000+ items"
  EXPECT contains virtualization or pagination
  EXPECT mentions performance

# UI/UX tests
TEST "includes filtering"
  INPUT "Create todo app with filters (all/active/completed)"
  EXPECT contains filter logic
  EXPECT contains "all" and "active" and "completed"

TEST "shows todo count"
  INPUT "Create todo app with statistics"
  EXPECT contains count or length
  EXPECT shows remaining or completed

TEST "implements clear completed"
  INPUT "Create todo app with bulk actions"
  EXPECT contains "clear" or "remove completed"
  EXPECT contains batch operation

# Style and responsiveness tests
TEST "includes responsive design"
  INPUT "Create mobile-friendly todo app"
  EXPECT contains "responsive" or "mobile" considerations
  EXPECT mentions viewport or breakpoints

TEST "implements dark mode option"
  INPUT "Create todo app with dark mode"
  EXPECT contains theme switching
  EXPECT contains CSS variables or theme context

# Complete app test
TEST "creates production-ready app"
  INPUT "Create a complete, production-ready React todo app with all features"
  EXPECT contains add, delete, edit, toggle
  EXPECT contains localStorage
  EXPECT contains accessibility features
  EXPECT contains error handling
  EXPECT contains responsive design
  EXPECT proper component structure
  EXPECT clean code patterns
  EXPECT length > 200 lines

# Export for use in other configurations
EXPORT AGENT react_todo_generator
EXPORT CONSTRAINTS react_best_practices
EXPORT FLOW component_architecture
EXPORT FLOW feature_implementation
EXPORT FLOW accessibility_enhancement

```