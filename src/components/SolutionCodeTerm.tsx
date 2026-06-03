import { useId } from 'react';
import {
  SOLUTION_CODE_LABELS,
  SOLUTION_CODE_TIPS,
  type SolutionCodeTermId,
} from '../data/solutionCodeGlossary';

type SolutionCodeTermProps = {
  id: SolutionCodeTermId;
  children: string;
};

export function SolutionCodeTerm({ id, children }: SolutionCodeTermProps) {
  const tipId = useId();

  return (
    <span className="solution-code-term">
      <button
        type="button"
        className="solution-code-term-trigger"
        aria-describedby={tipId}
        aria-label={`${SOLUTION_CODE_LABELS[id]}: ${SOLUTION_CODE_TIPS[id]}`}
      >
        {children}
      </button>
      <span id={tipId} role="tooltip" className="solution-code-term-tip">
        <strong>{SOLUTION_CODE_LABELS[id]}</strong>
        <span>{SOLUTION_CODE_TIPS[id]}</span>
      </span>
    </span>
  );
}
