# Goldfinder product audit

## Implemented

- Responsive Next.js site, safety boundary, SEO, robots, sitemap and security headers.
- Basic gold, placer, lode, mineral, tool and sampling guidance.
- Device-local field records and a privacy-first sample-map concept.
- Verified photo atlas with per-image author, licence, source and interpretation limits.
- Primary reference register using USGS, Geoscience Australia and Wikimedia Commons.

## Next priorities

### P0 — trustworthy field use

- Add citations at statement level, with reviewer/date/version metadata on every guide.
- Expand the atlas with soils, limonite, hematite, garnet, ilmenite, zircon, bedrock traps,
  clay false bottoms, terraces, alluvial fans, alteration and shear-zone examples.
- Add side-by-side diagnostic tables for gold, pyrite, chalcopyrite and mica.
- Add offline availability and a prominent emergency/legal checklist.

### P1 — complete records and sampling

- Export/import records as JSON and CSV; generate printable sample labels and chain-of-custody forms.
- Add QA/QC fields for blanks, duplicates, certified reference material and laboratory methods.
- Add volume/mass-aware calculators for g/t and g/m³ with uncertainty warnings.
- Add photo attachments with scale, orientation and privacy controls.
- Replace the illustrative map with a real offline-capable map only after coordinate privacy is designed.

### P2 — production quality

- Add Chinese, Burmese and English content with geological terminology review.
- Add light theme, accessibility checks, keyboard testing and reduced-motion support.
- Add content search, filters and related-guide navigation.
- Add automated tests, dependency/security checks and deployment preview validation.
- Configure the actual production hostname before publishing canonical URLs.

## Deliberate exclusions

- No automatic claim that a photo contains gold.
- No invented grade, resource, reserve or economic estimate.
- No public upload of exact prospect coordinates by default.
- No instructions for mercury, cyanide or unsafe underground entry.
