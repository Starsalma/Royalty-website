// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import basePath from './integrations/base-path.mjs';

// PLACEHOLDER: set SITE_URL in .env (or your host's env settings) to the real domain before launch.
// Canonical URLs, Open Graph URLs, the sitemap and robots.txt are all built from it.
const SITE_URL = process.env.SITE_URL || 'https://www.royalty-jewellery.example';
// Sub-path hosting, e.g. BASE_PATH=/Royalty-website for GitHub Pages. Leave unset on a custom domain.
const BASE_PATH = process.env.BASE_PATH || '/';
const baseNoSlash = BASE_PATH.replace(/\/$/, '');

// Sample products carry noindex, so keep them out of the sitemap too.
const productsDir = new URL('./src/content/products/', import.meta.url);
const sampleProductPaths = readdirSync(productsDir)
  .filter((f) => f.endsWith('.md'))
  .flatMap((f) => {
    const src = readFileSync(new URL(f, productsDir), 'utf8');
    if (!/^sample:\s*true\s*$/m.test(src)) return [];
    const category = src.match(/^category:\s*(\S+)\s*$/m)?.[1];
    return category ? [`/imitation-jewellery/${category}/${f.replace(/\.md$/, '')}/`] : [];
  });

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    basePath(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.slice(baseNoSlash.length) || '/';
        return path !== '/search/' && !sampleProductPaths.includes(path);
      },
    }),
  ],
});
