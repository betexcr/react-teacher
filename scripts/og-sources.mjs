import { readFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import challengeIndex from '../src/data/challenges-index.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const DIFFICULTY_LABELS = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  'very-hard': 'Very Hard',
};

const DIFFICULTY_ACCENTS = {
  easy: { accent: '#34d399', accent2: '#5b9fd4' },
  medium: { accent: '#47bfff', accent2: '#5b9fd4' },
  hard: { accent: '#f59e0b', accent2: '#863bff' },
  'very-hard': { accent: '#f43f5e', accent2: '#863bff' },
};

const FLASHCARD_ACCENTS = [
  { accent: '#34d399', accent2: '#5b9fd4' },
  { accent: '#a78bfa', accent2: '#863bff' },
  { accent: '#47bfff', accent2: '#5b9fd4' },
  { accent: '#2dd4bf', accent2: '#34d399' },
  { accent: '#f472b6', accent2: '#863bff' },
];

const SYSTEM_DESIGN_ACCENTS = [
  { accent: '#f59e0b', accent2: '#863bff' },
  { accent: '#fb923c', accent2: '#f59e0b' },
  { accent: '#a78bfa', accent2: '#863bff' },
  { accent: '#47bfff', accent2: '#5b9fd4' },
];

const REACT_PATTERNS_ACCENTS = [
  { accent: '#a78bfa', accent2: '#863bff' },
  { accent: '#c084fc', accent2: '#a78bfa' },
  { accent: '#47bfff', accent2: '#5b9fd4' },
  { accent: '#34d399', accent2: '#5b9fd4' },
];

const systemDesignProblems = [
  { slug: 'infinite-scroll', title: 'Twitter Feed', subtitle: 'Infinite Scroll Feed' },
  { slug: 'form-builder', title: 'Form Builder', subtitle: 'Dynamic Form Generation and Validation' },
  { slug: 'state-store', title: 'State Store', subtitle: 'Custom State Management Implementation' },
  { slug: 'chat-application', title: 'Chat Application', subtitle: 'WebSocket-based Chat App' },
  { slug: 'auth-system', title: 'Auth System', subtitle: 'Role-based Authentication System' },
  { slug: 'google-docs-clone', title: 'Google Docs Clone', subtitle: 'Real-time Collaboration Editor' },
  { slug: 'video-player', title: 'Video Player', subtitle: 'Custom Video Player' },
  { slug: 'kanban-board', title: 'Kanban Board', subtitle: 'Complex Drag-and-Drop Interactions' },
];

const reactPatterns = [
  { slug: 'compound-components', title: 'Compound Components', subtitle: 'Shared implicit state via context' },
  { slug: 'custom-hooks', title: 'Custom Hooks', subtitle: 'Reusable stateful logic' },
  { slug: 'container-presentational', title: 'Container / Presentational', subtitle: 'Separate data from UI' },
  { slug: 'provider-context', title: 'Provider / Context', subtitle: 'Share values without prop drilling' },
  { slug: 'controlled-uncontrolled', title: 'Controlled vs Uncontrolled', subtitle: 'Who owns form input state' },
  { slug: 'composition', title: 'Composition', subtitle: 'Children and slot props' },
  { slug: 'state-reducer', title: 'State Reducer', subtitle: 'Predictable state transitions' },
  { slug: 'render-props', title: 'Render Props', subtitle: 'Inject state into JSX via functions' },
  { slug: 'higher-order-components', title: 'Higher-Order Components', subtitle: 'Enhance components with wrappers' },
  { slug: 'polymorphic-components', title: 'Polymorphic Components', subtitle: 'Flexible as prop rendering' },
  { slug: 'headless-ui', title: 'Headless UI', subtitle: 'Behavior without prescribed markup' },
  { slug: 'portals', title: 'Portals', subtitle: 'Render outside the parent DOM tree' },
  { slug: 'error-boundaries', title: 'Error Boundaries', subtitle: 'Isolate render failures' },
  { slug: 'lazy-suspense', title: 'Lazy Loading & Suspense', subtitle: 'Code-split routes and features' },
  { slug: 'lifting-state-up', title: 'Lifting State Up', subtitle: 'Shared state in a common ancestor' },
  { slug: 'optimistic-ui', title: 'Optimistic UI', subtitle: 'Instant feedback before the server confirms' },
];

