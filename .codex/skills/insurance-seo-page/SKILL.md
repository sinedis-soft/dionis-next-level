---
name: insurance-seo-page
description: Use for edits to localized product/landing pages, app/[lang], static params, dynamicParams=false, normalizeLang, SEO metadata, JSON-LD, breadcrumbs, sitemap, robots, hreflang, or canonical URLs.
---

# Insurance SEO Page

AGENTS.md already covers routing, i18n, SEO, and insurance-domain rules. Use this page-specific checklist.

## Preserve

- Language-prefixed route architecture and `/` to `/en` redirect unless explicitly requested.
- Existing SEO helpers/dictionaries, `SITE_URL`, `generateStaticParams`, `dynamicParams = false`, `normalizeLang`, alternates, breadcrumbs, and JSON-LD patterns.

## Content guardrails

- Keep product pages legally accurate and commercially clear.
- When relevant, cover product, eligibility, documents, territory, start date, term, payment, delivery, restrictions, and support contacts.
- Avoid unsupported claims about coverage, prices, guarantees, refunds, eligibility, claims outcomes, or processing time.

## Verify

For production-impacting page/SEO edits, run `npm run lint`, `npx tsc --noEmit`, and `npm run build`.

## Report

Changed routes/pages, locales, metadata/JSON-LD impact, verification results, and legal/SEO assumptions.