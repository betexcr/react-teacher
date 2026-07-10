import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { JsonLd } from '../components/JsonLd';
import { MarkdownView } from '../components/MarkdownView';
import { RelatedPrepLinks } from '../components/RelatedPrepLinks';
import { getSystemDesignHighlights } from '../data/system-design/codeHighlights';
import { getProblemBySlug } from '../data/system-design';
import { useReadTracking } from '../hooks/useReadTracking';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';

export function SystemDesignDetailPage() {
  useRouteScrollTop();
  const { slug } = useParams<{ slug: string }>();
  useReadTracking('system-design', slug);
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
      <JsonLd
        learningResource={{
          name: problem.title,
          description: problem.subtitle,
        }}
        breadcrumbs={[
          { name: 'System Design', path: '/system-design' },
          { name: problem.title },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: 'System Design', path: '/system-design' },
          { name: problem.title },
        ]}
      />
      <Link to="/system-design" className="sd-back-link">
        ← System Design Problems
      </Link>
      <div className="system-design-prose">
        <MarkdownView
          source={problem.content}
          solutionHighlights={getSystemDesignHighlights(problem.slug)}
          codeHighlightLegend="Key terms in this example"
        />
      </div>
      <RelatedPrepLinks />
    </article>
  );
}
