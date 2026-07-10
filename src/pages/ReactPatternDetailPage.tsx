import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { JsonLd } from '../components/JsonLd';
import { MarkdownView } from '../components/MarkdownView';
import { RelatedPrepLinks } from '../components/RelatedPrepLinks';
import { getReactPatternHighlights } from '../data/react-patterns/codeHighlights';
import { getPatternBySlug } from '../data/react-patterns';
import { useReadTracking } from '../hooks/useReadTracking';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';

export function ReactPatternDetailPage() {
  useRouteScrollTop();
  const { slug } = useParams<{ slug: string }>();
  useReadTracking('react-pattern', slug);
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
      <JsonLd
        learningResource={{
          name: pattern.pageTitle,
          description: pattern.subtitle,
        }}
        breadcrumbs={[
          { name: 'React Patterns', path: '/react-patterns' },
          { name: pattern.title },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: 'React Patterns', path: '/react-patterns' },
          { name: pattern.title },
        ]}
      />
      <Link to="/react-patterns" className="sd-back-link">
        ← React Patterns
      </Link>
      <div className="system-design-prose">
        <MarkdownView
          source={pattern.content}
          solutionHighlights={getReactPatternHighlights(pattern.slug)}
          codeHighlightLegend="Key terms in this example"
        />
      </div>
      <RelatedPrepLinks
        links={[
          { href: '/flashcards/hooks', label: 'Hooks flashcards' },
          { href: '/flashcards/fundamentals', label: 'React fundamentals flashcards' },
          { href: '/system-design/state-store', label: 'State store system design' },
        ]}
      />
    </article>
  );
}
