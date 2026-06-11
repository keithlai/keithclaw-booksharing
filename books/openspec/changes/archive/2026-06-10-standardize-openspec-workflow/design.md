## Context

Keith書單之前嘅 OpenSpec changes 係直接做咗先補 proposal，冇行完整嘅 spec-driven flow。需要標準化。

## Goals / Non-Goals

**Goals:**
- 所有新 changes 跟足 6 步流程：proposal → specs → design → tasks → implement → archive
- 舊 archived changes 保留唔改
- SPEC-Material-UI.md 更新流程記錄

**Non-Goals:**
- 唔改寫已 archive 嘅舊 changes
- 唔改動 server.js / HTML 等 code

## Decisions

- **沿用現有 OpenSpec config** — 唔需要重新 init
- **Archive 舊 changes** — 直接保留，唔需要 upgrade
- **Checkbox tasks** — 每個 task 用 `- [ ]` 格式，apply 階段自動追蹤

## Risks / Trade-offs

- 舊 changes 唔同格式 → 但已 archive，唔影響將來
