# Keith書單 — Material Design 3 UI 規格書 (SPA)
> Version: 1.0.0 |v1.1.0 (Classic) / v2.1.0 (Material) | 最後更新: 2026-06-10
> 狀態: ✅ 已部署待 Review | 開發引擎: Claude Code

---

## 1. 專案概覽

### 1.1 背景
Keith書單係一個管理 47 本成功書籍嘅 Web 應用，分 6 大分類（金融/投資、人性/心理、自我成長/習慣、商業/創業思維、AI/學習、親子教養），每本書有概論、三個學習要點、推薦原因等詳細資料。

### 1.2 目標
以 Google Material Design 3（Material You）設計系統重新打造前端 UI，保留全部功能，改善用戶體驗同 Mobile 支援。

### 1.3 版本管理
| URL | 版本 | 開發方式 |
|---|---|---|
| `https://keithclaw.itpoc.dev/` | 🎨 Classic (現有) | 人手開發 |
| `https://keithclaw.itpoc.dev/ui/` | ✨ Material Design 3 (新) | Claude Code 開發 |

---

## 2. 系統架構

### 2.1 技術棧
```
Frontend: Vanilla HTML + CSS + JS (無框架)
Backend:  Node.js HTTPS Server
API:      REST /api/book?id=XXX
Data:     Static JSON (booklist.json)
Protocol: HTTPS (Self-signed cert)
CDN:      Google Fonts (Material Symbols + Roboto)
```

### 2.2 檔案結構
```
C:\Users\Administrator\workspace-dev\books\
├── server.js                    # HTTPS Server（Port 443）
├── booklist.json                # 47 本書數據源
│
C:\Users\Administrator\.openclaw\canvas\
├── book-browser.html            # 🎨 經典版 UI
└── book-browser-material.html   # ✨ Material Design UI
```

### 2.3 API 合約
```
GET /api/book?id=FIN-01
→ 200 JSON { id, overview, takeaways[], why, yt_ch }
→ 404 { book not found }
→ 400 { missing id }

GET /
→ 200 HTML (經典版)

GET /ui/
→ 200 HTML (Material Design 版)
```

---

## 3. Material Design 3 (Material You) 設計規範

### 3.1 主題配色 (Dark)
```
Primary           #D0BCFF
Secondary         #CCC2DC
Tertiary          #EFB8C8
Surface           #141218
Surface Container #211F26
Error             #F2B8B5
On Primary        #381E72
On Surface        #E6E0E9
```

### 3.2 元件庫
| 元件 | M3 名稱 | 位置 |
|---|---|---|
| Header | Top App Bar (Small) | 置頂 sticky |
| Tab | M3 Tabs (Secondary) | Header 下方 |
| Filter | Filter Chips | Tabs 下方 |
| Search | Text Field with leading icon | Filter 旁 |
| Book Card | Elevated Card | Grid container |
| Bookmark | Icon Toggle (Filled/Outlined) | Card 右上角 |
| Expand Detail | Card expand with Motion | Card 內部 |
| Loading | Linear Progress Indicator | Detail 區域 |

### 3.3 佈局
```
┌──────────────────────────────────┐
│ 🔗 Top App Bar + Badge (sticky) │
├──────────────────────────────────┤
│ [Search Field]  [Filter Chips]   │
├──────────────────────────────────┤
│ 📖 全部 │ 💰 金融 │ 🧠 人性 │   │ ← Tabs
├──────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐         │
│ │ Card 1  │ │ Card 2  │         │ ← Elevated Cards
│ │ 📘 書名 │ │ 📘 書名 │         │    responsive grid
│ │ ✍️ 作者 │ │ ✍️ 作者 │         │
│ │ Badges  │ │ Badges  │         │
│ │ Summary │ │ Summary │         │
│ │ 📖🛒🌐  │ │ 📖🛒🌐  │         │
│ └─────────┘ └─────────┘         │
│  ▼ Click to expand ▼            │
│  📖 概論                        │
│  🎯 三個學習要點                  │
│  📌 推薦原因                     │
└──────────────────────────────────┘
│ 最後更新 / v1.0.0                │
└──────────────────────────────────┘
```

---

## 4. 功能規格

### 4.1 分類過濾
- 6 個分类 tabs + 「全部」
- 每個 tab 有對應顏色 dot indicator
- Click 切換 filter

### 4.2 難度篩選
- 4 個 Filter Chips：全部難度 / 入門 / 中階 / 進階
- 可與分類 filter 疊加使用

### 4.3 搜尋
- Real-time search（input → filter）
- Search by title + author
- Debounce 300ms

### 4.4 Bookmark
- Click ⭐ 切換
- 存於 Set()（頁面 refresh 後重置）
- Header 顯示已揀數量

### 4.5 Lazy Load Detail
- 初始只 load 基本資料（~30KB）
- Click 卡: fetch /api/book?id=XXX
- Cache after loaded（data-loaded flag）
- Loading state: 「⏳ 載入中...」
- Error state: 「❌ 載入失敗」

### 4.6 Click 處理 (Mobile)
- 只用 click event + 400ms debounce lock
- 無 touchend double-fire problem
- .bm 同 a 標籤 click 唔會觸發 expand

---

## 5. Claude Code 開發流程

### 5.1 工作流程
```
[1] Write Spec (SPA) → [2] User Review → [3] Claude Code Implement → [4] Verify → [5] Deploy
```

### 5.2 Spec 文件規範
每個 feature 開發前先寫 spec：
```
## Feature: [名稱]
### Requirement
### API / Data dependency
### UI Component mapping
### Behavior / States
### Acceptance criteria
```

### 5.3 日後開發參照
所有變更記錄喺呢份 SPA，新功能加入時直接 reference 現有架構。

---

## 6. 已完成功能 Checklist

- [x] M3 Theme (Dark) 完整實作
- [x] Top App Bar + Title + Badge
- [x] Search Field with leading icon + clear
- [x] Filter Chips (全部/入門/中階/進階)
- [x] M3 Tabs (6 categories + 全部)
- [x] M3 Elevated Cards (圓角/elevation/hover)
- [x] Bookmark Toggle (⭐/☆)
- [x] Lazy Load Detail (fetch API)
- [x] Overview + Takeaways rendering
- [x] No Cache (Cache-Control headers)
- [x] Last Updated + Version footer
- [x] Mobile touch handling
- [x] Server: GET /ui/ 路由
- [x] API: GET /api/book?id=

---

⚠️ **呢份 Spec 等緊你 Review**，確認後可以 apply 或者用 Claude Code 繼續開發。
以後所有改動先 update 呢份 SPA，唔使由頭做起。

---

## 7. OpenSpec Standard Workflow

每個 change 必須跟足以下 6 步流程：

| Step | Artifact | 內容 |
|---|---|---|
| 1 | proposal.md | Why — 問題同目標 |
| 2 | specs/ | 詳細需求（Scenario-based）|
| 3 | design.md | 技術設計同取捨 |
| 4 | tasks.md | ✅ Checklist 逐個 tick |
| 5 | Implement | Claude Code 寫 code |
| 6 | archive | openspec archive + git push |
