import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import challengeIndex from '../data/challenges-index.json';
import { isChallengeCompleted } from '../hooks/useChallengeProgress';
import type { ChallengeMeta, Difficulty } from '../lib/challenges';

const labels: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  'very-hard': 'Very Hard',
};

type IndexedChallenge = ChallengeMeta & { difficulty: Difficulty };

export function ChallengesPage() {
  const [filter, setFilter] = useState<Difficulty | 'all'>('all');

  const items = useMemo(() => {
    const diffs = filter === 'all' ? (Object.keys(challengeIndex) as Difficulty[]) : [filter];
    return diffs.flatMap((d) =>
      (challengeIndex[d] as ChallengeMeta[]).map((c) => ({ ...c, difficulty: d }))
    ) as IndexedChallenge[];
  }, [filter]);

  return (
    <>
      <h1 className="page-title">React Challenges</h1>
      <p className="challenge-list-lead">
        {items.length} hands-on challenges with interactive acceptance checklists and solution
        write-ups.
      </p>
      <div className="challenge-filters">
        <button type="button" className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          All
        </button>
        {(Object.keys(labels) as Difficulty[]).map((d) => (
          <button
            key={d}
            type="button"
            className={filter === d ? 'active' : ''}
            onClick={() => setFilter(d)}
          >
            {labels[d]}
          </button>
        ))}
      </div>
      <ul className="challenge-list">
        {items.map((c) => {
          const completed = isChallengeCompleted(c.difficulty, c.slug, c.acceptance.length);
          return (
            <li key={`${c.difficulty}-${c.slug}`}>
              <Link to={`/challenges/${c.difficulty}/${c.slug}`} className="challenge-list-card">
                <div className="challenge-list-card-top">
                  <span className="difficulty-tag">{labels[c.difficulty]}</span>
                  {completed && (
                    <span className="challenge-completed-badge challenge-completed-badge--small">
                      Completed
                    </span>
                  )}
                </div>
                <div className="challenge-list-card-title">{c.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
