---
name: amazon-review-aggregates-and-extended-history-scraper
description: "Use the Amazon Review Aggregates & Extended History Scraper actor to pull review data from Amazon and return author, rating, text, date, business, URL. Use when the user needs a price watchlist, a catalog export, or a competitor snapshot without maintaining a scraper."
---

# Amazon Review Aggregates & Extended History Scraper

Pull **review data** from **Amazon** with the public Scraper Finder actor.

- Actor: https://apify.com/dataspryva/amazon-review-aggregates-and-extended-history
- Actor ID: `dataspryva~amazon-review-aggregates-and-extended-history`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/amazon-review-aggregates-and-extended-history-scraper.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of review data from Amazon
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- author
- rating
- text
- date
- business
- URL

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `productUrls` | array | no |  | List of Amazon product URLs to scrape reviews from. Supports /dp/, /gp/product/, /gp/aw/d/ and /product/ URL formats across 19+ Amazon domains. A bare 10-character ASIN (e.g. "B09X |
| `keywords` | array | no |  | Search keywords used to auto-discover products when `productUrls` is empty (e.g. "wireless earbuds"). Fetches Amazon's public `/s?k=` search results page for each keyword and revie |
| `categoryUrls` | array | no |  | Advanced mode: supply your own Amazon `/s?...` or `/b?node=...` category/search URL(s) directly (used only when `productUrls` is empty). Products are discovered the same way as `ke |
| `maxProductsToDiscover` | integer | no | 10 | Maximum number of products to discover per run from `keywords`/`categoryUrls`. Ignored when `productUrls` is supplied directly. |
| `extendedHistory` | boolean | no | true | Merge Amazon's public extended review feed for each ASIN (no login, no cookie): up to 100 reviews per star/sort bucket, and walking every bucket yields 100-850+ unique reviews for  |
| `mergeMarketplaces` | array | no |  | Additional Amazon marketplaces whose product page is fetched for the same ASIN and whose reviews are merged (deduplicated by review ID and content). Each marketplace typically adds |
| `includeAggregates` | boolean | no | true | Emit one additional `amazon_review_aggregate` record per product with the product title, average rating, global ratings count, star histogram (plus derived per-star counts), and "C |
| `country` | string | no | amazon.com | Amazon country domain to scrape from. URLs from a different domain are honored automatically. |
| `maxReviews` | integer | no | 100 | Hard cap on the number of reviews returned per product AFTER merging and deduplication (1-2000). The product-page sample alone yields ~8-13; the extended review feed can add 100-85 |
| `sortBy` | string | no | helpful | How to sort the returned reviews: most helpful first, or most recent first. |
| `filterByStar` | string | no |  | Keep only reviews with this rating. `positive` keeps 4-5 star reviews; `critical` keeps 1-2 star reviews. Applied to the merged set, so narrow filters can legitimately return few o |
| `verifiedPurchasesOnly` | boolean | no | false | Keep only reviews carrying Amazon's Verified Purchase badge. Applied server-side for the extended feed and client-side for product-page rows. |
| `filterKeywords` | array | no |  | Keep only reviews whose title or text contains at least one of these keywords (case-insensitive). Empty = no keyword filter. |
| `reviewsNewerThan` | string | no |  | Keep only reviews dated on or after this date (e.g. 2026-01-15 or any ISO date). Reviews whose localized date cannot be parsed are kept. Empty = no date filter. |

Example:

```json
{
  "keywords": [],
  "categoryUrls": [],
  "maxProductsToDiscover": 10,
  "extendedHistory": true,
  "mergeMarketplaces": [],
  "includeAggregates": true,
  "country": "amazon.com",
  "maxReviews": 100,
  "sortBy": "helpful",
  "verifiedPurchasesOnly": false,
  "filterKeywords": [],
  "mediaReviewsOnly": false,
  "includeImages": true,
  "includeGdprSensitive": false,
  "productUrls": [
    "https://www.amazon.com/dp/B0EXAMPLE"
  ]
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/dataspryva~amazon-review-aggregates-and-extended-history/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/dataspryva~amazon-review-aggregates-and-extended-history/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/amazon-review-aggregates-and-extended-history-scraper.json

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
