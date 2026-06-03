import { collectSolutionCodeTermIds, SOLUTION_CODE_LABELS } from '../data/solutionCodeGlossary';
import { SolutionCodeTerm } from './SolutionCodeTerm';

type SolutionCodeLegendProps = {
  code: string;
};

export function SolutionCodeLegend({ code }: SolutionCodeLegendProps) {
  const ids = collectSolutionCodeTermIds(code);
  if (ids.length === 0) return null;

  return (
    <div className="solution-code-terms">
      <span className="solution-code-terms-label">In this solution</span>
      <ul className="solution-code-terms-list">
        {ids.map((id) => (
          <li key={id}>
            <SolutionCodeTerm id={id}>{SOLUTION_CODE_LABELS[id]}</SolutionCodeTerm>
          </li>
        ))}
      </ul>
    </div>
  );
}
