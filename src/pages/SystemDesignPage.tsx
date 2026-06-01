import { Link } from 'react-router-dom';
import { systemDesignProblems } from '../data/system-design';

export function SystemDesignPage() {
  return (
    <>
      <h1 className="page-title">System Design Problems</h1>
      <div className="system-design-grid">
        {systemDesignProblems.map((problem) => (
          <Link
            key={problem.slug}
            to={`/system-design/${problem.slug}`}
            className="system-design-card"
          >
            <h3>{problem.title}</h3>
            <p>{problem.subtitle}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
