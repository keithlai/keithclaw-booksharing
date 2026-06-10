## ADDED Requirements

### Requirement: Log Viewer MUST show OpenClaw log files
#### Scenario: 用戶打開 Logs Tab 後見到 log files list（config-audit.jsonl, config-health.json, gateway-restart.log）
#### Scenario: 用戶可以 Click 任何 log file 睇內容
#### Scenario: 用戶可以選擇顯示行數（50/200/500/1000）
#### Scenario: 用戶可以 Refresh 更新 log 內容

### Requirement: Admin Tab MUST show Operations Manual
#### Scenario: Admin Tab 預設顯示所有常用 Command
#### Scenario: 每個 Command 有說明用途同 tag（info/warn/danger）
#### Scenario: 包含 Podman / Git / Windows 系統 Command

### Requirement: Workspace Tab MUST browse workspace files
#### Scenario: 用戶可以 browse workspace-dev directory
#### Scenario: 可以 Click 入子目錄

### Requirement: API MUST support health check
#### Scenario: GET /api/system/health 回傳 Node version, directory status, podman status
