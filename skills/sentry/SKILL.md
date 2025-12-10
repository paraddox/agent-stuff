---
name: sentry
description: "Fetch and analyze Sentry issues directly from the API. Helps agents understand errors, stack traces, and issue context."
---

# Sentry Skill

Fetch Sentry issue details directly via the API. Uses auth token from `~/.sentryclirc`.

## Fetch Issue

```bash
./tools/fetch-issue.js <issue-id-or-url>
```

Accepts either:
- Issue ID: `5765604106`
- Issue URL: `https://sentry.io/organizations/sentry/issues/5765604106/`
- New URL format: `https://myorg.sentry.io/issues/5765604106/`
- Short ID: `JAVASCRIPT-ABC` (requires `--org` flag)

Examples:
```bash
./tools/fetch-issue.js 5765604106
./tools/fetch-issue.js https://sentry.io/organizations/sentry/issues/5765604106/
./tools/fetch-issue.js https://myorg.sentry.io/issues/5765604106/
./tools/fetch-issue.js JAVASCRIPT-ABC --org sentry
```

## Fetch Latest Event

```bash
./tools/fetch-issue.js <issue-id-or-url> --latest
```

Fetches the latest event for the issue, including full stack trace.

## Output

Returns formatted issue details including:
- Title and culprit
- First/last seen timestamps
- Event count and user impact
- Tags and environment info

With `--latest`, also shows:
- Stack trace with file locations and function names
- Source context (when available)
- Request details (method, URL, headers, body)
- Recent breadcrumbs with timestamps
- Runtime context (Node version, OS, browser, device)
