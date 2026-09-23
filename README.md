# Royalty: Imitation Jewellery Website

A premium, SEO-first retail website for **Royalty** imitation jewellery, built to turn Google and Instagram traffic into WhatsApp enquiries.

- **Stack:** [Astro 7](https://astro.build) static site, TypeScript, plain CSS design tokens, self-hosted fonts
- **Docs:** [Plan (sitemap, SEO, conversion, design, tech)](docs/PLAN.md) · [Keyword plan](docs/keyword-plan.md) · [Build report & launch checklist](docs/REPORT.md)

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check + static build into dist/
npm run preview    # serve the built site
```

Set the production domain before building for launch:

```bash
cp .env.example .env   # then edit SITE_URL
```

## Before launch

Business details are placeholders, never invented. Fill in **`src/config/site.ts`** (WhatsApp, phone, email, city, service facts, analytics IDs), then work through the checklist in [docs/REPORT.md](docs/REPORT.md#6-remaining-placeholders-must-fix-before-launch). Anything still missing shows on the site as a yellow `[placeholder]` note, and you can find them all with a search for `<Todo`.

## Adding content

Everything lives in `src/content/` as Markdown. No code changes needed.

**A product:** add `src/content/products/<slug>-<sku>.md`, and put photos next to it or in `src/assets/products/`:

```md
---
name: "Kundan Jhumka Earrings"
sku: RY-ER-120
category: earrings                 # a file name in src/content/categories
collections: [kundan-jewellery, bridal-jewellery]
summary: "One or two sentences, max 160 characters."
images:
  - src: ../../assets/products/ry-er-120-front.jpg
    alt: "Kundan jhumka earrings with pearl drops, front view"
colours: [Gold, White]
finish: "Gold tone"
material: "Brass base"             # optional, only if true
price: 1299                        # optional, INR. Leave out for "Price on request"
availability: in_stock             # optional: in_stock | made_to_order | out_of_stock
featured: true                     # optional: show on the home page
publishedAt: 2026-10-01
---

A unique 60 to 120 word description of the piece and how to wear it.
```

JPG/PNG photos are converted to responsive WebP automatically. Use at least 1200px wide, 4:5 portrait.

**Remove the samples:** delete every product file containing `sample: true` once real products are in.

**A blog post:** add `src/content/blog/<slug>.md` (copy an existing one for the front matter). Link it to at least two category or collection pages.

**A new collection** (e.g. "Temple jhumkas"): add `src/content/collections/<slug>.md`. Only do this once 6 or more real products belong to it.

## Project map

```
src/
  config/site.ts        business facts, contact, analytics (edit this first)
  config/faq.ts         store-wide FAQs (only confirmed answers appear)
  content/              products, categories, collections, blog (Markdown)
  content.config.ts     schemas that validate all content
  layouts/              BaseLayout (SEO head, schema, analytics), PolicyLayout
  components/           Header, Footer, ProductCard, ProductListing (filters), EnquiryForm, ...
  lib/                  urls, schema (JSON-LD), catalog queries, WhatsApp links, seo helpers
  pages/                routes
  scripts/analytics.ts  conversion event tracking
scripts/                placeholder art, brand assets and sample-product generators
docs/                   plan, keyword plan, report
```

## Deploy

Any static host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages). Build command `npm run build`, output directory `dist`, environment variable `SITE_URL=https://your-domain`.
