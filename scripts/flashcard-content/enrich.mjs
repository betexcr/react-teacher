import { getCodeExample, ensureSnippetImports, isMostlyCode, splitBackIntoProseAndCode } from './code-examples.mjs';
import { getCardExtras } from './card-extras/index.mjs';

/** Build interview-style question + multi-paragraph explanation from a topic seed. */
export function interviewCard(question, ...paragraphs) {
  return {
    question,
    explanation: paragraphs.filter(Boolean).join('\n\n'),
  };
}

/** Fenced TSX block with imports inferred for study UI. */
export function codeFence(code) {
  return '```tsx\n' + ensureSnippetImports(code) + '\n```';
}

function formatCodeBlock(code) {
  return '```tsx\n' + code.trim() + '\n```';
}

export function enrichCard(deckTitle, deckId, front, back, cardFields = {}) {
  const question = front.trim().endsWith('?')
    ? front.trim()
    : front.trim().endsWith('.')
      ? front.trim().slice(0, -1) + '?'
      : `What is ${front.trim()}?`;

  const extras = { ...getCardExtras(deckId, front), ...cardFields };
  const codeRaw =
    extras.code ??
    cardFields.code ??
    getCodeExample(deckId, front, back);
  const code = codeRaw ? ensureSnippetImports(codeRaw) : null;

  const { prose: splitProse } = splitBackIntoProseAndCode(back);
  let core = back.trim();
  if (code) {
    if (splitProse) {
      core = splitProse.trim();
    } else if (isMostlyCode(back)) {
      core = null;
    }
  }

  const detail = extras.detail?.trim() || null;
  const parts = [core, code ? formatCodeBlock(code) : null, detail].filter(Boolean);

  return interviewCard(question, ...parts);
}
