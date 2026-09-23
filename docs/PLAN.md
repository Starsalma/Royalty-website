# Royalty: Website Plan

Business model (confirmed by owner): **B2C retail** imitation jewellery, sold through **WhatsApp-led enquiries** (no online checkout).
Everything else (city, phone, policies, shipping, materials, prices) is unconfirmed and lives as a placeholder in `src/config/site.ts`.

Funnel the site is built around:

```
Google search / Instagram → category, collection or guide page → product page → trust (video on request, clear info)
→ WhatsApp (pre-filled with product code) or short enquiry form → lead
```

---

## A. Website architecture (sitemap)

```
/                                   Home
├── /imitation-jewellery/           Shop all (filters: type, style, occasion, colour)
│   ├── /earrings/                  Category  ─┐
│   ├── /necklace-sets/             Category   │ each has SEO copy, FAQ, related
│   ├── /necklaces/                 Category   │ collections, related guides
│   ├── /bangles-bracelets/         Category   │
│   ├── /rings/                     Category   │
│   └── /maang-tikka/               Category  ─┘
│       └── /<category>/<product-slug-sku>/   Product detail
├── /collections/                   Collections hub
│   ├── Occasion: /bridal-jewellery/ /partywear-jewellery/ /daily-wear-jewellery/ /festive-jewellery/
│   └── Style:    /kundan-jewellery/ /american-diamond-jewellery/ /temple-jewellery/ /oxidised-jewellery/ /antique-jewellery/
├── /bulk-and-gifting-orders/       Bridesmaids, return gifts, corporate gifting (lead form)
├── /catalogue/                     Catalogue request (PDF download once one exists)
├── /blog/                          Journal
│   └── /blog/<slug>/               Articles (5 at launch)
├── /about/  /contact/  /faq/
├── /shipping-and-returns/  /privacy-policy/  /terms-and-conditions/
├── /search/                        Product search (noindex)
└── /404
```

Pages deliberately **not** built, because they do not fit a retail business with unknown facts: Wholesale, Manufacturing, Custom Orders, location pages, country pages. Add them only when the business genuinely offers them.

## B. SEO architecture

Full table: [`keyword-plan.md`](keyword-plan.md). Summary of the mapping principle:

| Intent | Page type | Example URL |
| --- | --- | --- |
| Broad commercial ("imitation jewellery online") | Shop all + Home | `/imitation-jewellery/` |
| Product type ("imitation earrings", "necklace set") | Category | `/imitation-jewellery/earrings/` |
| Style ("kundan jewellery", "american diamond jewellery") | Style collection | `/collections/kundan-jewellery/` |
| Occasion ("bridal imitation jewellery") | Occasion collection | `/collections/bridal-jewellery/` |
| Specific product / code | Product page | `/imitation-jewellery/earrings/kundan-jhumka-...-ry-er-101/` |
| Informational ("what is imitation jewellery") | Blog, linking to categories | `/blog/what-is-imitation-jewellery/` |
| Gifting / quantity | Bulk & gifting | `/bulk-and-gifting-orders/` |

One primary keyword per URL, no two pages targeting the same term.

## C. Conversion architecture

| Traffic source | Landing page | Primary CTA | Secondary CTA | Lead |
| --- | --- | --- | --- | --- |
| Google: category / style terms | Category or collection | "Ask for latest earrings" (WhatsApp, pre-filled with category) | Request catalogue | WhatsApp chat |
| Google: product / long tail | Product page | "Ask price & availability" (WhatsApp, pre-filled with name + code) | Enquiry form (product pre-filled), catalogue | WhatsApp chat / form |
| Google: informational | Blog article | "Shop this guide" links + product grid | Sidebar WhatsApp | Category → product → WhatsApp |
| Instagram / direct | Home | Explore collection / Ask on WhatsApp | Catalogue | WhatsApp chat |
| Gifting searches | Bulk & gifting | Requirement form | WhatsApp | Quote request |

Always-on lead points: sticky mobile bar (WhatsApp + Call/Catalogue), floating WhatsApp button (desktop), header Enquire button, CTA band on every landing page.

## D. Design system

| Token | Value | Use |
| --- | --- | --- |
| `--ivory` | `#FBF8F3` | Page background |
| `--surface` | `#F4EEE5` | Alternating sections, image wells |
| `--ink` | `#1C1B19` | Text, primary buttons |
| `--muted` | `#625D55` | Secondary text (6.1:1 on ivory) |
| `--gold` | `#A8834B` | Decorative only: rules, icons |
| `--gold-text` | `#7F6130` | Gold text / eyebrow labels (5.4:1, AA) |
| `--noir` | `#1F1D1A` | Editorial dark bands, footer |
| `--whatsapp` | `#1F7A4D` | WhatsApp buttons (AA with white) |

- **Type:** Cormorant Garamond (headings, 500/600) + Manrope Variable (body/UI), self-hosted via Fontsource. Fluid scale with `clamp()`.
- **Buttons:** 48px min height, uppercase tracked labels. Variants: primary (ink), outline, gold, WhatsApp, light, ghost-light.
- **Cards:** 4:5 image, category and code meta line, serif name, 2-line summary, "Price on request" or price, two actions (WhatsApp, Details).
- **Spacing:** 4px base scale (`--s-1` to `--s-10`), section padding `clamp(3.5rem → 7.5rem)`, max width 1320px.
- **Navigation:** sticky header with announcement bar; desktop inline nav; mobile full-height drawer.
- **Forms:** 5–6 fields max, 48px inputs, inline validation, privacy note, WhatsApp hand-off.
- **Motion:** fade/slide-up on scroll (IntersectionObserver), image zoom on hover, all disabled under `prefers-reduced-motion`.

## E. Technical plan

- **Stack:** Astro 7 static site. Zero client framework; small TypeScript islands for menu, filters, gallery, forms and search.
- **Content:** Astro content collections (`src/content/`): `products`, `categories`, `collections`, `blog`, all Markdown with typed, validated front matter. Adding a product = adding one `.md` file.
- **SEO:** per-page title/description/canonical/OG/Twitter in `BaseLayout`; schema generators in `src/lib/schema.ts`; sitemap via `@astrojs/sitemap`; `robots.txt` generated from the site URL.
- **Schema:** Organization + WebSite (home), BreadcrumbList (all inner pages), CollectionPage/ItemList (listings), Product (+ Offer only when a price exists), FAQPage (where FAQs are visible), BlogPosting (articles), ContactPage.
- **Analytics:** GTM or GA4 via config IDs, loaded only when set. Events pushed to `dataLayer` (see REPORT.md).
- **Performance:** static HTML, self-hosted fonts, responsive images through `astro:assets` (real photos get WebP/AVIF automatically), lazy loading, no third-party scripts by default.
