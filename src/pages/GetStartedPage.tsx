import { useRouteScrollTop } from '../hooks/useRouteScrollTop';
import { ProgressDashboard } from '../components/ProgressDashboard';
import { SiteSearch } from '../components/SiteSearch';
import { GetStartedBrowserSection } from './get-started/GetStartedBrowserSection';
import { GetStartedFooter } from './get-started/GetStartedFooter';
import { GetStartedHero } from './get-started/GetStartedHero';
import { GetStartedInterviewPathSection } from './get-started/GetStartedInterviewPathSection';
import { GetStartedLocalSetup } from './get-started/GetStartedLocalSetup';
import { GetStartedPathSection } from './get-started/GetStartedPathSection';

export function GetStartedPage() {
  useRouteScrollTop();

  return (
    <article className="get-started">
      <GetStartedHero />
      <SiteSearch />
      <ProgressDashboard />
      <GetStartedInterviewPathSection />
      <GetStartedPathSection />
      <GetStartedBrowserSection />
      <GetStartedLocalSetup />
      <GetStartedFooter />
    </article>
  );
}
