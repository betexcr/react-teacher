import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '../components/CodeBlock';
import { JsBasicsTutorial } from '../components/JsBasicsTutorial';
import { ReactCodeTermLegend } from '../components/ReactCodeTermLegend';
import { jsBasicsTopics } from '../data/jsBasicsTopics';
import {
  tutorialTargetId,
  type JsBasicsTutorialStep,
} from '../data/jsBasicsTutorialSteps';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';
import { formatJsBasicsProse } from '../utils/formatJsBasicsProse';

export function JsBasicsPage() {
  useRouteScrollTop();
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [activeTutorial, setActiveTutorial] = useState<{
    step: JsBasicsTutorialStep;
    index: number;
  } | null>(null);

  const handleActiveStepChange = useCallback((step: JsBasicsTutorialStep, index: number) => {
    setActiveTutorial({ step, index });
  }, []);

  const activeTargetId = activeTutorial ? tutorialTargetId(activeTutorial.step) : null;
  const codeHighlights = activeTutorial?.step.codeHighlights;

  return (
    <article className="get-started js-basics">
      <header
        className="get-started-hero"
        data-tutorial-target="js-basics-welcome"
      >
        <h1 className="page-title">JS Basics</h1>
        <p className="get-started-lead">
          The minimum JavaScript you need before the <strong>easy</strong> React challenges. Terms
          highlighted in <span className="react-term-inline-sample">purple</span> are React-specific —
          hover or focus them to see how they differ from plain JavaScript. Inline{' '}
          <code>code</code> snippets use the same styling as the examples below.
        </p>
        <div className="js-basics-hero-actions">
          <button
            type="button"
            className="js-basics-tutorial-launch"
            onClick={() => setTutorialOpen(true)}
          >
            <span className="js-basics-tutorial-launch-icon" aria-hidden>
              ▶
            </span>
            Start guided tutorial
          </button>
          <p className="get-started-path-cta js-basics-hero-cta">
            <Link to="/challenges">Browse easy challenges →</Link>
          </p>
        </div>
      </header>

      <ol className="js-basics-list">
        {jsBasicsTopics.map((topic, i) => {
          const topicTarget = `js-basics-topic-${i}`;
          const isTopicActive =
            activeTargetId === topicTarget ||
            activeTargetId?.startsWith(`js-basics-topic-${i}-`);

          return (
            <li
              key={topic.title}
              className={`js-basics-item${isTopicActive ? ' js-basics-item--tutorial-active' : ''}`}
              data-tutorial-target={topicTarget}
            >
              <h2 className="js-basics-item-title">
                <span className="js-basics-num">{i + 1}</span>
                {topic.title}
              </h2>
              {topic.explanation.map((paragraph, pi) => {
                const proseTarget = `js-basics-topic-${i}-prose-${pi}`;
                const isProseActive = activeTargetId === proseTarget;
                return (
                  <p
                    key={pi}
                    className={`js-basics-why${isProseActive ? ' js-basics-why--tutorial-active' : ''}`}
                    data-tutorial-target={proseTarget}
                  >
                    {formatJsBasicsProse(paragraph, `${topic.title}-${pi}`)}
                  </p>
                );
              })}
              <div data-tutorial-target={`js-basics-topic-${i}-code`}>
                <CodeBlock
                  code={topic.code}
                  highlightPhrases={
                    activeTutorial?.step.topicIndex === i ? codeHighlights : undefined
                  }
                />
              </div>
              <div data-tutorial-target={`js-basics-topic-${i}-legend`}>
                <ReactCodeTermLegend code={topic.code} />
              </div>
            </li>
          );
        })}
      </ol>

      <section
        className="get-started-section get-started-section--compact"
        data-tutorial-target="js-basics-finish"
      >
        <h2>What you can skip for now</h2>
        <p className="get-started-section-intro">
          Classes, prototypes, <code>this</code>, generators, and deep TypeScript generics — not required for
          easy challenges. Learn {formatJsBasicsProse('React', 'skip-react')} patterns first; add depth later.
        </p>
        <p className="get-started-path-cta">
          Ready? <Link to="/challenges">Start with easy challenges</Link> or read{' '}
          <Link to="/get-started">Get Started</Link> for local setup.
        </p>
      </section>

      <JsBasicsTutorial
        open={tutorialOpen}
        onClose={() => {
          setTutorialOpen(false);
          setActiveTutorial(null);
        }}
        onActiveStepChange={handleActiveStepChange}
      />
    </article>
  );
}
