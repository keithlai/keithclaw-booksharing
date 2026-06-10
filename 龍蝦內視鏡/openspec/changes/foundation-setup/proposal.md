## Why

龍蝦內視鏡係一個全新 Project，由零開始。需要先建立完整嘅開發基建（OpenClaw + Claude Code + DeepSeek + OpenSpec），確保日後每個 feature 都行 spec-driven development 流程。呢個 proposal 唔係寫 application code，而係 set up 好成個開發環境同 workflow。

## What Changes

- 初始化 OpenSpec structure（.claude/commands, .claude/skills）
- 配置 Claude Code 指向 DeepSeek API（ANTHROPIC_BASE_URL + ANTHROPIC_AUTH_TOKEN）
- 設定 OpenSpec 嘅 spec-driven 開發流程
- 建立 Git repo 同 GitHub remote
- 編寫 README.md 說明開發環境同 workflow
- 加入 .gitignore 保護 API keys / certs

## Capabilities

### New Capabilities
- `dev-foundation`: 開發基建配置，包括 OpenSpec, Claude Code, DeepSeek integration, git setup

### Modified Capabilities
- (none)

## Impact

- `.claude/commands/opsx/` — OpenSpec slash commands for propose/apply/archive/sync
- `.claude/skills/openspec-*/` — OpenSpec skill files for Claude Code
- `openspec/changes/foundation-setup/` — 呢份 proposal
- `.gitignore` — 保護敏感檔案
- `README.md` — 開發環境說明
- 部署：push 上 GitHub repo
