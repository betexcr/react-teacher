import { Link } from 'react-router-dom';

const INTERVIEW_LINKS = [
  { href: '/js-basics', label: 'JS Basics guided tutorial' },
  { href: '/flashcards/server-components', label: 'Server Components & SSR flashcards' },
  { href: '/flashcards/nextjs', label: 'Next.js flashcards' },
  { href: '/react-patterns/custom-hooks', label: 'Custom hooks pattern' },
  { href: '/react-patterns/error-boundaries', label: 'Error boundaries pattern' },
  { href: '/react-patterns/optimistic-ui', label: 'Optimistic UI pattern' },
  { href: '/system-design/infinite-scroll', label: 'Infinite scroll system design' },
  { href: '/system-design/state-store', label: 'State store system design' },
  { href: '/system-design/data-table', label: 'Data table system design' },
  {
    href: '/challenges/medium/10-use-reducer-implementation',
    label: 'useReducer challenge',
  },
  {
    href: '/challenges/hard/03-prevent-unnecessary-rerenders',
    label: 'Prevent unnecessary re-renders challenge',
  },
];

export function GetStartedInterviewPathSection() {
  return (
    <section className="get-started-section">
      <h2>React interview learning path</h2>
      <p className="get-started-section-intro">
        After JS Basics and easy challenges, follow this path for hooks, performance, data fetching, and
        frontend system design — the topics that show up most in React interviews.
      </p>
      <ul className="get-started-pointers">
        {INTERVIEW_LINKS.map((link) => (
          <li key={link.href}>
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
