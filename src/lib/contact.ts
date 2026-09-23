import { site } from '../config/site';

export const hasWhatsApp = site.whatsappNumber.length > 0;
export const hasPhone = site.phone.length > 0;

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  // Without a configured number, wa.me opens WhatsApp's contact picker with the text ready,
  // so the link still does something sensible before launch.
  return hasWhatsApp ? `https://wa.me/${site.whatsappNumber}?text=${text}` : `https://wa.me/?text=${text}`;
}

export const telLink = () => `tel:${site.phone.replace(/[^\d+]/g, '')}`;

export const messages = {
  general: () => `Hi ${site.name}, I would like to know more about your jewellery.`,
  product: (name: string, sku: string) =>
    `Hi ${site.name}, I am interested in ${name} (Code: ${sku}). Please share the price and availability.`,
  category: (name: string) => `Hi ${site.name}, please share your latest ${name.toLowerCase()} designs with prices.`,
  catalogue: () => `Hi ${site.name}, please send me your latest catalogue.`,
  bulk: () => `Hi ${site.name}, I have a bulk / gifting requirement. Can we discuss quantity and pricing?`,
};
