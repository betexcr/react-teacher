import type { ReactNode } from 'react';
import { SolutionCodeTerm } from '../components/SolutionCodeTerm';
import { findSolutionCodeMatches } from '../data/solutionCodeGlossary';

/** Wrap important solution-code tokens with hover tooltips. */
export function annotateSolutionCode(text: string, keyPrefix = 'sol'): ReactNode[] {
  const matches = findSolutionCodeMatches(text);
  if (matches.length === 0) return [text];

  const nodes: ReactNode[] = [];
  let last = 0;

  matches.forEach((match, i) => {
    if (match.start > last) {
      nodes.push(text.slice(last, match.start));
    }
    nodes.push(
      <SolutionCodeTerm key={`${keyPrefix}-${match.start}-${match.id}-${i}`} id={match.id}>
        {match.text}
      </SolutionCodeTerm>,
    );
    last = match.end;
  });

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes;
}
