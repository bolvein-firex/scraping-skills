---
name: amazon-multi-domain-product-price-and-detail-scraper
description: "Use the Amazon Multi-Domain Product Price & Detail Scraper actor to pull products from Amazon and return title, price, coupon, rating, reviews, stock. Use when the user needs a price watchlist, a catalog export, or a competitor snapshot without maintaining a scraper."
---

# Amazon Multi-Domain Product Price & Detail Scraper

Pull **products** from **Amazon** with the public Scraper Finder actor.

- Actor: https://apify.com/nimbryxo-studio/amazon-multi-domain-product-price-and-detail
- Actor ID: `nimbryxo-studio~amazon-multi-domain-product-price-and-detail`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/amazon-multi-domain-product-price-and-detail-scraper.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of products from Amazon
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- title
- price
- coupon
- rating
- reviews
- stock

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `productUrls` | array | no |  | Amazon product URLs to scrape. Any mix of the 21 supported country domains is allowed, e.g. https://www.amazon.com/dp/B0B8PD8TTP. |
| `asins` | array | no |  | Bare 10-character Amazon ASINs. Builds /dp/{ASIN} URLs on the selected marketplace, or on every domain listed in `domains` for cross-marketplace runs. |
| `searchTerms` | array | no |  | Keyword queries to run on Amazon search pages. Price/rating/deal/condition/sort filters are applied as URL parameters. |
| `searchUrls` | array | no |  | Full Amazon search URLs to pass through, including your own `i=`, `rh=`, `low-price`, and `s=` parameters. Pagination is added automatically. |
| `bestsellerUrls` | array | no |  | Amazon bestseller /zgbs/ or /gp/bestsellers/ list URLs. Returns the ranked product cards, optionally enriched with product-detail fields. |
| `marketplace` | string | no | auto | Marketplace used for bare ASINs and keyword search terms. `auto` uses the first product URL's domain, or amazon.com. |
| `domains` | array | no |  | Optional list of marketplaces (e.g. amazon.com, amazon.de) to run bare ASINs and search terms across. Leave empty to use `marketplace` only. |
| `language` | string | no | auto | Page language. `auto` uses the marketplace's own default. Explicit values set `?language=` and the matching Accept-Language header. |
| `currency` | string | no | auto | ISO currency for the displayed price. `auto` uses the marketplace currency. Note: Amazon converts display currency; it is not guaranteed local retail pricing. |
| `deliveryCountry` | string | no | auto | Optional country hint. When `postalCode` is empty, a representative local ZIP for that country is used. A country alone is not sent to Amazon. |
| `postalCode` | string | no |  | Local ZIP/postal code for the delivery location. The actor validates it against the marketplace format and skips the location change if it does not match. |
| `minPrice` | number | no |  | Minimum price for discovery (search) results. Leave empty for no lower bound. |
| `maxPrice` | number | no |  | Maximum price for discovery (search) results. Leave empty for no upper bound. |
| `minRating` | string | no | any | Minimum star rating for discovery results. `4` is the live-validated 4+ stars filter; lower values are best effort. |

Example:

```json
{
  "searchTerms": [
    "wireless earbuds"
  ],
  "marketplace": "amazon.com",
  "maxItems": 500,
  "includeDetails": true,
  "dealsOnly": true
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~amazon-multi-domain-product-price-and-detail/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~amazon-multi-domain-product-price-and-detail/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/amazon-multi-domain-product-price-and-detail-scraper.json

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
