## 1. news.json

- [ ] 1.1 建立 `news.json`（articles array with id, title, source, date, category, content, takeaways）
- [ ] 1.2 加 2-3 篇 sample articles 做 demo

## 2. API Routes

- [ ] 2.1 `GET /api/news/list` — 回傳 article list（id, title, source, date, cat）
- [ ] 2.2 `GET /api/news/article?id=X` — 回傳 detail（content, takeaways）
- [ ] 2.3 Error handling（404/500）

## 3. Burger Menu

- [ ] 3.1 左上角 ☰ button（固定位置）
- [ ] 3.2 Slide-out menu panel（Book Sharing / 新聞）
- [ ] 3.3 Click outside 關閉 menu
- [ ] 3.4 未 login 隱藏 menu（同 login overlay 不衝突）

## 4. News UI

- [ ] 4.1 News section HTML（article cards grid）
- [ ] 4.2 Category filter tabs（香港重大、世界重大、金融財經、時事）
- [ ] 4.3 Article detail modal（content + takeaways）
- [ ] 4.4 Modal close + back 按鈕

## 5. Verification

- [ ] 5.1 Burger menu 顯示同切換正常
- [ ] 5.2 News list load from API
- [ ] 5.3 Filter 分類正常
- [ ] 5.4 Article modal 顯示內容 + takeaways
- [ ] 5.5 Book sharing 不受影響
- [ ] 5.6 未 login 時 burger menu 隱藏

## 6. Git & Archive

- [ ] 6.1 Commit + push
- [ ] 6.2 Archive change
