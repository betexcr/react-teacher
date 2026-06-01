# Build a Clock

**Difficulty:** easy  
**Topics:** useEffect, setInterval, Date

## Learning goals

- Update UI on a timer
- Format time for display

## Challenge

Analog or digital clock that updates every second. Toggle 12h/24h format. Show date optionally.

## Requirements

1. Tick every second with cleanup
2. Format hours/minutes/seconds
3. Toggle format button

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/12-build-a-clock/`. Reference write-ups in this repo live under `challenges/easy/12-build-a-clock/` (not loaded by the app).

```tsx
export function Clock() {
  const [now, setNow] = useState(new Date());
}
```

## Hints

1. useEffect + setInterval 1000
2. Intl.DateTimeFormat for locale-aware formatting

## Acceptance criteria

- [ ] Updates live
- [ ] Format toggle works
- [ ] Interval cleared on unmount

## Resources

- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [useEffect – Reference](https://react.dev/reference/react/useEffect)
- [Removing Effects](https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed)
