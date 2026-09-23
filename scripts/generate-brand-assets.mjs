// Generates favicon, apple-touch-icon, logo.png (for Organization schema) and the
// default Open Graph card into /public. Re-run after changing the brand name or colours.
// Run: node scripts/generate-brand-assets.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const pub = (f) => fileURLToPath(new URL(`../public/${f}`, import.meta.url));
const ivory = '#FBF8F3';
const ink = '#1C1B19';
const gold = '#A8834B';

const monogram = (size, bg = ink) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <rect width="64" height="64" rx="${bg === 'none' ? 0 : 12}" fill="${bg === 'none' ? 'transparent' : bg}"/>
  <circle cx="32" cy="32" r="22" fill="none" stroke="${gold}" stroke-width="1.5"/>
  <text x="32" y="42" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="${ivory}">R</text>
</svg>`;

writeFileSync(pub('favicon.svg'), monogram(64));
await sharp(Buffer.from(monogram(180))).png().toFile(pub('apple-touch-icon.png'));
await sharp(Buffer.from(monogram(512))).png().toFile(pub('logo.png'));

// OG card: placeholder necklace art + wordmark.
const art = readFileSync(new URL('../src/assets/placeholders/og-default.svg', import.meta.url), 'utf8')
  .replace('</svg>', `
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="84" letter-spacing="18" fill="${ink}">ROYALTY</text>
  <text x="600" y="520" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" letter-spacing="9" fill="#7F6130">IMITATION JEWELLERY</text>
</svg>`);
await sharp(Buffer.from(art)).png().toFile(pub('og-default.png'));
console.log('brand assets written');
