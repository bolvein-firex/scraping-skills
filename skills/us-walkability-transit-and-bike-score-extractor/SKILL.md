---
name: us-walkability-transit-and-bike-score-extractor
description: "Use the US Walkability, Transit & Bike Score Extractor actor to pull location scores from the public web and return address, walk score, transit score, bike score, city, URL. Use when the user needs a listing export, a farm list, or a market snapshot without maintaining a scraper."
---

# US Walkability, Transit & Bike Score Extractor

Pull **location scores** from **the public web** with the public Scraper Finder actor.

- Actor: https://apify.com/dataspryva/us-walkability-transit-and-bike-score-extractor
- Actor ID: `dataspryva~us-walkability-transit-and-bike-score-extractor`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/us-walkability-transit-and-bike-score-extractor.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of location scores from the public web
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- address
- walk score
- transit score
- bike score
- city
- URL

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `mode` | string | yes | byCity | What to look up. |
| `addresses` | array | no |  | US street addresses, e.g. '1 Beach St, San Francisco, CA 94133'. walkscore.com/score/... URLs are also accepted. |
| `cities` | array | no | Seattle, WA | Cities as 'Seattle, WA', 'Seattle-WA', or a walkscore.com city URL. |
| `neighborhoods` | array | no |  | Neighborhoods as 'Ballard, Seattle, WA' or a walkscore.com neighborhood URL. |
| `state` | string | no | WA | US state whose city table to read. |
| `includeNeighborhoods` | boolean | no | true | Add the city page's neighborhood ranking table to each city record. |
| `maxItems` | integer | no | 50 | Maximum records to emit (state summary counts as one). |

Example:

```json
{
  "mode": "byCity",
  "addresses": [],
  "cities": [
    "Seattle, WA"
  ],
  "neighborhoods": [],
  "state": "WA",
  "includeNeighborhoods": true,
  "maxItems": 50
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/dataspryva~us-walkability-transit-and-bike-score-extractor/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/dataspryva~us-walkability-transit-and-bike-score-extractor/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/us-walkability-transit-and-bike-score-extractor.json

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