function loadFlashcardDecks() {
  const dir = join(root, 'src/data/flashcards');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts')
    .map((file) => {
      const content = readFileSync(join(dir, file), 'utf8');
      const slug = content.match(/"slug":\s*"([^"]+)"/)?.[1];
      const title = content.match(/"title":\s*"([^"]+)"/)?.[1];
      const cardCount = (content.match(/"question":/g) ?? []).length;
      if (!slug || !title) throw new Error(`Could not parse flashcard deck: ${file}`);
      return { slug, title, cardCount };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

/** @typedef {{ id: string; badge: string; title: string; subtitle: string; accent: string; accent2: string; icon: string; pathname?: string; pageTitle?: string; pageDescription?: string }} OgEntry */

/** @returns {{ images: OgEntry[]; routes: Record<string, { title: string; description: string; ogImageId: string }> }} */
export function buildOgSources() {
  /** @type {OgEntry[]} */
  const images = [];
  /** @type {Record<string, { title: string; description: string; ogImageId: string }>} */
  const routes = {};

  const baseImages = [
    {
      id: 'default',
      badge: 'Interview prep',
      title: 'ReactTeacher',
      subtitle: 'Challenges, flashcards & system design for React interviews',
      accent: '#863bff',
      accent2: '#5b9fd4',
      icon: '⚛',
    },
    {
      id: 'get-started',
      badge: 'Get started',
      title: 'Start here',
      subtitle: 'Setup, study paths, and how to use ReactTeacher',
      accent: '#a78bfa',
      accent2: '#863bff',
      icon: '✦',
      pathname: '/get-started',
      pageTitle: 'Get Started · ReactTeacher',
      pageDescription: 'Setup, study paths, and how to get the most from ReactTeacher.',
    },
    {
      id: 'js-basics',
      badge: 'For starters',
      title: 'JS Basics',
      subtitle: 'From zero: types, if, loops, arrays — then React',
      accent: '#fbbf24',
      accent2: '#f59e0b',
      icon: '{ }',
      pathname: '/js-basics',
      pageTitle: 'JS Basics · ReactTeacher',
      pageDescription:
        'JavaScript from zero: types, operators, if/for/while, arrays, then React-ready patterns.',
    },
    {
      id: 'challenges',
      badge: 'React challenges',
      title: 'Code challenges',
      subtitle: 'Hands-on exercises from easy to very hard',
      accent: '#47bfff',
      accent2: '#5b9fd4',
      icon: '</>',
      pathname: '/challenges',
      pageTitle: 'React Challenges · ReactTeacher',
      pageDescription:
        'Hands-on React coding challenges from easy to very hard with acceptance criteria.',
    },
    {
      id: 'flashcards',
      badge: 'Flashcards',
      title: 'Quick review',
      subtitle: '291 cards across hooks, patterns, Next.js & more',
      accent: '#34d399',
      accent2: '#5b9fd4',
      icon: '▤',
      pathname: '/flashcards',
      pageTitle: 'Flashcards · ReactTeacher',
      pageDescription: 'Quick-review flashcards for hooks, patterns, performance, Next.js, and more.',
    },
    {
      id: 'react-patterns',
      badge: 'React patterns',
      title: 'Patterns',
      subtitle: 'Compound components, hooks, context, portals & more',
      accent: '#a78bfa',
      accent2: '#863bff',
      icon: '◈',
      pathname: '/react-patterns',
      pageTitle: 'React Patterns · ReactTeacher',
      pageDescription:
        'React component and state patterns with examples for interviews and production code.',
    },
    {
      id: 'system-design',
      badge: 'System design',
      title: 'Architecture',
      subtitle: 'Frontend system design walkthroughs for interviews',
      accent: '#f59e0b',
      accent2: '#863bff',
      icon: '⎇',
      pathname: '/system-design',
      pageTitle: 'System Design · ReactTeacher',
      pageDescription: 'Frontend system design problems and interview walkthroughs.',
    },
  ];

  for (const img of baseImages) {
    images.push(img);
    if (img.pathname) {
      routes[img.pathname] = {
        title: img.pageTitle,
        description: img.pageDescription,
        ogImageId: img.id,
      };
    }
  }

  const decks = loadFlashcardDecks();
  decks.forEach((deck, i) => {
    const colors = FLASHCARD_ACCENTS[i % FLASHCARD_ACCENTS.length];
    const id = `flashcards/${deck.slug}`;
    const pathname = `/flashcards/${deck.slug}`;
    images.push({
      id,
      badge: 'Flashcards',
      title: deck.title,
      subtitle: `${deck.cardCount} interview flashcards`,
      icon: '▤',
      ...colors,
      pathname,
      pageTitle: `${deck.title} · Flashcards`,
      pageDescription: `Study ${deck.cardCount} flashcards on ${deck.title} for React interviews.`,
    });
    routes[pathname] = {
      title: `${deck.title} · Flashcards`,
      description: `Study ${deck.cardCount} flashcards on ${deck.title} for React interviews.`,
      ogImageId: id,
    };
  });

  for (const [difficulty, challenges] of Object.entries(challengeIndex)) {
    const label = DIFFICULTY_LABELS[difficulty];
    const colors = DIFFICULTY_ACCENTS[difficulty];
    const sectionId = `challenges/${difficulty}`;
    const sectionPath = `/challenges/${difficulty}`;
    images.push({
      id: sectionId,
      badge: label,
      title: `${label} challenges`,
      subtitle: `${challenges.length} hands-on React exercises`,
      icon: '</>',
      ...colors,
      pathname: sectionPath,
      pageTitle: `${label} Challenges · ReactTeacher`,
      pageDescription: `${challenges.length} ${label.toLowerCase()} React coding challenges with acceptance criteria and solutions.`,
    });
    routes[sectionPath] = {
      title: `${label} Challenges · ReactTeacher`,
      description: `${challenges.length} ${label.toLowerCase()} React coding challenges with acceptance criteria and solutions.`,
      ogImageId: sectionId,
    };

    for (const challenge of challenges) {
      const id = `challenges/${difficulty}/${challenge.slug}`;
      const pathname = `/challenges/${difficulty}/${challenge.slug}`;
      images.push({
        id,
        badge: `${label} challenge`,
        title: challenge.title,
        subtitle: `${challenge.acceptance.length} acceptance criteria`,
        icon: '</>',
        ...colors,
        pathname,
        pageTitle: `${challenge.title} · ${label}`,
        pageDescription: `${label} React challenge: ${challenge.title}. Practice with acceptance criteria and a solution walkthrough.`,
      });
      routes[pathname] = {
        title: `${challenge.title} · ${label}`,
        description: `${label} React challenge: ${challenge.title}. Practice with acceptance criteria and a solution walkthrough.`,
        ogImageId: id,
      };
    }
  }

  systemDesignProblems.forEach((problem, i) => {
    const colors = SYSTEM_DESIGN_ACCENTS[i % SYSTEM_DESIGN_ACCENTS.length];
    const id = `system-design/${problem.slug}`;
    const pathname = `/system-design/${problem.slug}`;
    images.push({
      id,
      badge: 'System design',
      title: problem.title,
      subtitle: problem.subtitle,
      icon: '⎇',
      ...colors,
      pathname,
      pageTitle: `${problem.title} · System Design`,
      pageDescription: `Frontend system design: ${problem.subtitle}. Interview walkthrough on ReactTeacher.`,
    });
    routes[pathname] = {
      title: `${problem.title} · System Design`,
      description: `Frontend system design: ${problem.subtitle}. Interview walkthrough on ReactTeacher.`,
      ogImageId: id,
    };
  });

  reactPatterns.forEach((pattern, i) => {
    const colors = REACT_PATTERNS_ACCENTS[i % REACT_PATTERNS_ACCENTS.length];
    const id = `react-patterns/${pattern.slug}`;
    const pathname = `/react-patterns/${pattern.slug}`;
    images.push({
      id,
      badge: 'React patterns',
      title: pattern.title,
      subtitle: pattern.subtitle,
      icon: '◈',
      ...colors,
      pathname,
      pageTitle: `${pattern.title} · React Patterns`,
      pageDescription: `React pattern guide: ${pattern.subtitle}. Examples and tradeoffs on ReactTeacher.`,
    });
    routes[pathname] = {
      title: `${pattern.title} · React Patterns`,
      description: `React pattern guide: ${pattern.subtitle}. Examples and tradeoffs on ReactTeacher.`,
      ogImageId: id,
    };
  });

  return { images, routes };
}
