## 1. Proposal

- [x] 1.1 Create proposal.md with Why / What Changes / Impact
- [x] 1.2 Create specs/ directory
- [x] 1.3 Create design.md
- [x] 1.4 Create tasks.md with this checklist

## 2. 網站更新

- [ ] 2.1 Copy `html/book-browser-material.html` → rename to serve at `/`
- [ ] 2.2 Delete `html/book-browser.html`（Classic 版）
- [ ] 2.3 Delete `.openclaw/canvas/book-browser.html`（Classic 版）
- [ ] 2.4 Delete `.openclaw/canvas/book-browser-material.html`（唔需要，用 html/ 路徑）

## 3. Server.js 更新

- [ ] 3.1 Change `/` route to serve `book-browser-material.html`
- [ ] 3.2 Remove `/ui/` route entirely
- [ ] 3.3 Update const: remove HTML_FILE, keep UI_HTML_FILE
- [ ] 3.4 Version bump v2.1.0 → v3.0.0
- [ ] 3.5 Restart HTTPS server
- [ ] 3.6 Verify: `GET /` returns Material UI
- [ ] 3.7 Verify: `GET /ui/` should 404

## 4. Git

- [ ] 4.1 Git add all changes
- [ ] 4.2 Git commit & push
- [ ] 4.3 OpenSpec archive
