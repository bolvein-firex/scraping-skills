---
name: google-shopping-price-comparison-and-deal-finder
description: "Use the Google Shopping Price Comparison & Deal Finder actor to pull products from Google Shopping and return title, price, rating, reviews, stock, URL. Use when the user needs a price watchlist, a catalog export, or a competitor snapshot without maintaining a scraper."
---

# Google Shopping Price Comparison & Deal Finder

Pull **products** from **Google Shopping** with the public Scraper Finder actor.

- Actor: https://apify.com/vexaloom-labs/google-shopping-price-comparison-and-deal-finder
- Actor ID: `vexaloom-labs~google-shopping-price-comparison-and-deal-finder`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/google-shopping-price-comparison-and-deal-finder.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of products from Google Shopping
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- title
- price
- rating
- reviews
- stock
- URL

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `mode` | string | no | search | What to collect: keyword search, product lookup by ID/viewer URL, deals, or a department category. |
| `queries` | array | no |  | Product keywords for search/deals mode. Ignored in product mode; optional in category mode. |
| `productIds` | array | no |  | Google Shopping catalog IDs, product IDs, product viewer URLs, or legacy /shopping/product/<id> URLs. Used in product mode. |
| `category` | string | no |  | Google Shopping department for category mode. |
| `countryCode` | string | no | us | Country used for the Google domain, UULE location and price hint. The actual currency is always detected from the response, never relabelled. |
| `languageCode` | string | no | en | Interface and result language (hl parameter). |
| `sortBy` | string | no |  | Client-side sort of the collected rows. Google ignores server-side sort on this page. |
| `condition` | string | no |  | Condition hint sent to Google and verified when the result card shows a condition. |
| `minPrice` | integer | no |  | Minimum price in the detected local currency. Applied through a shoprs filter and verified on every output row. |
| `maxPrice` | integer | no |  | Maximum price in the detected local currency. Applied through a shoprs filter and verified on every output row. |
| `onSale` | boolean | no | false | Ask Google for discounted products and keep rows with an observed original price or discount. |
| `freeShipping` | boolean | no | false | Ask Google for free-shipping products and keep rows whose delivery text says free. |
| `minRating` | string | no | 0 | Minimum product rating (0-5). Applied through a shoprs rating chip and verified on every output row. |
| `store` | string | no |  | Optional store name to bias and verify, e.g. Best Buy or Amazon. |

Example:

```json
{
  "mode": "search",
  "countryCode": "us",
  "languageCode": "en",
  "onSale": false,
  "freeShipping": false,
  "minRating": "0",
  "maxResultsPerQuery": 20,
  "includePriceHistory": true,
  "includeProductDetails": false
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/vexaloom-labs~google-shopping-price-comparison-and-deal-finder/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/vexaloom-labs~google-shopping-price-comparison-and-deal-finder/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/google-shopping-price-comparison-and-deal-finder.json

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
