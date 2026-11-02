---
name: airbnb-listing-price-and-location-finder
description: "Use the Airbnb Listing Price & Location Finder actor to pull listings from Airbnb and return name, price, rating, reviews, location, amenities. Use when the user needs a listing export, a farm list, or a market snapshot without maintaining a scraper."
---

# Airbnb Listing Price & Location Finder

Pull **listings** from **Airbnb** with the public Scraper Finder actor.

- Actor: https://apify.com/nimbryxo-studio/airbnb-listing-price-and-location-finder
- Actor ID: `nimbryxo-studio~airbnb-listing-price-and-location-finder`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/airbnb-listing-price-and-location-finder.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of listings from Airbnb
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- name
- price
- rating
- reviews
- location
- amenities

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `mode` | string | no | search | Search discovers listings by location or map area. Details loads the listing URLs or IDs you provide. |
| `location` | string | no |  | City, region, country or neighborhood, e.g. New York, Paris, SoHo. Airbnb's own location lookup validates the name before searching (mode=search). |
| `placeId` | string | no |  | Optional Google/Airbnb place ID (e.g. ChIJOwg_06VPwokRYv534QaPC8g). Takes precedence over the resolved location and skips text matching (mode=search). |
| `neighborhood` | string | no |  | Optional neighborhood to combine with Location, e.g. SoHo + New York (mode=search). |
| `bbox` | object | no |  | Search inside a map rectangle instead of a named location. Use decimal degrees: swLat, swLng (south-west corner) and neLat, neLng (north-east corner), plus an optional zoom (1-22). |
| `listingUrls` | array | no |  | Airbnb room URLs, e.g. https://www.airbnb.com/rooms/23222680 (mode=details). |
| `listingIds` | array | no |  | Numeric Airbnb listing IDs, e.g. 23222680. You can mix these with listing URLs (mode=details). |
| `checkIn` | string | no |  | Stay start date in YYYY-MM-DD format. Leave both dates empty to use Airbnb's displayed quote (search) or to skip the price quote (details). |
| `checkOut` | string | no |  | Stay end date in YYYY-MM-DD format. Must be after the check-in date. |
| `adults` | integer | no | 1 | Number of adult guests (1-16). |
| `children` | integer | no | 0 | Number of children aged 2-12 (0-15). |
| `infants` | integer | no | 0 | Number of infants under 2 (0-5). |
| `pets` | integer | no | 0 | Number of pets (0-5). |
| `minPrice` | integer | no | 0 | Lowest nightly price to include, in the selected currency. 0 means no minimum. |

Example:

```json
{
  "location": "Miami, FL",
  "checkIn": "2026-11-14",
  "checkOut": "2026-11-16",
  "maxListings": 500
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~airbnb-listing-price-and-location-finder/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~airbnb-listing-price-and-location-finder/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/airbnb-listing-price-and-location-finder.json

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
