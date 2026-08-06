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

- Completed in v3.43.0 for the trilingual core knowledge library: every guide now carries section-level primary-source links with an explicit note describing which statement group each USGS or EPA source supports. Real-field geology cards retain their per-card scientific sources and shared guides retain editor/date/version metadata.
- v3.44.0 established a trilingual public professional-review register with mandatory reviewer identity, credentials, scope, conflicts, signature date and reviewed-version fields. Named geological, Burmese terminology and local-compliance reviewers remain transparently unassigned; the site will not claim completion until genuine signed records are received.
- Completed in v3.35.0: local, licensed real-photo examples for alluvial fans, terraces, alteration and shear zones.
- Completed in v3.37.0: printable Myanmar-specific permit verification and universal emergency go/no-go checklist in three languages.

### P1 — field resilience

- Completed in v3.38.0: service-worker-backed offline availability for core trilingual knowledge, geology and safety pages, plus runtime caching for visited pages and local assets.
- Completed in v3.39.0: bulk ZIP photo archive export preserves original files, captions, project/sample links and per-file SHA-256 digests.
- Completed in v3.39.0: local backup reminders and SHA-256 validation for versioned JSON backup restore.

### P2 — production quality

- v3.44.0 established a separate professional Burmese and geological-terminology review track with a public pending status and acceptance requirements. Professional endorsement remains pending a genuine named reviewer and is not represented as complete.
- Completed in v3.41.0: keyboard skip navigation, universal high-contrast focus indicators, Escape-close and trapped focus for the overlay navigation, plus automated accessibility contract tests and manual trilingual keyboard verification.
- Completed in v3.42.0: trilingual full-content discovery indexes knowledge articles, photo references and project tools with category filters, keyboard shortcuts and contextual previous/next guide navigation without expanding the global menu.
- Completed in v3.40.0: automated sampling-math regression tests plus GitHub Actions type, test, build and high-severity dependency security gates for every push and pull request; production route/link/image verification remains available for post-deployment checks.
- Configure a custom production hostname and replace the temporary canonical domain.

## Deliberate exclusions

- No automatic claim that a photo contains gold.
- No invented grade, resource, reserve or economic estimate.
- No public upload of exact prospect coordinates by default.
- No instructions for mercury, cyanide or unsafe underground entry.
