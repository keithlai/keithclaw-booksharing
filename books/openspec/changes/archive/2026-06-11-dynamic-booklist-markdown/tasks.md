## 1. API: /api/books/list

- [x] 1.1 Add GET /api/books/list route in server.js — read booklist.json, return simplified array
- [x] 1.2 Handle file/parse errors with 500

## 2. HTML: Remove hardcoded BOOKS

- [x] 2.1 Replace `var BOOKS=[...]` with fetch `/api/books/list` on page load
- [x] 2.2 Ensure existing render logic works with fetched data (same JSON format)

## 3. API: /book/:id/markdown

- [x] 3.1 Add GET /book/:id/markdown route in server.js
- [x] 3.2 Compose markdown text from booklist.json data（# title, ## Overview, ## Key Takeaways, bullet list, links）
- [x] 3.3 Return full HTML page with pre-wrap + monospace styling

## 4. Modal: Add Markdown button

- [x] 4.1 Add «📝 Markdown» button in modal header
- [x] 4.2 Button opens `/book/:id/markdown` in new tab (target=_blank)

## 5. Verification

- [x] 5.1 Visit `/` — books load from API, not hardcoded
- [x] 5.2 Click a book — modal opens correctly with detail from API
- [x] 5.3 Click «Markdown» button — new tab opens with markdown text
- [x] 5.4 Markdown page shows proper # headers, - bullets, and links
- [x] 5.5 Markdown page works on mobile browser read mode

## 6. Git & Archive

- [ ] 6.1 Commit + push
- [ ] 6.2 Archive change
