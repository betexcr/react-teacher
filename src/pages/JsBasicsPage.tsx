import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '../components/CodeBlock';
import { JsBasicsTutorial } from '../components/JsBasicsTutorial';
import { ReactCodeTermLegend } from '../components/ReactCodeTermLegend';
import {
  jsBasicsOptionalTopics,
  jsBasicsTopics,
  type JsBasicsTopic,
} from '../data/jsBasicsTopics';
import {
  jsBasicsTutorialSteps,
  tutorialTargetId,
} from '../data/jsBasicsTutorialSteps';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';
import { formatJsBasicsProse } from '../utils/formatJsBasicsProse';

type TopicListProps = {
  topics: readonly JsBasicsTopic[];
  startNumber: number;
  idPrefix: string;
  activeTargetId: string | null;
  activeTopicIndex: number | undefined;
  codeHighlights: string[] | undefined;
};

function JsBasicsTopicList({
  topics,
  startNumber,
  idPrefix,
  activeTargetId,
  activeTopicIndex,
  codeHighlights,
}: TopicListProps) {
  return (
    <ol className="js-basics-list">
      {topics.map((topic, i) => {
        const topicTarget = `${idPrefix}-topic-${i}`;
        const isTopicActive =
          activeTargetId === topicTarget ||
          activeTargetId?.startsWith(`${idPrefix}-topic-${i}-`);

        return (
          <li
            key={topic.title}
            className={`js-basics-item${isTopicActive ? ' js-basics-item--tutorial-active' : ''}`}
            data-tutorial-target={topicTarget}
          >
            <h2 className="js-basics-item-title">
              <span className="js-basics-num">{startNumber + i}</span>
              {topic.title}
            </h2>
            {topic.explanation.map((paragraph, pi) => {
              const proseTarget = `${idPrefix}-topic-${i}-prose-${pi}`;
              const isProseActive = activeTargetId === proseTarget;
              return (
                <p
                  key={pi}
                  className={`js-basics-why${isProseActive ? ' js-basics-why--tutorial-active' : ''}`}
                  data-tutorial-target={proseTarget}
                >
                  {formatJsBasicsProse(paragraph, `${idPrefix}-${topic.title}-${pi}`)}
                </p>
              );
            })}
            <div data-tutorial-target={`${idPrefix}-topic-${i}-code`}>
              <CodeBlock
                code={topic.code}
                highlightPhrases={activeTopicIndex === i ? codeHighlights : undefined}
              />
            </div>
            <div data-tutorial-target={`${idPrefix}-topic-${i}-legend`}>
              <ReactCodeTermLegend code={topic.code} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function JsBasicsPage() {
  useRouteScrollTop();
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [tutorialStepIndex, setTutorialStepIndex] = useState(0);

  const activeStep = tutorialOpen ? jsBasicsTutorialSteps[tutorialStepIndex] : null;
  const activeTargetId = activeStep ? tutorialTargetId(activeStep) : null;
  const codeHighlights = activeStep?.codeHighlights;
  const activeTopicIndex = activeStep?.topicIndex;

  const openTutorial = () => {
    document.body.classList.add('js-basics-tutorial-open');
    setTutorialStepIndex(0);
    setTutorialOpen(true);
  };

  const closeTutorial = () => {
    document.body.classList.remove('js-basics-tutorial-open');
    setTutorialOpen(false);
  };

  return (
    <article className="get-started js-basics">
      <header
        className="get-started-hero"
        data-tutorial-target="js-basics-welcome"
      >
        <h1 className="page-title">JS Basics</h1>
        <p className="get-started-lead">
          Start at the top if you have <strong>never written JavaScript</strong> — data types,{' '}
          <code>&lt;</code> and <code>&lt;=</code>, <code>if</code>, <code>for</code>/<code>while</code>, arrays,
          then the pieces React uses every day. Terms highlighted in{' '}
          <span className="react-term-inline-sample">purple</span> are React-specific (hover for plain-JS
          comparisons). Inline <code>code</code> in the text matches the examples below.
        </p>
        <div className="js-basics-hero-actions">
          <button
            type="button"
            className="js-basics-tutorial-launch"
            onClick={openTutorial}
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

      <JsBasicsTopicList
        topics={jsBasicsTopics}
        startNumber={1}
        idPrefix="js-basics"
        activeTargetId={activeTargetId}
        activeTopicIndex={activeTopicIndex}
        codeHighlights={codeHighlights}
      />

      <section
        className="get-started-section js-basics-skip"
        data-tutorial-target="js-basics-finish"
      >
        <h2>What you can skip for now</h2>
        <p className="get-started-section-intro">
          The topics below are <strong>not required</strong> for easy React challenges. Learn{' '}
          {formatJsBasicsProse('React', 'skip-react')} patterns in the list above first — then come back here
          when you want more JavaScript depth.
        </p>
      </section>

      <section className="js-basics-optional">
        <h2 className="js-basics-optional-heading">Optional depth</h2>
        <p className="js-basics-optional-intro">
          Classes, prototypes, <code>this</code>, generators, and TypeScript generics — explained simply if
          you choose to study them now.
        </p>
        <JsBasicsTopicList
          topics={jsBasicsOptionalTopics}
          startNumber={jsBasicsTopics.length + 1}
          idPrefix="js-basics-opt"
          activeTargetId={activeTargetId}
          activeTopicIndex={undefined}
          codeHighlights={undefined}
        />
      </section>

      <section className="get-started-section get-started-section--compact">
        <p className="get-started-path-cta">
          Ready? <Link to="/challenges">Start with easy challenges</Link> or read{' '}
          <Link to="/get-started">Get Started</Link> for local setup.
        </p>
      </section>

      <JsBasicsTutorial
        open={tutorialOpen}
        stepIndex={tutorialStepIndex}
        setStepIndex={setTutorialStepIndex}
        onClose={closeTutorial}
      />
    </article>
  );
}
