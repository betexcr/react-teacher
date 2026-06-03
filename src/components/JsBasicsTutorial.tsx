import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';
import { JS_BASICS_TOPIC_COUNT } from '../data/jsBasicsTopics';
import {
  jsBasicsTutorialSteps,
  tutorialTargetId,
  type JsBasicsTutorialStep,
} from '../data/jsBasicsTutorialSteps';
import { useMainScrollRef } from '../context/MainScrollContext';
import { formatJsBasicsProse } from '../utils/formatJsBasicsProse';

type SpotlightRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type JsBasicsTutorialProps = {
  open: boolean;
  onClose: () => void;
  onActiveStepChange: (step: JsBasicsTutorialStep, index: number) => void;
};

const TOTAL = jsBasicsTutorialSteps.length;

export function JsBasicsTutorial({ open, onClose, onActiveStepChange }: JsBasicsTutorialProps) {
  const mainRef = useMainScrollRef();
  const [stepIndex, setStepIndex] = useState(0);
  const [spotlight, setSpotlight] = useState<SpotlightRect | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  const step = jsBasicsTutorialSteps[stepIndex];

  useEffect(() => {
    if (open && !wasOpen.current) {
      setStepIndex(0);
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    onActiveStepChange(step, stepIndex);
  }, [open, step, stepIndex, onActiveStepChange]);

  const measureSpotlight = useCallback(() => {
    const id = tutorialTargetId(step);
    const el = document.querySelector(`[data-tutorial-target="${id}"]`);
    if (!el) {
      setSpotlight(null);
      return;
    }
    const pad = 10;
    const r = el.getBoundingClientRect();
    setSpotlight({
      top: Math.max(8, r.top - pad),
      left: Math.max(8, r.left - pad),
      width: r.width + pad * 2,
      height: r.height + pad * 2,
    });
  }, [step]);

  useLayoutEffect(() => {
    if (!open) return;

    const id = tutorialTargetId(step);
    const el = document.querySelector(`[data-tutorial-target="${id}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

    measureSpotlight();
    const t1 = window.setTimeout(measureSpotlight, 120);
    const t2 = window.setTimeout(measureSpotlight, 450);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [open, stepIndex, step, measureSpotlight]);

  useEffect(() => {
    if (!open) return;

    const onResize = () => measureSpotlight();
    window.addEventListener('resize', onResize);
    const scroller = mainRef?.current;
    scroller?.addEventListener('scroll', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      scroller?.removeEventListener('scroll', onResize);
    };
  }, [open, measureSpotlight, mainRef]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (stepIndex < TOTAL - 1) {
          e.preventDefault();
          setStepIndex((i) => i + 1);
        }
        return;
      }
      if (e.key === 'ArrowLeft') {
        if (stepIndex > 0) {
          e.preventDefault();
          setStepIndex((i) => i - 1);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, stepIndex, onClose]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('js-basics-tutorial-open');
    return () => document.body.classList.remove('js-basics-tutorial-open');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
  }, [open, stepIndex]);

  const goNext = () => {
    if (stepIndex < TOTAL - 1) setStepIndex((i) => i + 1);
    else onClose();
  };

  const goPrev = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  if (!open) return null;

  const spotlightStyle: CSSProperties | undefined = spotlight
    ? {
        top: spotlight.top,
        left: spotlight.left,
        width: spotlight.width,
        height: spotlight.height,
      }
    : undefined;

  const topicLabel =
    step.topicIndex != null
      ? `Lesson ${step.topicIndex + 1} of ${JS_BASICS_TOPIC_COUNT}`
      : step.focus === 'welcome'
        ? 'Intro'
        : 'Done';

  return createPortal(
    <div className="js-basics-tutorial-root" aria-hidden={false}>
      <div
        className="js-basics-tutorial-backdrop"
        onClick={onClose}
        aria-hidden
      />

      {spotlight && (
        <div
          className="js-basics-tutorial-spotlight"
          style={spotlightStyle}
          aria-hidden
        />
      )}

      <div
        ref={dialogRef}
        className="js-basics-tutorial-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="js-basics-tutorial-title"
        aria-describedby="js-basics-tutorial-body"
        tabIndex={-1}
      >
        <div className="js-basics-tutorial-progress" aria-hidden>
          <div
            className="js-basics-tutorial-progress-fill"
            style={{ width: `${((stepIndex + 1) / TOTAL) * 100}%` }}
          />
        </div>

        <p className="js-basics-tutorial-step-label">
          Step {stepIndex + 1} of {TOTAL} · {topicLabel}
        </p>

        <h2 id="js-basics-tutorial-title" className="js-basics-tutorial-title">
          {step.title}
        </h2>

        <p id="js-basics-tutorial-body" className="js-basics-tutorial-body">
          {formatJsBasicsProse(step.body, `tutorial-${step.id}`)}
        </p>

        {step.tip && (
          <p className="js-basics-tutorial-tip">
            <span className="js-basics-tutorial-tip-label">Tip</span>
            {formatJsBasicsProse(step.tip, `tutorial-tip-${step.id}`)}
          </p>
        )}

        <div className="js-basics-tutorial-actions">
          <button
            type="button"
            className="js-basics-tutorial-btn js-basics-tutorial-btn--ghost"
            onClick={onClose}
          >
            Exit
          </button>
          <div className="js-basics-tutorial-actions-main">
            <button
              type="button"
              className="js-basics-tutorial-btn js-basics-tutorial-btn--ghost"
              onClick={goPrev}
              disabled={stepIndex === 0}
            >
              Back
            </button>
            <button
              type="button"
              className="js-basics-tutorial-btn js-basics-tutorial-btn--primary"
              onClick={goNext}
            >
              {stepIndex < TOTAL - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>

        <p className="js-basics-tutorial-hint">
          Arrow keys · Enter for next · Esc to exit
        </p>
      </div>
    </div>,
    document.body,
  );
}
