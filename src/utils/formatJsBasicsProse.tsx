import type { ReactNode } from 'react';
import { explainReactTerms } from './explainReactTerms';

/** Renders JS Basics prose: `backticks` → inline code, React terms → tooltips. */
export function formatJsBasicsProse(text: string, keyPrefix = 'p'): ReactNode[] {
  const parts = text.split('`');
  if (parts.length === 1) {
    return explainReactTerms(text, keyPrefix);
  }

  const nodes: ReactNode[] = [];
  let codeIndex = 0;
  let proseIndex = 0;

  parts.forEach((part, i) => {
    if (!part) return;

    if (i % 2 === 1) {
      nodes.push(<code key={`${keyPrefix}-code-${codeIndex++}`}>{part}</code>);
      return;
    }

    nodes.push(...explainReactTerms(part, `${keyPrefix}-prose-${proseIndex++}`));
  });

  return nodes.length > 0 ? nodes : [text];
}
