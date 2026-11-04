# Scraping Skills

Agent skills for the **Scraper Finder** channel. Each skill wraps a public Apify actor with a clear input contract, output fields, a runnable example, and guardrails.

**Watch the 45-second breakdown:** https://www.youtube.com/@ScraperFinder

New public-data workflow every day. Free. No email. No course.

- n8n workflows: https://github.com/bolvein-firex/scraping-n8n-workflows
- Channel: https://www.youtube.com/@ScraperFinder

## Start here

1. Watch the short on the channel: https://www.youtube.com/@ScraperFinder
2. Pick the skill for your agent below.
3. Copy the folder into your agent's skills directory.
4. Run it with your own Apify token.

## Skills

| Skill | Platform | Output |
|---|---|---|
| [Amazon Customer Review & Rating Summary Scraper](skills/amazon-customer-review-and-rating-summary-scraper/SKILL.md) | Amazon | author, rating, text, verified |
| [Amazon Review Aggregates & Extended History Scraper](skills/amazon-review-aggregates-and-extended-history-scraper/SKILL.md) | Amazon | author, business, rating, text |
| [Booking.com Hotel Price & Amenity Search Scraper](skills/booking-com-hotel-price-and-amenity-search-scraper/SKILL.md) | Booking.com | title, price, rating, reviews |
| [Facebook Marketplace Listing & Price Extractor](skills/facebook-marketplace-listing-and-price-extractor/SKILL.md) | Facebook | symbol, change, market cap, price |
| [Google Maps Grid-Based Market Saturation Scanner](skills/google-maps-grid-based-market-saturation-scanner/SKILL.md) | Google Maps | business, rating, reviews, Grid Point |
| [New Jersey Business Registry Lookup & Name Checker](skills/new-jersey-business-registry-lookup-and-name-checker/SKILL.md) | the state registry | entity name, agent, status, formed date |
| [Shopify Store Catalog & Pricing Extractor](skills/shopify-store-catalog-and-pricing-extractor/SKILL.md) | Shopify | title, price, stock, compare-at |
| [TikTok Hashtag Momentum & Top Creator Tracker](skills/tiktok-hashtag-momentum-and-top-creator-tracker/SKILL.md) | TikTok | hashtag, views, momentum, top creator |
| [US Walkability, Transit & Bike Score Extractor](skills/us-walkability-transit-and-bike-score-extractor/SKILL.md) | the public web | walk score, transit score, bike score, address |
| [Google Maps Business Lead & Email Finder](skills/google-maps-business-lead-and-email-finder/SKILL.md) | Google Maps | name, email, rating, phone |
| [Zillow For-Sale, Rent & Sold Listing Extractor](skills/zillow-for-sale-rent-and-sold-listing-extractor/SKILL.md) | Zillow | address, price, beds, price cut |
| [Amazon Multi-Domain Product Price & Detail Scraper](skills/amazon-multi-domain-product-price-and-detail-scraper/SKILL.md) | Amazon | title, price, rating, reviews |
| [Website Contact Page Email & Phone Crawler](skills/website-contact-page-email-and-phone-crawler/SKILL.md) | the web | domain, email, phone, status |
| [Indeed Global Job Scraper with Company Salary Reports](skills/indeed-global-job-scraper-with-company-salary-reports/SKILL.md) | Indeed | title, salary, company, location |
| [Airbnb Listing Price & Location Finder](skills/airbnb-listing-price-and-location-finder/SKILL.md) | Airbnb | name, price, rating, reviews |
| [Google Trends Interest & Related Query Scraper](skills/google-trends-interest-and-related-query-scraper/SKILL.md) | Google Trends | Term, Interest, Breakout, Related Query |
| [Reddit Multi-Mode Scraper for Posts, Comments & Profiles](skills/reddit-multi-mode-scraper-for-posts-comments-and-profiles/SKILL.md) | Reddit | score, author, title, Subreddit |

## Install

Copy a skill folder into your agent's skills directory:

```bash
cp -r skills/<skill-name> ~/.claude/skills/
```

Each skill follows the `SKILL.md` format with YAML frontmatter, references, and a minimal runner.

## Run a skill

```bash
export APIFY_TOKEN=your_token
export ACTOR_ID=the_actor_id
node skills/<skill-name>/scripts/run.mjs '{"maxResults": 10}'
```

Or use the curl example in the skill file.

## Guardrails

Public data only. Do not use these skills for private, login-protected, or paywalled data. Respect robots.txt, site terms, and local law.

## License

MIT
