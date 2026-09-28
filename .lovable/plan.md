# Nationwide compliance repositioning

## Scope

- Replace the homepage and compliance-platform page photos with two new realistic, general-industry contractor images. Both will exclude oilfield infrastructure, screens, text, signage, logos, and brand marks.
- Use the new homepage photo to create a clean 1200×630 social preview image with no text.
- Update the requested nationwide positioning, industry list, metadata, operator/client wording, pricing wording, and visible response-time messages.
- Remove all testimonial sections and all visible 24-hour claims, then rebalance affected stat layouts to three columns.
- Switch the compliance-platform page to the current header and footer.
- copy the existing logo into the public site root so the structured-data logo URL resolves.
- Add complete Open Graph and X/Twitter image metadata to each routable page while preserving each page’s current title and description, except for the specifically requested description changes.

## Content rules

- Nationwide language replaces regional positioning; the Crystal Springs address remains unchanged in the footer, contact page, and structured data.
- Industry names will appear exactly in this order: Construction; Industrial Services & Maintenance; Oil, Gas & Energy; Manufacturing & Food Production.
- Forms receive only the explicitly requested visible message changes. Their fields, validation, spam protection, submission behavior, and analytics calls remain untouched.
- Pricing, guarantees, trademark notices, support notices, phone links, routes, redirects, and prerender settings remain unchanged.

## Technical details

- Update: `src/components/HeroNew.tsx`, `src/components/TrustSection.tsx`, `src/components/LeadForm.tsx`, `src/components/PricingSection.tsx`.
- Update: `src/pages/Index.tsx`, `src/pages/About.tsx`, `src/pages/IsnHelp.tsx`, `src/pages/Avetta.tsx`, `src/pages/Veriforce.tsx`, `src/pages/CompliancePlatforms.tsx`.
- Update additional routable page Helmet metadata as needed for complete social sharing: Pricing, Contact, Not Found, and the internal trademark report; alias URLs inherit their primary page metadata.
- Update any other source file containing a visible 24-hour or regional claim found by the final repository-wide audit, without changing associated behavior.
- Update `index.html` only for the requested geographic tag, dual-platform JSON-LD wording, and social defaults.
- Add generated assets under `src/assets/`, replace `public/og-image.jpg`, and add `public/cornerstone-logo.jpg`.

## Verification

- Confirm no visible Gulf Coast/Southeast positioning or 24-hour claims remain in source.
- Confirm all requested pages include `og:title`, `og:description`, `og:image`, `twitter:card`, and `twitter:image`.
- Validate all JSON-LD blocks and confirm both new images contain no prohibited text, logos, screens, or oilfield equipment.
- Check desktop and mobile previews for the homepage, compliance-platform page, and three help-page proof sections.
- Confirm the build passes and verify protected forms, analytics code, edge functions, routes, redirects, and SSG configuration were not changed.
- Do not publish.
