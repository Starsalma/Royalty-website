// Post-build rewrite for hosting under a sub-path (e.g. GitHub Pages project sites:
// https://starsalma.github.io/Royalty-website/). Source code keeps plain root links
// like "/imitation-jewellery/"; after the build this prefixes the base onto:
//   - root-relative href/src/action/content attributes in HTML
//   - absolute same-site URLs (canonical, Open Graph, JSON-LD)
//   - "url" fields in the search index JSON
// With base "/" (custom domain) it does nothing.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default function basePath() {
  let base = '/';
  let origin = '';
  return {
    name: 'base-path-rewrite',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = config.base.endsWith('/') ? config.base : `${config.base}/`;
        origin = config.site ? new URL(config.site).origin : '';
      },
      'astro:build:done': ({ dir, logger }) => {
        if (base === '/') return;
        const seg = base.slice(1); // "Royalty-website/"
        // Root-relative, not protocol-relative, not already prefixed.
        const attr = new RegExp(`((?:href|src|action|content)=")/(?!/|${escapeRe(seg)})`, 'g');
        const abs = origin ? new RegExp(`${escapeRe(origin)}/(?!${escapeRe(seg)})`, 'g') : null;
        const jsonUrl = new RegExp(`("url":")/(?!${escapeRe(seg)})`, 'g');

        let count = 0;
        const walk = (d) => {
          for (const name of readdirSync(d)) {
            const p = join(d, name);
            if (statSync(p).isDirectory()) { walk(p); continue; }
            if (!/\.(html|json)$/.test(name)) continue;
            const src = readFileSync(p, 'utf8');
            let out = src;
            if (name.endsWith('.html')) out = out.replace(attr, `$1${base}`);
            if (name.endsWith('.json')) out = out.replace(jsonUrl, `$1${base}`);
            if (abs) out = out.replace(abs, `${origin}${base}`);
            if (out !== src) { writeFileSync(p, out); count++; }
          }
        };
        walk(fileURLToPath(dir));
        logger.info(`prefixed ${base} in ${count} files`);
      },
    },
  };
}
