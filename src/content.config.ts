import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const seo = {
  seoTitle: z.string().max(65),
  seoDescription: z.string().min(70).max(165),
};

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);

/** Product types. The markdown body is the SEO copy shown under the grid. */
const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      h1: z.string(),
      intro: z.string(),
      ...seo,
      order: z.number(),
      image: image(),
      imageAlt: z.string(),
      relatedCollections: z.array(reference('collections')).default([]),
      relatedPosts: z.array(reference('blog')).default([]),
      faq,
    }),
});

/** Styles (kundan, AD, temple...) and occasions (bridal, party...). */
const styleCollections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/collections' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      group: z.enum(['style', 'occasion']),
      h1: z.string(),
      intro: z.string(),
      ...seo,
      order: z.number(),
      image: image(),
      imageAlt: z.string(),
      relatedPosts: z.array(reference('blog')).default([]),
      faq,
    }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      sku: z.string(),
      category: reference('categories'),
      collections: z.array(reference('collections')).default([]),
      summary: z.string().max(160),
      seoTitle: z.string().max(65).optional(),
      seoDescription: z.string().max(165).optional(),
      images: z.array(z.object({ src: image(), alt: z.string() })).min(1),
      // Every attribute below is optional. The product page shows only what is filled in.
      colours: z.array(z.string()).default([]),
      finish: z.string().optional(),
      material: z.string().optional(),
      size: z.string().optional(),
      weight: z.string().optional(),
      price: z.number().positive().optional(), // INR. Leave out to show "Ask for price".
      availability: z.enum(['in_stock', 'made_to_order', 'out_of_stock']).optional(),
      featured: z.boolean().default(false),
      bestseller: z.boolean().default(false),
      // true = sample listing created during the build. Replace with real products.
      sample: z.boolean().default(false),
      publishedAt: z.coerce.date(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      ...seo,
      excerpt: z.string(),
      cluster: z.enum(['basics', 'style-guide', 'occasion', 'buying-guide']),
      image: image(),
      imageAlt: z.string(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      author: z.string().default('Royalty Editorial Team'),
      relatedCategories: z.array(reference('categories')).default([]),
      relatedCollections: z.array(reference('collections')).default([]),
      faq,
      draft: z.boolean().default(false),
    }),
});

export const collections = { categories, collections: styleCollections, products, blog };
