# Counter Component

**Difficulty:** easy  
**Topics:** useState, events

## Learning goals

- Manage numeric state with useState
- Wire button clicks to state updates

## Challenge

Build a counter that displays a number and has **Increment**, **Decrement**, and **Reset** buttons. The count must never go below zero unless you add an optional "allow negative" mode.

## Requirements

1. Display the current count prominently
2. Increment adds 1; Decrement subtracts 1
3. Reset sets count back to 0
4. Disable Decrement at 0 (default behavior)

## Starter hint

Create your work in `src/challenges/easy/01-counter-component/` or a sandbox file of your choice.

```tsx
export function Counter() {
  // TODO: useState for count
  return (
    <div>
      <p>Count: ???</p>
      {/* buttons */}
    </div>
  );
}
```

## Hints

1. useState(0) returns [count, setCount]
2. Use functional updates setCount(c => c + 1) when the next state depends on the previous

## Acceptance criteria

- [ ] Count updates on each click
- [ ] Reset works from any value
- [ ] Decrement disabled at 0

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [useState – React Reference](https://react.dev/reference/react)
