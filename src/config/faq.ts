import { site } from './site';

type Faq = { q: string; a: string };
const f = site.serviceFacts;

/**
 * Store-wide FAQs. Questions about shipping, COD and returns only appear once
 * the matching fact is confirmed in site.serviceFacts. No guessed answers.
 */
export const generalFaq: Faq[] = [
  {
    q: 'How do I order from Royalty?',
    a: 'Tap "Ask on WhatsApp" on any product. The message already carries the product code. We reply with the price, stock and extra photos or a video, then confirm payment and delivery details with you on the same chat.',
  },
  {
    q: 'Can I see a video of a product before buying?',
    a: 'Yes. Ask on WhatsApp with the product code and we will send a video in natural light so you can see the real colour, finish and size.',
  },
  {
    q: 'Why is the price not shown on some products?',
    a: 'Where a price is not listed, we confirm it on WhatsApp together with current stock, so you always get an up-to-date answer.',
  },
  {
    q: 'Is imitation jewellery made of real gold?',
    a: 'No. Imitation jewellery is designed to look like precious jewellery without using solid gold, silver or real gemstones. Each product page lists the finish and, where available, the material.',
  },
  {
    q: 'Can I order several pieces of the same design?',
    a: 'Yes, you can ask. For bridesmaid sets, return gifts or corporate gifting, send your requirement through the bulk and gifting page and we will confirm availability for the full quantity.',
  },
  {
    q: 'Can I get your catalogue?',
    a: 'Yes. Request it on the catalogue page or on WhatsApp and we will send our latest designs.',
  },
  ...(f.shipsPanIndia ? [{ q: 'Do you deliver across India?', a: `Yes, we deliver across India.${f.dispatchTime ? ` Orders are usually dispatched in ${f.dispatchTime}.` : ''}` }] : []),
  ...(f.shipsInternational !== null ? [{ q: 'Do you ship outside India?', a: f.shipsInternational ? 'Yes. Message us on WhatsApp with your country and we will confirm shipping options and charges.' : 'At the moment we deliver only within India.' }] : []),
  ...(f.cashOnDelivery !== null ? [{ q: 'Is cash on delivery available?', a: f.cashOnDelivery ? 'Yes, cash on delivery is available on eligible pin codes.' : 'We currently accept prepaid orders only. We will share payment options on WhatsApp.' }] : []),
  ...(f.returnPolicySummary ? [{ q: 'What is your return or exchange policy?', a: `${f.returnPolicySummary} Full details are on our shipping and returns page.` }] : []),
  {
    q: 'How do I take care of imitation jewellery?',
    a: 'Keep it dry, put it on after perfume and makeup, wipe it with a soft cloth after wearing and store each piece separately in an airtight pouch.',
  },
];
