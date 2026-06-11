# 📚 搵書運輸團隊 — IT 部角色說明

> **項目總管（PM）：** AI Subagent（即係我）

IT 部由 5 個核心角色組成，各司其職，合作完成 Book Browser 項目。

---

## 👨‍💼 項目總管（Project Manager）

| 項目 | 內容 |
|------|------|
| **角色** | 統籌整個 IT 團隊，分配任務，確保進度同品質 |
| **職責** | 定義需求、協調前端/後端/設計/測試/發布、驗收成品 |
| **工具** | Subagent spawning、Code review、Task tracking |

---

## 🎨 UI/UX 設計師

| 項目 | 內容 |
|------|------|
| **角色** | 介面體驗總設計師 |
| **職責** | 制定色彩系統（每個分類專屬 Accent Color）、Typography、排版佈局、Responsive 策略、動畫設計 |
| **設計決策** | 深色主題（#1a1a2e 底色）、6 分類各自 accent color、卡片 hover 微動畫、Fade-in 過渡 |
| **分類顏色** | 金融/投資 `#F0B429` · 人性/心理 `#E83E8C` · 自我成長/習慣 `#2ECC71` · 商業/創業思維 `#3498DB` · AI/學習 `#9B59B6` · 親子教養 `#E67E22` |

---

## 👨‍💻 前端工程師

| 項目 | 內容 |
|------|------|
| **角色** | HTML/CSS/JavaScript 實作 |
| **職責** | 將設計稿轉為完整 Single-Page Application（全部 inline 喺一個 HTML 檔案） |
| **技術棧** | Vanilla HTML5 + CSS3 + ES6 JavaScript（無框架依賴） |
| **功能實作** | 分類 Tab 過濾、難度 Filter、即時搜尋、Expandable Cards、Bookmark 功能、Responsive Grid |

---

## 🔧 後端工程師

| 項目 | 內容 |
|------|------|
| **角色** | 邏輯與資料處理 |
| **職責** | 由於係靜態 SPA，後端主要負責資料整合——將 booklist.json 嵌入為 JS 變數、設計資料結構、確保所有 external links 正確 |
| **備註** | 目前無需 Server-side 邏輯；未來可擴展 API 端點做使用者書單同步 |

---

## 🧪 QA 測試員

| 項目 | 內容 |
|------|------|
| **角色** | 品質保證 |
| **職責** | 測試所有 Link 是否有效、按鈕功能正常、Responsive 斷點無 Break、搜尋/過濾邏輯正確、無 Console Error |
| **測試工具** | Node.js HTTP check、Browser DevTools Console、Responsive Design Mode |

---

## 📦 發布專員

| 項目 | 內容 |
|------|------|
| **角色** | 部署與發布 |
| **職責** | 將成品 book-browser.html 部署到 OpenClaw Canvas Server |
| **部署路徑** | `C:\Users\Administrator\.openclaw\canvas\book-browser.html` |
| **驗證方式** | 透過 OpenClaw Gateway 檢查 HTTP 200 |

---

## 📋 協作流程

```
設計師 🎨 → 前端 👨‍💻 → QA 🧪 → 發布 📦
                  ↑
           後端 🔧（資料支援）
```

1. **UI/UX 設計師** 決定色彩、排版、互動方式
2. **前端工程師** 實作完整 SPA
3. **後端工程師** 確保資料正確嵌入
4. **QA 測試員** 做完整功能驗證
5. **發布專員** 部署到 Canvas Server
6. **項目總管** 全程協調並驗收

---

*IT-TEAM-README.md v1.0 | 2026-06-10 | 搵書運輸團隊 IT 部*
