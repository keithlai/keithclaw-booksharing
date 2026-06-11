# dynamic-booklist Specification

## Purpose
Remove hardcoded `var BOOKS=[...]` from HTML, load book listings from API instead.

## ADDED Requirements

### Requirement: HTML MUST load booklist from API on page load
#### Scenario: Startup fetch GET /api/books/list return JSON array
#### Scenario: JSON format 相容現有 var BOOKS array（id, title, author, cat, diff, sum）
#### Scenario: 移除 HTML 入面嘅 var BOOKS=[...] inline data

### Requirement: API MUST return book list from booklist.json
#### Scenario: GET /api/books/list 讀取 booklist.json 並回傳簡化 books array
#### Scenario: 每個 book entry 包含 id, title, author, cat, diff, sum 及 links
#### Scenario: 不需要 overview/takeaways（detail 由 /api/book 提供）

### Requirement: API MUST handle file read errors
#### Scenario: booklist.json 唔存在 → 500 + error message
#### Scenario: booklist.json parse error → 500 + error message
