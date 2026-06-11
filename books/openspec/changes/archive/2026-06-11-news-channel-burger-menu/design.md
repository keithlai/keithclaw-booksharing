## Context

目前 booksharing 得一頁，全部係書。要加新聞功能但唔想同書目混埋一齊，所以用 burger menu 做 navigation switch。

## Decisions

1. **Burger menu 左上角** — mobile 友善，所有 page 都見到
2. **雙模式 navigation** — Book Sharing 同新聞各有獨立嘅 category tabs + filter，互不干擾
3. **news.json 結構** — `{articles: [{id, title, source, date, category, content, takeaways}]}`，同 booklist.json 類似
4. **新聞 takeaways** — 每篇新聞 article 有 2-3 個「主要得著」，同書嘅 learning points 概念一致
5. **新聞分類四類** — 香港重大、世界重大、金融財經、時事
6. **Server routes** — `/api/news/list` 回傳 list（id, title, source, date, cat），`/api/news/article?id=X` 回傳 detail（content + takeaways）
7. **UI 切換** — 用 JS switch 顯示/隱藏對應 section，唔 reload page

## Risks / Trade-offs

- [News content update] — news.json 要 alpha team 手動加，唔係 auto-RSS
- [Burger menu z-index] — 要留意 burger menu 唔好同 login overlay 撞 z-index
