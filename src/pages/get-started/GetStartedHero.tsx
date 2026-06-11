import { Link } from 'react-router-dom';

export function GetStartedHero() {
  return (
    <header className="get-started-hero">
      <h1 className="page-title">Get Started</h1>
      <p className="get-started-lead">
        <strong>ReactTeacher</strong> is React interview prep you can start immediately — challenges,
        flashcards, React patterns, and system design walkthroughs, no install required. Your progress saves in this
        browser; no account needed.
      </p>
      <p className="get-started-lead get-started-lead--secondary">
        New to React or JavaScript? Skim <Link to="/js-basics">JS Basics</Link> first, then try the{' '}
        <Link to="/challenges">easy challenges</Link>. To write code locally, set up a project on your
        machine — flashcards and system design work fully here without that step.
      </p>
    </header>
  );
}
