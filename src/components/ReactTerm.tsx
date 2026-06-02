import { useId } from 'react';
import {
  REACT_TERM_LABELS,
  REACT_TERM_TIPS,
  type ReactTermId,
} from '../data/reactTermGlossary';

type ReactTermProps = {
  id: ReactTermId;
  /** Matched text from source (e.g. setCount, JSX). */
  children: string;
};

export function ReactTerm({ id, children }: ReactTermProps) {
  const tipId = useId();

  return (
    <span className="react-term">
      <button
        type="button"
        className="react-term-trigger"
        aria-describedby={tipId}
        aria-label={`${REACT_TERM_LABELS[id]}: ${REACT_TERM_TIPS[id]}`}
      >
        {children}
      </button>
      <span id={tipId} role="tooltip" className="react-term-tip">
        <strong>{REACT_TERM_LABELS[id]}</strong>
        <span>{REACT_TERM_TIPS[id]}</span>
      </span>
    </span>
  );
}
