import { Link, useParams } from 'react-router-dom';
import { MarkdownView } from '../components/MarkdownView';
import { getPatternBySlug } from '../data/react-patterns';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';

export function ReactPatternDetailPage() {
  useRouteScrollTop();
  const { slug } = useParams<{ slug: string }>();
  const pattern = slug ? getPatternBySlug(slug) : undefined;

  if (!pattern) {
    return (
      <div>
        <p>Pattern not found.</p>
        <Link to="/react-patterns" className="sd-back-link">
          Back to React Patterns
        </Link>
      </div>
    );
  }

  return (
    <article className="system-design-detail">
      <Link to="/react-patterns" className="sd-back-link">
        ← React Patterns
      </Link>
      <div className="system-design-prose">
        <MarkdownView source={pattern.content} />
      </div>
    </article>
  );
}
