# Project Architecture

- Keep live hero imagery as optimized WebP assets imported only by the page that renders each image, preserving SSG without route-level code splitting.
- Render owner requirements with a dedicated text-only component and citation anchors, not HTML injection or a Markdown dependency, to safely preserve source text during prerendering.
- Keep case studies as a static route with an explicit SSG entry and stable per-study anchors so their content is prerendered and homepage links target each result.