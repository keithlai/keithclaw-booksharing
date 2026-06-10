## Why

龍蝦內視鏡 Log Viewer 目前可以睇 OpenClaw logs 同 browse workspace files，但欠缺主動執行 system command 嘅能力，同埋深度瀏覽 workspace（agent memory、技能檔案等）。用戶唔想每次 RDS 入 Server 先做到嘢。

## What Changes

### 1. Command Runner
- Add buttons to execute system commands:
  - `openclaw status`
  - `openclaw gateway restart`
  - `openclaw doctor`
  - `podman ps` / `podman logs`
  - `git status`
- Real-time stdout/stderr display in terminal-like UI
- Command history / previous outputs accessible
- Running state indicator (spinner during execution)

### 2. Workspace Deep Browser
- Browse agent workspace files:
  - SOUL.md, AGENTS.md, TOOLS.md, USER.md, IDENTITY.md, HEARTBEAT.md
  - memory/ directory with date files
  - skills/ directory with SKILL.md files
- File preview: render markdown files as formatted text
- Search within files

## Capabilities

### New Capabilities
- `command-runner`: Execute and display system commands with stdout/stderr
- `workspace-deep-browser`: Browse and preview agent workspace files

### Modified Capabilities
- (none — new features added to existing Log Viewer)

## Impact

- Backend API: Add `/api/command/exec`, `/api/command/history`, `/api/workspace/read`
- Frontend: New "Command" tab + updated "Workspace" tab
- server.js / run-native.js: Add new API routes
- Material Design 3 UI: Update index.html with new tabs
