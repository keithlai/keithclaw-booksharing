## Context

Material Design 3 UI book cards used inline `.card-detail` expand/collapse to show book overview and takeaways. This felt cramped on mobile and didn't follow M3 dialog patterns. Users requested a proper modal dialog with comfortable reading mode typography.

## Goals / Non-Goals

**Goals:**
- Replace inline expand with M3-style modal dialog
- Reading mode typography (16px font, 1.85 line-height, justified)
- Light/dark mode color fix (CSS variables, no hardcoded colors)
- Responsive layout (desktop modal → mobile bottom sheet)
- Button contrast fix for both modes
- Three takeaways displayed as highlighted accent color cards

**Non-Goals:**
- No backend changes — API (`/api/book?id=XXX`) unchanged
- No data model changes — booklist.json unchanged
- No breaking UI changes to classic version

## Decisions

- **Modal over inline**: M3 dialogs provide focused reading experience vs cramped inline expansion
- **CSS variables over hardcoded**: Use `var(--md-sys-color-*)` from Material theme for proper light/dark switching
- **Primary-container for takeaway cards**: Purple accent background with white text creates visual hierarchy
- **Surface-container-high for close button**: Lighter background than before for better contrast
- **Same lazy load API**: Reuse existing `/api/book?id=XXX` — no backend changes needed

## Risks / Trade-offs

- Modal overlay may feel slower than inline expand on low-end devices → mitigated by showing loading spinner immediately
- Mobile bottom sheet gesture may conflict with browser swipe → handled by tap-outside-to-close pattern
