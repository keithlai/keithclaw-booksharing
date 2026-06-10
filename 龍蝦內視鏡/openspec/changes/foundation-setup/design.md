## Context

龍蝦內視鏡係全新 Project，需要建立完整開發基建：OpenSpec spec-driven workflow + Claude Code + DeepSeek Anthropic API。

## Goals / Non-Goals

**Goals:**
- OpenSpec standard workflow (proposal → specs → design → tasks → implement → archive)
- Claude Code with DeepSeek v4-flash via Anthropic-compatible API
- Git version control + GitHub remote
- No secrets stored on disk (API keys via env only)

**Non-Goals:**
- No application features yet (純基建 setup)
- No CI/CD pipeline (可稍後加入)

## Decisions

- **OpenSpec spec-driven flow**: 確保每次 change 有完整文檔軌跡
- **DeepSeek Anthropic API**: Base URL `https://api.deepseek.com/anthropic`, 兼容 Anthropic Messages format
- **Model mapping**: 所有 tier 都用 `deepseek-v4-flash`（用戶只有 flash 權限）
- **No hardcoded keys**: 用 `claude-deepseek.cmd` template 但留空 token，用戶執行時 set env
- **GitHub oauth2**: 用 PAT 經 URL 認證，避免 credential manager 依賴

## Risks / Trade-offs

- DeepSeek Anthropic API 可能唔支援 Claude Code 全部功能 → 用基本 coding task 驗證
- 冇 CI/CD → 暫時人手 deploy
