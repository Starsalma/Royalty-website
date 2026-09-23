/**
 * Conversion events. Every event goes to window.dataLayer (read by GTM) and to
 * gtag when GA4 is installed directly. Event names:
 *   whatsapp_click, phone_click, email_click, catalogue_request, catalogue_cta_click,
 *   catalogue_download, product_enquiry, quote_form_submit, social_click,
 *   search, filter_apply
 * Links opt in with data-track="<event>" plus optional data-location / data-product.
 * wa.me and tel: links are tracked even without the attribute.
 */
type Params = Record<string, string | number | undefined>;

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

export function track(event: string, params: Params = {}) {
  const payload = { ...params, page_path: location.pathname };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
  if (typeof window.gtag === 'function') window.gtag('event', event, payload);
  if (import.meta.env.DEV) console.debug('[track]', event, payload);
}

document.addEventListener('click', (e) => {
  const el = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement | HTMLButtonElement>('a, button');
  if (!el) return;
  const href = el instanceof HTMLAnchorElement ? el.href : '';
  const event = el.dataset.track || (href.includes('wa.me') ? 'whatsapp_click' : href.startsWith('tel:') ? 'phone_click' : '');
  if (!event) return;
  track(event, { location: el.dataset.location, product: el.dataset.product });
});
