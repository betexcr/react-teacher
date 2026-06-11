import type { ReactNode } from 'react';

type Span = { start: number; end: number };

function mergeSpans(spans: Span[]): Span[] {
  if (spans.length === 0) return [];
  const sorted = spans.toSorted((a, b) => a.start - b.start || b.end - a.end);
  const merged: Span[] = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const prev = merged[merged.length - 1];
    const cur = sorted[i];
    if (cur.start <= prev.end) {
      prev.end = Math.max(prev.end, cur.end);
    } else {
      merged.push(cur);
    }
  }
  return merged;
}

/** Wrap matching phrases in <mark> for tutorial code highlights. */
export function highlightCodePhrases(
  code: string,
  phrases: string[] | undefined,
  markClassName = 'tutorial-code-mark',
): ReactNode {
  if (!phrases?.length) return code;

  const spans: Span[] = [];
  for (const phrase of phrases) {
    if (!phrase) continue;
    let from = 0;
    while (from < code.length) {
      const idx = code.indexOf(phrase, from);
      if (idx === -1) break;
      spans.push({ start: idx, end: idx + phrase.length });
      from = idx + phrase.length;
    }
  }

  const merged = mergeSpans(spans);
  if (merged.length === 0) return code;

  const nodes: ReactNode[] = [];
  let cursor = 0;
  merged.forEach((span, i) => {
    if (span.start > cursor) {
      nodes.push(code.slice(cursor, span.start));
    }
    nodes.push(
      <mark key={`h-${i}`} className={markClassName}>
        {code.slice(span.start, span.end)}
      </mark>,
    );
    cursor = span.end;
  });
  if (cursor < code.length) {
    nodes.push(code.slice(cursor));
  }
  return nodes;
}
