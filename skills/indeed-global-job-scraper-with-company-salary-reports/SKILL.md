---
name: indeed-global-job-scraper-with-company-salary-reports
description: "Use the Indeed Global Job Scraper with Company Salary Reports actor to pull jobs from Indeed and return title, company, location, salary, posted date, URL. Use when the user needs a hiring list, a salary dataset, or a market map without maintaining a scraper."
---

# Indeed Global Job Scraper with Company Salary Reports

Pull **jobs** from **Indeed** with the public Scraper Finder actor.

- Actor: https://apify.com/nimbryxo-studio/indeed-global-job-scraper-with-company-salary
- Actor ID: `nimbryxo-studio~indeed-global-job-scraper-with-company-salary`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/indeed-global-job-scraper-with-company-salary-reports.json
- Example input: `references/example-input.json`
- Input schema: `references/input-schema.json`

## When to use

Use this skill when the user wants:

- a structured export of jobs from Indeed
- a repeatable dataset instead of manual copy-paste
- a CSV/JSON output for a CRM, sheet, dashboard, or agent
- a scheduled refresh of public data

Do not use it for private, login-protected, or paywalled data.

## What it returns

- title
- company
- location
- salary
- posted date
- URL

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `position` | string | no |  | Job title, skill or keywords, e.g. `web developer`, `nurse`. Search one company's jobs with `company:Amazon`, titles only with `title:(data analyst)`; quotes, OR and -exclusions wo |
| `location` | string | no |  | City, region or postal code, e.g. `San Francisco`, `Austin, TX`, `10001`, `London`. Leave empty to search the whole country. |
| `company` | string | no |  | Only jobs from one employer, e.g. `Amazon`, `Visa`, `DocuSign`. The name is resolved to Indeed's employer key so the company filter is applied by Indeed itself, then verified per j |
| `locationShards` | array | no |  | Optional list of extra locations to search separately with the same keywords and filters, e.g. `New York, NY`, `Chicago, IL`, `Remote`. Deduplication removes jobs found by more tha |
| `country` | string | no | US | Indeed country site to search. Results come in the site's language and salaries in its currency. |
| `maxItemsPerSearch` | integer | no | 100 | Maximum number of jobs to save for each search (the keyword search and each search URL). Indeed's cursor stops at roughly 1,000 fetched rows, including duplicates; use `locationSha |
| `maxItems` | integer | no |  | Optional hard cap across every search and pasted job URL. The run stops as soon as this many jobs are saved. Leave empty for no global cap. |
| `shardByDate` | boolean | no | false | Run each keyword search five times, for the last 1, 3, 7, 14 and 30 days, and remove duplicates. Useful for freshness coverage when you need more than one cursor walk per search. |
| `jobType` | string | no |  | Employment type. |
| `workplaceType` | string | no |  | Where the work happens. |
| `datePosted` | string | no |  | Only jobs added to Indeed within this period. |
| `experienceLevel` | string | no |  | Required experience level. |
| `educationLevel` | string | no |  | Required education. |
| `salaryMin` | integer | no |  | Only jobs whose salary range reaches at least this yearly amount, in the country's currency (hourly and monthly pay is converted to yearly). Jobs without any salary information are |

Example:

```json
{
  "searchQueries": [
    "account executive"
  ],
  "location": "United States",
  "maxItems": 1000,
  "includeSalary": true
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~indeed-global-job-scraper-with-company-salary/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/nimbryxo-studio~indeed-global-job-scraper-with-company-salary/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/indeed-global-job-scraper-with-company-salary-reports.json

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
