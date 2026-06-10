# 工作習慣 (Workflow Habits)
> 由 2026-06-10 定立，唔使每次提

## 標準開發流程（OpenSpec）
1. **Proposal.md** — Why + What Changes + Capabilities + Impact
2. **Specs/** — 詳細需求（Scenario-based）
3. **Design.md** — 技術設計 + Decisions + Risks
4. **Tasks.md** — ✅ Checklist 逐個 tick
5. **Implement** — Native / Claude Code
6. **Archive** — openspec archive + git push

以上全部 prepare 好一次過俾 user review，唔使逐個 step 問。

## Git 習慣
- **Local commit 先，再 push**
- 每次改動 update version number + last updated timestamp
- Keep API keys / certs out of git（.gitignore）
- Git commit message 清晰描述改動

## Tag 分法
- `#booksharing` → Keith書單 project（workspace-dev/books/）
- `#keithclawviewer` → 龍蝦內視鏡 project（workspace-dev/龍蝦內視鏡/）

User 講需求開頭加 tag 就知邊個 project。

## UI 風格
- Material Design 3（Material You）
- Dark theme
- 繁體中文（粵語可接受）
- Responsive（手機 + 電腦）

## 其他
- 唔好硬編碼顏色 — 用 CSS variables 支援 light/dark mode
- Spec 文件 user review 就得，唔使逐個 step 問 apply
- 完成後 archive + push
