# Scraping Skills

Agent skills (SKILL.md) for Claude Code and other agents that pull public web data from Google Maps, Amazon, Shopify, Zillow, Airbnb, Indeed, TikTok, Reddit and 18 more sources through Apify Actors and return named fields as JSON.

**31 skills** · 23 with a YouTube Short · last updated 2026-11-06 · MIT licence

## Quick start

```bash
git clone https://github.com/bolvein-firex/scraping-skills
mkdir -p ~/.claude/skills
cp -r scraping-skills/skills/aliexpress-multi-region-search-store-and-review-scraper ~/.claude/skills/
export APIFY_TOKEN=your_apify_token
```

Start Claude Code and ask for the job in plain words, for example "AliExpress product search export". Claude matches your request to the skill's description and follows its steps. To run a skill without an agent:

```bash
node ~/.claude/skills/aliexpress-multi-region-search-store-and-review-scraper/scripts/run.mjs            # uses references/example-input.json
node ~/.claude/skills/aliexpress-multi-region-search-store-and-review-scraper/scripts/run.mjs input.json # or your own input file
```

## Find a skill by job

### Lead generation

| Job | Skill | Returns |
|---|---|---|
| Google Maps leads with emails | [google-maps-business-lead-and-email-finder](skills/google-maps-business-lead-and-email-finder/SKILL.md) | `name`, `googleBusinessCategories`, `phoneNumber`, `email`, `reviewScore` |
| Google Maps search beyond 120 results | [google-maps-grid-based-market-saturation-scanner](skills/google-maps-grid-based-market-saturation-scanner/SKILL.md) | `name`, `categoryName`, `totalScore`, `reviewsCount`, `phone` |
| New Jersey business entity search | [new-jersey-business-registry-lookup-and-name-checker](skills/new-jersey-business-registry-lookup-and-name-checker/SKILL.md) | `businessName`, `entityTypeAbbr`, `entityTypeFull`, `city`, `incorporatedDate` |
| Find emails and phone numbers from a list of websites | [website-contact-page-email-and-phone-crawler](skills/website-contact-page-email-and-phone-crawler/SKILL.md) | `websiteUrl`, `status`, `emails`, `primaryEmail`, `phones` |

### E-commerce and price tracking

| Job | Skill | Returns |
|---|---|---|
| AliExpress product search export | [aliexpress-multi-region-search-store-and-review-scraper](skills/aliexpress-multi-region-search-store-and-review-scraper/SKILL.md) | `title`, `salePrice`, `originalPrice`, `discountPercent`, `rating` |
| Amazon price tracking | [amazon-multi-domain-product-price-and-detail-scraper](skills/amazon-multi-domain-product-price-and-detail-scraper/SKILL.md) | `title`, `asin`, `price`, `stars`, `reviewsCount` |
| Facebook Marketplace scraper | [facebook-marketplace-listing-and-price-extractor](skills/facebook-marketplace-listing-and-price-extractor/SKILL.md) | `title`, `price`, `city`, `state`, `locationText` |
| Google Shopping price comparison | [google-shopping-price-comparison-and-deal-finder](skills/google-shopping-price-comparison-and-deal-finder/SKILL.md) | `title`, `price`, `merchant`, `rating`, `reviewCount` |
| Scrape a Shopify store's products and prices | [shopify-store-catalog-and-pricing-extractor](skills/shopify-store-catalog-and-pricing-extractor/SKILL.md) | `title`, `price`, `compareAtPrice`, `available`, `vendor` |

### Real estate

| Job | Skill | Returns |
|---|---|---|
| Walk Score for a list of addresses | [us-walkability-transit-and-bike-score-extractor](skills/us-walkability-transit-and-bike-score-extractor/SKILL.md) | `address`, `city`, `walkScore`, `transitScore`, `bikeScore` |
| Zillow for-sale, rental and sold listings | [zillow-for-sale-rent-and-sold-listing-extractor](skills/zillow-for-sale-rent-and-sold-listing-extractor/SKILL.md) | `address`, `price`, `soldPrice`, `beds`, `baths` |

### Travel and short-term rentals

