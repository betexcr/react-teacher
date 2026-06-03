import { Link } from 'react-router-dom';
import { reactPatterns } from '../data/react-patterns';

export function ReactPatternsPage() {
  return (
    <>
      <h1 className="page-title">React Patterns</h1>
      <p className="get-started-lead get-started-lead--secondary">
        Practical component and state patterns with copyable examples — useful for interviews and day-to-day
        React architecture.
      </p>
      <div className="system-design-grid">
        {reactPatterns.map((pattern) => (
          <Link
            key={pattern.slug}
            to={`/react-patterns/${pattern.slug}`}
            className="system-design-card"
          >
            <h3>{pattern.title}</h3>
            <p>{pattern.subtitle}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
