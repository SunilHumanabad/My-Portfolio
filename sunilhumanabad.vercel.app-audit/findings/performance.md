# Performance (CWV) — 45/100 (weight 10%)

## What works

- CLS ≈ 0.007 (good) on desktop and mobile
- Hero portrait is preloaded; below-fold images lazy-load
- Fonts self-hosted via next/font with swap

## Findings

### [High] Live build delays mobile LCP from 2.0 s to 7.9 s

Lab test (390 px, ~1.6 Mbps/150 ms, 4× CPU): LCP 7.9 s with the default auto-play build versus 2.0 s with animations off. The LCP element is the hero name, which stays hidden until a cursor types it. Desktop LCP is 1.9–2.5 s.

**Fix:** Render the hero (name, intro, portrait, CTAs) immediately and let the build start below it, or start the build after LCP / on first interaction; skip it on Save-Data and slow connections (navigator.connection).

### [Medium] Heavy main thread on mobile

Total Blocking Time ≈ 760–840 ms under 4× CPU throttling; ~816 KB of uncompressed JS (≈200 KB gzipped).

**Fix:** Load BuildSwarm, Cursor and ProjectDialog with next/dynamic (ssr:false) so they don't block first render; trim framer-motion usage where CSS suffices.
