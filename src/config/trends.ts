/**
 * Trend edit for /trending-jewellery/. Research notes and sources: docs/trends-and-pricing.md.
 *
 * status: 'now' = selling now, 'next' = rising for the coming season.
 * skus: real Royalty products that fit the trend (shown as "Shop the look").
 * Trends with no matching stock yet show an "Ask for this style" WhatsApp button instead,
 * so the page never lists products we do not have.
 */
import type { ImageMetadata } from 'astro';
import bow from '../assets/products/bow-pendant-set.jpg';
import butterfly from '../assets/products/butterfly-pendant-set-colours.jpg';
import tulip from '../assets/products/tulip-cable-bangle-green-pink.jpg';
import layering from '../assets/placeholders/trend-layering.svg';
import watchDuo from '../assets/placeholders/trend-watch-duo.svg';
import pearls from '../assets/placeholders/trend-pearls.svg';
import charms from '../assets/placeholders/trend-charms.svg';
import hoops from '../assets/placeholders/trend-hoops.svg';
import coastal from '../assets/placeholders/trend-coastal.svg';
import mixedMetals from '../assets/placeholders/trend-mixed-metals.svg';
import colourStones from '../assets/placeholders/trend-colour-stones.svg';

export type Trend = {
  id: string;
  name: string;
  status: 'now' | 'next';
  kicker: string;
  why: string;
  wear: string[];
  image: ImageMetadata;
  imageAlt: string;
  photo: boolean; // true = real Royalty product photo, false = illustration
  skus: string[];
  collection?: string; // related collection id
};

