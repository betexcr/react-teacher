import { useCallback, useEffect, useState } from 'react';

export type ChallengeProgress = {
  checked: number[];
  completed: boolean;
};

// Key prefix kept as reactprep-* so existing localStorage progress is preserved after rebrand.
const storageKey = (difficulty: string, slug: string) =>
  `reactprep-challenge:${difficulty}/${slug}`;

export function readChallengeProgress(
  difficulty: string,
  slug: string
): ChallengeProgress {
  try {
    const raw = localStorage.getItem(storageKey(difficulty, slug));
    if (!raw) return { checked: [], completed: false };
    const parsed = JSON.parse(raw) as ChallengeProgress;
    return {
      checked: Array.isArray(parsed.checked) ? parsed.checked : [],
      completed: Boolean(parsed.completed),
    };
  } catch {
    return { checked: [], completed: false };
  }
}

export function isChallengeCompleted(
  difficulty: string,
  slug: string,
  acceptanceCount: number
): boolean {
  if (acceptanceCount === 0) return false;
  const { checked, completed } = readChallengeProgress(difficulty, slug);
  return completed || checked.length >= acceptanceCount;
}

export function useChallengeProgress(
  difficulty: string | undefined,
  slug: string | undefined,
  acceptanceCount: number
) {
  const [progress, setProgress] = useState<ChallengeProgress>(() =>
    difficulty && slug
      ? readChallengeProgress(difficulty, slug)
      : { checked: [], completed: false }
  );

  useEffect(() => {
    if (difficulty && slug) {
      setProgress(readChallengeProgress(difficulty, slug));
    }
  }, [difficulty, slug]);

  const toggleCriterion = useCallback(
    (index: number) => {
      if (!difficulty || !slug) return;
      setProgress((prev) => {
        const has = prev.checked.includes(index);
        const checked = has
          ? prev.checked.filter((i) => i !== index)
          : [...prev.checked, index].sort((a, b) => a - b);
        const completed =
          acceptanceCount > 0 && checked.length >= acceptanceCount;
        const next = { checked, completed };
        localStorage.setItem(storageKey(difficulty, slug), JSON.stringify(next));
        return next;
      });
    },
    [difficulty, slug, acceptanceCount]
  );

  const isChecked = useCallback(
    (index: number) => progress.checked.includes(index),
    [progress.checked]
  );

  return {
    progress,
    toggleCriterion,
    isChecked,
    isComplete:
      acceptanceCount > 0 &&
      (progress.completed || progress.checked.length >= acceptanceCount),
  };
}
