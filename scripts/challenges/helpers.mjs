export function titleFromUrl(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 'react.dev') return 'React Documentation';
    if (host === 'github.com') return 'GitHub';
    if (host === 'typescriptlang.org') return 'TypeScript Documentation';
    return host;
  } catch {
    return url;
  }
}

export function normalizeResource(r) {
  if (typeof r === 'object' && r !== null && 'url' in r) {
    const url = String(r.url);
    const title = r.title ? String(r.title) : titleFromUrl(url);
    return { title, url };
  }

  const s = String(r).trim();
  const md = s.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (md) return { title: md[1], url: md[2] };

  if (/^https?:\/\//i.test(s)) {
    return { title: titleFromUrl(s), url: s };
  }

  return { title: s, url: s };
}

export function challenge({
  slug,
  title,
  difficulty,
  topics,
  goals,
  description,
  requirements,
  starter,
  hints,
  acceptance,
  resources = [],
  solutionApproach,
  concepts,
  solution,
  walkthrough,
  mistakes,
  stretch = [],
  starterFile = null,
}) {
  const normalizedResources = (resources.length
    ? resources
    : [
        { title: 'React docs – Quick Start', url: 'https://react.dev/learn' },
        {
          title: `${topics[0] || 'Hooks'} – React Reference`,
          url: 'https://react.dev/reference/react',
        },
      ]
  ).map(normalizeResource);

  return {
    slug,
    title,
    difficulty,
    topics,
    goals,
    description,
    requirements,
    starter,
    hints,
    acceptance,
    resources: normalizedResources,
    solutionApproach,
    concepts,
    solution,
    walkthrough,
    mistakes,
    stretch,
    starterFile,
  };
}
