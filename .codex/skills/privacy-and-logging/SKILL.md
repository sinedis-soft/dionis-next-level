---
name: privacy-and-logging
description: Use for edits involving logs, uploaded documents, local lead logs, trace IDs, SMTP reports, Bitrix payload handling, sensitive insurance application data, or error handling that may expose personal data.
---

# Privacy and Logging

AGENTS.md already lists sensitive data and high-risk paths. Use this checklist for exposure-prone changes.

## Review every diff for

- Full payloads, document contents, credentials, webhook URLs, SMTP secrets, raw CRM data, or unnecessary personal data.
- Error messages that reveal names, phone/email, passport data, addresses, company IDs, VIN/plate data, uploaded documents, UTM data, or Bitrix records.
- Accidental changes that make ignored/generated paths such as `logs/` commit-worthy.

## Keep

- Logs limited to trace IDs, coarse stage/status, and safe diagnostics.
- User-facing/API errors useful but non-leaking.

## Report

Changed files, data exposure changes, logging/error-message changes, verification results, and any privacy risk before finishing.