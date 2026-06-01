import { buildOgHeadHtml, getPageMeta } from './src/data/seo.js';

const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|Pinterest|Embedly/i;

export const config = {
  matcher: ['/((?!og/|assets/|favicon|challenges/|.*\\..*).*)'],
};

export default async function middleware(request: Request): Promise<Response | undefined> {
  const ua = request.headers.get('user-agent') ?? '';
  if (!BOT_UA.test(ua)) return undefined;

  const url = new URL(request.url);
  const meta = getPageMeta(url.pathname);
  const ogHead = buildOgHeadHtml(meta, url.pathname);

  const indexUrl = new URL('/index.html', request.url);
  const res = await fetch(indexUrl.toString(), { headers: { accept: 'text/html' } });
  if (!res.ok) return undefined;

  let html = await res.text();
  html = html.replace(/<title>[\s\S]*?<\/title>/i, '');
  html = html.replace(
    /<meta\s+charset="UTF-8"\s*\/?>/i,
    `<meta charset="UTF-8" />\n    ${ogHead}`,
  );

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
