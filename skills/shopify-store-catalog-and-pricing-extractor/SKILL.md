---
name: shopify-store-catalog-and-pricing-extractor
description: "Use the Shopify Store Catalog & Pricing Extractor actor to pull stores from Shopify and return title, price, compare-at, variant, stock, URL. Use when the user needs a price watchlist, a catalog export, or a competitor snapshot without maintaining a scraper."
---

# Shopify Store Catalog & Pricing Extractor

Pull **stores** from **Shopify** with the public Scraper Finder actor.

- Actor: https://apify.com/nimbryxo-studio/shopify-store-catalog-and-pricing-extractor
- Actor ID: `nimbryxo-studio~shopify-store-catalog-and-pricing-extractor`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/shopify-store-catalog-and-pricing-extractor.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of stores from Shopify
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- title
- price
- compare-at
- variant
- stock
- URL

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `mode` | string | yes | catalog | What to scrape. `catalog` walks the public product feed, `collection` walks specific collections, `product` fetches exact product handles, `search` uses the storefront search sugge |
| `storeUrls` | array | no |  | Store domains or URLs, e.g. `deathwishcoffee.com` or `https://www.allbirds.com`. Accepts custom domains and `*.myshopify.com`. A product or collection URL is reduced to its store f |
| `startUrls` | array | no |  | Store, collection or product URLs. In `auto` mode each URL selects its own job: `/products/<handle>` fetches one product, `/collections/<handle>` fetches a collection, any other st |
| `collectionHandles` | array | no |  | Collection handles or collection URLs, e.g. `new-arrivals`, `sale`, or `https://store.com/collections/sale`. Handles are applied to every store in `storeUrls`; a full collection UR |
| `productHandles` | array | no |  | Product handles or product URLs, e.g. `dark-roast-coffee` or `https://store.com/products/dark-roast-coffee`. Handles are applied to every store in `storeUrls`; a full product URL i |
| `searchQuery` | string | no |  | In-store search term. Shopify's public suggest endpoint returns at most 10 products per store and has no pagination. |
| `currency` | string | no | store | ISO 4217 code to pin prices to, e.g. `USD`, `EUR`, `GBP`. Use `store` to use the store's base currency from `/meta.json`. Pinning is important because Shopify localizes prices by I |
| `country` | string | no |  | Two-letter ISO country code passed as `?country=` to the storefront, e.g. `US`, `GB`, `DE`. |
| `vendor` | string | no |  | Keep products whose vendor contains this text (case-insensitive). |
| `productType` | string | no |  | Keep products whose product type contains this text (case-insensitive). |
| `tag` | string | no |  | Keep products with at least one tag containing this text (case-insensitive). |
| `minPrice` | number | no |  | Drop products whose lowest variant price is below this value. |
| `maxPrice` | number | no |  | Drop products whose lowest variant price is above this value. |
| `available` | string | no | any | Keep all products, only products with at least one purchasable variant, or only sold-out products. |

Example:

```json
{
  "storeUrl": "https://example-store.com",
  "includeVariants": true,
  "includeSoldOut": true
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~shopify-store-catalog-and-pricing-extractor/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~shopify-store-catalog-and-pricing-extractor/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/shopify-store-catalog-and-pricing-extractor.json

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
