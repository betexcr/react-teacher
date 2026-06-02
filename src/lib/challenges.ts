import index from '../data/challenges-index.json'

export type Difficulty = 'easy' | 'medium' | 'hard' | 'very-hard'

export type ChallengeResource = {
  title: string
  url: string
}

export type AcceptanceCriterion = {
  summary: string
  detail: string
}

export type ChallengeMeta = {
  slug: string
  title: string
  acceptance: AcceptanceCriterion[]
  resources: ChallengeResource[]
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  'very-hard': 'Very Hard',
}

export const DIFFICULTIES: { id: Difficulty; label: string; count: number }[] = [
  { id: 'easy', label: 'Easy', count: index.easy.length },
  { id: 'medium', label: 'Medium', count: index.medium.length },
  { id: 'hard', label: 'Hard', count: index.hard.length },
  { id: 'very-hard', label: 'Very Hard', count: index['very-hard'].length },
]

export const challengeIndex = index as Record<Difficulty, ChallengeMeta[]>

const challengeModules = import.meta.glob('../../challenges/**/CHALLENGE.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const solutionModules = import.meta.glob('../../challenges/**/SOLUTION.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function pathKey(difficulty: Difficulty, slug: string, file: 'CHALLENGE' | 'SOLUTION') {
  return `../../challenges/${difficulty}/${slug}/${file}.md`
}

export function getChallengeMarkdown(difficulty: Difficulty, slug: string) {
  return challengeModules[pathKey(difficulty, slug, 'CHALLENGE')] ?? ''
}

export function getSolutionMarkdown(difficulty: Difficulty, slug: string) {
  return solutionModules[pathKey(difficulty, slug, 'SOLUTION')] ?? ''
}

export function findChallenge(difficulty: Difficulty, slug: string) {
  return challengeIndex[difficulty]?.find((c) => c.slug === slug)
}

export function totalChallenges() {
  return DIFFICULTIES.reduce((n, d) => n + d.count, 0)
}
