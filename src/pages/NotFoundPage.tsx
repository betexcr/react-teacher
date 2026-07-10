import { Link } from 'react-router-dom';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';

export function NotFoundPage() {
  useRouteScrollTop();

  return (
    <article className="get-started">
      <h1 className="page-title">Page not found</h1>
      <p className="get-started-lead">
        That route does not exist. Use the sidebar or{' '}
        <Link to="/get-started">Get Started</Link> to find your way.
      </p>
    </article>
  );
}
