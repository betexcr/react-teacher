import type { SolutionHighlight } from '../lib/solutionHighlights';
import { SolutionCodeTerm } from './SolutionCodeTerm';

type SolutionCodeLegendProps = {
  code: string;
  highlights: SolutionHighlight[];
  /** Legend heading above term chips. */
  legendLabel?: string;
};

export function SolutionCodeLegend({
  code,
  highlights,
  legendLabel = 'In this solution',
}: SolutionCodeLegendProps) {
  const unique = new Map<string, SolutionHighlight>();
  for (const h of highlights) {
    if (!code.includes(h.match)) continue;
    if (!unique.has(h.label)) unique.set(h.label, h);
  }
  const items = [...unique.values()];
  if (items.length === 0) return null;

  return (
    <div className="solution-code-terms">
      <span className="solution-code-terms-label">{legendLabel}</span>
      <ul className="solution-code-terms-list">
        {items.map((h) => (
          <li key={h.label}>
            <SolutionCodeTerm label={h.label} tip={h.tip}>
              {h.label}
            </SolutionCodeTerm>
          </li>
        ))}
      </ul>
    </div>
  );
}
