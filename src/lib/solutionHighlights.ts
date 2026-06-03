export type SolutionHighlight = {
  match: string;
  label: string;
  tip: string;
};

const HIGHLIGHTS_SECTION = /## Code highlights\n([\s\S]*?)(?=\n## |\n# |$)/;

/** Parse challenge-specific tooltips generated into SOLUTION.md. */
export function parseSolutionHighlights(markdown: string): SolutionHighlight[] {
  const section = markdown.match(HIGHLIGHTS_SECTION);
  if (!section) return [];

  const highlights: SolutionHighlight[] = [];
  for (const line of section[1].split('\n')) {
    if (!line.startsWith('- ')) continue;
    const m = line.match(/^- `((?:\\`|[^`])*)` — \*\*([^*]+)\*\* — (.+)$/);
    if (!m) continue;
    highlights.push({
      match: m[1].replace(/\\`/g, '`'),
      label: m[2].trim(),
      tip: m[3].trim(),
    });
  }

  return highlights.sort((a, b) => b.match.length - a.match.length);
}

/** Remove the highlights section so it is not shown as prose. */
export function stripSolutionHighlightsSection(markdown: string): string {
  return markdown.replace(HIGHLIGHTS_SECTION, '').replace(/\n{3,}/g, '\n\n').trim();
}

export function findChallengeHighlightMatches(
  code: string,
  highlights: SolutionHighlight[],
): { start: number; end: number; label: string; tip: string; text: string }[] {
  const matches: { start: number; end: number; label: string; tip: string; text: string }[] = [];

  for (const h of highlights) {
    let from = 0;
    while (from < code.length) {
      const idx = code.indexOf(h.match, from);
      if (idx === -1) break;
      matches.push({
        start: idx,
        end: idx + h.match.length,
        label: h.label,
        tip: h.tip,
        text: h.match,
      });
      from = idx + h.match.length;
    }
  }

  matches.sort((a, b) => a.start - b.start || b.end - a.end);

  const taken: typeof matches = [];
  let cursor = 0;
  for (const match of matches) {
    if (match.start < cursor) continue;
    taken.push(match);
    cursor = match.end;
  }

  return taken;
}
