import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { allProducts, allCategories, allCollections } from '../lib/catalog';
import { productUrl } from '../lib/urls';

// Build-time product index for the client-side search page. Small and static, no search service needed.
export const GET: APIRoute = async () => {
  const [products, categories, collections] = await Promise.all([allProducts(), allCategories(), allCollections()]);
  const cat = Object.fromEntries(categories.map((c) => [c.id, c.data.name]));
  const col = Object.fromEntries(collections.map((c) => [c.id, c.data.name]));
  const items = await Promise.all(
    products.map(async (p) => ({
      name: p.data.name,
      sku: p.data.sku,
      url: productUrl(p),
      image: (await getImage({ src: p.data.images[0].src, width: 160 })).src,
      category: cat[p.data.category.id],
      styles: p.data.collections.map((c) => col[c.id]).join(' '),
      text: `${p.data.summary} ${p.data.colours.join(' ')} ${p.data.finish ?? ''}`,
    })),
  );
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
};
