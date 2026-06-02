import type { ReactNode } from 'react';
import { ReactTerm } from '../components/ReactTerm';
import { findReactTermMatches } from '../data/reactTermGlossary';

/** Wrap React vocabulary in tooltip highlights for beginner-friendly contrast with plain JS. */
export function explainReactTerms(text: string, keyPrefix = 'rt'): ReactNode[] {
  const matches = findReactTermMatches(text);
  if (matches.length === 0) return [text];

  const nodes: ReactNode[] = [];
  let last = 0;

  matches.forEach((match, i) => {
    if (match.start > last) {
      nodes.push(text.slice(last, match.start));
    }
    nodes.push(
      <ReactTerm key={`${keyPrefix}-${match.start}-${match.id}-${i}`} id={match.id}>
        {match.text}
      </ReactTerm>,
    );
    last = match.end;
  });

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes;
}
