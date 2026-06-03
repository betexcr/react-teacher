import { ogManifest } from './og-manifest.js';

export const SITE_URL = 'https://reactteacher.vercel.app';
export const SITE_NAME = 'ReactTeacher';

export type PageMeta = {
  title: string;
  description: string;
  ogImageId: string;
};

type ManifestRoute = {
  title: string;
  description: string;
  ogImageId: string;
};

const DEFAULT_META: PageMeta = {
  title: SITE_NAME,
  description:
    'React interview prep with coding challenges, flashcards, and frontend system design walkthroughs.',
  ogImageId: 'default',
};

const SECTION_FALLBACK: Record<string, PageMeta> = {
  '/get-started': {
    title: 'Get Started · ReactTeacher',
    description: 'Setup, study paths, and how to get the most from ReactTeacher.',
    ogImageId: 'get-started',
  },
  '/js-basics': {
    title: 'JS Basics · ReactTeacher',
    description:
      'JavaScript from zero: types, operators, if/for/while, arrays, then React-ready patterns before easy challenges.',
    ogImageId: 'js-basics',
  },
  '/challenges': {
    title: 'React Challenges · ReactTeacher',
    description:
      'Hands-on React coding challenges from easy to very hard with acceptance criteria.',
    ogImageId: 'challenges',
  },
  '/flashcards': {
    title: 'Flashcards · ReactTeacher',
    description: 'Quick-review flashcards for hooks, patterns, performance, Next.js, and more.',
    ogImageId: 'flashcards',
  },
  '/system-design': {
    title: 'System Design · ReactTeacher',
    description: 'Frontend system design problems and interview walkthroughs.',
    ogImageId: 'system-design',
  },
};

const manifestRoutes = ogManifest.routes as Record<string, ManifestRoute>;

export function ogImageUrl(ogImageId: string): string {
  return `${SITE_URL}/og/${ogImageId}.png`;
}

function normalizePathname(pathname: string): string {
  if (pathname === '/') return '/get-started';
  return pathname.replace(/\/+$/, '') || '/get-started';
}

export function getPageMeta(pathname: string): PageMeta {
  const path = normalizePathname(pathname);
  const exact = manifestRoutes[path];
  if (exact) {
    return {
      title: exact.title,
      description: exact.description,
      ogImageId: exact.ogImageId,
    };
  }

  const section = SECTION_FALLBACK[path];
  if (section) return section;

  if (path.startsWith('/flashcards/')) return SECTION_FALLBACK['/flashcards'];
  if (path.startsWith('/challenges/')) return SECTION_FALLBACK['/challenges'];
  if (path.startsWith('/system-design/')) return SECTION_FALLBACK['/system-design'];
  if (path.startsWith('/get-started')) return SECTION_FALLBACK['/get-started'];
  if (path.startsWith('/js-basics')) return SECTION_FALLBACK['/js-basics'];

  return DEFAULT_META;
}

/** HTML snippet for social crawlers (edge middleware). */
export function buildOgHeadHtml(meta: PageMeta, pathname: string): string {
  const image = ogImageUrl(meta.ogImageId);
  const url = `${SITE_URL}${normalizePathname(pathname)}`;

  return `
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
  `.trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
