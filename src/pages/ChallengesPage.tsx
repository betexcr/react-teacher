import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DifficultyBadge } from '../components/DifficultyBadge';
import challengeIndex from '../data/challenges-index.json';
import { isChallengeCompleted } from '../hooks/useChallengeProgress';
import { DIFFICULTY_LABELS, type ChallengeMeta, type Difficulty } from '../lib/challenges';

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
        {(Object.keys(DIFFICULTY_LABELS) as Difficulty[]).map((d) => (
          <button
            key={d}
            type="button"
            className={`challenge-filters__btn--${d} ${filter === d ? 'active' : ''}`}
            onClick={() => setFilter(d)}
          >
            {DIFFICULTY_LABELS[d]}
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
                  <DifficultyBadge difficulty={c.difficulty} />
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
