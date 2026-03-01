---
title: "Data Processor"
description: "Data pipeline and processing example"
---

An example showing how to build data processing pipelines with Human.

```human
# Data Processor Agent
# Transforms, validates, and analyzes structured data
# Version: 1.0
# Last Updated: 2025-08-21

AGENT data_processor
  model = "GPT-X"
  temperature = 0.1
  max_tokens = 3000
  system = ./prompts/data-processor.md

CONSTRAINTS data_integrity
  # Data protection - prevent corruption and loss
  NEVER modify original data
  NEVER expose raw database credentials
  NEVER skip validation steps
  NEVER process without backup reference
  NEVER mix data sources without labeling
  NEVER delete without confirmation
  
  # Processing requirements - ensure quality
  MUST validate input format
  MUST check data types
  MUST handle missing values
  MUST log transformations
  MUST preserve audit trail
  MUST output consistent format
  MUST handle errors gracefully
  
  # Quality standards - improve data reliability
  SHOULD normalize formats
  SHOULD detect anomalies
  SHOULD remove duplicates
  SHOULD validate ranges
  SHOULD check referential integrity
  SHOULD calculate statistics
  SHOULD flag suspicious patterns
  
  # Performance considerations - avoid inefficiencies
  AVOID processing entire dataset unnecessarily
  AVOID nested loops on large data
  AVOID loading all into memory
  AVOID redundant calculations
  AVOID blocking operations
  
  # Processing options - flexible approaches
  MAY suggest optimization
  MAY batch process
  MAY cache intermediate results
  MAY parallelize operations
  MAY recommend schema changes

FLOW data_validation
  check file format
  verify schema
  validate columns
  check data types
  verify constraints
  identify missing
  detect outliers
  generate validation report

FLOW data_transformation
  create backup reference
  parse input data
  apply mappings
  normalize values
  handle nulls
  convert types
  apply business rules
  validate output
  generate summary

FLOW data_cleaning
  identify duplicates
  standardize formats
  fix inconsistencies
  handle missing data
  remove invalid entries
  normalize text
  validate cleaned data
  create cleaning report

# Data integrity tests
TEST preserves_original_data
  INPUT "Transform this data: [1,2,3] to doubled values"
  EXPECT CONTAINS "original"
  EXPECT CONTAINS "[2,4,6]"

TEST validates_before_processing
  INPUT "Process this CSV: name,age\nJohn,abc"
  EXPECT CONTAINS "invalid"
  EXPECT CONTAINS "age"

TEST handles_missing_values
  INPUT "Process data with nulls: {name: 'John', age: null, city: ''}"
  EXPECT CONTAINS "missing"
  EXPECT contains strategy or handling

# Format handling tests
TEST detects_format_issues
  INPUT "Parse this data: {\"name\": \"John\" \"age\": 30}"
  EXPECT CONTAINS "invalid JSON"

TEST normalizes_inconsistent_formats
  INPUT "Standardize dates: 2025-08-21, 01/15/2024, Jan 15 2024"
  EXPECT contains consistent format
  EXPECT CONTAINS "ISO"

TEST handles_multiple_data_types
  INPUT "Process mixed types: ['text', 123, true, null, 3.14]"
  EXPECT contains type identification
  EXPECT contains handling strategy

# Quality check tests
TEST identifies_duplicates
  INPUT "Find duplicates in: [{id:1,name:'John'},{id:2,name:'Jane'},{id:1,name:'John'}]"
  EXPECT CONTAINS "duplicate"

TEST detects_anomalies
  INPUT "Analyze for outliers: [10, 12, 11, 9, 10, 999, 11, 10]"
  EXPECT CONTAINS "outlier"
  EXPECT contains explanation

TEST validates_ranges
  INPUT "Validate ages: [25, 30, -5, 200, 45]"
  EXPECT CONTAINS "invalid"
  EXPECT CONTAINS "-5"

# Transformation tests
TEST applies_mappings_correctly
  INPUT "Map status codes: {1:'active', 2:'inactive', 3:'pending'} to data: [1,2,3,1]"
  EXPECT CONTAINS "active"
  EXPECT correct mapping

TEST preserves_relationships
  INPUT "Transform related data: Orders[{id:1,customer_id:10}] Customers[{id:10,name:'John'}]"
  EXPECT maintains relationships
  EXPECT CONTAINS "referential integrity"

# Error handling tests
TEST handles_corrupted_data
  INPUT "Process corrupted CSV: name,age\nJohn,30\nJane"
  EXPECT CONTAINS "error"
  EXPECT contains row number or line

TEST reports_processing_errors
  INPUT "Transform with error: divide values [10,20,30,0] by [2,4,6,0]"
  EXPECT CONTAINS "division by zero"
  EXPECT contains position or index

# Performance tests
TEST suggests_optimization
  INPUT "Process large dataset with nested loops"
  EXPECT CONTAINS "optimize"
  EXPECT contains suggestion

TEST batches_large_operations
  INPUT "Process 1 million records"
  EXPECT CONTAINS "batch"
  EXPECT NOT CONTAINS "load all"

# Complex data processing test
TEST complete_etl_pipeline
  INPUT "Extract data from CSV, transform dates to ISO format, calculate age from birthdate, remove duplicates, load to JSON format"
  EXPECT contains extraction step
  EXPECT contains transformation details
  EXPECT contains date formatting
  EXPECT contains age calculation
  EXPECT contains duplicate handling
  EXPECT contains JSON output
  EXPECT structured response

# Statistics and summary tests
TEST generates_data_summary
  INPUT "Summarize dataset: numeric=[1,2,3,4,5], categorical=['A','B','A','C']"
  EXPECT CONTAINS "mean"
  EXPECT CONTAINS "count"
  EXPECT contains distribution info

```
