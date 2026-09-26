/**
 * Single source of truth for business facts.
 *
 * Anything marked PLACEHOLDER is not verified. Replace it with real
 * information before launch. Components hide a field when it is empty,
 * so leaving a value as '' is always safer than inventing one.
 */
export const site = {
  name: 'Royalty',
  legalName: '', // PLACEHOLDER: registered business name as on GST / invoices
  tagline: 'Imitation Jewellery',
  description:
    'Royalty designs imitation jewellery for weddings, festivals, parties and every day. Browse earrings, necklace sets, bangles, rings and maang tikka, then ask for price and availability on WhatsApp.',

  // Contact. PLACEHOLDER values: WhatsApp and call links go live once these are set.
  whatsappNumber: '', // digits only with country code, e.g. '919876543210'
  phone: '', // display format, e.g. '+91 98765 43210'
  email: '', // e.g. 'hello@yourdomain.in'
  city: '', // e.g. 'Mumbai'
  region: '', // e.g. 'Maharashtra'
  country: 'India',
  hours: '', // e.g. 'Mon to Sat, 10am to 8pm'

  // Only list services you actually offer. Each one appears on the site as written.
  // PLACEHOLDER: confirm every line before launch, delete what is not true.
  serviceFacts: {
    shipsPanIndia: null as boolean | null,
    shipsInternational: null as boolean | null,
    cashOnDelivery: null as boolean | null,
    dispatchTime: '', // e.g. '1 to 2 working days'
    returnPolicySummary: '', // e.g. '7-day exchange on unused pieces'
    bulkOrders: true, // bulk / gifting enquiries are accepted through the enquiry form
  },

  social: {
    instagram: '', // full URL
    facebook: '',
    youtube: '',
    pinterest: '',
  },

  // Bundle offer (/bundle-offer/): customers pick any N pieces and send the list on WhatsApp.
  // PLACEHOLDER: set price to the real bundle price in INR (e.g. 999). While it is null the
  // page never shows a number; it says a special bundle price is shared on WhatsApp.
  bundle: {
    enabled: true,
    pieces: 3,
    price: null as number | null,
    eligibleCategories: [] as string[], // e.g. ['earrings']. Empty = every product qualifies.
  },

  // Catalogue PDF. Leave empty until a real catalogue exists: the site then
  // offers "request the catalogue on WhatsApp" instead of a download.
  cataloguePdf: '',

  // Optional form backend (Formspree, Web3Forms, your own endpoint). When empty,
  // enquiry forms hand the message to WhatsApp instead.
  formEndpoint: '',

  analytics: {
    gtmId: '', // 'GTM-XXXXXXX'. When set, GA4 should be configured inside GTM.
    ga4Id: '', // 'G-XXXXXXXXXX'. Used only when gtmId is empty.
    searchConsoleVerification: '', // content value of the google-site-verification meta tag
  },

  ogImage: '/og-default.png',
  locale: 'en_IN',
} as const;

export type Site = typeof site;

export const nav = [
  { label: 'Shop All', href: '/imitation-jewellery/' },
  { label: 'Earrings', href: '/imitation-jewellery/earrings/' },
  { label: 'Necklace Sets', href: '/imitation-jewellery/necklace-sets/' },
  ...(site.bundle.enabled ? [{ label: `Pick ${site.bundle.pieces} Offer`, href: '/bundle-offer/' }] : []),
  { label: 'Bridal', href: '/collections/bridal-jewellery/' },
  { label: 'Collections', href: '/collections/' },
  { label: 'Bulk & Gifting', href: '/bulk-and-gifting-orders/' },
  { label: 'Journal', href: '/blog/' },
];
