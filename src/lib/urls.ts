import type { CollectionEntry } from 'astro:content';

// Every public URL is built here so internal links never drift from routes.
export const shopUrl = '/imitation-jewellery/';
export const categoryUrl = (id: string) => `/imitation-jewellery/${id}/`;
export const productUrl = (p: CollectionEntry<'products'>) => `/imitation-jewellery/${p.data.category.id}/${p.id}/`;
export const collectionUrl = (id: string) => `/collections/${id}/`;
export const postUrl = (id: string) => `/blog/${id}/`;

export function absolute(path: string, site: URL | undefined) {
  return new URL(path, site).href;
}
