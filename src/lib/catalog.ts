import { getCollection, type CollectionEntry } from 'astro:content';

export type Product = CollectionEntry<'products'>;

export async function allProducts() {
  const items = await getCollection('products');
  return items.sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export async function allCategories() {
  return (await getCollection('categories')).sort((a, b) => a.data.order - b.data.order);
}

export async function allCollections() {
  return (await getCollection('collections')).sort((a, b) => a.data.order - b.data.order);
}

export async function allPosts() {
  return (await getCollection('blog', (p) => !p.data.draft)).sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export const inCategory = (products: Product[], id: string) => products.filter((p) => p.data.category.id === id);
export const inCollection = (products: Product[], id: string) => products.filter((p) => p.data.collections.some((c) => c.id === id));

/** Related products: same category first, then shared collections, scored by overlap. */
export function related(products: Product[], current: Product, limit = 4) {
  const mine = new Set(current.data.collections.map((c) => c.id));
  return products
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      p,
      score: (p.data.category.id === current.data.category.id ? 3 : 0) + p.data.collections.filter((c) => mine.has(c.id)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

/** Posts that point at a given category or collection, for "Read the guide" links. */
export function postsFor(posts: CollectionEntry<'blog'>[], kind: 'category' | 'collection', id: string) {
  return posts.filter((p) => (kind === 'category' ? p.data.relatedCategories : p.data.relatedCollections).some((r) => r.id === id));
}

type Facet = { key: 'type' | 'style' | 'occasion' | 'colour'; label: string; options: { id: string; label: string }[] };

/** Builds filter facets from the products actually on the page, so no filter ever leads to zero results. */
export function facetsFor(
  products: Product[],
  categories: CollectionEntry<'categories'>[],
  collections: CollectionEntry<'collections'>[],
  include: Facet['key'][],
): Facet[] {
  const usedCats = new Set(products.map((p) => p.data.category.id));
  const usedCols = new Set(products.flatMap((p) => p.data.collections.map((c) => c.id)));
  const colours = [...new Set(products.flatMap((p) => p.data.colours))].sort();
  const all: Record<Facet['key'], Facet> = {
    type: { key: 'type', label: 'Jewellery type', options: categories.filter((c) => usedCats.has(c.id)).map((c) => ({ id: c.id, label: c.data.name })) },
    style: { key: 'style', label: 'Style', options: collections.filter((c) => c.data.group === 'style' && usedCols.has(c.id)).map((c) => ({ id: c.id, label: c.data.name.replace(/ Jewellery$/, '') })) },
    occasion: { key: 'occasion', label: 'Occasion', options: collections.filter((c) => c.data.group === 'occasion' && usedCols.has(c.id)).map((c) => ({ id: c.id, label: c.data.name.replace(/ Jewellery$/, '') })) },
    colour: { key: 'colour', label: 'Colour', options: colours.map((c) => ({ id: c.toLowerCase(), label: c })) },
  };
  return include.map((k) => all[k]);
}

export const formatPrice = (inr: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(inr);
