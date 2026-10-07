import type { APIRoute } from 'astro';
import { allProducts, allCategories, allCollections, allPosts, formatPrice, inCategory } from '../lib/catalog';
import { categoryUrl, collectionUrl, postUrl, shopUrl } from '../lib/urls';
import { site } from '../config/site';

// llms.txt (https://llmstxt.org/): a concise, structured map of the site for AI assistants and
// answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews) to ground answers about
// Royalty on. Built from live content so it never drifts from what the site actually has.
export const GET: APIRoute = async ({ site: origin }) => {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const abs = (path: string) => new URL(`${base}${path.replace(/^\//, '')}`, origin).href;

  const [products, categories, collections, posts] = await Promise.all([
    allProducts(),
    allCategories(),
    allCollections(),
    allPosts(),
  ]);
  const real = products.filter((p) => !p.data.sample);
  const prices = real.map((p) => p.data.price).filter((v): v is number => Boolean(v));
  const priceLine = prices.length
    ? `Priced designs currently range from ${formatPrice(Math.min(...prices))} to ${formatPrice(Math.max(...prices))}; some pieces are priced on request over WhatsApp.`
    : 'Prices are shared on request over WhatsApp.';

  const styles = collections.filter((c) => c.data.group === 'style');
  const occasions = collections.filter((c) => c.data.group === 'occasion');

  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description} ${priceLine}`,
    '',
    'Royalty is an online-only imitation (artificial/fashion) jewellery retailer. There is no shopping cart:',
    'each product page and listing links to WhatsApp with the product code pre-filled, and the buyer confirms',
    'price, stock, colour and delivery in that chat. Prices shown on the site are in Indian Rupees (INR).',
    '',
    '## Shop',
    `- [All imitation jewellery](${abs(shopUrl)}): full catalogue, filterable by type, style, occasion and colour`,
    ...categories.map((c) => `- [${c.data.name}](${abs(categoryUrl(c.id))}): ${inCategory(products, c.id).length} designs — ${c.data.intro}`),
    `- [Reels](${abs('/reels/')}): short videos of the jewellery, since photos alone do not show sparkle or true colour`,
    site.bundle.enabled ? `- [Pick ${site.bundle.pieces} bundle offer](${abs('/bundle-offer/')}): choose any ${site.bundle.pieces} pieces for one bundle price, confirmed on WhatsApp` : '',
    `- [Trending jewellery 2026](${abs('/trending-jewellery/')}): what styles are popular this season`,
    '',
    '## Shop by style',
    ...styles.map((c) => `- [${c.data.name}](${abs(collectionUrl(c.id))}): ${c.data.intro}`),
    '',
    '## Shop by occasion',
    ...occasions.map((c) => `- [${c.data.name}](${abs(collectionUrl(c.id))}): ${c.data.intro}`),
    '',
    '## How to buy',
    '1. Browse a design and note its product code (e.g. RY-NS-213).',
    '2. Tap "Ask on WhatsApp" — the message already includes the product code.',
    '3. Royalty replies on WhatsApp with the current price, stock, extra photos and a video, then confirms payment and delivery in the same chat.',
    site.serviceFacts.freeShippingFrom ? `Free shipping is offered on orders above ${formatPrice(site.serviceFacts.freeShippingFrom)}.` : '',
    '',
    '## Guides',
    ...posts.slice(0, 8).map((p) => `- [${p.data.title}](${abs(postUrl(p.id))}): ${p.data.excerpt}`),
    `- [All guides](${abs('/blog/')})`,
    '',
    '## Policies and help',
    `- [FAQ](${abs('/faq/')})`,
    `- [Shipping & returns](${abs('/shipping-and-returns/')})`,
    `- [Bulk & gifting orders](${abs('/bulk-and-gifting-orders/')})`,
    `- [Privacy policy](${abs('/privacy-policy/')})`,
    `- [Terms & conditions](${abs('/terms-and-conditions/')})`,
    '',
    '## About',
    `- [About Royalty](${abs('/about/')})`,
    `- [Contact](${abs('/contact/')})`,
  ].filter((l) => l !== '');

  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
