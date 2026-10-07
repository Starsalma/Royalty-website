import type { APIRoute } from 'astro';

// AI assistants and answer engines that crawl for grounding (as distinct from the model-training
// crawlers below). Explicitly allowed so product and guide pages can be cited in AI answers.
const aiAnswerBots = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'];

export const GET: APIRoute = ({ site }) => {
  const disallow = `Disallow: ${import.meta.env.BASE_URL.replace(/\/?$/, '/')}search/`;
  const body = [
    'User-agent: *',
    'Allow: /',
    disallow,
    '',
    ...aiAnswerBots.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', disallow, '']),
    `Sitemap: ${new URL(`${import.meta.env.BASE_URL.replace(/\/?$/, '/')}sitemap-index.xml`, site).href}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
