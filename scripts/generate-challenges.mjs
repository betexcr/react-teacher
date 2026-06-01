import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { challenges } from './challenges/index.mjs';
import { normalizeResource } from './challenges/helpers.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'challenges');

function mdChallenge(c) {
  return `# ${c.title}

**Difficulty:** ${c.difficulty}  
**Topics:** ${c.topics.join(', ')}

## Learning goals

${c.goals.map((g) => `- ${g}`).join('\n')}

## Challenge

${c.description}

## Requirements

${c.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

## Starter hint

Create your work in \`src/challenges/${c.difficulty}/${c.slug}/\` or a sandbox file of your choice.

\`\`\`tsx
${c.starter.trim()}
\`\`\`

## Hints

${c.hints.map((h, i) => `${i + 1}. ${h}`).join('\n')}

## Acceptance criteria

${c.acceptance.map((a) => `- [ ] ${a}`).join('\n')}

## Resources

${c.resources.map((r) => `- [${r.title}](${r.url})`).join('\n')}
`;
}

function mdSolution(c) {
  return `# Solution: ${c.title}

## Approach

${c.solutionApproach}

## Key concepts

${c.concepts.map((x) => `- **${x.term}**: ${x.detail}`).join('\n')}

## Solution code

\`\`\`tsx
${c.solution.trim()}
\`\`\`

## Walkthrough

${c.walkthrough}

## Common mistakes

${c.mistakes.map((m) => `- ${m}`).join('\n')}

## Stretch goals

${c.stretch.map((s) => `- ${s}`).join('\n')}
`;
}

for (const c of challenges) {
  const dir = path.join(root, c.difficulty, c.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'CHALLENGE.md'), mdChallenge(c));
  fs.writeFileSync(path.join(dir, 'SOLUTION.md'), mdSolution(c));
  if (c.starterFile) {
    fs.writeFileSync(path.join(dir, 'starter.tsx'), c.starterFile.trim() + '\n');
  }
}

const index = challenges.reduce(
  (acc, c) => {
    if (!acc[c.difficulty]) acc[c.difficulty] = [];
    acc[c.difficulty].push({
      slug: c.slug,
      title: c.title,
      acceptance: c.acceptance,
      resources: c.resources.map(normalizeResource),
    });
    return acc;
  },
  {}
);

fs.writeFileSync(
  path.join(root, 'INDEX.json'),
  JSON.stringify(index, null, 2)
);

const srcDataDir = path.join(__dirname, '..', 'src', 'data');
fs.mkdirSync(srcDataDir, { recursive: true });
fs.writeFileSync(
  path.join(srcDataDir, 'challenges-index.json'),
  JSON.stringify(index, null, 2)
);

console.log(`Generated ${challenges.length} challenges.`);
