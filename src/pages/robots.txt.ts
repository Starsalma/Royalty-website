import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const body = [
    'User-agent: *',
    'Allow: /',
    `Disallow: ${import.meta.env.BASE_URL.replace(/\/?$/, '/')}search/`,
    '',
    `Sitemap: ${new URL(`${import.meta.env.BASE_URL.replace(/\/?$/, '/')}sitemap-index.xml`, site).href}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
