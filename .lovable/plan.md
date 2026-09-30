# Batch C audit fixes

## Scope

- Replace the specified page titles and descriptions across standard, Open Graph, and X/Twitter metadata; preserve unchanged descriptions and verify owner pages use database values without suffixes.
- Add matching homepage fallback metadata and the requested WebSite structured-data block in `index.html`.
- Convert only hero photos used by live routed pages to optimized WebP files, update their references and loading priorities, and prevent pages from fetching photos they do not display without adding route-level code splitting.
- Delay only the Google Analytics network script until the browser `load` event while keeping the `dataLayer`, `gtag` queue, initialization calls, existing analytics events, and any conversion calls available immediately.
- Add the requested mobile-menu accessibility state and relationship attributes.
- Correct the named orange contrast failures with the smallest token-level color adjustment that preserves the brand look.

## Technical details

- Metadata: update `src/pages/Index.tsx`, `CompliancePlatforms.tsx`, `IsnHelp.tsx`, `Veriforce.tsx`, `Avetta.tsx`, `OwnersIndex.tsx`, and `Pricing.tsx`; inspect `OwnerPage.tsx` without changing it if its database values are already passed through exactly.
- Site defaults and performance: update `index.html`; retain the current Google Fonts preconnect and `display=swap` configuration.
- Images: optimize the live homepage and compliance-platform hero JPGs to WebP under 150 KB, retain explicit dimensions, set hero loading/fetch priority/decoding attributes, and remove only confirmed-unreferenced hero JPGs. Avoid route-level code splitting.
- Accessibility: update `NavigationNew.tsx` and the semantic accent token in `src/index.css`; use a darker brand orange sufficient for at least 4.5:1 contrast against the existing light foreground.
- Record any new image-loading architecture rule in `AGENTS.md` only if a structural implementation decision is required.

## Verification

- Confirm the project build succeeds and validate all JSON-LD as JSON.
- Verify metadata in prerendered output for every requested route.
- Use browser network inspection to confirm the homepage requests only its displayed hero image and that GA queues events before its network script loads.
- Check hero loading attributes, mobile menu accessibility attributes/state, and desktop/mobile rendering.
- Report every changed/created/deleted file, each converted image’s before/after byte size, exact color changes and computed contrast ratios, plus any limitation.
- Do not publish.
