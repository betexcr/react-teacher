# Performance Monitoring

**Difficulty:** easy  
**Topics:** Profiler API, useEffect

## Learning goals

- Measure render cost
- Log slow renders in dev

## Challenge

Wrap a heavy child tree with React `<Profiler>` and log phases where duration exceeds a threshold (e.g. 16ms). Display last commit time in UI.

## Requirements

1. onRender callback
2. Track last duration in state
3. Only log in development

## Starter hint

Create your work in `src/challenges/easy/14-performance-monitoring/` or a sandbox file of your choice.

```tsx
<Profiler id="Heavy" onRender={onRender}>...</Profiler>
```

## Hints

1. onRender(id, phase, actualDuration, ...)
2. phase is mount or update

## Acceptance criteria

- [ ] Profiler wired
- [ ] Threshold logging
- [ ] UI shows metric

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [Profiler API – React Reference](https://react.dev/reference/react)
