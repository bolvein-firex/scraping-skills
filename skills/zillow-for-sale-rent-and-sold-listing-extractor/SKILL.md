---
name: zillow-for-sale-rent-and-sold-listing-extractor
description: "Use the Zillow For-Sale, Rent & Sold Listing Extractor actor to pull listings from Zillow and return address, price, beds, baths, days on market, price cut. Use when the user needs a listing export, a farm list, or a market snapshot without maintaining a scraper."
---

# Zillow For-Sale, Rent & Sold Listing Extractor

Pull **listings** from **Zillow** with the public Scraper Finder actor.

- Actor: https://apify.com/nimbryxo-studio/zillow-for-sale-rent-and-sold-listing-extractor
- Actor ID: `nimbryxo-studio~zillow-for-sale-rent-and-sold-listing-extractor`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/zillow-for-sale-rent-and-sold-listing-extractor.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of listings from Zillow
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- address
- price
- beds
- baths
- days on market
- price cut
- agent

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `search` | string | no |  | City, ZIP, neighborhood, county or state to search (for example 'Houston, TX' or '77002'). |
| `mode` | string | yes | BUY | Search active for-sale listings, rentals, or recently sold listings. |
| `maxItems` | integer | no | 50 | Maximum number of records for the whole run across all sources (1-5000). |
| `endPage` | integer | no | 5 | Maximum search result pages per search task (1-24). Zillow returns up to 41 listings per page. |
| `startUrls` | array | no |  | Property detail URLs, /apartments/ building URLs, or Zillow search page URLs. Search URLs keep their own filters and mode. |
| `zpids` | array | no |  | Zillow property IDs or URLs containing _zpid. Each ZPID is resolved to its canonical detail page. |
| `addresses` | array | no |  | Full street addresses to resolve to Zillow property pages, for example '1306 Castle Ct, Houston, TX 77006'. |
| `priceMin` | integer | no |  | Minimum listing price in US dollars. |
| `priceMax` | integer | no |  | Maximum listing price in US dollars. |
| `bedsMin` | string | no | any | Minimum number of bedrooms. |
| `bathsMin` | string | no | any | Minimum number of bathrooms. |
| `sqftMin` | integer | no |  | Minimum living area in square feet. |
| `sqftMax` | integer | no |  | Maximum living area in square feet. |
| `lotSizeMin` | string | no | any | Minimum lot size in square feet. |

Example:

```json
{
  "mode": "BUY",
  "search": "Austin, TX",
  "maxItems": 500,
  "scrapeDetails": true,
  "daysOnZillow": "1",
  "sortBy": "newest"
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~zillow-for-sale-rent-and-sold-listing-extractor/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~zillow-for-sale-rent-and-sold-listing-extractor/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/zillow-for-sale-rent-and-sold-listing-extractor.json

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
