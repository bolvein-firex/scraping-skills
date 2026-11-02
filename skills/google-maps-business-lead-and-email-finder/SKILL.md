---
name: google-maps-business-lead-and-email-finder
description: "Use the Google Maps Business Lead & Email Finder actor to pull local business listings from Google Maps and return name, phone, website, rating, reviews, email. Use when the user needs a public-data lead list, a local business export, or a repeatable outbound dataset without maintaining a scraper."
---

# Google Maps Business Lead & Email Finder

Pull **local business listings** from **Google Maps** with the public Scraper Finder actor.

- Actor: https://apify.com/dataspryva/google-maps-business-lead-and-email-finder
- Actor ID: `dataspryva~google-maps-business-lead-and-email-finder`
- n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/google-maps-business-lead-and-email-finder.json
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

- name
- phone
- website
- rating
- reviews
- email

## Inputs

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `mode` | string | no | searchPlaces | Search Google Maps, look up specific places, or enrich a list of websites you already have. |
| `searchQueries` | array | no |  | Natural-language searches such as 'coffee shops in Austin TX'. Include the place in each phrase, or use the location field below. |
| `locationQuery` | string | no |  | Adds a shared location to every search phrase, for example 'Austin, TX, USA'. Leave empty when your phrases already name the place. |
| `category` | string | no | bakery | Business category such as bakery, dentist or plumber. Used when keyword and search phrases are empty. |
| `keyword` | string | no |  | Custom search term such as 'boutique coffee' or 'pet grooming'. Takes priority over category. |
| `state` | string | no | All | US state for the search. Choose 'All' for nationwide. Ignored for non-US countries. |
| `country` | string | no | US | Country for the search. Other countries can be named directly in a search phrase. |
| `websites` | array | no |  | Websites to read for contact details, one per line. Bare domains such as example.com are accepted. |
| `placeUrls` | array | no |  | Google Maps place links copied from the address bar or a previous export. |
| `placeIds` | array | no |  | Canonical Google Place IDs starting with 'ChIJ'. |
| `max_results` | integer | no | 100 | Maximum number of leads to save. Google returns a ranked window of roughly 150-220 businesses per search phrase, so a larger request may end when that window ends. |
| `minRating` | number | no |  | Keep only businesses rated at least this value (1.0-5.0). Leave empty for any rating. |
| `extractEmails` | boolean | no | true | Visit each business website for public emails, phone numbers and social profiles. Turn off for a faster Maps-only run. |
| `maxEmailsPerWebsite` | integer | no | 5 | Maximum email addresses to keep for one business website. |

Example:

```json
{
  "mode": "searchPlaces",
  "searchQueries": [
    "restaurants in New York, NY"
  ],
  "max_results": 2000,
  "extractEmails": true,
  "onlySaveResults": "onlyWithContacts"
}
```

## Run it

Set `APIFY_TOKEN` in your environment, then call the synchronous endpoint for small and medium runs:

```bash
curl -s -X POST "https://api.apify.com/v2/acts/dataspryva~google-maps-business-lead-and-email-finder/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json
```

For large runs, start an async run and read the dataset:

```bash
RUN=$(curl -s -X POST "https://api.apify.com/v2/acts/dataspryva~google-maps-business-lead-and-email-finder/runs?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @references/example-input.json | jq -r '.data.id')

curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq '.data.status'
curl -s "https://api.apify.com/v2/datasets/$(curl -s "https://api.apify.com/v2/actor-runs/$RUN?token=$APIFY_TOKEN" | jq -r '.data.defaultDatasetId')/items?token=$APIFY_TOKEN&format=json" > output.json
```

Or import the n8n workflow: https://github.com/bolvein-firex/scraping-n8n-workflows/blob/main/workflows/google-maps-business-lead-and-email-finder.json

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
