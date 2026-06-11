import { useRouteScrollTop } from '../hooks/useRouteScrollTop';
import { GetStartedBrowserSection } from './get-started/GetStartedBrowserSection';
import { GetStartedFooter } from './get-started/GetStartedFooter';
import { GetStartedHero } from './get-started/GetStartedHero';
import { GetStartedLocalSetup } from './get-started/GetStartedLocalSetup';
import { GetStartedPathSection } from './get-started/GetStartedPathSection';

export function GetStartedPage() {
  useRouteScrollTop();

  return (
    <article className="get-started">
      <GetStartedHero />
      <GetStartedPathSection />
      <GetStartedBrowserSection />
      <GetStartedLocalSetup />
      <GetStartedFooter />
    </article>
  );
}
