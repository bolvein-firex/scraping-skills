---
name: amazon-customer-review-and-rating-summary-scraper
description: "Use the Amazon Customer Review & Rating Summary Scraper actor to pull review data from Amazon and return author, rating, text, date, business, URL. Use when the user needs a price watchlist, a catalog export, or a competitor snapshot without maintaining a scraper."
---

# Amazon Customer Review & Rating Summary Scraper

Pull **review data** from **Amazon** with the public Scraper Finder actor.

- Actor: https://apify.com/vexaloom-labs/amazon-customer-review-and-rating-summary-scraper
- Actor ID: `vexaloom-labs~amazon-customer-review-and-rating-summary-scraper`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/amazon-customer-review-and-rating-summary-scraper.json
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
| `productUrls` | array | no |  | Amazon product URLs (/dp/, /gp/product/, /gp/aw/d/, /product/) or bare 10-character ASINs, on any supported Amazon domain. Leave empty to discover products from `keywords`/`categor |
| `keywords` | array | no |  | Search terms used to discover products when `productUrls` is empty (e.g. "wireless earbuds"). Each keyword contributes up to `maxProductsToDiscover` products. |
| `categoryUrls` | array | no |  | Advanced discovery: Amazon `/s?...` search URLs or `/b?node=...` category URLs. Used only when `productUrls` is empty. |
| `maxProductsToDiscover` | integer | no | 5 | Maximum products discovered from each keyword or category URL (1-50). Ignored when `productUrls` is supplied. |
| `country` | string | no | amazon.com | Amazon storefront to use for bare ASINs, discovery, and products whose URL does not carry a domain. Product URLs keep their own domain. |
| `maxReviews` | integer | no | 100 | Hard cap per product after merging and deduplication (1-2000). The product-page sample alone yields about 8-13 rows; the optional extended feed can add 100-800+ for popular US prod |
| `extendedHistory` | boolean | no | true | Merge Amazon's public extended review feed for each ASIN (no login): up to 100 rows per star/sort bucket, typically 100-800+ unique reviews for popular US products, deduplicated ag |
| `mergeMarketplaces` | array | no |  | Fetch the same product on these additional Amazon marketplaces and merge their deduplicated product-page reviews. Empty = the product's own marketplace only. |
| `sortBy` | string | no | helpful | Order of the returned reviews: most helpful first, or most recent first. |
| `filterByStar` | string | no |  | Keep only reviews with this rating. `positive` keeps 4-5 stars and `critical` keeps 1-2 stars. Applied after merging, so narrow filters can legitimately return few or no rows. |
| `verifiedPurchasesOnly` | boolean | no | false | Keep only reviews carrying Amazon's Verified Purchase badge. Applied server-side in the extended feed (and cookie mode) and client-side for product-page rows. |
| `filterKeywords` | array | no |  | Keep only reviews whose title or text contains at least one of these keywords (case-insensitive). Empty = no keyword filter. |
| `reviewsNewerThan` | string | no |  | Keep only reviews dated on or after this date (YYYY-MM-DD or any ISO date). Reviews whose localized date cannot be parsed are kept. Empty = no date filter. |
| `mediaReviewsOnly` | boolean | no | false | Keep only reviews that include at least one reviewer-uploaded image or video. |

Example:

```json
{
  "keywords": [],
  "categoryUrls": [],
  "maxProductsToDiscover": 5,
  "country": "amazon.com",
  "maxReviews": 100,
  "extendedHistory": true,
  "mergeMarketplaces": [],
  "sortBy": "helpful",
  "verifiedPurchasesOnly": false,
  "filterKeywords": [],
  "mediaReviewsOnly": false,
  "includeImages": true,
  "includeAggregates": true,
  "includeGdprSensitive": false,
  "productUrls": [
    "https://www.amazon.com/dp/B0EXAMPLE"
  ]
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/vexaloom-labs~amazon-customer-review-and-rating-summary-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/vexaloom-labs~amazon-customer-review-and-rating-summary-scraper/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/amazon-customer-review-and-rating-summary-scraper.json

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
