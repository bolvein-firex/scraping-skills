---
name: tiktok-hashtag-momentum-and-top-creator-tracker
description: "Use the TikTok Hashtag Momentum & Top Creator Tracker actor to pull trends from TikTok and return hashtag, posts, views, momentum, top creator, rank. Use when the user needs a trend brief, a creator list, or a content swipe file without maintaining a scraper."
---

# TikTok Hashtag Momentum & Top Creator Tracker

Pull **trends** from **TikTok** with the public Scraper Finder actor.

- Actor: https://apify.com/dataspryva/tiktok-hashtag-momentum-and-top-creator-tracker
- Actor ID: `dataspryva~tiktok-hashtag-momentum-and-top-creator-tracker`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/tiktok-hashtag-momentum-and-top-creator-tracker.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of trends from TikTok
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- hashtag
- posts
- views
- momentum
- top creator
- rank

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `mode` | string | no | trendingHashtags | Choose 'Trending hashtags' for TikTok's ranked hashtag charts (post/view counts, popularity curve, creators) or 'Trending videos' for TikTok's ranked video charts (views, engagemen |
| `countries` | array | no | US | (mode=trendingHashtags) One or more markets to read the hashtag chart for. Each market adds its own ranked rows. |
| `periods` | array | no | 7 | (mode=trendingHashtags) Lookback windows in days. 7 shows recent spikes, 90 shows longer-term trends. Select one or more. |
| `includeOverallRanking` | boolean | no | true | (mode=trendingHashtags) Include each market's overall top-3 hashtag chart. Turn off to read only the industry charts selected below. |
| `scanAllIndustries` | boolean | no | true | (mode=trendingHashtags) Read all 19 industry charts for every market and window. This widens coverage from 3 to up to 60 hashtags per market and window, because each industry chart |
| `industries` | array | no |  | (mode=trendingHashtags) Specific industry charts to read when 'Scan all industries' is off. Ignored when scanning all industries. 19 public categories are available. |
| `includeCreatorLeaders` | boolean | no | false | (mode=trendingHashtags) Add creator rows that aggregate the creators TikTok credits across the collected hashtags, sorted by how many trends they appear in. |
| `minHashtagAppearances` | integer | no | 2 | (mode=trendingHashtags, creator leaderboard only) Only list creators credited on at least this many collected hashtag rows. |
| `videoCountries` | array | no | US | (mode=trendingVideos) Markets with a public TikTok trending-video chart. Select one or more. |
| `videoPeriods` | array | no | 7 | (mode=trendingVideos) Windows in days for the trending-video chart: 7 for videos created in the last week, 30 for the last month. |
| `videoSortBy` | string | no | views | (mode=trendingVideos) Metric used for the video ranking. |
| `videoOrganicOnly` | boolean | no | false | (mode=trendingVideos) Rank only organic (non-promoted) videos. TikTok returns a different ranking for organic-only charts. |
| `videoContentTags` | array | no |  | (mode=trendingVideos) Query TikTok's video ranking by content tag and dedupe the videos. Each selected tag is a separate ranking read; 'All tags' also includes the unfiltered chart |
| `weeksBack` | integer | no | 0 | (mode=trendingVideos) Add past weekly rankings by moving the chart end date back 7 days per step (0-4). Useful for comparing this week with earlier weeks. |

Example:

```json
{
  "mode": "trendingHashtags",
  "countries": [
    "US"
  ],
  "periods": [
    7
  ],
  "includeCreatorLeaders": true,
  "maxItems": 100
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/dataspryva~tiktok-hashtag-momentum-and-top-creator-tracker/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/dataspryva~tiktok-hashtag-momentum-and-top-creator-tracker/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/tiktok-hashtag-momentum-and-top-creator-tracker.json

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
