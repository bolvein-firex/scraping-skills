---
name: aliexpress-multi-region-search-store-and-review-scraper
description: "Use the AliExpress Multi-Region Search, Store & Review Scraper actor to pull review data from AliExpress and return author, rating, text, date, business, URL. Use when the user needs a price watchlist, a catalog export, or a competitor snapshot without maintaining a scraper."
---

# AliExpress Multi-Region Search, Store & Review Scraper

Pull **review data** from **AliExpress** with the public Scraper Finder actor.

- Actor: https://apify.com/vexaloom-labs/aliexpress-multi-region-search-store-and-review
- Actor ID: `vexaloom-labs~aliexpress-multi-region-search-store-and-review`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/aliexpress-multi-region-search-store-and-review-scraper.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of review data from AliExpress
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
| `mode` | string | yes | search | What to collect. search: keyword results. byProduct: product lookup by ID or URL. byStore: store lookup. byReviews: customer reviews. byUrl: auto-detect from pasted AliExpress link |
| `searchQueries` | array | no |  | One or more keywords, e.g. "phone case" or "wireless earbuds". Each query is scraped up to maxPages pages. |
| `productIds` | array | no |  | Numeric AliExpress product IDs or item URLs. Both 1005… and 3256… ID formats are accepted. |
| `storeIds` | array | no |  | Numeric store IDs or /store/… URLs. |
| `urls` | array | no |  | Any mix of search, item, store and review URLs. The mode is detected per URL. |
| `region` | string | no | US | Country used for prices, availability and the storefront locale. Global leaves the region to the requesting IP. |
| `currency` | string | no |  | Optional ISO-4217 currency. Leave blank to use the region's usual currency. The currency actually returned is recorded in every record. |
| `language` | string | no | en_US | Storefront language and the language used to translate review text. |
| `sortBy` | string | no | default | How keyword results are ordered. AliExpress does not expose a newest sort. |
| `priceMin` | number | no | 0 | Minimum price in the selected currency. 0 disables the lower bound. |
| `priceMax` | number | no | 0 | Maximum price in the selected currency. 0 disables the upper bound. |
| `ratingMin` | number | no | 0 | Minimum star rating from 0 to 5. Products without a rating are skipped when a threshold is set. |
| `shipFrom` | string | no |  | Only show items stocked in this country. Leave blank for any warehouse. |
| `freeShippingOnly` | boolean | no | false | Only show items advertised with free shipping. |

Example:

```json
{
  "mode": "search",
  "region": "US",
  "language": "en_US",
  "sortBy": "default",
  "priceMin": 0,
  "priceMax": 0,
  "ratingMin": 0,
  "freeShippingOnly": false,
  "choiceOnly": false,
  "fourStarPlus": false,
  "includeSponsored": true,
  "includeWelcomeGifts": false,
  "maxItems": 100,
  "maxPages": 3,
  "includeReviews": false,
  "maxReviewsPerProduct": 20,
  "reviewFilter": "all",
  "includeProductStats": true,
  "searchQueries": [
    "keyword"
  ]
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/vexaloom-labs~aliexpress-multi-region-search-store-and-review/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/vexaloom-labs~aliexpress-multi-region-search-store-and-review/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/aliexpress-multi-region-search-store-and-review-scraper.json

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
