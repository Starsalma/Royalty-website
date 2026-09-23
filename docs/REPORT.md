# Build Report & Launch Checklist

## 1. Pages created (52 built pages)

| Type | Pages |
| --- | --- |
| Core | Home, Shop all, About, Contact, FAQ, Catalogue, Bulk & gifting, Search, 404 |
| Categories (6) | Earrings, Necklace sets, Necklaces & chokers, Bangles & bracelets, Rings, Maang tikka |
| Collections (9 + hub) | Bridal, Partywear, Daily wear, Festive, Kundan, American diamond, Temple, Oxidised, Antique gold |
| Products (18) | **Sample listings**, `sample: true`, noindexed and excluded from the sitemap until replaced |
| Blog (5 + index) | What is imitation jewellery, Care guide, Bridal guide, Jhumka style guide, Kundan vs AD |
| Policies (3) | Privacy, Terms, Shipping & returns (draft templates with placeholders) |

## 2. SEO features

- Unique title (≤ ~65 chars, brand appended only when it fits) and meta description on every page; schema-validated lengths for content pages.
- One H1 per page (verified on all 52 pages), logical H2/H3 structure.
- Clean, keyword-led URLs with trailing slashes: `/imitation-jewellery/earrings/`, `/collections/kundan-jewellery/`.
- Canonical on every page, never carrying query strings.
- Visible breadcrumbs + BreadcrumbList schema on every inner page.
- Unique SEO copy and FAQ on every category and collection page.
- Internal linking: home → categories/collections → products → related products; category ↔ collections; blog → categories/collections/products ("Shop this guide" + product grid); category/collection → related guides.
- Descriptive image alt text; Open Graph and Twitter cards on all pages.

## 3. Lead-generation features

- WhatsApp links pre-filled per context: general, category ("share your latest earrings"), product (name + code), catalogue, bulk.
- Sticky mobile bar (WhatsApp + Call, or Catalogue until a phone number is set); floating WhatsApp button on desktop; header "Enquire".
- Product page: primary "Ask price & availability", enquiry form with product pre-filled, catalogue CTA, bulk link.
- Short enquiry form (name, WhatsApp, city, quantity, product, message). It hands off to WhatsApp, or POSTs to a form endpoint when one is configured.
- Dedicated catalogue and bulk/gifting pages with forms.
- CTA band on every landing page; empty filter/search states route to contact.
- No fake urgency, reviews, discounts, badges or counts. "Bestseller" tags exist in the schema but are off for all samples.

## 4. Technical SEO

- Static HTML (Astro), no client framework; JS only for menu, filters, gallery, forms and search.
- XML sitemap (`/sitemap-index.xml`) auto-generated, excluding sample products and search.
- `robots.txt` generated from `SITE_URL`, pointing at the sitemap; `/search/` disallowed and noindexed.
- 404 page with category links and search.
- Responsive images via `astro:assets` with `srcset`, width/height set (no layout shift), lazy loading below the fold, `fetchpriority=high` on hero/LCP images. Real JPG/PNG photos become WebP automatically.
- Self-hosted fonts (no Google Fonts request), minified, hashed assets.
- Filters and sort run client-side with shareable query params; canonical stays on the clean URL, so there is no duplicate-URL explosion.
- Semantic landmarks, skip link, keyboard-operable menu/gallery/accordions, visible focus states, `prefers-reduced-motion` respected, AA contrast on text colours.
- Verified: 0 type errors, 0 broken internal links (4,380 checked), 0 duplicate titles/descriptions, no horizontal scroll at 375px on any page type.

## 5. Analytics events

Set `gtmId` (recommended) or `ga4Id` in `src/config/site.ts`. Events go to `window.dataLayer`:

| Event | Fires when | Params |
| --- | --- | --- |
| `whatsapp_click` | Any WhatsApp link | `location`, `product` |
| `phone_click` | Any `tel:` link | `location` |
| `email_click` | Email link | `location` |
| `product_enquiry` | Product form submitted | `product`, `quantity` |
| `quote_form_submit` | Contact / bulk form submitted | `form_kind` |
| `catalogue_request` | Catalogue form or WhatsApp catalogue button | `location` |
| `catalogue_cta_click` | Any "Request catalogue" link | `location` |
| `catalogue_download` | PDF download (once a PDF exists) | `location` |
| `enquiry_form_open` | "Send enquiry" on product page | `product` |
| `filter_apply` | Filter or sort changed | `filters`, `results` |
| `search` | Search submitted | `search_term`, `results` |
| `social_click` | Footer social icons | `location` |

