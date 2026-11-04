---
name: facebook-marketplace-listing-and-price-extractor
description: "Use the Facebook Marketplace Listing & Price Extractor actor to pull market data from Facebook and return symbol, price, change, volume, market cap, URL. Use when the user needs a structured export, a dataset refresh, or a workflow input without maintaining a scraper."
---

# Facebook Marketplace Listing & Price Extractor

Pull **market data** from **Facebook** with the public Scraper Finder actor.

- Actor: https://apify.com/nimbryxo-studio/facebook-marketplace-listing-and-price-extractor
- Actor ID: `nimbryxo-studio~facebook-marketplace-listing-and-price-extractor`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/facebook-marketplace-listing-and-price-extractor.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of market data from Facebook
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- symbol
- price
- change
- volume
- market cap
- URL

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `mode` | string | no | auto | What to scrape. auto uses startUrls when present and otherwise builds a keyword search. search builds a search from searchQueries plus location. urls scrapes the given Marketplace  |
| `startUrls` | array | no |  | Marketplace search, city-category, global-category, city-feed, or /marketplace/item/ URLs. In mode=items, a bare numeric listing ID is also accepted. |
| `searchQueries` | array | no |  | One to 20 keywords or phrases (mode=search or mode=auto without URLs). Each query becomes one source. |
| `location` | string | no |  | Marketplace location slug, city, postal code, or address used by keyword search (mode=search or mode=auto without URLs). Examples: nyc, Austin, Texas, 90210, London. |
| `country` | string | no | US | ISO 3166-1 alpha-2 country used when resolving a human location. Use GB for London, CA for Toronto, and so on. |
| `latitude` | number | no |  | Optional search center latitude. Provide longitude too. |
| `longitude` | number | no |  | Optional search center longitude. Provide latitude too. |
| `radiusKm` | integer | no | 65 | Search radius in kilometres for keyword or category search. URL mode keeps the radius in the URL unless you set this explicitly. |
| `category` | string | no | all | Marketplace category. If searchQueries is empty, the actor opens the city category feed (or the global category feed for a human location). Books, shoes, games, motorcycles, cell-p |
| `categoryId` | string | no |  | Advanced numeric Facebook category ID. Takes precedence over category when set. |
| `sortBy` | string | no | relevance | Server-side sort where Marketplace supports it, plus a client-side re-sort by price or posting time. Rows without a price sort last. |
| `minPrice` | number | no |  | Only listings at or above this price. Rows without a price are dropped. |
| `maxPrice` | number | no |  | Only listings at or below this price. Rows without a price are dropped. |
| `condition` | string | no | any | Server-side condition filter in search/category modes. In deep mode the detail condition is checked too; fast URL rows without condition data are kept. |

Example:

```json
{
  "mode": "auto",
  "startUrls": [],
  "searchQueries": [],
  "country": "US",
  "radiusKm": 65,
  "category": "all",
  "sortBy": "relevance",
  "condition": "any",
  "deliveryMethod": "all",
  "availability": "all",
  "exactMatch": false,
  "maxItems": 50,
  "maxItemsPerUrl": 50,
  "maxPagesPerUrl": 100,
  "scrapeMode": "fast",
  "includeListingDetails": false,
  "includeAllPhotos": false,
  "rehostImages": true,
  "deduplicateAcrossInputs": true,
  "location": "New York, NY"
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~facebook-marketplace-listing-and-price-extractor/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~facebook-marketplace-listing-and-price-extractor/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/facebook-marketplace-listing-and-price-extractor.json

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