| Job | Skill | Returns |
|---|---|---|
| Airbnb price scraper | [airbnb-listing-price-and-location-finder](skills/airbnb-listing-price-and-location-finder/SKILL.md) | `name`, `nightlyPrice`, `totalPrice`, `rating`, `reviewCount` |
| Booking.com hotel prices for your dates | [booking-com-hotel-price-and-amenity-search-scraper](skills/booking-com-hotel-price-and-amenity-search-scraper/SKILL.md) | `name`, `price`, `pricePerNight`, `rating`, `reviewCount` |
| Google Flights fare scraper | [google-flights-fare-and-itinerary-filter-scraper](skills/google-flights-fare-and-itinerary-filter-scraper/SKILL.md) | `price`, `airline`, `departureAirport`, `departureTime`, `arrivalAirport` |

### Jobs and salaries

| Job | Skill | Returns |
|---|---|---|
| Fiverr gig scraper | [fiverr-gig-and-seller-sitemap-directory-scraper](skills/fiverr-gig-and-seller-sitemap-directory-scraper/SKILL.md) | `title`, `gigUrl`, `priceMin`, `priceMax`, `rating` |
| Greenhouse ATS job board | [greenhouse-ats-job-board-lookup-by-company](skills/greenhouse-ats-job-board-lookup-by-company/SKILL.md) | `title`, `companySlug`, `companyName`, `location`, `departments` |
| Himalayas remote job | [himalayas-remote-job-finder-with-salary-and-tech-stack](skills/himalayas-remote-job-finder-with-salary-and-tech-stack/SKILL.md) | `title`, `company`, `salaryMin`, `salaryMax`, `salaryPeriod` |
| Indeed job scraper with salaries | [indeed-global-job-scraper-with-company-salary-reports](skills/indeed-global-job-scraper-with-company-salary-reports/SKILL.md) | `positionName`, `displayTitle`, `company`, `rating`, `salary` |
| Lever job board postings | [lever-job-board-postings-by-company-slug](skills/lever-job-board-postings-by-company-slug/SKILL.md) | `title`, `companySlug`, `location`, `salaryText`, `createdAt` |
| startup.jobs category scraper | [startup-jobs-category-and-keyword-job-scraper](skills/startup-jobs-category-and-keyword-job-scraper/SKILL.md) | `title`, `company`, `location`, `salary`, `postedAt` |
| We Work Remotely job listings scraper | [we-work-remotely-job-listings-and-salary-extractor](skills/we-work-remotely-job-listings-and-salary-extractor/SKILL.md) | `title`, `company`, `category`, `salary`, `postedAt` |
| Workday careers site job listings scraper | [workday-careers-site-job-listings-extractor](skills/workday-careers-site-job-listings-extractor/SKILL.md) | `title`, `tenant`, `location`, `postedOn` |

### Social media and trends

| Job | Skill | Returns |
|---|---|---|
| Export Google Trends data | [google-trends-interest-and-related-query-scraper](skills/google-trends-interest-and-related-query-scraper/SKILL.md) | `searchTerms`, `title`, `geoName`, `averageInterest`, `growthPercent` |
| NetEase Cloud Music song, chart scraper | [netease-cloud-music-song-chart-and-playlist-scraper](skills/netease-cloud-music-song-chart-and-playlist-scraper/SKILL.md) | `name`, `artist`, `album`, `rankPosition`, `playlistName` |
| Reddit posts and comments scraper | [reddit-multi-mode-scraper-for-posts-comments-and-profiles](skills/reddit-multi-mode-scraper-for-posts-comments-and-profiles/SKILL.md) | `subreddit_prefixed`, `title`, `author`, `score`, `commentCount` |
| TikTok trending hashtags | [tiktok-hashtag-momentum-and-top-creator-tracker](skills/tiktok-hashtag-momentum-and-top-creator-tracker/SKILL.md) | `rankIndex`, `hashtagName`, `publishCnt`, `vv` |
| TikTok keyword search scraper | [tiktok-keyword-search-and-discovery-scraper](skills/tiktok-keyword-search-and-discovery-scraper/SKILL.md) | `rank`, `caption`, `playCount`, `likeCount`, `commentCount` |
| TikTok verified mention | [tiktok-verified-mention-tracker](skills/tiktok-verified-mention-tracker/SKILL.md) | `targetUsername`, `postUrl`, `author.followerCount`, `playCount`, `likeCount` |

### Reviews

