import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HiddenCardsTooltip } from '../components/HiddenCardsTooltip';
import { getDeckBySlug } from '../data/flashcards';
import { useDeckProgress } from '../hooks/useDeckProgress';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';
import {
  getUncompletedIndices,
  readUncompletedOnlyFilter,
  writeUncompletedOnlyFilter,
} from '../utils/flashcardFilter';

function ExplanationBody({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean);
  return (
    <div className="flashcard-explanation-body">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export function FlashcardStudyPage() {
  useRouteScrollTop();
  const { slug } = useParams<{ slug: string }>();
  const deck = slug ? getDeckBySlug(slug) : undefined;
  const total = deck?.cards.length ?? 0;
  const { progress, deckCompleted, setIndex, toggleCardComplete, isCardComplete } = useDeckProgress(
    deck?.id,
    total
  );
  const [index, setLocalIndex] = useState(0);
  const [explanationOpen, setExplanationOpen] = useState(false);
  const [uncompletedOnly, setUncompletedOnly] = useState(() => readUncompletedOnlyFilter());

  const uncompletedIndices = useMemo(
    () => getUncompletedIndices(total, isCardComplete),
    [total, isCardComplete, progress.completedCardIndices]
  );

  const activeIndices = uncompletedOnly ? uncompletedIndices : Array.from({ length: total }, (_, i) => i);

  const hiddenCards = useMemo(() => {
    if (!deck) return [];
    return Array.from({ length: total }, (_, i) => i)
      .filter((i) => isCardComplete(i))
      .map((i) => ({ index: i, question: deck.cards[i].question }));
  }, [deck, total, isCardComplete, progress.completedCardIndices]);

  const positionInActive = activeIndices.indexOf(index);
  const safePosition = positionInActive >= 0 ? positionInActive : 0;

  useEffect(() => {
    if (!deck) return;
    setLocalIndex(progress.lastIndex > 0 ? progress.lastIndex : 0);
  }, [deck?.id, progress.lastIndex]);

  useEffect(() => {
    setExplanationOpen(false);
  }, [index]);

  useEffect(() => {
    if (!uncompletedOnly || activeIndices.length === 0) return;
    if (!activeIndices.includes(index)) {
      const next = activeIndices[0];
      setLocalIndex(next);
      setIndex(next);
    }
  }, [uncompletedOnly, activeIndices, index, setIndex]);

  const setFilter = useCallback((enabled: boolean) => {
    setUncompletedOnly(enabled);
    writeUncompletedOnlyFilter(enabled);
  }, []);

  if (!deck) {
    return (
      <div>
        <p>Section not found.</p>
        <Link to="/flashcards">Back to sections</Link>
      </div>
    );
  }

  const completedCount = progress.completedCardIndices.length;
  const hiddenCount = total - uncompletedIndices.length;

  const goToActivePosition = (activePos: number) => {
    const target = activeIndices[activePos];
    if (target === undefined) return;
    setLocalIndex(target);
    setIndex(target);
  };

  const goPrev = () => {
    if (safePosition <= 0) return;
    goToActivePosition(safePosition - 1);
  };

  const goNext = () => {
    if (safePosition >= activeIndices.length - 1) return;
    goToActivePosition(safePosition + 1);
  };

  const handleToggleComplete = () => {
    const wasComplete = isCardComplete(index);
    toggleCardComplete(index);

    if (uncompletedOnly && !wasComplete) {
      const remaining = getUncompletedIndices(total, (i) =>
        i === index ? true : isCardComplete(i)
      );
      if (remaining.length > 0) {
        const next = remaining.find((i) => i > index) ?? remaining[0];
        setLocalIndex(next);
        setIndex(next);
      }
    }
  };

  const handleUncompleteHidden = (cardIndex: number) => {
    if (!isCardComplete(cardIndex)) return;
    toggleCardComplete(cardIndex);
  };

  const handleUncompleteAllHidden = () => {
    hiddenCards.forEach((item) => {
      if (isCardComplete(item.index)) toggleCardComplete(item.index);
    });
  };

  if (uncompletedOnly && activeIndices.length === 0) {
    return (
      <article className="flashcard-study">
        <header className="flashcard-study-header">
          <h1 className="flashcard-study-title">{deck.title}</h1>
        </header>
        <div className="flashcard-study-empty" role="status">
          <p>You&apos;ve completed every card in this section.</p>
          <p className="flashcard-study-empty-hint">
            Turn off &quot;Show uncompleted only&quot; to review completed cards again.
          </p>
          <button type="button" className="primary" onClick={() => setFilter(false)}>
            Show all cards
          </button>
          <Link to="/flashcards" className="flashcard-back-link flashcard-study-empty-back">
            ← All sections
          </Link>
        </div>
      </article>
    );
  }

  const card = deck.cards[index];
  const cardDone = isCardComplete(index);

  return (
    <article className="flashcard-study">
      <header className="flashcard-study-header">
        <div className="flashcard-study-title-row">
          <h1 className="flashcard-study-title">{deck.title}</h1>
          {deckCompleted && (
            <span className="flashcard-completed-badge" aria-label="Section completed">
              Completed
            </span>
          )}
        </div>
        <p className="flashcard-study-progress" aria-live="polite">
          {uncompletedOnly ? (
            <>
              Flashcard {safePosition + 1}/{activeIndices.length}
              {hiddenCount > 0 && (
                <>
                  <span className="flashcard-study-progress-sep"> · </span>
                  <HiddenCardsTooltip
                    count={hiddenCount}
                    items={hiddenCards}
                    onUncomplete={handleUncompleteHidden}
                    onUncompleteAll={handleUncompleteAllHidden}
                  />
                </>
              )}
            </>
          ) : (
            <>
              Flashcard {index + 1}/{total}
              <span className="flashcard-study-progress-sep"> · </span>
              {completedCount}/{total} completed
            </>
          )}
        </p>
        <label className="flashcard-filter-toggle">
          <input
            type="checkbox"
            checked={uncompletedOnly}
            onChange={(e) => setFilter(e.target.checked)}
          />
          <span>Show uncompleted only</span>
        </label>
      </header>

      <section className="flashcard-question-block" aria-labelledby="flashcard-question">
        <h2 id="flashcard-question" className="flashcard-question">
          {card.question}
        </h2>
      </section>

      <label className="flashcard-card-complete">
        <input type="checkbox" checked={cardDone} onChange={handleToggleComplete} />
        <span>Mark this card as complete</span>
      </label>

      <section className="flashcard-explanation-block">
        <button
          type="button"
          className="flashcard-explanation-toggle"
          aria-expanded={explanationOpen}
          aria-controls="flashcard-explanation-panel"
          onClick={() => setExplanationOpen((open) => !open)}
        >
          <span className="flashcard-explanation-chevron" data-open={explanationOpen} aria-hidden>
            ›
          </span>
          <span className="flashcard-explanation-toggle-label">
            {explanationOpen ? 'Hide explanation' : 'Show explanation'}
          </span>
        </button>
        {explanationOpen && (
          <div id="flashcard-explanation-panel" className="flashcard-explanation-panel">
            <h3 className="flashcard-explanation-heading">Explanation</h3>
            <ExplanationBody text={card.explanation} />
          </div>
        )}
      </section>

      <footer className="flashcard-study-footer">
        <Link to="/flashcards" className="flashcard-back-link">
          ← All sections
        </Link>
        <div className="flashcard-study-controls">
          <button type="button" disabled={safePosition === 0} onClick={goPrev}>
            Previous
          </button>
          <button
            type="button"
            className="primary"
            disabled={safePosition >= activeIndices.length - 1}
            onClick={goNext}
          >
            Next
          </button>
        </div>
      </footer>
    </article>
  );
}
