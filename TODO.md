# Modern Pricing Webpage Update - TODO

Current Progress: 0/15 ✅

## Breakdown of Approved Plan (Logical Steps)

### Phase 1: Core Modernization (Steps 1-5)
- [x] 1. Update styles.css: Add full dark/light theme vars/classes, glassmorphism to all elements (cards/navbar/table). (Added CSS vars, .glass class with -webkit- prefix, applied to navbar/pricing/testimonial/table; fixed Safari compat warnings)
- [x] 2. Update styles.css: Implement clamp typography, variable fonts (Inter), enhanced mobile/container queries.
- [x] 3. Update index.html: Add data-theme="light" to html, lazy imgs, ARIA labels, meta (PWA/theme-color). (Added data-theme, Inter font, theme-color/manifest preloads, lazy hero img, toggle ARIA, improved alt text)

### Phase 2: Pricing & Interactions (Steps 6-10)
- [x] 4. Update styles.css: Custom glow toggle slider, savings badges, ripple buttons CSS. (Enhanced form-switch with glow/shadow, Bootstrap vars)
- [x] 5. Update script.js: Theme toggle logic + localStorage persist, pricing toggle fix (annual/monthly + savings calc). (Full annual/monthly with ₦ format, savings badge, price anim, theme toggle btn in navbar + SW reg)


### Phase 3: Advanced Effects (Steps 11-13)
- [ ] 7. Update script.js: Canvas particles hero BG, scroll-triggered counters for stats.
- [ ] 8. Update styles.css: Hero canvas support, stronger parallax/micro-anims.
- [x] 9. Create manifest.json & sw.js: PWA stubs. (Added full manifest with icons/theme, basic SW for caching/offline)

### Phase 4: Polish & Test (Steps 14-15)
- [ ] 10. Update script.js: Ripple effects, staggered observers, enhanced alerts.
- [ ] 11. Full test: Theme/pricing toggle, mobile, accessibility.
- [ ] 12. Optimize: Lighthouse perf/accessibility >90.
- [ ] 13. Update TODO.md with completions.

**Next Action**: Start Phase 1 Step 1 (styles.css theme/glass). Command to view: `start index.html`

Updated on: [Current time]
