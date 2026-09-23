// One-off seeder for SAMPLE products (sample: true). Replace them with real
// products by adding markdown files to src/content/products and deleting these.
// Run: node scripts/seed-sample-products.mjs
import { mkdirSync, writeFileSync } from 'node:fs';

const dir = new URL('../src/content/products/', import.meta.url);
mkdirSync(dir, { recursive: true });

const P = [
  // Earrings
  { name: 'Kundan Jhumka Earrings with Pearl Drops', sku: 'RY-ER-101', cat: 'earrings', col: ['kundan-jewellery', 'bridal-jewellery', 'festive-jewellery'], img: ['earrings-ivory', 'earrings-blush'], colours: ['Gold', 'White'], finish: 'Gold tone', featured: true,
    summary: 'Dome-shaped kundan jhumkas finished with a row of pearl drops. A classic pick for weddings and festive days.',
    body: 'These jhumkas pair a kundan stud with a wide bell and a fringe of pearl drops that move as you do. They sit comfortably with lehengas, anarkalis and silk sarees.\n\nWear them with a kundan necklace set for a full bridal look, or on their own with a plain outfit so they get all the attention.' },
  { name: 'Temple Chandbali Earrings', sku: 'RY-ER-102', cat: 'earrings', col: ['temple-jewellery', 'festive-jewellery'], img: ['earrings-stone', 'earrings-ivory'], colours: ['Gold', 'Red', 'Green'], finish: 'Antique gold tone', featured: true,
    summary: 'Crescent chandbalis with temple motifs and red and green stones, made for silk sarees.',
    body: 'A crescent chandbali shape carrying traditional temple motifs, with small red and green stones set along the curve. The antique finish keeps the look warm rather than shiny.\n\nThey work beautifully with Kanjeevaram sarees and with a temple long haar for weddings and poojas.' },
  { name: 'American Diamond Drop Earrings', sku: 'RY-ER-103', cat: 'earrings', col: ['american-diamond-jewellery', 'partywear-jewellery'], img: ['earrings-sage', 'earrings-stone'], colours: ['Silver', 'White'], finish: 'Rhodium tone',
    summary: 'Slim AD drop earrings with a bright sparkle for receptions, parties and evening outfits.',
    body: 'A clean line of American diamond stones ending in a teardrop. They catch light from every angle, which makes them a go-to for receptions and cocktail evenings.\n\nPair them with a gown or a pastel lehenga and keep the neck bare or add a fine chain.' },
  // Necklace sets
  { name: 'Kundan Bridal Necklace Set with Earrings', sku: 'RY-NS-201', cat: 'necklace-sets', col: ['kundan-jewellery', 'bridal-jewellery'], img: ['necklace-set-ivory', 'necklace-set-blush'], colours: ['Gold', 'White', 'Pink'], finish: 'Gold tone', featured: true,
    summary: 'A layered kundan necklace with a centre drop and matching jhumkas, designed for the wedding day.',
    body: 'This set combines a broad kundan necklace with a teardrop centre piece and a matching pair of jhumkas. It fills an open bridal neckline and photographs well from every side.\n\nAdd a kundan maang tikka and a pair of kadas to complete the bridal look.' },
  { name: 'American Diamond Necklace Set', sku: 'RY-NS-202', cat: 'necklace-sets', col: ['american-diamond-jewellery', 'partywear-jewellery', 'bridal-jewellery'], img: ['necklace-set-sage', 'necklace-set-stone'], colours: ['Silver', 'White'], finish: 'Rhodium tone', featured: true,
    summary: 'A sparkling AD necklace with matching drop earrings, ideal for receptions and engagement parties.',
    body: 'Rows of American diamond stones form a graceful curve, finished with small drops and a centre pendant. The matching earrings repeat the same pattern.\n\nIt suits pastel lehengas, gowns and sarees with a sleek blouse, especially for evening events.' },
  { name: 'Antique Gold Temple Necklace Set', sku: 'RY-NS-203', cat: 'necklace-sets', col: ['temple-jewellery', 'antique-jewellery', 'festive-jewellery'], img: ['necklace-set-stone', 'necklace-set-ivory'], colours: ['Gold', 'Red'], finish: 'Antique gold tone',
    summary: 'Temple-inspired necklace and earring set with a matte antique finish for sarees and festivals.',
    body: 'A temple-inspired set with a matte antique gold finish and small red stones. The necklace sits at a comfortable length for saree necklines, and the earrings match its motifs.\n\nA good choice for festivals, poojas and South Indian weddings.' },
  // Necklaces
  { name: 'Temple Long Haar Necklace', sku: 'RY-NK-301', cat: 'necklaces', col: ['temple-jewellery', 'bridal-jewellery'], img: ['necklace-blush', 'necklace-ivory'], colours: ['Gold', 'Red', 'Green'], finish: 'Antique gold tone', featured: true,
    summary: 'A long temple haar with a teardrop pendant, perfect for layering over a choker.',
    body: 'This long haar falls to the middle of the chest and ends in a teardrop pendant. It layers well with a choker for a traditional bridal look.\n\nWear it alone over a silk saree for festivals and family functions.' },
  { name: 'Kundan Choker Necklace', sku: 'RY-NK-302', cat: 'necklaces', col: ['kundan-jewellery', 'festive-jewellery'], img: ['necklace-ivory', 'necklace-stone'], colours: ['Gold', 'Green'], finish: 'Gold tone',
    summary: 'A close-fitting kundan choker that suits boat necks, off-shoulder and high-neck blouses.',
    body: 'A kundan choker that sits neatly at the base of the neck, with small drops along the lower edge. It frames the face without covering the neckline of your blouse.\n\nPair it with small studs, or layer it with a long haar for weddings.' },
  { name: 'American Diamond Pendant Necklace', sku: 'RY-NK-303', cat: 'necklaces', col: ['american-diamond-jewellery', 'daily-wear-jewellery', 'partywear-jewellery'], img: ['necklace-sage', 'necklace-blush'], colours: ['Silver', 'White'], finish: 'Rhodium tone',
    summary: 'A fine chain with a single AD pendant. Light enough for everyday wear, bright enough for dinner plans.',
    body: 'A single American diamond pendant on a fine chain. It is light and simple, so it works with office wear as easily as it does with a party dress.\n\nMatch it with AD studs for a coordinated look.' },
  // Bangles
  { name: 'Kundan Kada Pair', sku: 'RY-BG-401', cat: 'bangles-bracelets', col: ['kundan-jewellery', 'bridal-jewellery'], img: ['bangles-ivory', 'bangles-blush'], colours: ['Gold', 'White'], finish: 'Gold tone', featured: true,
    summary: 'A pair of broad kundan kadas to finish a bridal stack or wear on their own at festivals.',
    body: 'Broad kundan kadas with stones set around the front face. Wear them at the ends of a bridal bangle stack, or on their own with a festive outfit.\n\nCheck the size before ordering. Ask us on WhatsApp if you are unsure which size fits you.' },
  { name: 'Antique Gold Bangle Set', sku: 'RY-BG-402', cat: 'bangles-bracelets', col: ['antique-jewellery', 'festive-jewellery'], img: ['bangles-stone', 'bangles-ivory'], colours: ['Gold'], finish: 'Antique gold tone',
    summary: 'A set of slim antique finish bangles with fine detailing, easy to stack and style.',
    body: 'Slim bangles in a matte antique gold tone with fine dotted detailing. They stack neatly and add a traditional touch without feeling heavy.\n\nMix them with a pair of kadas or wear them alone with a kurta.' },
  { name: 'American Diamond Tennis Bracelet', sku: 'RY-BG-403', cat: 'bangles-bracelets', col: ['american-diamond-jewellery', 'daily-wear-jewellery', 'partywear-jewellery'], img: ['bangles-sage', 'bangles-stone'], colours: ['Silver', 'White'], finish: 'Rhodium tone',
    summary: 'A single line of AD stones on a flexible bracelet. Understated sparkle for office and evening.',
    body: 'A flexible bracelet set with a continuous line of American diamond stones. It adds a quiet sparkle to office wear and dresses up easily for the evening.\n\nIt pairs well with the AD pendant necklace.' },
  // Rings
  { name: 'Kundan Cocktail Ring', sku: 'RY-RG-501', cat: 'rings', col: ['kundan-jewellery', 'partywear-jewellery', 'festive-jewellery'], img: ['ring-ivory', 'ring-blush'], colours: ['Gold', 'Green'], finish: 'Gold tone', featured: true,
    summary: 'A bold kundan ring with a large centre stone, made to match traditional sets.',
    body: 'A statement cocktail ring with a large kundan centre and small accent stones. It is designed to match kundan necklace sets and earrings.\n\nWear it on the index or middle finger so it stands out in photos.' },
  { name: 'American Diamond Solitaire Ring', sku: 'RY-RG-502', cat: 'rings', col: ['american-diamond-jewellery', 'daily-wear-jewellery'], img: ['ring-sage', 'ring-stone'], colours: ['Silver', 'White'], finish: 'Rhodium tone',
    summary: 'A single AD stone on a slim band. Clean and simple for everyday wear.',
    body: 'A classic solitaire shape with a single American diamond stone on a slim band. Simple enough to wear every day, with enough sparkle to notice.\n\nStack it with a plain band or wear it alone.' },
  { name: 'Statement Party Ring', sku: 'RY-RG-503', cat: 'rings', col: ['partywear-jewellery', 'american-diamond-jewellery'], img: ['ring-stone', 'ring-ivory'], colours: ['Gold', 'White'], finish: 'Gold tone',
    summary: 'A large faceted stone surrounded by AD accents for cocktail nights and receptions.',
    body: 'A large faceted centre stone framed by small American diamond accents. It is designed to be the one statement piece in a party look.\n\nKeep other jewellery simple, with small studs and no bracelet on the same hand.' },
  // Maang tikka
  { name: 'Kundan Bridal Maang Tikka', sku: 'RY-MT-601', cat: 'maang-tikka', col: ['kundan-jewellery', 'bridal-jewellery'], img: ['tikka-blush', 'tikka-ivory'], colours: ['Gold', 'White', 'Pink'], finish: 'Gold tone', featured: true,
    summary: 'A large kundan tikka with a teardrop drop, designed to match kundan bridal sets.',
    body: 'A generous kundan centre piece on a fine chain, finished with a teardrop drop. It is sized for bridal looks and matches the kundan bridal necklace set.\n\nSecure it with a couple of bobby pins along the chain for long functions.' },
  { name: 'Temple Maang Tikka', sku: 'RY-MT-602', cat: 'maang-tikka', col: ['temple-jewellery', 'festive-jewellery'], img: ['tikka-ivory', 'tikka-stone'], colours: ['Gold', 'Red'], finish: 'Antique gold tone',
    summary: 'A round temple-style tikka in an antique finish for festivals and South Indian looks.',
    body: 'A round temple-style tikka with a red centre stone and an antique gold finish. It pairs naturally with temple jhumkas and silk sarees.\n\nA lovely choice for festivals, poojas and bridesmaids.' },
  { name: 'Delicate American Diamond Tikka', sku: 'RY-MT-603', cat: 'maang-tikka', col: ['american-diamond-jewellery', 'partywear-jewellery', 'bridal-jewellery'], img: ['tikka-sage', 'tikka-blush'], colours: ['Silver', 'White'], finish: 'Rhodium tone',
    summary: 'A small AD tikka on a fine chain for engagements, receptions and bridesmaids.',
    body: 'A small American diamond pendant on a fine chain. It adds a little sparkle at the hairline without overpowering a lighter outfit.\n\nPerfect for engagements, receptions and bridesmaid looks.' },
];

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const q = (s) => JSON.stringify(s);

P.forEach((p, i) => {
  const slug = `${slugify(p.name)}-${p.sku.toLowerCase()}`;
  const date = new Date(Date.UTC(2026, 8, 1 + (i % 20))).toISOString().slice(0, 10);
  const fm = [
    '---',
    `name: ${q(p.name)}`,
    `sku: ${p.sku}`,
    `category: ${p.cat}`,
    `collections: [${p.col.join(', ')}]`,
    `summary: ${q(p.summary)}`,
    'images:',
    ...p.img.map((im, j) => `  - src: ../../assets/placeholders/${im}.svg\n    alt: ${q(`${p.name}${j ? ', alternate view' : ''}`)}`),
    `colours: [${p.colours.join(', ')}]`,
    `finish: ${q(p.finish)}`,
    p.featured ? 'featured: true' : null,
    p.bestseller ? 'bestseller: true' : null,
    'sample: true',
    `publishedAt: ${date}`,
    '---',
    '',
    p.body,
    '',
  ].filter((l) => l !== null);
  writeFileSync(new URL(`${slug}.md`, dir), fm.join('\n'));
});
console.log(`${P.length} sample products written`);
