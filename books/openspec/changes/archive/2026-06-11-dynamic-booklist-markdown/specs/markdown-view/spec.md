# markdown-view Specification

## Purpose
Provide a pure-text Markdown reading page for book details, accessible from the book details modal.

## ADDED Requirements

### Requirement: Modal MUST have「View as Markdown」button
#### Scenario: 每個 book detail modal 都有 📝 Markdown 掣
#### Scenario: 撳掣開新 tab `/book/:id/markdown`

### Requirement: API MUST serve Markdown page
#### Scenario: GET /book/:id/markdown 回傳完整 HTML page
#### Scenario: Page 顯示 markdown 格式文字（# headers, - bullets, links）
#### Scenario: Overview 同 Takeaways 用 markdown 格式呈現
#### Scenario: 頁面底部含 goodreads/amazon link
#### Scenario: CSS white-space pre-wrap + monospace font，適合 browser read mode

### Requirement: Markdown view MUST work on mobile
#### Scenario: 無複雜 layout，純文字 scroll
#### Scenario: 無 JavaScript 依賴，純 HTML+CSS
#### Scenario: iOS/Android browser read mode 可正常顯示
