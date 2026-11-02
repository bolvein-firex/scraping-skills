---
name: google-trends-interest-and-related-query-scraper
description: "Use the Google Trends Interest & Related Query Scraper actor to pull search trends from Google Trends and return Term, Interest, Breakout, Related Query, Geo, date. Use when the user needs a trend brief, a creator list, or a content swipe file without maintaining a scraper."
---

# Google Trends Interest & Related Query Scraper

Pull **search trends** from **Google Trends** with the public Scraper Finder actor.

- Actor: https://apify.com/vexaloom-labs/google-trends-interest-and-related-query-scraper
- Actor ID: `vexaloom-labs~google-trends-interest-and-related-query-scraper`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/google-trends-interest-and-related-query-scraper.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of search trends from Google Trends
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- Term
- Interest
- Breakout
- Related Query
- Geo
- date

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `mode` | string | no | interest | What to scrape. 'Interest over time & related queries' is the Google Trends Explore view (keywords required). 'Trending now' lists what is spiking in a country right now. |
| `searchTerms` | array | no |  | One or more search terms to analyze (mode=interest). Each term becomes its own dataset row, or enable Comparison mode to compare up to 5 terms side by side. Example: `tesla` or `te |
| `compareMode` | boolean | no | false | Compare all search terms on one shared 0-100 scale in a single row (Google Trends comparison view, maximum 5 terms). Off means each term is scraped independently. |
| `startUrls` | array | no |  | Paste Google Trends links to scrape them directly: explore links (trends.google.com/trends/explore?q=..., including www.google.com/trends/... redirect links) and embedded-chart lin |
| `geo` | string | no |  | Country, state/region or metro area to analyze. Leave empty for worldwide. Trending Now uses the country part of this location. |
| `timeRange` | string | no | today 12-m | Time window for the interest data (mode=interest). 'now' ranges return minute-level points; 'today' ranges return day/week points. Choose 'Custom range' to enter exact dates below. |
| `customDateRange` | string | no |  | Only used when 'Time range' = 'Custom range': 'YYYY-MM-DD YYYY-MM-DD' (e.g. '2024-01-01 2024-12-31') or 'YYYY-MM-DDTHH YYYY-MM-DDTHH' for hourly granularity. |
| `category` | string | no | 0 | Google Trends category filter (mode=interest). 0 = All categories. |
| `searchType` | string | no |  | Which Google surface to query (mode=interest). Web Search is the default. |
| `geoResolution` | string | no |  | Breakdown level for 'interest by region' (mode=interest). Auto lets Google pick the right level for the location; other levels are applied when the location supports them. |
| `trendingHours` | string | no | 24 | How far back the Trending Now list goes (mode=trending). |
| `trendingCategory` | string | no | all | Filter the Trending Now list to one of Google's trending categories (mode=trending). |
| `includeTrendingNews` | boolean | no | true | Attach news headlines, links and sources from Google's Trending RSS feed to trending items whose titles it covers (about ten highlighted stories per country, anywhere in the list). |
| `maxItems` | integer | no | 100 | Maximum dataset records per run: each interest row counts as one record, each trending item as one record. Remaining work stops once the limit is reached. |

Example:

```json
{
  "terms": [
    "ai agents",
    "n8n workflows"
  ],
  "geo": "US",
  "timeRange": "today 3-m",
  "includeRelatedQueries": true
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/vexaloom-labs~google-trends-interest-and-related-query-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/vexaloom-labs~google-trends-interest-and-related-query-scraper/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/google-trends-interest-and-related-query-scraper.json

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
