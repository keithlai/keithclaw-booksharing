## Why

Modal close button (✕) currently uses `rgba(255,255,255,0.1)` background with `rgba(255,255,255,0.7)` text color. This works in dark mode but becomes nearly invisible in light/day mode because the button is white-on-light, offering no contrast.

## What Changes

- Replace hardcoded white `rgba()` values with Material Design 3 CSS variables
- Use `var(--md-sys-color-surface-variant)` for background and `var(--md-sys-color-on-surface-variant)` for icon color
- These variables automatically adapt to both light and dark color schemes
- Ensure minimum 4.5:1 contrast ratio in both modes per WCAG AA

## Capabilities

### New Capabilities
- (none — existing `book-modal-view` capability, just a CSS fix)

### Modified Capabilities
- (none — no spec-level requirement changes, only CSS implementation detail)

## Impact

- `html/book-browser-material.html`: Modal close button CSS only
- No functional changes, no API changes, no backend changes
