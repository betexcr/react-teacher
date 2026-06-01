import { useMemo, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import { AcceptanceChecklist } from './AcceptanceChecklist'
import {
  DIFFICULTIES,
  type Difficulty,
  challengeIndex,
  findChallenge,
  getChallengeMarkdown,
  getSolutionMarkdown,
  totalChallenges,
} from '../lib/challenges'
import { useChallengeProgress, isChallengeCompleted } from '../hooks/useChallengeProgress'
import { stripInteractiveSections } from '../lib/challengeBody'
import { MarkdownView } from './MarkdownView'
import { ResourceList } from './ResourceList'

function HomePage() {
  return (
    <section className="home">
      <h1>ReactTeacher</h1>
      <p className="lead">
        {totalChallenges()} hands-on challenges from hooks and state to context, performance, and
        advanced patterns. Each challenge has a brief, starter hints, and a separate solution write-up.
      </p>
      <div className="difficulty-grid">
        {DIFFICULTIES.map((d) => (
          <Link key={d.id} to={`/${d.id}`} className={`difficulty-card difficulty-card--${d.id}`}>
            <span className="difficulty-card__label">{d.label}</span>
            <span className="difficulty-card__count">{d.count} challenges</span>
          </Link>
        ))}
      </div>
      <p className="hint">
        Implement in your own React app (e.g. <code>src/practice/&lt;difficulty&gt;/&lt;slug&gt;/</code>). Open{' '}
        <code>CHALLENGE.md</code> in the repo or use this browser.
      </p>
    </section>
  )
}

function DifficultyPage() {
  const { difficulty = 'easy' } = useParams<{ difficulty: Difficulty }>()
  const list = challengeIndex[difficulty] ?? []

  const meta = DIFFICULTIES.find((d) => d.id === difficulty)

  return (
    <section className="difficulty-page">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span aria-hidden> / </span>
        <span>{meta?.label ?? difficulty}</span>
      </nav>
      <h1>{meta?.label ?? difficulty}</h1>
      <ul className="challenge-list">
        {list.map((c) => {
          const completed = isChallengeCompleted(difficulty, c.slug, c.acceptance.length)
          return (
            <li key={c.slug}>
              <Link to={`/${difficulty}/${c.slug}`} className="challenge-list-card">
                <span className="challenge-list-card-title">{c.title}</span>
                {completed && (
                  <span className="challenge-completed-badge challenge-completed-badge--small">
                    Completed
                  </span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function ChallengeDetailPage() {
  const { difficulty = 'easy', slug = '' } = useParams<{
    difficulty: Difficulty
    slug: string
  }>()
  const meta = findChallenge(difficulty, slug)
  const acceptanceCount = meta?.acceptance.length ?? 0
  const { progress, toggleCriterion, isChecked, isComplete } = useChallengeProgress(
    difficulty,
    slug,
    acceptanceCount,
  )
  const challengeMd = useMemo(
    () => stripInteractiveSections(getChallengeMarkdown(difficulty, slug)),
    [difficulty, slug],
  )
  const solutionMd = useMemo(
    () => getSolutionMarkdown(difficulty, slug),
    [difficulty, slug],
  )
  const [showSolution, setShowSolution] = useState(false)

  if (!meta) {
    return (
      <section className="challenge-detail">
        <p>Challenge not found.</p>
        <Link to="/">Back home</Link>
      </section>
    )
  }

  const diffLabel = DIFFICULTIES.find((d) => d.id === difficulty)?.label

  return (
    <section className="challenge-detail">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span aria-hidden> / </span>
        <Link to={`/${difficulty}`}>{diffLabel}</Link>
        <span aria-hidden> / </span>
        <span>{meta.title}</span>
      </nav>

      <div className="challenge-detail__actions">
        <a
          className="file-link"
          href={`https://github.com/betexcr/react-teacher/blob/main/challenges/${difficulty}/${slug}/CHALLENGE.md`}
          onClick={(e) => e.preventDefault()}
          title="Open in repository folder"
        >
          CHALLENGE.md
        </a>
        <a
          className="file-link"
          href={`https://github.com/betexcr/react-teacher/blob/main/challenges/${difficulty}/${slug}/SOLUTION.md`}
          onClick={(e) => e.preventDefault()}
          title="Open in repository folder"
        >
          SOLUTION.md
        </a>
      </div>

      {isComplete && (
        <span className="challenge-completed-badge" aria-label="Challenge completed">
          Completed
        </span>
      )}

      <MarkdownView source={challengeMd} />

      <AcceptanceChecklist
        criteria={meta.acceptance}
        progress={progress}
        isChecked={isChecked}
        onToggle={toggleCriterion}
        isComplete={isComplete}
      />

      <ResourceList resources={meta.resources} />

      <div className="solution-panel">
        <button
          type="button"
          className="solution-toggle"
          aria-expanded={showSolution}
          onClick={() => setShowSolution((v) => !v)}
        >
          {showSolution ? 'Hide solution' : 'Show solution & explanation'}
        </button>
        {showSolution && (
          <div className="solution-content">
            <MarkdownView source={solutionMd} />
          </div>
        )}
      </div>

      <footer className="challenge-nav">
        <Link to={`/${difficulty}`}>← All {diffLabel} challenges</Link>
      </footer>
    </section>
  )
}

export function ChallengeBrowser() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          ReactTeacher
        </Link>
        <nav className="app-nav">
          {DIFFICULTIES.map((d) => (
            <Link key={d.id} to={`/${d.id}`}>
              {d.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:difficulty" element={<DifficultyPage />} />
          <Route path="/:difficulty/:slug" element={<ChallengeDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}