In GA4, mark `whatsapp_click`, `phone_click`, `product_enquiry`, `quote_form_submit` and `catalogue_request` as **key events**.

## 6. Remaining placeholders (must fix before launch)

Search the code for `<Todo` and `PLACEHOLDER`.

- [ ] `SITE_URL` (real domain) in `.env` / hosting settings
- [ ] `whatsappNumber`, `phone`, `email`, `city`, `hours` in `src/config/site.ts`
- [ ] `serviceFacts`: pan-India shipping, international, COD, dispatch time, return policy
- [ ] Social profile URLs
- [ ] GTM or GA4 ID and Search Console verification
- [ ] About page: founding story and where designs come from
- [ ] Policies: legal name, GSTIN, jurisdiction, shipping charges, returns; have them reviewed
- [ ] **Replace all 18 sample products** with real products and real photos, then delete the sample files
- [ ] Replace placeholder SVG art (category/collection/blog images, hero, bridal banner) with photography
- [ ] Real logo (currently a typographic wordmark), then re-run `node scripts/generate-brand-assets.mjs` or drop in your own icons
- [ ] Catalogue PDF (optional): set `cataloguePdf`
- [ ] Form endpoint (optional): set `formEndpoint` to also receive form leads by email

## 7. Audit findings fixed during the build

| Area | Issue found | Fix |
| --- | --- | --- |
| Conversion bug | Product WhatsApp buttons shared the `data-product` attribute with cards, so the filter script moved buttons into the grid and doubled the count | Cards use `data-card`, scoped selector |
| Mobile | Blog article overflowed to 395px at 375px width (grid column sized to table) | `minmax(0, 1fr)` grid column |
| SEO | 3 meta descriptions > 165 chars; home/shop titles and descriptions too long | Shortened; `brandTitle()` only appends brand when it fits |
| Trust | Sample products were flagged "Bestseller" | Removed; flag kept for real data only |
| Indexing | Sample products would be indexed as real products | `noindex` + excluded from sitemap while `sample: true` |
| Social | SVG images are not rendered by social platforms | SVG OG images fall back to a generated PNG card |
| Forms | `window.open(..., 'noopener')` always returns null, which would double-open WhatsApp | Open without feature string, null the opener manually |
| Visual | Dark gradient over light tiles looked muddy; hero cropped jewellery | Caption-below tiles; hero aspect ratio fixed |
| Image SEO | Card images had empty alt | Real alt text on the main card image |

## 8. Recommended next SEO actions

1. Replace sample products with **at least 40 to 60 real products** (6 to 10 per category), each with 3 or more real photos, a unique 60 to 120 word description, and material/size where known.
2. Publish Google Business Profile (if there is any physical presence) and link it from the site.
3. Set up Search Console, submit the sitemap, and request indexing for categories and collections.
4. Use Instagram as the second traffic engine: every Reel links to a category or product URL (with UTM tags).
5. Add prices where possible. Pages with prices usually get better click-through and can earn Product rich results.
6. Collect real customer reviews (Google reviews first). Show them on the site only once they exist, then add review schema.

## 9. 30-day SEO & content roadmap

| Week | Focus | Tasks |
| --- | --- | --- |
| 1 | Launch readiness | Fill all placeholders; set domain + `SITE_URL`; deploy; connect GTM/GA4 + Search Console; submit sitemap; replace hero, category and collection images with real photos |
| 2 | Catalogue depth | Add 40+ real products (priority: earrings, necklace sets, bridal); remove samples; request indexing of top 10 URLs; set up Google Business Profile if relevant |
| 3 | Content | Publish 2 planned posts: *Navratri/Diwali jewellery ideas* (seasonal, time-sensitive) and *Earrings for your face shape*; link each to 3+ products; share on Instagram |
| 4 | Measure & expand | Review Search Console queries: pages at position 8 to 20 get title/copy tweaks; add first long-tail collection with enough products (e.g. *Temple jhumkas*); publish *Bridesmaid jewellery ideas* → bulk page; review which CTAs convert in GA4 |

Ongoing: 1 to 2 articles a month, new arrivals weekly (new products are the strongest freshness signal), refresh seasonal pages 6 weeks before each festival.
