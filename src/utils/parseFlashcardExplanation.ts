export type ExplanationBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'code'; code: string };

/** Split flashcard explanation text into prose paragraphs and fenced code blocks. */
export function parseFlashcardExplanation(text: string): ExplanationBlock[] {
  const blocks: ExplanationBlock[] = [];
  const parts = text.split(/\n\n+/).filter((p) => p.trim());

  for (const part of parts) {
    const trimmed = part.trim();
    const fence = trimmed.match(/^```(?:\w+)?\n?([\s\S]*?)```$/);
    if (fence) {
      blocks.push({ type: 'code', code: fence[1].trimEnd() });
      continue;
    }
    blocks.push({ type: 'paragraph', text: trimmed });
  }

  return blocks;
}
