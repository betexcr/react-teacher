export type ExplanationBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'code'; code: string };

const FENCE_RE = /```(?:\w+)?\n([\s\S]*?)```/g;

function pushParagraphs(blocks: ExplanationBlock[], text: string) {
  for (const para of text.split(/\n\n+/).filter((p) => p.trim())) {
    blocks.push({ type: 'paragraph', text: para.trim() });
  }
}

/** Split flashcard explanation text into prose paragraphs and fenced code blocks. */
export function parseFlashcardExplanation(text: string): ExplanationBlock[] {
  const blocks: ExplanationBlock[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(FENCE_RE)) {
    const index = match.index ?? 0;
    pushParagraphs(blocks, text.slice(lastIndex, index));
    blocks.push({ type: 'code', code: match[1].trimEnd() });
    lastIndex = index + match[0].length;
  }

  pushParagraphs(blocks, text.slice(lastIndex));
  return blocks;
}
