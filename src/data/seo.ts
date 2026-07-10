import { ogManifest } from './og-manifest.js';
import { SITE_NAME, SITE_URL } from '../config/brand';
import { COMPARE_PAGES, getBlogArticle, HOME_META } from '../config/seo-content';
import challengesIndex from './challenges-index.json';

export { SITE_NAME, SITE_URL };

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
    'React interview prep with coding challenges, flashcards, patterns, and frontend system design walkthroughs.',
  ogImageId: 'default',
};

const SECTION_FALLBACK: Record<string, PageMeta> = {
  '/get-started': HOME_META,
  '/about': {
    title: `About · ${SITE_NAME}`,
    description: 'Free React interview prep: challenges, flashcards, patterns, and system design guides.',
    ogImageId: 'default',
  },
  '/faq': {
    title: `${SITE_NAME} FAQ · React Interview Prep`,
    description: 'Answers about ReactTeacher, study plans, and how to prepare for React interviews.',
    ogImageId: 'default',
  },
  '/blog': {
    title: `Blog · ${SITE_NAME}`,
    description: 'React interview guides, study plans, and prep articles.',
    ogImageId: 'default',
  },
  '/js-basics': {
    title: `JS Basics · ${SITE_NAME}`,
    description:
      'JavaScript from zero: types, operators, if/for/while, arrays, then React-ready patterns before easy challenges.',
    ogImageId: 'js-basics',
  },
  '/challenges': {
    title: `React Challenges · ${SITE_NAME}`,
    description:
      'Hands-on React coding challenges from easy to very hard with acceptance criteria.',
    ogImageId: 'challenges',
  },
  '/flashcards': {
    title: `Flashcards · ${SITE_NAME}`,
    description: 'Quick-review flashcards for hooks, patterns, performance, Next.js, and more.',
    ogImageId: 'flashcards',
  },
  '/react-patterns': {
    title: `React Patterns · ${SITE_NAME}`,
    description:
      'React component and state patterns: compound components, hooks, context, portals, and more.',
    ogImageId: 'react-patterns',
  },
  '/system-design': {
    title: `System Design · ${SITE_NAME}`,
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

  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const article = getBlogArticle(blogMatch[1]);
    if (article) {
      return {
        title: `${article.title} · ${SITE_NAME}`,
        description: article.description,
        ogImageId: 'default',
      };
    }
  }

  const compareMatch = path.match(/^\/compare\/([^/]+)$/);
  if (compareMatch) {
    const page = COMPARE_PAGES[compareMatch[1]];
    if (page) {
      return { title: `${page.title} · ${SITE_NAME}`, description: page.description, ogImageId: 'default' };
    }
  }

  const iqMatch = path.match(/^\/interview-questions\/([^/]+)$/);
  if (iqMatch) {
    for (const items of Object.values(challengesIndex)) {
      const item = (items as { slug: string; title: string }[]).find((c) => c.slug === iqMatch[1]);
      if (item) {
        return {
          title: `${item.title} Interview Question · ${SITE_NAME}`,
          description: `Practice the ${item.title} React coding challenge with acceptance criteria and solution.`,
          ogImageId: 'challenges',
        };
      }
    }
  }

  if (path.startsWith('/flashcards/')) return SECTION_FALLBACK['/flashcards'];

  const challengeTier = path.match(/^\/challenges\/(easy|medium|hard|very-hard)$/);
  if (challengeTier) {
    const tier = manifestRoutes[`/challenges/${challengeTier[1]}`];
    if (tier) {
      return { title: tier.title, description: tier.description, ogImageId: tier.ogImageId };
    }
  }

  if (path.startsWith('/challenges/')) return SECTION_FALLBACK['/challenges'];
  if (path.startsWith('/react-patterns/')) return SECTION_FALLBACK['/react-patterns'];
  if (path.startsWith('/system-design/')) return SECTION_FALLBACK['/system-design'];
  if (path.startsWith('/get-started')) return SECTION_FALLBACK['/get-started'];
  if (path.startsWith('/js-basics')) return SECTION_FALLBACK['/js-basics'];

  return DEFAULT_META;
}
