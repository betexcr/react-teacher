/** Build interview-style question + multi-paragraph explanation from a topic seed. */
export function interviewCard(question, ...paragraphs) {
  return {
    question,
    explanation: paragraphs.filter(Boolean).join('\n\n'),
  };
}

export function enrichCard(deckTitle, front, back) {
  const question = front.trim().endsWith('?')
    ? front.trim()
    : front.trim().endsWith('.')
      ? front.trim().slice(0, -1) + '?'
      : `What is ${front.trim()}?`;

  const core = back.trim();
  const applied = `In ${deckTitle} interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.`;
  const ecosystem = `React's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful.`;

  return interviewCard(question, core, applied, ecosystem);
}
