## Context

之前要睇 OpenClaw logs 要 RDS 入 Server -> 開 File Explorer -> 搵 `.openclaw/logs/` -> 開 .jsonl files。太麻煩。

## Goals / Non-Goals

**Goals:**
- Web 介面直接睇 log files
- Material Design 3 風格
- 3 個 Tab：Logs / Admin / Workspace
- Admin 頁有 Operations Manual 記錄所有用過嘅 command
- Podman Dockerfile 準備好（但 Native 模式可以直接行）

**Non-Goals:**
- 唔做 real-time streaming（暫時 manual refresh）
- 唔做 authentication（local network only）

## Decisions

- **Native Node.js + Express**: 最簡單直接，唔使 container 都可以行
- **Chokidar not used**: 純靜態 file read，每次 refresh 讀最新內容
- **Podman Dockerfile 保留**: 第日 WSL 搞掂可以直接 containerize
- **Persistence paths**: OpenClaw logs 同 workspace 用 mount/relative path

## Risks / Trade-offs

- Podman on Windows 需要 WSL（未安裝）→ 已記錄喺 task list
- Native 行法冇 container isolation → 但係 internal tool 問題不大
