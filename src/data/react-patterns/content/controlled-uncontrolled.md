# Controlled vs Uncontrolled

## What it is

**Controlled:** React state is the source of truth — you pass `value`/`checked` and update via `onChange`.

**Uncontrolled:** The DOM holds the value; you read it with a ref when needed (usually on submit).

## When to use

| Controlled | Uncontrolled |
|------------|--------------|
| Live validation, dependent fields | Simple one-shot forms |
| Disabling submit until valid | File inputs, focus-on-mount |
| Syncing multiple inputs | Integrating non-React widgets |

## Example

```tsx
import { useRef, useState } from 'react';

function ControlledEmail() {
  const [email, setEmail] = useState('');
  const valid = email.includes('@');

  return (
    <>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={!valid && email.length > 0}
      />
      <button disabled={!valid}>Save</button>
    </>
  );
}

function UncontrolledSignup() {
  const emailRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const email = emailRef.current?.value ?? '';
    console.log({ email });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} name="email" defaultValue="" />
      <button type="submit">Join</button>
    </form>
  );
}
```

## Hybrid libraries

React Hook Form often uses uncontrolled inputs internally (refs) while exposing controlled-like APIs for validation — good interview detail.

## Tradeoffs

- **Controlled:** Predictable, testable, more re-renders
- **Uncontrolled:** Less boilerplate, harder to react to every keystroke in React state
