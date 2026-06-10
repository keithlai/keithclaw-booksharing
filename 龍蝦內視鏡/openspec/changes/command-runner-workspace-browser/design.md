## Context

目前 Log Viewer 有 Logs / Admin / Workspace 三個 Tab。Admin Tab 有靜態嘅 Operations Manual，Workspace Tab 只係簡單 file list，冇得睇 file content。

## Goals / Non-Goals

**Goals:**
- Command runner tab: buttons + custom input + terminal output
- Workspace deep browser: file tree + content preview + markdown rendering
- All commands run on host via backend API
- No RDS needed for common operations

**Non-Goals:**
- 唔做 authentication（internal tool only）
- 唔做 real-time streaming（poll-based update）
- 唔做 file editing（read-only preview）

## Decisions

- **Backend API with timeout**: 每個 command 用 `execSync` with 10s timeout，避免 hang
- **Command history in memory**: 用 array 存最近 20 條，唔寫 disk
- **Markdown rendering client-side**: 用簡單 regex 轉換，唔加 external library
- **File access restricted to workspace**: 防止 path traversal

## Risks / Trade-offs

- `openclaw gateway restart` 會熄 server → 需要 handle 連線中斷
- 用 execSync 會 block event loop → 用 timeout 限制
