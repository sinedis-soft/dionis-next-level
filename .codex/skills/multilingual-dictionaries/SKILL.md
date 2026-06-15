---
name: multilingual-dictionaries
description: Use for edits to app/dictionaries, app/dictionaries/seo-landings, locale definitions, localized UI copy, SEO copy, or insurance/legal/privacy/cookie translations.
---

# Multilingual Dictionaries

AGENTS.md already defines repo-wide i18n and safety rules. Use this focused checklist for dictionary work.

## Checklist

- Preserve dictionary shapes, keys, exported getters, and TypeScript types.
- Update every relevant locale (`ru`, `en`, `kk`) or report gaps.
- Avoid single-language literals in shared components.
- Keep insurance/legal/privacy/cookie terms natural and legally careful, not literal machine translations.
- Keep SEO copy aligned with existing SEO dictionaries/helpers.

## Verify

- Run `npx tsc --noEmit`.
- Also run `npm run check:relations` when editing `calculator.ts`, `home.ts`, or `infoCompare.ts`.

## Report

Files/locales changed, missing locales, assumptions, translation/legal risks, and verification results.