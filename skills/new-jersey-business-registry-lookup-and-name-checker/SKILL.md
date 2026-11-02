---
name: new-jersey-business-registry-lookup-and-name-checker
description: "Use the New Jersey Business Registry Lookup & Name Checker actor to pull business entities from the state registry and return entity name, status, formed date, agent, city, URL. Use when the user needs a public-data lead list, a local business export, or a repeatable outbound dataset without maintaining a scraper."
---

# New Jersey Business Registry Lookup & Name Checker

Pull **business entities** from **the state registry** with the public Scraper Finder actor.

- Actor: https://apify.com/vexaloom-labs/new-jersey-business-registry-lookup-and-name
- Actor ID: `vexaloom-labs~new-jersey-business-registry-lookup-and-name`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/new-jersey-business-registry-lookup-and-name-checker.json
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

- entity name
- status
- formed date
- agent
- city
- URL

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `mode` | string | yes | byName | What to fetch. |
| `businessNames` | array | no | Amazon | One or more names (mode=byName, availability). Name search is a prefix match: 'Amazon' finds names starting with Amazon, and a leading 'The' is ignored. Availability checks need a  |
| `keywordSearches` | array | no |  | One or more keyword phrases (mode=byKeyword). Each phrase is split into words, and every word must appear in the business name; up to 5 words per phrase and 20 phrases. |
| `entityIds` | array | no |  | Exact 10-digit New Jersey entity IDs (mode=byEntityId, documents). Invalid IDs are reported in the run status instead of being dropped silently. Up to 200 IDs. |
| `linkType` | string | no | principal | Which free Business Records Service search to use (mode=byLinkedName). |
| `linkedName` | string | no |  | Last name, business name, registered-agent name, or previous/alternate name to search (mode=byLinkedName). |
| `linkedFirstName` | string | no |  | Optional first name when linkType=principal (mode=byLinkedName). |
| `linkedMiddleName` | string | no |  | Optional middle name when linkType=principal (mode=byLinkedName). |
| `linkedCity` | string | no |  | Optional city filter for principal or registered-agent searches (mode=byLinkedName). |
| `entityTypes` | array | no |  | Keep only these New Jersey entity types. Empty means no filter. Filters run on every page, not only after the 500-row display cap. |
| `cityFilter` | string | no |  | Keep only businesses whose on-file city matches exactly (case-insensitive). Leave blank for all cities. |
| `maxItems` | integer | no | 100 | Hard cap on emitted records (1-500, the source's display limit). Applied exactly, including when it is above 200. |

Example:

```json
{
  "searchQuery": "roofing",
  "status": "Active",
  "maxResults": 500
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/vexaloom-labs~new-jersey-business-registry-lookup-and-name/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/vexaloom-labs~new-jersey-business-registry-lookup-and-name/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/new-jersey-business-registry-lookup-and-name-checker.json

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
