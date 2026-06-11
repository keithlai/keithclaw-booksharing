## Why

Booksharing 而家只有書目，alpha team 需要一個新聞頻道去收集香港重大新聞、世界重大新聞、金融及時事。新聞應該同書目分開 navigation，用 burger menu 切換。

## What Changes

- Burger menu（左上角 ☰）切換 Book Sharing ←→ 新聞頻道
- 新聞頻道：新聞標題 card list，撳入去睇內容 + 主要得著（如書嘅 takeaways）
- 新聞 data 用獨立 `news.json`，唔混入書目
- 新聞分類：香港重大、世界重大、金融財經、時事
- 書目同新聞各自獨立 filter tabs

## Capabilities

### New Capabilities
- `news-channel`: 新聞頻道，獨立 navigation + data
- `burger-menu`: 左側 burger menu 切換模式

### Modified Capabilities
- (none — UI 重構，唔改現有 book browsing)

## Impact

- `html/book-browser-material.html` — 加 burger menu、news 頁面、雙模式 navigation
- `server.js` — 新增 `/api/news/list`、`/api/news/article?id=X` routes
- `news.json` — 新檔案，alpha team 加入新聞
- `booklist.json` — 不變
