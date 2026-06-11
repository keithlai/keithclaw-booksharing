## Context

目前有兩個 UI 版本：Classic（/）同 Material Design（/ui）。維護兩個版本浪費時間，Classic 已冇人用。

## Goals / Non-Goals

**Goals:**
- Material Design 版做 default
- 刪除 Classic 版所有檔案
- 刪除 /ui/ route
- Version bump v3.0.0

**Non-Goals:**
- 唔改 Material UI 功能、唔改 API、唔改 backend

## Decisions

- **搬 `/ui/` 去 `/`**: 最直接，user 唔使改 URL 習慣
- **直接刪 Classic 檔案**: 唔保留，Git history 有記錄
- **Version v3.0.0**: 因為 breaking change（/ui/ 消失）

## Risks / Trade-offs

- 有 external link 指向 `/ui/` 會爛 → 可以加 redirect，但 user 話唔需要
