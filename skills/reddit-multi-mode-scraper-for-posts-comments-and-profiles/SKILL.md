---
name: reddit-multi-mode-scraper-for-posts-comments-and-profiles
description: "Use the Reddit Multi-Mode Scraper for Posts, Comments & Profiles actor to pull records from Reddit and return Subreddit, title, score, author, Comment, URL. Use when the user needs a public-data lead list, a local business export, or a repeatable outbound dataset without maintaining a scraper."
---

# Reddit Multi-Mode Scraper for Posts, Comments & Profiles

Pull **records** from **Reddit** with the public Scraper Finder actor.

- Actor: https://apify.com/nimbryxo-studio/reddit-multi-mode-scraper-for-posts-comments
- Actor ID: `nimbryxo-studio~reddit-multi-mode-scraper-for-posts-comments`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/reddit-multi-mode-scraper-for-posts-comments-and-profiles.json
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

- Subreddit
- title
- score
- author
- Comment
- URL

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `mode` | string | yes | subreddit | What to scrape: a subreddit listing, post URLs with comments, a user profile, or keyword search. |
| `source` | string | no | auto | auto uses live Reddit first and the Arctic Shift archive for depth/bulk or as a fallback. archive is faster and cheaper but lags live Reddit by several hours; live never uses archi |
| `subreddits` | array | no | programming | Subreddits to scrape (mode=subreddit). Accepts names, r/ names or URLs. |
| `postUrls` | array | no |  | Post URLs, comment URLs, share links or bare post IDs (mode=post). |
| `usernames` | array | no |  | Reddit usernames to scrape (mode=profile). Accepts names, u/ names or profile URLs. |
| `searchQuery` | string | no |  | Keyword or phrase to search for (mode=search). Reddit search syntax such as "exact phrase", author:name, subreddit:name and -exclude is supported by live search. |
| `maxItems` | integer | no | 50 | Hard cap on all records pushed by the run, across every target. |
| `maxPosts` | integer | no | 25 | Posts per subreddit, keyword or profile section. |
| `maxComments` | integer | no | 100 | Comments per post, keyword, or profile comment section. 0 disables comment records. |
| `maxDepth` | integer | no | 6 | Deepest reply level to emit (0 = top-level comments only). |
| `includeComments` | boolean | no | true | Emit comment records for each post. Disable to fetch only the parent post. |
| `includePost` | boolean | no | true | Emit the post record before its comments. |
| `sort` | string | no | hot | Post/listing sort. Search accepts relevance, hot, top, new or comments; other modes use hot, new, top, rising, controversial or best. |
| `timeFilter` | string | no | day | Time window for top/controversial sorts and search. |

Example:

```json
{
  "subreddits": [
    "smallbusiness",
    "SaaS"
  ],
  "searchQuery": "lead generation",
  "maxItems": 1000,
  "includeComments": true
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~reddit-multi-mode-scraper-for-posts-comments/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~reddit-multi-mode-scraper-for-posts-comments/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/reddit-multi-mode-scraper-for-posts-comments-and-profiles.json

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
