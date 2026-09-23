// JSON-LD generators. Each one only emits fields that are backed by visible
// page content or by verified values in src/config/site.ts.
import type { CollectionEntry } from 'astro:content';
import { site } from '../config/site';

type Crumb = { name: string; href: string };
type Json = Record<string, unknown>;

const clean = <T extends Json>(obj: T): T =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== '' && v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0))) as T;

export function organization(origin: URL): Json {
  const sameAs = Object.values(site.social).filter(Boolean);
  return clean({
    '@type': 'Organization',
    '@id': new URL('/#organization', origin).href,
    name: site.name,
    legalName: site.legalName,
    url: origin.href,
    logo: new URL('/logo.png', origin).href,
    email: site.email,
    telephone: site.phone,
    sameAs,
    address: site.city
      ? clean({ '@type': 'PostalAddress', addressLocality: site.city, addressRegion: site.region, addressCountry: 'IN' })
      : undefined,
    contactPoint:
      site.phone || site.whatsappNumber
        ? [clean({ '@type': 'ContactPoint', contactType: 'customer service', telephone: site.phone, areaServed: 'IN', availableLanguage: ['en', 'hi'] })]
        : undefined,
  });
}

export function website(origin: URL): Json {
  return {
    '@type': 'WebSite',
    '@id': new URL('/#website', origin).href,
    name: site.name,
    url: origin.href,
    publisher: { '@id': new URL('/#organization', origin).href },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: new URL('/search/?q={search_term_string}', origin).href },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbs(items: Crumb[], origin: URL): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: new URL(c.href, origin).href })),
  };
}

export function faqPage(faq: { q: string; a: string }[]): Json | null {
  if (!faq.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function itemList(name: string, urls: string[], origin: URL): Json {
  return {
    '@type': 'CollectionPage',
    name,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: urls.length,
      itemListElement: urls.map((u, i) => ({ '@type': 'ListItem', position: i + 1, url: new URL(u, origin).href })),
    },
  };
}

export function product(p: CollectionEntry<'products'>, url: string, imageUrls: string[], categoryName: string, origin: URL): Json {
  const d = p.data;
  const availability = {
    in_stock: 'https://schema.org/InStock',
    made_to_order: 'https://schema.org/MadeToOrder',
    out_of_stock: 'https://schema.org/OutOfStock',
  } as const;
  return clean({
    '@type': 'Product',
    name: d.name,
    sku: d.sku,
    mpn: d.sku,
    description: d.summary,
    image: imageUrls,
    url: new URL(url, origin).href,
    category: categoryName,
    brand: { '@type': 'Brand', name: site.name },
    color: d.colours.join(', '),
    material: d.material,
    // Offer is emitted only when a real price is published on the page.
    offers: d.price
      ? clean({
          '@type': 'Offer',
          price: d.price,
          priceCurrency: 'INR',
          url: new URL(url, origin).href,
          availability: d.availability ? availability[d.availability] : undefined,
          seller: { '@id': new URL('/#organization', origin).href },
        })
      : undefined,
  });
}

export function article(post: CollectionEntry<'blog'>, url: string, imageUrl: string, origin: URL): Json {
  const d = post.data;
  return {
    '@type': 'BlogPosting',
    headline: d.title,
    description: d.seoDescription,
    image: [imageUrl],
    datePublished: d.publishedAt.toISOString(),
    dateModified: (d.updatedAt ?? d.publishedAt).toISOString(),
    author: { '@type': 'Organization', name: d.author },
    publisher: { '@id': new URL('/#organization', origin).href },
    mainEntityOfPage: new URL(url, origin).href,
    inLanguage: 'en-IN',
  };
}

export function graph(...nodes: (Json | null | undefined)[]) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}
