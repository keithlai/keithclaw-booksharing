## ADDED Requirements

### Requirement: OpenSpec Structure
#### Scenario: Project root contains .claude/ and openspec/ directories
#### Scenario: openspec init --tools claude 已執行

### Requirement: GitHub Remote
#### Scenario: Repo keithclawviewer exists under keithlai
#### Scenario: main branch pushed with all config files

### Requirement: Claude Code + DeepSeek Integration
#### Scenario: ANTHROPIC_BASE_URL set to https://api.deepseek.com/anthropic
#### Scenario: ANTHROPIC_AUTH_TOKEN 由用戶 runtime 提供
#### Scenario: Claude Code 能成功 call DeepSeek API

### Requirement: No Secrets on Disk
#### Scenario: .gitignore 包含 *.key, *.pem, *.pfx, .env
#### Scenario: claude-deepseek.cmd 唔包含實際 token

### Requirement: Standard Workflow Doc
#### Scenario: README.md 記錄完整開發流程同 tag convention
