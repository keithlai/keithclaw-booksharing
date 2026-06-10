## Why

需要一個 Web-based Log Viewer 嚟睇 OpenClaw 日誌，避免每次都要 RDS 入 Server。同時記錄所有做過嘅步驟（安裝、設定、部署）以便日後重現。

## What Changes

- 建立 Log Viewer Node.js server（Port 3000）
- Material Design 3 UI（3 個 Tab：Logs / Admin / Workspace）
- Admin Panel + Operations Manual（記錄所有用過嘅 command）
- Podman Dockerfile 已準備（等 WSL 初始化先用到）
- Native Windows 模式行緊（唔使 WSL/Podman）

## Capabilities

### New Capabilities
- `log-viewer-webui`: OpenClaw log viewer web interface
- `ops-manual`: 操作手冊 + 常用 command 列表
- `workspace-browser`: 瀏覽 workspace-dev 檔案

### Modified Capabilities
- (none)

## Impact

- `container/Dockerfile` — Podman container build
- `container/server.js` — Node.js backend for container
- `container/public/index.html` — Material Design UI
- `run-native.js` — Native Windows runner（currently running）
- `run-podman.cmd` — Podman build & run script
