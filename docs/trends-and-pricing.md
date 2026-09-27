# Trends & Pricing Research

Compiled 27 September 2026. It feeds `/trending-jewellery/` (data in `src/config/trends.ts`) and the pricing recommendation below.

## 1. Reference store: iirayajewels.com

A small Shopify accessories store (133 products). Public catalogue data (`/products.json`) and its own best-selling sort order were used.

| Category | Products | Sale price range (median) | Crossed-out "was" price, avg. |
| --- | --- | --- | --- |
| Watches & watch sets | 36 | ₹599–699 (₹649) | 51% higher |
| Earrings | 25 | ₹649–699 (₹649) | 43% |
| Rings | 7 | ₹649–749 (₹699) | 40% |
| Pendants & charms (resin) | 17 | ₹399–449 (₹449) | 63% |
| Mangalsutra | 21 | ₹399–449 (₹449) | 66% |
| Sets / other | 27 | ₹549–649 (₹599) | 46% |

**What sells (best-selling order):** the top 10 are all **"Duo" sets, a watch plus a matching bracelet at ₹649**, in rose gold, silver, black, green and brown. After those come stone jewellery sets at ₹699, men's watches at ₹599 and a resin charm pendant at ₹449.

**Offers:** free shipping over ₹1,500, cash on delivery, a free surprise gift on prepaid orders.

**Cautions (do not copy):**
- **"Was" prices are 2–3× the sale price on almost everything.** Showing a reference price that was never really charged can breach Indian consumer-protection rules on misleading pricing (Consumer Protection Act 2019, CCPA dark-pattern guidelines).
- **Some product names echo luxury trademarks** ("Serpenti", "Octo"). Royalty should avoid this.
- Very few trust signals: no material details, warranty or reviews on the homepage.

**Takeaways for Royalty:** a tight ₹449–699 price band, gift-ready sets, and a free-shipping threshold with a prepaid incentive. Keep pricing honest.

## 2. Comparison with Phuljhadi (see competitor-phuljhadi.md)

| | Iiraya | Phuljhadi | Royalty opportunity |
| --- | --- | --- | --- |
| Core price | ₹449–699 | ₹699 earrings, ₹750 sets | ₹449–699 |
| Hero product | Watch + bracelet duo | Earrings in 3-for-₹1000 bundles | Pendant sets + Pick-3 bundle |
| Discounting | Heavy "was" anchoring | Frequent sales + anchoring | Genuine bundles and festival offers only |

## 3. Trends

### Now
| Trend | Evidence | Royalty stock that fits |
| --- | --- | --- |
| Everyday stainless steel / anti-tarnish | Record gold prices pushing daily-wear demand; anti-tarnish is one of the fastest-growing fashion-jewellery segments in India | Butterfly set, bow set (stainless steel per packaging) |
| Bows & ribbons | Widely worn motif across pendants and studs | Bow set |
| Nature motifs (butterflies, florals) | Colour and enamel on minimal pieces | Butterfly set, tulip bangles |
| Layering / "neck mess" | Top 2026 styling trend | Pendant sets (styling suggestion) |
| Watch & bracelet duos | Iiraya's entire top 10 | None yet: **sourcing opportunity** |
| Modern pearls | Baroque pearls, pearls with chains | None yet |
| Emerald & ruby stones | Colour story of 2026, festive chokers and jhumkas | None yet (samples only) |
| Mixed metals | "Match your metals" rule dropped | None yet |

### Next (coming season, SS27 forecasts)
| Trend | Notes |
| --- | --- |
| Single meaningful charms | Heart, moon, key and initials on fine chains or as hoop drops |
| Bold hoops & organic gold | 50 mm+ flat polished hoops, flowing irregular shapes |
| Coastal | Shells, starfish, turquoise |

**Sourcing priority:** watch and bracelet duos, then charm pendants, then pearl drops, then emerald-stone chokers for the festive season.

## 4. Pricing recommendation (for owner decision)

These are **suggestions only**. They are not applied to the site. Check each against landed cost; fashion jewellery typically needs 2.5–3× cost to cover shipping, returns and marketing.

| Product | Code | Suggested price | Reasoning |
| --- | --- | --- | --- |
| Butterfly pendant set (pendant + studs) | RY-NS-211 | ₹549 | Between Iiraya pendants (₹449) and sets (₹599–699) |
| Bow pendant set (pendant + solitaire studs) | RY-NS-212 | ₹599 | Solitaire studs add perceived value |
| Tulip cable bangle, green & pink | RY-BG-411 | ₹499 | Entry price for bracelets |
| Tulip cable bangle, white | RY-BG-412 | ₹499 | Same design family |
| **Pick-3 bundle** | n/a | **₹1,399** | About 15% below 3 single items (~₹1,650), a real saving |
| Free shipping threshold | n/a | ₹999 | Below Iiraya's ₹1,500; any 2 items or one bundle qualifies |

To apply: add `price: 549` (etc.) to each product file, set `bundle.price: 1399` in `src/config/site.ts`.

## Sources
- https://iirayajewels.com/ and https://iirayajewels.com/products.json
- https://iirayajewels.com/collections/all?sort_by=best-selling
- https://luxe.outlookindia.com/watches-jewellery/jewellery/the-biggest-jewellery-trends-of-2026
- https://www.eternz.com/blog/top-10-indian-jewelry-trends-for-2026/
- https://jewelbox.co.in/blogs/details/jewellery-trends-india-2026-whats-in-this-year
- https://www.tarinika.in/blogs/news/new-year-new-shine-indian-jewellery-trends-set-to-dominate-2026
- https://zarivajewels.in/blogs/zariva-journal/jewellery-trends-2026-india
- https://www.accio.com/business/trend-of-anti-tarnish-jewellery-wholesale
- https://ektaraa.com/blogs/news/anti-tarnish-jewellery-india-the-complete-2026-guide
- https://corelunejewellery.de/en/blogs/news/schmuck-trends-fruehling-sommer-2027-styles
- https://www.whowhatwear.com/fashion/jewelry/spring-jewellery-trends-2026
