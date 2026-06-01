# Solution: Controlled Input Field

## Approach

Single state object or separate useState per field; validation computed during render.

## Key concepts

- **Controlled component**: React state is the single source of truth for the input value.
- **Derived validation**: const emailError = !email.includes("@") && email.length > 0

## Solution code

```tsx
import { useState, FormEvent } from 'react';

export function ProfileForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const emailError = email.length > 0 && !email.includes('@');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ name, email, bio });
  };

  return (
    <div className="layout">
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <span role="alert">Invalid email</span>}
        </label>
        <label>
          Bio
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
      <aside>
        <h3>{name || 'Anonymous'}</h3>
        <p>{email}</p>
        <p>{bio}</p>
      </aside>
    </div>
  );
}
```

## Walkthrough

Every keystroke flows through onChange into state, then back to value. Preview reads the same state.

## Common mistakes

- Forgetting value makes input uncontrolled
- Mixing defaultValue with value

## Stretch goals

- useReducer for form state
- Zod validation
