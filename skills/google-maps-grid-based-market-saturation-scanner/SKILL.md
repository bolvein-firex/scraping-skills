---
name: google-maps-grid-based-market-saturation-scanner
description: "Use the Google Maps Grid-Based Market Saturation Scanner actor to pull local business listings from Google Maps and return Grid Point, rank, business, rating, reviews, Distance. Use when the user needs a public-data lead list, a local business export, or a repeatable outbound dataset without maintaining a scraper."
---

# Google Maps Grid-Based Market Saturation Scanner

Pull **local business listings** from **Google Maps** with the public Scraper Finder actor.

- Actor: https://apify.com/dataspryva/google-maps-grid-based-market-saturation-scanner
- Actor ID: `dataspryva~google-maps-grid-based-market-saturation-scanner`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/google-maps-grid-based-market-saturation-scanner.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a local business or B2B lead list with public contact details
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- Grid Point
- rank
- business
- rating
- reviews
- Distance

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `searchQuery` | string | yes |  | Type of business to search for (e.g., 'pharmacy', 'restaurant', 'dentist'). |
| `locationName` | string | no |  | Name of a public Google Maps location (e.g., 'Brooklyn, NY'). Google resolves its real center anonymously, then the actor scans the user-controlled radiusKm around it. Use bounding |
| `boundingBox` | object | no |  | Geographic bounding box defining the scan area. Provide north/south/east/west coordinates. |
| `circleCenter` | object | no |  | Center point for a circular scan area. Use with radiusKm. |
| `radiusKm` | number | no | 5 | Radius in kilometers for circular scan area (used with circleCenter or locationName). |
| `customGeolocation` | object | no |  | Custom GeoJSON Polygon defining the scan boundary. |
| `zoomLevel` | integer | no | 15 | Controls grid cell granularity. Higher = smaller cells, more thorough coverage. |
| `maxPlacesPerCell` | integer | no | 120 | Maximum businesses to collect from each grid cell (1–260; Google's ranked window for one cell reaches roughly 136–213 places). |
| `maxPagesPerCell` | integer | no | 13 | How many 20-result pages to read per cell. Deeper pages surface more businesses — page 1 finds about 20% of a cell's places, page 9 finds all of them. |
| `maxTotalResults` | integer | no | 10000 | Maximum total businesses to extract across all cells. Stops scanning when reached. |
| `deduplicateResults` | boolean | no | true | Remove duplicate businesses that appear in multiple adjacent grid cells. |
| `enrichDetails` | boolean | no | false | Open each place's page for extra fields (price level, Plus Code, photo sample, rating histogram, open/closed status). Slower; leave off for large exports since listing fields are a |
| `minRating` | number | no |  | Only include businesses with a rating at or above this value (1.0–5.0). Leave empty to include all. |
| `language` | string | no | en | Language for Google Maps interface and results. |

Example:

```json
{
  "keyword": "coffee shop",
  "location": "Denver, CO",
  "gridSize": 7,
  "radius": 5,
  "maxResultsPerPoint": 20
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/dataspryva~google-maps-grid-based-market-saturation-scanner/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/dataspryva~google-maps-grid-based-market-saturation-scanner/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/google-maps-grid-based-market-saturation-scanner.json

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
