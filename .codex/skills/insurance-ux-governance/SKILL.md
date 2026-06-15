---
name: insurance-ux-governance
description: Use as the top-level coordination skill for regulated insurance UX tasks that combine UI review, SEO pages, multilingual dictionaries, conversion optimization, legal compliance, localization enforcement, testing, or screenshot-based design imitation. Use when a page, component, funnel, or copy change must be validated as a product system rather than only styled.
---

# Insurance UX Governance Layer

This is the top-level coordination skill for insurance product UI, SEO, and localization.

It does not generate UI directly. It enforces consistency across:

- UI review.
- SEO pages.
- Multilingual dictionaries.
- Conversion flows.
- Legal compliance.
- Multilingual UX enforcement.
- Webapp testing.
- Screenshot-based design analysis.

## Core principle

No page, component, or text is valid unless it satisfies all relevant layers:

- UX review rules.
- SEO structure rules when page-level.
- Legal compliance rules.
- Multilingual consistency rules.
- Conversion safety rules.
- Visual style constraints.

If a conflict exists: compliance overrides UX, UX overrides SEO, SEO overrides styling.

## Skill orchestration rules

When processing a task:

### Step 1 — classify intent

- UI change: apply `insurance-ui-review` and, for premium UI creation, `insurance-ui-skill`.
- SEO, route, page metadata, sitemap, canonical, or hreflang: apply `insurance-seo-page`.
- Text, dictionaries, localized copy, or terminology: apply `multilingual-dictionaries`.
- Browser validation, screenshots, responsive checks: apply `insurance-ui-testing`.
- Screenshot imitation or visual benchmark extraction: apply `screenshot-ui-design`.

### Step 2 — apply domain overlays

Always consider these overlays for regulated insurance UX:

- `legal-compliance-ui`.
- `conversion-optimization`.
- `multi-language-ux-enforcement`.

## Hard constraints

### Legal-first UI rule

No UI optimization is allowed if it:

- Hides insurer or broker identity.
- Delays pricing disclosure.
- Removes risk or exclusion information.
- Reduces legal transparency.

### Conversion constraint

No UX change may:

- Introduce deceptive urgency.
- Hide cost elements.
- Remove steps without explanation.

### Localization constraint

No UI is valid if:

- Any required string is untranslated.
- Languages are inconsistent in meaning.
- Error states are missing in any locale.

## Review merging logic

If multiple skills conflict, use this priority order:

1. `legal-compliance-ui`.
2. `insurance-ui-review`.
3. `multi-language-ux-enforcement`.
4. `conversion-optimization`.
5. `insurance-seo-page`.
6. Visual style preferences from `insurance-ui-skill` or `screenshot-ui-design`.

## Output requirement

Always produce:

- Issue list by category.
- Severity: critical, high, medium, or low.
- Concrete fix per issue.
- Affected components or pages.
- Risk explanation: UX, legal, conversion, SEO, or localization.

No generic advice.

## System behavior rule

You are not acting as a visual designer. You are a governance system for regulated insurance UX.

Validate correctness of UI as a product system, not aesthetics alone.

## Anti-pattern detection

Automatically flag:

- Missing legal entity.
- Inconsistent pricing display.
- Language drift across pages.
- CTA ambiguity.
- Form overload.
- Hidden dependencies between steps.