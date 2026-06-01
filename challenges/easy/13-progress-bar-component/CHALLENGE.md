# Progress Bar Component

**Difficulty:** easy  
**Topics:** props, a11y

## Learning goals

- Build accessible progress UI
- Clamp values 0–100

## Challenge

Reusable `ProgressBar` with `value`, `max`, optional `label`. Animate width changes. Support indeterminate mode (loading unknown duration).

## Requirements

1. role="progressbar" with aria-valuenow/min/max
2. Clamp value between 0 and max
3. Indeterminate CSS animation when value is null

## Starter hint

Create your work in `src/challenges/easy/13-progress-bar-component/` or a sandbox file of your choice.

```tsx
type ProgressBarProps = { value: number | null; max?: number; label?: string };
```

## Hints

1. percent = (value / max) * 100
2. aria-busy for indeterminate

## Acceptance criteria

- [ ] Determinate and indeterminate modes
- [ ] Accessible

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [props – React Reference](https://react.dev/reference/react)
