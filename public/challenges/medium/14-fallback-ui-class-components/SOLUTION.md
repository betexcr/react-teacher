# Solution: Fallback UI (Class Components)

## Approach

Only class components can be error boundaries today.

## Key concepts

- **Error boundary**: Catches child render errors—not event handlers or async.

## Code highlights

- `const [show, setShow] = useState(true)` — **show state** — In "Fallback UI (Class Components)", `show` is the value the UI shows. It starts at true. `setShow` updates it when the user interacts. Boundary flips hasError; retry clears flag so children render again.
- `onClick={() => setShow(false)}` — **onClick** — In "Fallback UI (Class Components)", clicking updates state via . Boundary flips hasError; retry clears flag so children render again.
- `onClick={this.reset}` — **onClick** — In "Fallback UI (Class Components)", clicking runs when the user clicks this button. Boundary flips hasError; retry clears flag so children render again.
- `{show && <Buggy />}` — **&& render** — In "Fallback UI (Class Components)", only renders the element when the left side is true.

## Solution code

```tsx
import React, { Component, ReactNode } from 'react';

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info.componentStack);
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div>
            <p>Something went wrong.</p>
            <button onClick={this.reset}>Try again</button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

function Buggy() {
  throw new Error('boom');
}

export function Demo() {
  const [show, setShow] = useState(true);
  return (
    <ErrorBoundary>
      {show && <Buggy />}
      <button onClick={() => setShow(false)}>Hide buggy</button>
    </ErrorBoundary>
  );
}
```

## Walkthrough

Boundary flips hasError; retry clears flag so children render again.

## Common mistakes

- Trying functional component as boundary without library
- Expecting to catch event errors

## Stretch goals

- react-error-boundary package
- Report to Sentry
