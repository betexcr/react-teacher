/** Public source repo (matches package.json). */
const GITHUB_REPO = 'https://github.com/betexcr/react-teacher';
const GITHUB_DEFAULT_BRANCH = 'main';
const GITHUB_TREE = `${GITHUB_REPO}/tree/${GITHUB_DEFAULT_BRANCH}`;

/** Folder of challenge write-ups in the repo. */
function githubChallengeTreeUrl(difficulty: string, slug: string) {
  return `${GITHUB_TREE}/challenges/${difficulty}/${slug}`;
}

/** Single file in a challenge folder (e.g. CHALLENGE.md). */
function githubChallengeBlobUrl(difficulty: string, slug: string, file: string) {
  return `${GITHUB_REPO}/blob/${GITHUB_DEFAULT_BRANCH}/challenges/${difficulty}/${slug}/${file}`;
}

const PATH_IN_BACKTICKS =
  /`(src\/practice|challenges)\/([a-z-]+)\/([0-9a-z-]+)(?:\/([A-Za-z0-9_.-]+))?`/g;

/**
 * Turn `src/practice/...` or `challenges/...` paths into GitHub links.
 * Local practice paths point at the matching challenges/ folder in the repo.
 */
function githubUrlForRepoPath(difficulty: string, slug: string, file?: string) {
  if (file) {
    return githubChallengeBlobUrl(difficulty, slug, file);
  }
  return githubChallengeTreeUrl(difficulty, slug);
}

export function linkifyRepoPathsInText(text: string): Array<string | { type: 'link'; href: string; label: string }> {
  const parts: Array<string | { type: 'link'; href: string; label: string }> = [];
  let last = 0;
  const re = new RegExp(PATH_IN_BACKTICKS.source, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, , difficulty, slug, file] = m;
    const label = m[0].slice(1, -1);
    parts.push({
      type: 'link',
      href: githubUrlForRepoPath(difficulty, slug, file),
      label,
    });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
