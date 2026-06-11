## Context

HTML 入面 hardcode 咗成個 `var BOOKS=[...]`（約 200+ 行），同 `booklist.json` 內容重複，之前加兩本書就要改兩個地方先同步到。

## Decisions

1. **API format** — `/api/books/list` 回傳同現有 `var BOOKS=[...]` 相容嘅 JSON array，前端只係將 `var BOOKS=` 改做 `fetch`，其餘 render logic 唔使改
2. **Markdown page route** — 新增 `/book/:id/markdown`，server 讀 `booklist.json` 組合 markdown 內容，HTML 用 `<pre>` 配合 CSS white-space pre-wrap + monospace font，唔另加 Markdown renderer
3. **Markdown format** — `# title`、`## Overview`、`## Key Takeaways`、`- item` bullet list，連 link（goodreads/amazon），純文字最佳化
4. **Modal button** — 用 `target="_blank"` 開新 tab，避免離開現有頁面

## Risks / Trade-offs

- [Existing API] 已有 `/api/book?id=X` ，但回傳完整 JSON 含 overview 同 takeaways，前端已經識用，所以 `/api/books/list` 只係用嚟取代 hardcode list；detail 繼續用 `/api/book`
- [SEO] Markdown page 係動態 route，唔影響現有 SPA
