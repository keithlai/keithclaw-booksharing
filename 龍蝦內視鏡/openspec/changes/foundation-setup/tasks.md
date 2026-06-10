## 1. OpenSpec Init
- [x] 1.1 Run `openspec init --tools claude` in project root
- [x] 1.2 Verify .claude/commands/opsx/ (propose, apply, archive, sync, explore)
- [x] 1.3 Verify .claude/skills/openspec-*/SKILL.md

## 2. OpenSpec Config
- [ ] 2.1 Create specs/dev-foundation/spec.md with full requirements
- [ ] 2.2 Create design.md with architecture decisions
- [ ] 2.3 Create tasks.md with this checklist

## 3. Git & GitHub Setup
- [x] 3.1 Init git repo (main branch)
- [x] 3.2 Add .gitignore (node_modules, *.key, *.pem, *.pfx, .env)
- [x] 3.3 Create GitHub repo keithclawviewer
- [x] 3.4 Push initial commit

## 4. Claude Code + DeepSeek Config
- [ ] 4.1 Set ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
- [ ] 4.2 Set ANTHROPIC_AUTH_TOKEN (user provides at runtime)
- [ ] 4.3 Set model mappings (v4-flash for all tiers)
- [ ] 4.4 Create claude-deepseek.cmd (without hardcoded token)
- [ ] 4.5 Test: Claude Code replies via DeepSeek API

## 5. README & Documentation
- [ ] 5.1 Write README.md with project overview
- [ ] 5.2 Document development workflow
- [ ] 5.3 Document tag convention (#keithclawviewer)

## 6. Archive Change
- [ ] 6.1 Git add + commit all changes
- [ ] 6.2 Push to GitHub
- [ ] 6.3 OpenSpec archive foundation-setup