| Job | Skill | Returns |
|---|---|---|
| Amazon review scraper | [amazon-customer-review-and-rating-summary-scraper](skills/amazon-customer-review-and-rating-summary-scraper/SKILL.md) | `productAsin`, `ratingScore`, `reviewTitle`, `reviewDescription`, `isVerified` |
| Amazon reviews across marketplaces | [amazon-review-aggregates-and-extended-history-scraper](skills/amazon-review-aggregates-and-extended-history-scraper/SKILL.md) | `productAsin`, `ratingScore`, `reviewTitle`, `reviewDescription`, `isVerified` |

### Other public data

| Job | Skill | Returns |
|---|---|---|
| SofaScore live scores, standings | [sofascore-live-scores-standings-and-team-search-data](skills/sofascore-live-scores-standings-and-team-search-data/SKILL.md) | `name`, `homeTeam`, `awayTeam`, `homeScore`, `awayScore` |

## All skills

Output fields are the Actor's own column names, read from its dataset schema at publish time.

| # | Skill | Platform | Output fields | Short |
|---|---|---|---|---|
| 1 | [Airbnb Listing Price & Location Finder](skills/airbnb-listing-price-and-location-finder/SKILL.md) | Airbnb | `name`, `nightlyPrice`, `totalPrice`, `rating`, `reviewCount` | [Watch](https://www.youtube.com/shorts/aVEDRMB3vsU) |
| 2 | [AliExpress Multi-Region Search, Store & Review Scraper](skills/aliexpress-multi-region-search-store-and-review-scraper/SKILL.md) | AliExpress | `title`, `salePrice`, `originalPrice`, `discountPercent`, `rating` | [Watch](https://www.youtube.com/shorts/lY2MQAk6oJA) |
| 3 | [Amazon Customer Review & Rating Summary Scraper](skills/amazon-customer-review-and-rating-summary-scraper/SKILL.md) | Amazon | `productAsin`, `ratingScore`, `reviewTitle`, `reviewDescription`, `isVerified` | [Watch](https://www.youtube.com/shorts/WhVOks5q4MU) |
| 4 | [Amazon Multi-Domain Product Price & Detail Scraper](skills/amazon-multi-domain-product-price-and-detail-scraper/SKILL.md) | Amazon | `title`, `asin`, `price`, `stars`, `reviewsCount` | [Watch](https://www.youtube.com/shorts/SqsDoB0jyD8) |
| 5 | [Amazon Review Aggregates & Extended History Scraper](skills/amazon-review-aggregates-and-extended-history-scraper/SKILL.md) | Amazon | `productAsin`, `ratingScore`, `reviewTitle`, `reviewDescription`, `isVerified` |  |
| 6 | [Booking.com Hotel Price & Amenity Search Scraper](skills/booking-com-hotel-price-and-amenity-search-scraper/SKILL.md) | Booking.com | `name`, `price`, `pricePerNight`, `rating`, `reviewCount` | [Watch](https://www.youtube.com/shorts/jQWhZPI54SI) |
| 7 | [Facebook Marketplace Listing & Price Extractor](skills/facebook-marketplace-listing-and-price-extractor/SKILL.md) | Facebook Marketplace | `title`, `price`, `city`, `state`, `locationText` |  |
| 8 | [Fiverr Gig & Seller Sitemap Directory Scraper](skills/fiverr-gig-and-seller-sitemap-directory-scraper/SKILL.md) | Fiverr | `title`, `gigUrl`, `priceMin`, `priceMax`, `rating` | [Watch](https://www.youtube.com/shorts/JsVKl5TOvJE) |
| 9 | [Google Flights Fare & Itinerary Filter Scraper](skills/google-flights-fare-and-itinerary-filter-scraper/SKILL.md) | Google Flights | `price`, `airline`, `departureAirport`, `departureTime`, `arrivalAirport` |  |
| 10 | [Google Maps Business Lead & Email Finder](skills/google-maps-business-lead-and-email-finder/SKILL.md) | Google Maps | `name`, `googleBusinessCategories`, `phoneNumber`, `email`, `reviewScore` | [Watch](https://www.youtube.com/shorts/ofD2844kDPQ) |
| 11 | [Google Maps Grid-Based Market Saturation Scanner](skills/google-maps-grid-based-market-saturation-scanner/SKILL.md) | Google Maps | `name`, `categoryName`, `totalScore`, `reviewsCount`, `phone` | [Watch](https://www.youtube.com/shorts/uom3-Fy_xFk) |
| 12 | [Google Shopping Price Comparison & Deal Finder](skills/google-shopping-price-comparison-and-deal-finder/SKILL.md) | Google Shopping | `title`, `price`, `merchant`, `rating`, `reviewCount` |  |
| 13 | [Google Trends Interest & Related Query Scraper](skills/google-trends-interest-and-related-query-scraper/SKILL.md) | Google Trends | `searchTerms`, `title`, `geoName`, `averageInterest`, `growthPercent` | [Watch](https://www.youtube.com/shorts/gDZBpA25UB8) |
| 14 | [Greenhouse ATS Job Board Lookup by Company](skills/greenhouse-ats-job-board-lookup-by-company/SKILL.md) | Greenhouse | `title`, `companySlug`, `companyName`, `location`, `departments` |  |
| 15 | [Himalayas Remote Job Finder with Salary & Tech Stack](skills/himalayas-remote-job-finder-with-salary-and-tech-stack/SKILL.md) | Himalayas | `title`, `company`, `salaryMin`, `salaryMax`, `salaryPeriod` | [Watch](https://www.youtube.com/shorts/OwuknGY8obI) |
| 16 | [Indeed Global Job Scraper with Company Salary Reports](skills/indeed-global-job-scraper-with-company-salary-reports/SKILL.md) | Indeed | `positionName`, `displayTitle`, `company`, `rating`, `salary` | [Watch](https://www.youtube.com/shorts/33f3pNEO6Oc) |
| 17 | [Lever Job Board Postings by Company Slug](skills/lever-job-board-postings-by-company-slug/SKILL.md) | Lever | `title`, `companySlug`, `location`, `salaryText`, `createdAt` | [Watch](https://www.youtube.com/shorts/Fj8lsPbASu0) |
| 18 | [NetEase Cloud Music Song, Chart & Playlist Scraper](skills/netease-cloud-music-song-chart-and-playlist-scraper/SKILL.md) | NetEase Cloud Music | `name`, `artist`, `album`, `rankPosition`, `playlistName` | [Watch](https://www.youtube.com/shorts/k3LbS3Z4Eqc) |
| 19 | [New Jersey Business Registry Lookup & Name Checker](skills/new-jersey-business-registry-lookup-and-name-checker/SKILL.md) | NJ business registry | `businessName`, `entityTypeAbbr`, `entityTypeFull`, `city`, `incorporatedDate` | [Watch](https://www.youtube.com/shorts/tGV77V4rMqk) |
| 20 | [Reddit Multi-Mode Scraper for Posts, Comments & Profiles](skills/reddit-multi-mode-scraper-for-posts-comments-and-profiles/SKILL.md) | Reddit | `subreddit_prefixed`, `title`, `author`, `score`, `commentCount` | [Watch](https://www.youtube.com/shorts/3TmxkUNaB0U) |
| 21 | [Shopify Store Catalog & Pricing Extractor](skills/shopify-store-catalog-and-pricing-extractor/SKILL.md) | Shopify | `title`, `price`, `compareAtPrice`, `available`, `vendor` | [Watch](https://www.youtube.com/shorts/398NV7q-K6w) |
| 22 | [SofaScore Live Scores, Standings & Team Search Data](skills/sofascore-live-scores-standings-and-team-search-data/SKILL.md) | SofaScore | `name`, `homeTeam`, `awayTeam`, `homeScore`, `awayScore` |  |
| 23 | [startup.jobs Category & Keyword Job Scraper](skills/startup-jobs-category-and-keyword-job-scraper/SKILL.md) | startup.jobs | `title`, `company`, `location`, `salary`, `postedAt` | [Watch](https://www.youtube.com/shorts/SOMB7J9-Iak) |
| 24 | [TikTok Hashtag Momentum & Top Creator Tracker](skills/tiktok-hashtag-momentum-and-top-creator-tracker/SKILL.md) | TikTok | `rankIndex`, `hashtagName`, `publishCnt`, `vv` | [Watch](https://www.youtube.com/shorts/C3buLaYtlGg) |
| 25 | [TikTok Keyword Search & Discovery Scraper](skills/tiktok-keyword-search-and-discovery-scraper/SKILL.md) | TikTok | `rank`, `caption`, `playCount`, `likeCount`, `commentCount` |  |
| 26 | [TikTok Verified Mention Tracker](skills/tiktok-verified-mention-tracker/SKILL.md) | TikTok | `targetUsername`, `postUrl`, `author.followerCount`, `playCount`, `likeCount` |  |
| 27 | [US Walkability, Transit & Bike Score Extractor](skills/us-walkability-transit-and-bike-score-extractor/SKILL.md) | Walk Score | `address`, `city`, `walkScore`, `transitScore`, `bikeScore` | [Watch](https://www.youtube.com/shorts/yCT9c3LRopU) |
| 28 | [We Work Remotely Job Listings & Salary Extractor](skills/we-work-remotely-job-listings-and-salary-extractor/SKILL.md) | We Work Remotely | `title`, `company`, `category`, `salary`, `postedAt` | [Watch](https://www.youtube.com/shorts/aJWSYR7WvXE) |
| 29 | [Website Contact Page Email & Phone Crawler](skills/website-contact-page-email-and-phone-crawler/SKILL.md) | Any website | `websiteUrl`, `status`, `emails`, `primaryEmail`, `phones` | [Watch](https://www.youtube.com/shorts/MHdeuiVwMZA) |
| 30 | [Workday Careers Site Job Listings Extractor](skills/workday-careers-site-job-listings-extractor/SKILL.md) | Workday | `title`, `tenant`, `location`, `postedOn` | [Watch](https://www.youtube.com/shorts/cP29fxKOpvM) |
| 31 | [Zillow For-Sale, Rent & Sold Listing Extractor](skills/zillow-for-sale-rent-and-sold-listing-extractor/SKILL.md) | Zillow | `address`, `price`, `soldPrice`, `beds`, `baths` | [Watch](https://www.youtube.com/shorts/bNjKOMdRlSY) |

## FAQ

### What is an agent skill?
A folder with a `SKILL.md` file: YAML frontmatter (`name`, `description`) followed by instructions, plus optional scripts and reference files. The agent reads the description and loads the rest only when a request matches it.

### How do skills work in Claude Code?
Put a skill folder in `~/.claude/skills/` (all your projects) or `.claude/skills/` inside a repository (that project only). Claude Code picks up the skills when it starts and uses one when your request matches its description. You can also name the skill in your request.

### Do they work with other agents?
Yes. `SKILL.md` is plain markdown, and the run step is a `curl` call or `node scripts/run.mjs` (Node 18 or newer), so any agent that can read files and run a shell command can follow it.

### Are these skills free?
Yes. The skills are MIT-licensed. Each one calls a public Apify Actor on your own Apify account, so the only cost is that Actor's usage.

### Do I need an Apify account?
Yes. Set `APIFY_TOKEN` to an API token from https://console.apify.com/settings/integrations. Apify's free plan includes a monthly usage credit, which is enough for small test runs.

### How much does a run cost?
It depends on the Actor's pricing (per result, per event or per compute unit) and on how many rows you ask for. The Actor's Pricing tab shows the current price; keep the limit in the example input small for a first run.

### Do I need an MCP server?
No. Each skill calls the Apify REST API directly. If you already use Apify's MCP server, the Actor IDs in each skill work there too.

## How a skill is laid out

```
skills/<skill-name>/
  SKILL.md                      # frontmatter + when to use, what it returns, inputs, how to run
  scripts/run.mjs               # minimal Node runner (APIFY_TOKEN; the Actor ID is built in)
  references/example-input.json # starter input
  references/input-schema.json  # the Actor's full input schema
  references/output-fields.json # the Actor's declared output fields
```

## Related

- n8n workflows for the same Actors: https://github.com/bolvein-firex/scraping-n8n-workflows
- Short video breakdowns: https://www.youtube.com/@ScraperFinder
- Step-by-step tutorials on dev.to: https://dev.to/scraperfinder/series/46235

## Contributing

Missing a site? [Request a skill](https://github.com/bolvein-firex/scraping-skills/issues/new/choose). Questions go to [Discussions](https://github.com/bolvein-firex/scraping-skills/discussions). See [CONTRIBUTING.md](CONTRIBUTING.md).

## Guardrails

Public data only. Do not use these skills for private, login-protected or paywalled data. Respect robots.txt, site terms and local law.

## License

MIT
