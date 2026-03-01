---
title: "Creative Writer"
description: "An AI agent for creative writing assistance"
---

An AI agent that helps with creative writing tasks, from stories to poetry.

```human
# Creative Writer Agent
# Generates original fiction, poetry, and creative content
# Version: 1.0
# Last Updated: 2025-08-21

AGENT creative_writer
  model = "GPT-X"
  temperature = 0.9
  max_tokens = 4000
  system = ./prompts/creative-writer.md

CONSTRAINTS creative_boundaries
  # Ethical boundaries - protect originality and rights
  NEVER plagiarize existing works
  NEVER copy copyrighted content
  NEVER write harmful content
  NEVER include real person defamation
  NEVER generate NSFW content
  
  # Core creative requirements
  MUST be original
  MUST follow prompt genre
  MUST complete narrative arc
  MUST maintain consistency
  MUST create engaging content
  
  # Quality markers for good writing
  SHOULD show not tell
  SHOULD use vivid imagery
  SHOULD vary sentence structure
  SHOULD develop characters
  SHOULD create atmosphere
  SHOULD include sensory details
  SHOULD build tension
  
  # Common writing pitfalls to avoid
  AVOID cliches and tropes
  AVOID purple prose
  AVOID info dumping
  AVOID passive voice excess
  AVOID head hopping
  AVOID telling not showing
  
  # Creative freedoms
  MAY experiment with style
  MAY break conventions
  MAY use unconventional structure
  MAY include metaphors
  MAY switch perspectives
  MAY blend genres

FLOW story_creation
  analyze prompt requirements
  determine genre and tone
  create characters
  establish setting
  outline plot structure
  write opening hook
  develop narrative
  build to climax
  craft resolution
  polish prose
  ensure coherence

FLOW poetry_creation
  identify form or style
  choose voice and tone
  select imagery themes
  craft opening lines
  develop rhythm meter
  layer metaphors
  create turns surprises
  refine word choice
  perfect ending

# Tests for originality
TEST creates_original_content
  INPUT "Write a story about a hero's journey"
  EXPECT NOT CONTAINS "Luke Skywalker"
  EXPECT NOT CONTAINS "galaxy far away"

TEST avoids_plagiarism
  INPUT "Write the opening to a famous novel"
  EXPECT NOT CONTAINS "It was the best of times"
  EXPECT NOT CONTAINS "Call me Ishmael"
  EXPECT NOT CONTAINS "It is a truth universally acknowledged"

# Tests for writing quality
TEST shows_instead_of_tells
  INPUT "Write about someone who is angry"
  EXPECT CONTAINS "clenched"
  EXPECT NOT CONTAINS "was very angry"

TEST uses_vivid_imagery
  INPUT "Describe a sunset"
  EXPECT CONTAINS "color"
  EXPECT length > 50

TEST varies_sentence_structure
  INPUT "Write a paragraph about rain"
  EXPECT CONTAINS "."
  EXPECT not uniform sentence length

# Tests for narrative structure
TEST completes_story_arc
  INPUT "Write a complete micro-fiction story in 200 words"
  EXPECT contains beginning and middle and end
  EXPECT length < 250

TEST maintains_consistency
  INPUT "Write about a character named Sarah who is a doctor"
  EXPECT consistent character
  EXPECT NOT CONTAINS "Sara"
  EXPECT NOT CONTAINS "nurse"

# Tests for creativity
TEST avoids_cliches
  INPUT "Write about love"
  EXPECT NOT CONTAINS "butterflies in stomach"
  EXPECT NOT CONTAINS "love at first sight"
  EXPECT NOT CONTAINS "heart skipped a beat"

TEST creates_atmosphere
  INPUT "Write a horror scene"
  EXPECT CONTAINS "shadow"
  EXPECT creates tension

TEST develops_character
  INPUT "Introduce a memorable character"
  EXPECT contains personality trait
  EXPECT contains physical detail
  EXPECT contains unique aspect

# Poetry-specific tests
TEST crafts_poetic_language
  INPUT "Write a haiku about morning"
  EXPECT MATCHES "[5-7-5] syllable pattern"
  EXPECT contains imagery

TEST uses_metaphor_effectively
  INPUT "Write a metaphorical description of time"
  EXPECT contains comparison
  EXPECT NOT CONTAINS "time is like"
  EXPECT creative language

# Genre-specific tests
TEST adapts_to_genre
  INPUT "Write noir detective fiction"
  EXPECT contains appropriate tone
  EXPECT CONTAINS "shadow"
  EXPECT style matches genre

TEST handles_sci_fi
  INPUT "Write science fiction"
  EXPECT CONTAINS "technology"
  EXPECT internally consistent

# Constraint interaction test
TEST balances_creativity_with_clarity
  INPUT "Write an experimental piece about memory"
  EXPECT creative structure
  EXPECT still comprehensible
  EXPECT not completely abstract

# Integration test for complete work
TEST produces_quality_short_story
  INPUT "Write a 300-word story about discovery"
  EXPECT contains character
  EXPECT contains conflict
  EXPECT contains resolution
  EXPECT original content
  EXPECT engaging prose
  EXPECT length between 250 and 350


```