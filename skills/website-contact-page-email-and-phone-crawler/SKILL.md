---
name: website-contact-page-email-and-phone-crawler
description: "Use the Website Contact Page Email & Phone Crawler actor to pull contact pages from the web and return domain, email, phone, source page, MX status, status. Use when the user needs a public-data lead list, a local business export, or a repeatable outbound dataset without maintaining a scraper."
---

# Website Contact Page Email & Phone Crawler

Pull **contact pages** from **the web** with the public Scraper Finder actor.

- Actor: https://apify.com/nimbryxo-studio/website-contact-page-email-and-phone-crawler
- Actor ID: `nimbryxo-studio~website-contact-page-email-and-phone-crawler`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/website-contact-page-email-and-phone-crawler.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a local business or B2B lead list with public contact details
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- domain
- email
- phone
- source page
- MX status
- status

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `urls` | array | yes |  | Websites to scan for public contact details. You can paste full URLs or bare domains; duplicates are removed. |
| `maxPagesPerSite` | integer | no | 20 | Maximum number of pages to fetch per website. Contact, about, team and imprint pages are prioritised. |
| `maxConcurrency` | integer | no | 5 | How many pages of the same website may be fetched in parallel. |
| `maxSitesConcurrency` | integer | no | 3 | How many websites are scanned in parallel. Lower this if you hit rate limits. |
| `requestTimeoutSecs` | integer | no | 15 | Maximum time to wait for one page before trying the next proxy tier. |
| `defaultCountry` | string | no |  | ISO 3166-1 alpha-2 country used to interpret phone numbers written without an international prefix. Leave empty to infer from the website domain. |
| `useProxy` | boolean | no | false | Start with the Apify proxy ladder instead of trying direct requests first. The actor always retries blocked requests through the proxy ladder automatically. |
| `smartPrioritise` | boolean | no | true | Try common contact, about, team, imprint and support paths first, and queue contact-like links ahead of other internal links. |
| `respectRobotsTxt` | boolean | no | true | Skip pages that the website's robots.txt disallows. Turn this off only when you own the site or have permission to crawl it. |
| `useSitemap` | boolean | no | true | Read sitemap.xml and robots.txt sitemap entries to find contact and about pages that are not linked from the homepage. |
| `renderFallback` | boolean | no | true | If plain HTML contains no email or phone, render up to two pages in a headless browser to capture contacts loaded by JavaScript. |
| `onlyWithContacts` | boolean | no | false | Drop records for websites where no email, phone, social profile or contact form was found. |
| `includeNamedEmails` | boolean | no | true | Include personal addresses such as jane.smith@company.com. When off, only role addresses such as info@, sales@ and support@ are kept. |

Example:

```json
{
  "websites": [
    "example.com",
    "anotherbrand.com"
  ],
  "maxContactPages": 3,
  "verifyMx": true
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~website-contact-page-email-and-phone-crawler/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~website-contact-page-email-and-phone-crawler/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/website-contact-page-email-and-phone-crawler.json

## Cost and limits

- Billing is per Apify actor run and per dataset item. Check the actor page for current pricing.
- `run-sync-get-dataset-items` has a request timeout. Use the async pattern for large jobs.
- Respect rate limits and the target site's terms.

## Guardrails

- Public data only. Do not use cookies, sessions, or private account data.
- Do not use the output for spam, harassment, or unlawful discrimination.
- Verify local law and the target site's terms before running at scale.
- Demo rows in the Scraper Finder video are illustrative.

## Files

- `scripts/run.mjs` - minimal Node runner using `APIFY_TOKEN`
- `references/input-schema.json` - full actor input schema
- `references/example-input.json` - starter input
