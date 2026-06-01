import type { ChallengeProgress } from '../hooks/useChallengeProgress';

type Props = {
  criteria: string[];
  progress: ChallengeProgress;
  isChecked: (index: number) => boolean;
  onToggle: (index: number) => void;
  isComplete: boolean;
};

export function AcceptanceChecklist({
  criteria,
  progress,
  isChecked,
  onToggle,
  isComplete,
}: Props) {
  if (!criteria.length) return null;

  const doneCount = progress.checked.length;

  return (
    <section className="challenge-acceptance" aria-labelledby="challenge-acceptance-heading">
      <div className="challenge-acceptance-header">
        <h2 id="challenge-acceptance-heading">Acceptance criteria</h2>
        {isComplete && (
          <span className="challenge-completed-badge" aria-label="Challenge completed">
            Completed
          </span>
        )}
      </div>
      <p className="challenge-acceptance-progress" aria-live="polite">
        {doneCount}/{criteria.length} complete
      </p>
      <ul className="challenge-acceptance-list">
        {criteria.map((text, index) => (
          <li key={index}>
            <label className="challenge-acceptance-item">
              <input
                type="checkbox"
                checked={isChecked(index)}
                onChange={() => onToggle(index)}
              />
              <span>{text}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
