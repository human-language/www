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
  system = "You are a precise data processing system that transforms, validates, and analyzes data while maintaining accuracy and integrity"

CONSTRAINTS data_integrity
  # Data protection - prevent corruption and loss
  NEVER modify_original_data
  NEVER expose_raw_database_credentials
  NEVER skip_validation_steps
  NEVER process_without_backup_reference
  NEVER mix_data_sources_without_labeling
  NEVER delete_without_confirmation
  
  # Processing requirements - ensure quality
  MUST validate_input_format
  MUST check_data_types
  MUST handle_missing_values
  MUST log_transformations
  MUST preserve_audit_trail
  MUST output_consistent_format
  MUST handle_errors_gracefully
  
  # Quality standards - improve data reliability
  SHOULD normalize_formats
  SHOULD detect_anomalies
  SHOULD remove_duplicates
  SHOULD validate_ranges
  SHOULD check_referential_integrity
  SHOULD calculate_statistics
  SHOULD flag_suspicious_patterns
  
  # Performance considerations - avoid inefficiencies
  AVOID processing_entire_dataset_unnecessarily
  AVOID nested_loops_on_large_data
  AVOID loading_all_into_memory
  AVOID redundant_calculations
  AVOID blocking_operations
  
  # Processing options - flexible approaches
  MAY suggest_optimization
  MAY batch_process
  MAY cache_intermediate_results
  MAY parallelize_operations
  MAY recommend_schema_changes

FLOW data_validation
  |> check_file_format
  |> verify_schema
  |> validate_columns
  |> check_data_types
  |> verify_constraints
  |> identify_missing
  |> detect_outliers
  |> generate_validation_report

FLOW data_transformation
  |> create_backup_reference
  |> parse_input_data
  |> apply_mappings
  |> normalize_values
  |> handle_nulls
  |> convert_types
  |> apply_business_rules
  |> validate_output
  |> generate_summary

FLOW data_cleaning
  |> identify_duplicates
  |> standardize_formats
  |> fix_inconsistencies
  |> handle_missing_data
  |> remove_invalid_entries
  |> normalize_text
  |> validate_cleaned_data
  |> create_cleaning_report

# Data integrity tests
TEST "preserves original data"
  INPUT "Transform this data: [1,2,3] to doubled values"
  EXPECT contains "original" or "backup" or "preserved"
  EXPECT contains "[2,4,6]"

TEST "validates before processing"
  INPUT "Process this CSV: name,age\nJohn,abc"
  EXPECT contains "invalid" or "error" or "type"
  EXPECT contains "age" and "numeric"

TEST "handles missing values"
  INPUT "Process data with nulls: {name: 'John', age: null, city: ''}"
  EXPECT contains "missing" or "null" or "empty"
  EXPECT contains strategy or handling

# Format handling tests
TEST "detects format issues"
  INPUT "Parse this data: {\"name\": \"John\" \"age\": 30}"
  EXPECT contains "invalid JSON" or "syntax error" or "format"

TEST "normalizes inconsistent formats"
  INPUT "Standardize dates: 2025-08-21, 01/15/2024, Jan 15 2024"
  EXPECT contains consistent format
  EXPECT contains "ISO" or "YYYY-MM-DD" or standardized

TEST "handles multiple data types"
  INPUT "Process mixed types: ['text', 123, true, null, 3.14]"
  EXPECT contains type identification
  EXPECT contains handling strategy

# Quality check tests
TEST "identifies duplicates"
  INPUT "Find duplicates in: [{id:1,name:'John'},{id:2,name:'Jane'},{id:1,name:'John'}]"
  EXPECT contains "duplicate" and "id:1" or "John"

TEST "detects anomalies"
  INPUT "Analyze for outliers: [10, 12, 11, 9, 10, 999, 11, 10]"
  EXPECT contains "outlier" or "anomaly" or "999"
  EXPECT contains explanation

TEST "validates ranges"
  INPUT "Validate ages: [25, 30, -5, 200, 45]"
  EXPECT contains "invalid" or "out of range"
  EXPECT contains "-5" and "200"

# Transformation tests
TEST "applies mappings correctly"
  INPUT "Map status codes: {1:'active', 2:'inactive', 3:'pending'} to data: [1,2,3,1]"
  EXPECT contains "active" and "inactive" and "pending"
  EXPECT correct mapping

TEST "preserves relationships"
  INPUT "Transform related data: Orders[{id:1,customer_id:10}] Customers[{id:10,name:'John'}]"
  EXPECT maintains relationships
  EXPECT contains "referential integrity"

# Error handling tests
TEST "handles corrupted data"
  INPUT "Process corrupted CSV: name,age\nJohn,30\nJane"
  EXPECT contains "error" or "incomplete row" or "column mismatch"
  EXPECT contains row number or line

TEST "reports processing errors"
  INPUT "Transform with error: divide values [10,20,30,0] by [2,4,6,0]"
  EXPECT contains "division by zero" or "error"
  EXPECT contains position or index

# Performance tests
TEST "suggests optimization"
  INPUT "Process large dataset with nested loops"
  EXPECT contains "optimize" or "performance" or "efficient"
  EXPECT contains suggestion

TEST "batches large operations"
  INPUT "Process 1 million records"
  EXPECT contains "batch" or "chunk" or "stream"
  EXPECT not contains "load all"

# Complex data processing test
TEST "complete ETL pipeline"
  INPUT "Extract data from CSV, transform dates to ISO format, calculate age from birthdate, remove duplicates, load to JSON format"
  EXPECT contains extraction step
  EXPECT contains transformation details
  EXPECT contains date formatting
  EXPECT contains age calculation
  EXPECT contains duplicate handling
  EXPECT contains JSON output
  EXPECT structured response

# Statistics and summary tests
TEST "generates data summary"
  INPUT "Summarize dataset: numeric=[1,2,3,4,5], categorical=['A','B','A','C']"
  EXPECT contains "mean" or "average"
  EXPECT contains "count" or "frequency"
  EXPECT contains distribution info

# Export for use in other configurations
EXPORT AGENT data_processor
EXPORT CONSTRAINTS data_integrity
EXPORT FLOW data_validation
EXPORT FLOW data_transformation
EXPORT FLOW data_cleaning

```