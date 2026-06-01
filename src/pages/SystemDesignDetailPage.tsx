import { Link, useParams } from 'react-router-dom';
import { MarkdownView } from '../components/MarkdownView';
import { getProblemBySlug } from '../data/system-design';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';

export function SystemDesignDetailPage() {
  useRouteScrollTop();
  const { slug } = useParams<{ slug: string }>();
  const problem = slug ? getProblemBySlug(slug) : undefined;

  if (!problem) {
    return (
      <div>
        <p>Problem not found.</p>
        <Link to="/system-design" className="sd-back-link">
          Back to System Design
        </Link>
      </div>
    );
  }

  return (
    <article className="system-design-detail">
      <Link to="/system-design" className="sd-back-link">
        ← System Design Problems
      </Link>
      <div className="system-design-prose">
        <MarkdownView source={problem.content} />
      </div>
    </article>
  );
}