export const trends: Trend[] = [
  {
    id: 'everyday-stainless-steel',
    name: 'Everyday stainless steel jewellery',
    status: 'now',
    kicker: 'The daily-wear shift',
    why: 'With gold prices at record highs, more women are buying light, affordable pieces they can wear every day, to work, on the commute and through the monsoon. Stainless steel sets lead this demand.',
    wear: ['Keep one pendant set on through the week', 'Pair small studs with office wear', 'Store pieces separately in a zip pouch to keep the finish'],
    image: butterfly,
    imageAlt: 'Butterfly pendant sets on stainless steel packaging cards in six colours',
    photo: true,
    skus: ['RY-NS-212', 'RY-NS-211'],
    collection: 'daily-wear-jewellery',
  },
  {
    id: 'bows-and-ribbons',
    name: 'Bows & ribbon motifs',
    status: 'now',
    kicker: 'Soft and feminine',
    why: 'The bow is one of the most-worn motifs of the year, on pendants, studs and hair accessories. It reads romantic without feeling heavy, and it suits every age.',
    wear: ['A single bow pendant on a fine chain', 'Match with plain solitaire studs', 'Great as a birthday or friendship gift'],
    image: bow,
    imageAlt: 'Bow pendant with stone-set loops and solitaire studs',
    photo: true,
    skus: ['RY-NS-212'],
  },
  {
    id: 'butterflies-and-florals',
    name: 'Nature motifs: butterflies, tulips & leaves',
    status: 'now',
    kicker: 'Colour you can wear',
    why: 'Butterflies, tulips and leaves bring colour and movement to minimal jewellery. Enamel and translucent wings in greens, pinks and blues are especially popular.',
    wear: ['Pick a colour that matches your outfit', 'Keep the rest of your jewellery plain', 'Stack a floral bangle with simple gold-tone bangles'],
    image: tulip,
    imageAlt: 'Gold-tone cable bangle with a trail of tulips set with green and pink stones',
    photo: true,
    skus: ['RY-NS-211', 'RY-BG-411', 'RY-BG-412'],
  },
  {
    id: 'layering',
    name: 'Layered necklaces',
    status: 'now',
    kicker: 'Build your own "neck mess"',
    why: 'Layering chains of different lengths and textures is still one of the strongest looks, because it lets you build a personal style from simple pieces.',
    wear: ['Start with a short chain and add a longer pendant', 'Keep 5 to 8 cm between each layer', 'Mix one textured chain with two plain ones'],
    image: layering,
    imageAlt: 'Illustration of three layered gold-tone necklaces with small pendants',
    photo: false,
    skus: ['RY-NS-211', 'RY-NS-212'],
  },
  {
    id: 'watch-and-bracelet-duos',
    name: 'Watch & bracelet duos',
    status: 'now',
    kicker: 'The gifting best seller',
    why: 'A fashion watch paired with a matching bracelet, sold as one gift-ready set, is among the best-selling items at online accessory stores right now.',
    wear: ['Wear the watch and bracelet on the same wrist', 'Rose gold and silver tones work with everything', 'An easy anniversary or birthday gift'],
    image: watchDuo,
    imageAlt: 'Illustration of a watch and a matching bangle bracelet',
    photo: false,
    skus: [],
  },
  {
    id: 'modern-pearls',
    name: 'Modern pearls',
    status: 'now',
    kicker: 'Younger and edgier',
    why: 'Pearls are back, but styled differently: single pearl drops, pearls mixed with chains and irregular baroque shapes rather than classic strings.',
    wear: ['Pearl drops with a plain white shirt', 'Mix a pearl strand with a gold chain', 'Pearl studs for daily wear'],
    image: pearls,
    imageAlt: 'Illustration of a pearl strand necklace and pearl drop earrings',
    photo: false,
    skus: [],
  },
  {
    id: 'coloured-stones',
    name: 'Emerald & ruby coloured stones',
    status: 'now',
    kicker: 'For festive season',
    why: 'Emerald green and ruby red stones are the colour story of the year, especially on lightweight chokers and jhumkas for weddings and festivals.',
    wear: ['A coloured-stone choker with a plain saree', 'Match stone colour to your outfit border', 'Keep earrings in the same stone family'],
    image: colourStones,
    imageAlt: 'Illustration of a choker with green and red stones and matching jhumkas',
    photo: false,
    skus: ['RY-NS-229'],
    collection: 'festive-jewellery',
  },
  {
    id: 'mixed-metals',
    name: 'Mixed metals',
    status: 'now',
    kicker: 'No more matching',
    why: 'The rule that gold and silver should never meet is gone. Stacking gold-tone and silver-tone pieces together is now a deliberate style choice.',
    wear: ['Stack gold and silver bangles together', 'Wear gold earrings with a silver chain', 'Tie the look together with one two-tone piece'],
    image: mixedMetals,
    imageAlt: 'Illustration of gold-tone and silver-tone bangles stacked together',
    photo: false,
    skus: [],
  },
  {
    id: 'charms',
    name: 'Single meaningful charms',
    status: 'next',
    kicker: 'Coming next',
    why: 'Charms are returning in a lighter way: one heart, moon, key or initial charm on a fine chain, or a small charm hanging from a hoop, instead of a crowded charm bracelet.',
    wear: ['One charm on a fine chain', 'Charm drops on small hoops', 'Collect charms that mean something to you'],
    image: charms,
    imageAlt: 'Illustration of heart, moon and key charms on a chain and hoops with heart charms',
    photo: false,
    skus: [],
  },
  {
    id: 'bold-hoops-and-organic-gold',
    name: 'Bold hoops & organic gold shapes',
    status: 'next',
    kicker: 'Coming next',
    why: 'Large, flat, polished hoops and gold pieces with flowing, irregular shapes are rising for the coming season. The look is dramatic but light to wear.',
    wear: ['One pair of big hoops, nothing else on the ears', 'Hair tied back to show them off', 'Balance with a simple top'],
    image: hoops,
    imageAlt: 'Illustration of two large gold-tone hoop earrings and a curved open ring',
    photo: false,
    skus: [],
  },
  {
    id: 'coastal',
    name: 'Coastal shells & turquoise',
    status: 'next',
    kicker: 'Coming next',
    why: 'Shells, starfish and turquoise are being tipped as a leading summer look for next year, on gold-tone pendants and earrings.',
    wear: ['A shell pendant for holidays and brunch', 'Turquoise studs with white outfits', 'Pair with woven or linen fabrics'],
    image: coastal,
    imageAlt: 'Illustration of a shell pendant, a starfish charm and a turquoise stone',
    photo: false,
    skus: [],
  },
];
