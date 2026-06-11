## Why

目前 booklist 同時 hardcode 喺 HTML (`var BOOKS=[...]`) 同 `booklist.json`，每次加書都要改兩個檔案，容易唔同步。另外 book details modal 冇純文字閱讀模式，手機 browser 睇 long-form overview 同 takeaways 比較吃力。

## What Changes

1. **動態加載 booklist**：HTML 移除 inline `var BOOKS=[...]`，改為 startup fetch `/api/books/list`，永遠同 `booklist.json` 同步
2. **View as Markdown**：book details modal 加一個「📝 Markdown」掣，撳落去開新 page `/book/:id/markdown`，純文字排版適合 iOS/Android browser read mode

## Capabilities

### New Capabilities
- `dynamic-booklist`: 從 API 動態加載書目，取代 inline hardcode data
- `markdown-view`: 純文字 markdown 閱讀頁面，適合 mobile browser read mode

### Modified Capabilities
- `book-modal-view`: 新增「View as Markdown」button

## Impact

- `html/book-browser-material.html` — 移除 `var BOOKS=[...]`，改 `fetch(/api/books/list)`；modal 加 Markdown button + 傳 id 去新 page
- `server.js` — 新增 `/api/books/list` endpoint（return 同 HTML 相容嘅簡化 JSON list）；新增 `/book/:id/markdown` route（return markdown page）
- `booklist.json` — 不變
