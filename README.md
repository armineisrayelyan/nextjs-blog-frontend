# Strapi Blog Frontend

A modern, responsive blog built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **Axios**. Content is managed in [Strapi](https://strapi.io/) and delivered through the REST API.

## Features

- Home page with hero, featured articles, latest grid, search, and category filters
- Blog listing with pagination, search, and category filtering
- Article detail pages with cover image, metadata, author, and dynamic content blocks
- About page powered by Strapi
- SEO metadata and Open Graph tags
- Loading skeletons, empty states, and error states
- Fully responsive layout for desktop, tablet, and mobile

## Tech Stack

- Next.js 16 App Router (compatible with Next.js 15 patterns)
- TypeScript
- Tailwind CSS v4
- Axios
- React Markdown + remark-gfm

## Prerequisites

- Node.js 20+
- A running Strapi backend with public read permissions for:
  - `articles`
  - `categories`
  - `authors`
  - `global`
  - `about`

## Getting Started

### 1. Clone and install

```bash
npm install
```

### 2. Configure environment variables

Copy the example env file:

```bash
cp .env.example .env.local
```

Update `.env.local` if your Strapi instance is not on the default host:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`NEXT_PUBLIC_API_URL` is the Strapi server base URL **without** `/api`.

### 3. Start Strapi

Make sure your Strapi backend is running:

```bash
# In your Strapi project
npm run develop
```

Strapi admin: `http://localhost:1337/admin`

### 4. Start the frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```text
app/
  page.tsx                 # Home page
  blog/page.tsx            # Blog listing
  blog/[slug]/page.tsx     # Article detail
  about/page.tsx           # About page
components/
  articles/                # ArticleCard, FeaturedArticle, ArticleBlocks
  blog/                    # BlogToolbar
  layout/                  # Header, Footer, Navigation
  ui/                      # SearchBar, CategoryFilter, Pagination, skeletons
lib/
  config.ts                # API URL helpers
  query.ts                 # Strapi query builder
  media.ts                 # Media URL helpers
  metadata.ts              # SEO helpers
services/
  api.ts                   # Axios client
  articles.ts                # Article API functions
  categories.ts            # Category API functions
  global.ts                # Global settings
  about.ts                 # About page
types/
  strapi.ts                # TypeScript interfaces
```

## API Services

| Function | Description |
|---|---|
| `getArticles(options)` | Fetch paginated articles with optional search/category filters |
| `getArticle(slug)` | Fetch a single article by slug |
| `getCategories()` | Fetch all categories |
| `getGlobal()` | Fetch site settings |
| `getAbout()` | Fetch about page content |

Example:

```typescript
import { getArticles, getArticle } from "@/services";

const { data, meta } = await getArticles({
  page: 1,
  pageSize: 9,
  search: "internet",
  category: "story",
});

const article = await getArticle("the-internet-s-own-boy");
```

## Strapi Content Model Notes

This frontend expects the standard Strapi blog schema:

- Article body lives in `blocks`, not `content`
- Cover image field is `cover`
- Publish date is `publishedAt`
- Strapi v5 uses `documentId` as the primary identifier

Supported block components:

- `shared.rich-text`
- `shared.media`
- `shared.quote`
- `shared.slider`

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

1. Deploy your Strapi backend and note the public URL.
2. Set environment variables in your hosting provider:

```env
NEXT_PUBLIC_API_URL=https://your-strapi-domain.com
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com
```

3. Ensure Strapi media URLs are allowed in `next.config.ts` image `remotePatterns`.

**Local development note:** Next.js 16 blocks image optimization from `localhost` unless `images.dangerouslyAllowLocalIP` is enabled. This project turns that on automatically when `NEXT_PUBLIC_API_URL` points to a local Strapi instance.

## License

MIT
