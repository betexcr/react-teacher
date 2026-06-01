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

Create your work in `src/challenges/easy/12-build-a-clock/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [useEffect – React Reference](https://react.dev/reference/react)
