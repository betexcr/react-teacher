import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DifficultyBadge } from '../components/DifficultyBadge';
import challengeIndex from '../data/challenges-index.json';
import { isChallengeCompleted } from '../hooks/useChallengeProgress';
import {
  DIFFICULTY_LABELS,
  isDifficulty,
  type ChallengeMeta,
  type Difficulty,
} from '../lib/challenges';

type IndexedChallenge = ChallengeMeta & { difficulty: Difficulty };

export function ChallengesPage() {
  const { difficulty: difficultyParam } = useParams<{ difficulty?: string }>();
  const navigate = useNavigate();

  const filter: Difficulty | 'all' =
    difficultyParam && isDifficulty(difficultyParam) ? difficultyParam : 'all';

  useEffect(() => {
    if (difficultyParam && !isDifficulty(difficultyParam)) {
      navigate('/challenges', { replace: true });
    }
  }, [difficultyParam, navigate]);

  const items = useMemo(() => {
    const diffs = filter === 'all' ? (Object.keys(challengeIndex) as Difficulty[]) : [filter];
    return diffs.flatMap((d) =>
      (challengeIndex[d] as ChallengeMeta[]).map((c) => ({ ...c, difficulty: d }))
    ) as IndexedChallenge[];
  }, [filter]);

  const setFilter = (next: Difficulty | 'all') => {
    navigate(next === 'all' ? '/challenges' : `/challenges/${next}`);
  };

  const pageTitle =
    filter === 'all' ? 'React Challenges' : `${DIFFICULTY_LABELS[filter]} Challenges`;

  return (
    <>
      <h1 className="page-title">{pageTitle}</h1>
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
