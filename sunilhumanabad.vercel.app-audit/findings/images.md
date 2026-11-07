# Images — 92/100 (weight 5%)

## What works

- All 13 images have width/height (no CLS)
- WebP throughout; 12 of 13 lazy-loaded; descriptive alt text on content images
- Pre-optimised sizes (52–260 KB)

## Findings

### [Low] Archive thumbnails use empty alt

8 decorative thumbnails sit next to visible titles, which is correct for accessibility but gives image search nothing.

**Fix:** Optional: keep as is (preferred for screen readers), or rely on project pages to carry the descriptive images.
