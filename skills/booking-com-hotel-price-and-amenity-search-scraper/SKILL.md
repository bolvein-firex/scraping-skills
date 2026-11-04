---
name: booking-com-hotel-price-and-amenity-search-scraper
description: "Use the Booking.com Hotel Price & Amenity Search Scraper actor to pull products from Booking.com and return title, price, rating, reviews, stock, URL. Use when the user needs a price watchlist, a catalog export, or a competitor snapshot without maintaining a scraper."
---

# Booking.com Hotel Price & Amenity Search Scraper

Pull **products** from **Booking.com** with the public Scraper Finder actor.

- Actor: https://apify.com/nimbryxo-studio/booking-com-hotel-price-and-amenity-search-scraper
- Actor ID: `nimbryxo-studio~booking-com-hotel-price-and-amenity-search-scraper`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/booking-com-hotel-price-and-amenity-search-scraper.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of products from Booking.com
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
| `mode` | string | no | search | Search a destination, or load specific Booking.com hotel URLs. |
| `destination` | string | no |  | City, region or landmark to search, e.g. Paris, New York or Tokyo. Required in search mode. |
| `startUrls` | array | no |  | Booking.com hotel page URLs, used in details mode. Copy links from a search result or your browser. |
| `checkIn` | string | no |  | Check-in date as YYYY-MM-DD. Leave empty to use tomorrow. |
| `checkOut` | string | no |  | Check-out date as YYYY-MM-DD. Leave empty to use a 3-night stay. |
| `adults` | integer | no | 2 | Number of adult guests. |
| `rooms` | integer | no | 1 | Number of rooms needed. |
| `propertyType` | string | no | all | Keep only one Booking.com property type, or search all types. |
| `minReviewScore` | number | no | 0 | Minimum guest score from 0 to 10. The actor applies Booking.com's score filter and then keeps only properties at or above this exact score. |
| `stars` | string | no | 0 | Keep only properties with this star rating, or any star rating. |
| `freeCancellation` | boolean | no | false | Return properties with at least one free-cancellation rate. |
| `breakfast` | boolean | no | false | Return properties with a breakfast-included rate. |
| `pool` | boolean | no | false | Return properties that have a swimming pool. |
| `minPrice` | number | no |  | Optional lower bound for the nightly price in the chosen currency. |

Example:

```json
{
  "mode": "search",
  "startUrls": [],
  "adults": 2,
  "rooms": 1,
  "propertyType": "all",
  "minReviewScore": 0,
  "stars": "0",
  "freeCancellation": false,
  "breakfast": false,
  "pool": false,
  "currency": "USD",
  "language": "en-us",
  "maxItems": 3,
  "includeRooms": true,
  "includeFullAmenities": false
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~booking-com-hotel-price-and-amenity-search-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~booking-com-hotel-price-and-amenity-search-scraper/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/booking-com-hotel-price-and-amenity-search-scraper.json

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
