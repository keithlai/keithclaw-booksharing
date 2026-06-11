## Why

Keith書單目前有兩個 UI 版本：Classic（/）同 Material Design（/ui）。Classic 版本已經冇人用，維護兩個版本浪費時間。將 Material Design UI 提升為預設版本，移除 Classic 同 /ui route。

## What Changes

- 將 Material Design HTML 由 `/ui/` 搬去 `/`
- 刪除 Classic 版 `book-browser.html`
- 更新 server.js route：`/` 出 Material Design，刪除 `/ui/` route
- Version bump: v2.1.0 → v3.0.0 (major change)
- 所有 bookmarks / external links 指向 `/` 繼續 work

## Capabilities

### New Capabilities
- (none — UI 取代，冇新功能)

### Modified Capabilities
- `book-modal-view`: 由 `/ui/` 搬去 `/`
- Serving path 改變：server.js route 更新

## Impact

- `server.js`: `/` → book-browser-material.html，刪除 `/ui/` route
- `html/book-browser.html`: DELETE（Classic 版）
- `html/book-browser-material.html`: RENAME/MOVE to same level
- `.openclaw/canvas/book-browser.html`: DELETE
- Git: remove dead files
