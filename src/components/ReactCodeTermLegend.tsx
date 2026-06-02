import { collectReactTermIds, REACT_TERM_LABELS } from '../data/reactTermGlossary';
import { ReactTerm } from './ReactTerm';

type ReactCodeTermLegendProps = {
  code: string;
};

/** Lists React terms found in a code sample with the same tooltips as prose. */
export function ReactCodeTermLegend({ code }: ReactCodeTermLegendProps) {
  const ids = collectReactTermIds(code);
  if (ids.length === 0) return null;

  return (
    <div className="react-code-terms" aria-label="React terms in this example">
      <span className="react-code-terms-label">React in this snippet:</span>
      <ul className="react-code-terms-list">
        {ids.map((id) => (
          <li key={id}>
            <ReactTerm id={id}>{REACT_TERM_LABELS[id]}</ReactTerm>
          </li>
        ))}
      </ul>
    </div>
  );
}
