## Why

Material Design UI book cards currently use inline expand/collapse for displaying book details, which feels cramped on mobile and doesn't follow M3 dialog patterns. Users need a full-screen modal view with comfortable reading typography to properly read book overviews and takeaways.

## What Changes

- Replace inline `.card-detail` expand with a M3-style modal dialog
- Modal includes: book title header, close button, overview, 3 key takeaways, recommendation reason
- Reading mode typography: 16px content font, 1.85 line-height, justified text, section spacing
- Light/dark mode color fix: use CSS variables instead of hardcoded colors
- Responsive layout: adaptive grid (3-4 cols desktop → 2 cols tablet → 1 col mobile), touch-friendly tap targets
- Mobile: bottom sheet style modal on small screens, safe-area padding for notched devices
- Lazy load detail via existing `/api/book?id=XXX` API
- Fix button CSS: modal close button too dark — use on-surface color for proper contrast in both modes
- Three key takeaways highlighted with accent color callout cards
- Version bump: classic v1.0.0→v1.1.0, material v2.0.0→v2.1.0

## Capabilities

### New Capabilities
- `book-modal-view`: Modal dialog for displaying book detail with expand/collapse, reading mode typography, and proper light/dark color support

### Modified Capabilities
- (none — existing specs not changed, only UI rendering)

## Impact

- `html/book-browser-material.html`: JS click handler replaced, modal CSS added, reading mode styles
- `html/book-browser.html`: Version number updated
- `SPEC-Material-UI.md`: Version updated
- No API changes — reuse existing `/api/book?id=XXX`
- No backend changes — server.js untouched
