# Goldfinder product audit

## Implemented through v3.0.0

- Responsive Next.js site, safety boundary, SEO, robots, sitemap and security headers.
- Illustrated gold, placer, lode, soil, mineral, field-tool and sampling guidance.
- Dedicated geology interpretation centre with a five-level evidence ladder.
- Interactive sampling, QA/QC batch, planning, mapping and reporting tools.
- Device-local field records, photo attachments and privacy-first sample mapping.
- Versioned data vault with merge/replace restore and coordinate redaction.
- Verified photo atlas with per-image author, licence, source and interpretation limits.
- Primary reference register using USGS, Geoscience Australia and Wikimedia Commons.
- Chinese/English routes, theme switching, responsive overlay navigation and real Lucide icons.
- Production metadata, structured data, web manifest, social preview and security headers.

## Next priorities

### P0 — content governance

- Continue statement-level citations across legacy guides; real-field geology references now include per-card scientific sources and shared guides carry editor/date/version metadata.
- Add named geological reviewer, review date and revision history to every guide.
- Completed in v3.35.0: local, licensed real-photo examples for alluvial fans, terraces, alteration and shear zones.
- Completed in v3.37.0: printable Myanmar-specific permit verification and universal emergency go/no-go checklist in three languages.

### P1 — field resilience

- Completed in v3.38.0: service-worker-backed offline availability for core trilingual knowledge, geology and safety pages, plus runtime caching for visited pages and local assets.
- Completed in v3.39.0: bulk ZIP photo archive export preserves original files, captions, project/sample links and per-file SHA-256 digests.
- Completed in v3.39.0: local backup reminders and SHA-256 validation for versioned JSON backup restore.

### P2 — production quality

- Add professionally reviewed Burmese content.
- Complete formal accessibility and keyboard testing.
- Add content search, filters and related-guide navigation.
- Add automated tests, dependency/security checks and deployment preview validation.
- Configure a custom production hostname and replace the temporary canonical domain.

## Deliberate exclusions

- No automatic claim that a photo contains gold.
- No invented grade, resource, reserve or economic estimate.
- No public upload of exact prospect coordinates by default.
- No instructions for mercury, cyanide or unsafe underground entry.
