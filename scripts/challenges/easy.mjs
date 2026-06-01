import { challenge } from './helpers.mjs';

export const easyChallenges = [
  challenge({
    slug: '01-counter-component',
    title: 'Counter Component',
    difficulty: 'easy',
    topics: ['useState', 'events'],
    goals: ['Manage numeric state with useState', 'Wire button clicks to state updates'],
    description:
      'Build a counter that displays a number and has **Increment**, **Decrement**, and **Reset** buttons. The count must never go below zero unless you add an optional "allow negative" mode.',
    requirements: [
      'Display the current count prominently',
      'Increment adds 1; Decrement subtracts 1',
      'Reset sets count back to 0',
      'Disable Decrement at 0 (default behavior)',
    ],
    starter: `export function Counter() {
  // TODO: useState for count
  return (
    <div>
      <p>Count: ???</p>
      {/* buttons */}
    </div>
  );
}`,
    hints: [
      'useState(0) returns [count, setCount]',
      'Use functional updates setCount(c => c + 1) when the next state depends on the previous',
    ],
    acceptance: ['Count updates on each click', 'Reset works from any value', 'Decrement disabled at 0'],
    solutionApproach:
      'A single piece of state holds the count. Event handlers call setCount with either a literal or an updater function.',
    concepts: [
      { term: 'useState', detail: 'Declares state that persists across re-renders and triggers a re-render when updated.' },
      { term: 'Controlled updates', detail: 'Derive UI (disabled button) from state instead of mutating the DOM.' },
    ],
    solution: `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p aria-live="polite">Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount((c) => c - 1)} disabled={count === 0}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`,
    walkthrough:
      'We initialize count to 0. Each button calls setCount. Decrement uses an updater so React always sees the latest count. The decrement button is disabled when count === 0, which is declarative UI.',
    mistakes: ['Calling count-- instead of setCount', 'Forgetting disabled on decrement at zero'],
    stretch: ['Add step size input', 'Add keyboard shortcuts (+/-)'],
  }),

  challenge({
    slug: '02-shopping-cart-state',
    title: 'Shopping Cart State',
    difficulty: 'easy',
    topics: ['useState', 'arrays', 'immutability'],
    goals: ['Update array state immutably', 'Derive totals from state'],
    description:
      'Model a mini cart: each item has id, name, price, and quantity. Users can add items, change quantity, and remove items. Show item subtotals and a cart total.',
    requirements: [
      'Add product increases quantity if id exists, else adds new line',
      'Remove deletes the line entirely',
      'Quantity cannot go below 1 (or remove item at 0)',
      'Display formatted total price',
    ],
    starter: `type Item = { id: string; name: string; price: number; qty: number };

export function ShoppingCart() {
  const [items, setItems] = useState<Item[]>([]);
  // addItem, updateQty, removeItem
  return null;
}`,
    hints: [
      'Never mutate items with push or items[i].qty++',
      'Use map/filter to produce new arrays',
      'total = items.reduce((sum, i) => sum + i.price * i.qty, 0)',
    ],
    acceptance: ['Add/merge works', 'Totals correct', 'Remove works'],
    solutionApproach: 'Keep cart as an array. Each operation returns a new array reference so React detects the change.',
    concepts: [
      { term: 'Immutable updates', detail: 'Copy-on-write patterns (map, filter, spread) keep state predictable.' },
      { term: 'Derived data', detail: 'Compute totals during render instead of storing redundant state.' },
    ],
    solution: `import { useState } from 'react';

type Item = { id: string; name: string; price: number; qty: number };

export function ShoppingCart() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (product: Omit<Item, 'qty'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.name} × {i.qty} — \${(i.price * i.qty).toFixed(2)}
            <button onClick={() => updateQty(i.id, i.qty - 1)}>-</button>
            <button onClick={() => updateQty(i.id, i.qty + 1)}>+</button>
            <button onClick={() => removeItem(i.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: \${total.toFixed(2)}</p>
      <button onClick={() => addItem({ id: '1', name: 'Apple', price: 1.5 })}>
        Add Apple
      </button>
    </div>
  );
}`,
    walkthrough:
      'addItem checks for duplicates with find, then either maps to bump qty or spreads a new entry. updateQty filters out zero-qty lines. total is derived each render.',
    mistakes: ['Mutating item.qty directly', 'Storing total in state and forgetting to sync'],
    stretch: ['Persist cart to localStorage', 'Support coupons'],
  }),

  challenge({
    slug: '03-use-previous-hook',
    title: 'usePrevious Hook',
    difficulty: 'easy',
    topics: ['useRef', 'useEffect', 'custom hooks'],
    goals: ['Store values across renders without triggering re-renders', 'Build a reusable custom hook'],
    description: 'Implement `usePrevious(value)` that returns the value from the **previous** render (undefined on first render). Use it to show "was X, now Y" for a changing prop or state.',
    requirements: [
      'Hook signature: function usePrevious<T>(value: T): T | undefined',
      'Return undefined on first render',
      'After updates, return the prior value',
    ],
    starter: `export function usePrevious<T>(value: T): T | undefined {
  // useRef + useEffect
}`,
    hints: [
      'useRef can hold mutable .current without causing re-renders',
      'Update ref.current in useEffect after paint so render still sees old value',
    ],
    acceptance: ['First render undefined', 'Subsequent renders show previous'],
    solutionApproach: 'During render, read ref.current (old value). After commit, useEffect writes the latest value into the ref.',
    concepts: [
      { term: 'useRef', detail: 'Mutable box whose .current survives re-renders.' },
      { term: 'useEffect timing', detail: 'Effects run after render, perfect for "commit previous value".' },
    ],
    solution: `import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// Demo
export function PreviousDemo() {
  const [n, setN] = useState(0);
  const prev = usePrevious(n);
  return (
    <div>
      <p>Now: {n}, Before: {prev ?? '—'}</p>
      <button onClick={() => setN((v) => v + 1)}>+1</button>
    </div>
  );
}`,
    walkthrough:
      'On render N, ref still holds value from render N-1 because the effect has not run yet. After paint, effect sets ref to the current value for next time.',
    mistakes: ['Updating ref during render (Strict Mode double-render quirks)', 'Using useState for previous (causes extra renders)'],
    stretch: ['Compare deep objects with usePrevious', 'Animate only when value increases'],
  }),

  challenge({
    slug: '04-event-handling',
    title: 'Event Handling',
    difficulty: 'easy',
    topics: ['SyntheticEvent', 'handlers'],
    goals: ['Use React synthetic events', 'Pass parameters to handlers safely'],
    description:
      'Build a keypad UI: clicking digits appends to a display; Clear wipes it; Backspace removes one character. Support both click and keyboard (optional).',
    requirements: ['Use onClick handlers', 'Prevent default only when needed', 'Display builds a string buffer'],
    starter: `export function Keypad() {
  const [display, setDisplay] = useState('');
  // handleDigit(d: string), handleClear, handleBackspace
}`,
    hints: ['React events are SyntheticEvent wrappers', 'Use e.preventDefault() for form-like behavior inside forms'],
    acceptance: ['Digits append', 'Clear and backspace work'],
    solutionApproach: 'Central string state; handlers call setDisplay with concatenation or slice.',
    concepts: [
      { term: 'SyntheticEvent', detail: 'Cross-browser normalized event; pool is no longer reused in React 17+.' },
      { term: 'Handler factories', detail: 'onClick={() => append("7")} avoids inline bugs with stale closures for simple cases.' },
    ],
    solution: `import { useState } from 'react';

export function Keypad() {
  const [display, setDisplay] = useState('');

  const append = (d: string) => setDisplay((s) => s + d);
  const clear = () => setDisplay('');
  const backspace = () => setDisplay((s) => s.slice(0, -1));

  const keys = ['1','2','3','4','5','6','7','8','9','0'];

  return (
    <div>
      <output>{display || '0'}</output>
      <div role="group" aria-label="keypad">
        {keys.map((k) => (
          <button key={k} type="button" onClick={() => append(k)}>{k}</button>
        ))}
        <button type="button" onClick={backspace}>⌫</button>
        <button type="button" onClick={clear}>Clear</button>
      </div>
    </div>
  );
}`,
    walkthrough: 'Each button triggers a small state transition. type="button" avoids accidental form submission.',
    mistakes: ['Using onClick={append("1")} which invokes immediately', 'Mutating display string in place'],
    stretch: ['Add keyboard listeners with useEffect', 'Limit max length'],
  }),

  challenge({
    slug: '05-controlled-input-field',
    title: 'Controlled Input Field',
    difficulty: 'easy',
    topics: ['controlled components', 'forms'],
    goals: ['Bind input value to React state', 'Handle onChange correctly'],
    description:
      'Create a profile form with controlled inputs: name, email, and bio (textarea). Show a live preview card as the user types. Include basic validation messages.',
    requirements: ['All fields controlled (value + onChange)', 'Email shows error if missing @', 'Submit logs JSON (preventDefault)'],
    starter: `export function ProfileForm() {
  // name, email, bio state
  return <form onSubmit={...}>...</form>;
}`,
    hints: ['value={state} onChange={e => setState(e.target.value)}', 'textarea uses same pattern as input'],
    acceptance: ['Preview mirrors inputs', 'Validation visible', 'Submit prevented default'],
    solutionApproach: 'Single state object or separate useState per field; validation computed during render.',
    concepts: [
      { term: 'Controlled component', detail: 'React state is the single source of truth for the input value.' },
      { term: 'Derived validation', detail: 'const emailError = !email.includes("@") && email.length > 0' },
    ],
    solution: `import { useState, FormEvent } from 'react';

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
}`,
    walkthrough: 'Every keystroke flows through onChange into state, then back to value. Preview reads the same state.',
    mistakes: ['Forgetting value makes input uncontrolled', 'Mixing defaultValue with value'],
    stretch: ['useReducer for form state', 'Zod validation'],
  }),

  challenge({
    slug: '06-fetching-data',
    title: 'Fetching Data',
    difficulty: 'easy',
    topics: ['useEffect', 'fetch', 'loading states'],
    goals: ['Fetch on mount', 'Model loading / error / success UI'],
    description:
      'Fetch a list of users from `https://jsonplaceholder.typicode.com/users` (or mock). Show loading spinner, error message, and a list on success.',
    requirements: ['useEffect with cleanup (AbortController)', 'Three UI states: loading, error, data', 'Refetch button'],
    starter: `export function UserList() {
  // loading, error, users
  useEffect(() => { /* fetch */ }, []);
}`,
    hints: ['Abort fetch in cleanup to avoid setState on unmounted component', 'Empty dependency array = run once on mount'],
    acceptance: ['Loading shows first', 'Errors readable', 'Refetch works'],
    solutionApproach: 'Track status in state; effect triggers fetch; abort on unmount or refetch.',
    concepts: [
      { term: 'useEffect', detail: 'Synchronize with external systems (network).' },
      { term: 'AbortController', detail: 'Cancel in-flight fetch when component unmounts.' },
    ],
    solution: `import { useEffect, useState, useCallback } from 'react';

type User = { id: number; name: string; email: string };

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback((signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    fetch('https://jsonplaceholder.typicode.com/users', { signal })
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then(setUsers)
      .catch((e) => {
        if (e.name !== 'AbortError') setError(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    load(ac.signal);
    return () => ac.abort();
  }, [load]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <div>
      <button onClick={() => load()}>Refetch</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}`,
    walkthrough: 'load centralizes fetch logic. Effect creates AbortController per mount. Refetch calls load without aborting unless you add that.',
    mistakes: ['Missing dependency warnings ignored blindly', 'No loading state (flash of empty)'],
    stretch: ['React Query / SWR', 'Pagination'],
  }),

  challenge({
    slug: '07-dynamic-list-rendering',
    title: 'Dynamic List Rendering',
    difficulty: 'easy',
    topics: ['lists', 'keys'],
    goals: ['Render arrays with map', 'Choose stable keys'],
    description:
      'Build a tag editor: input + Add button creates tags; each tag has remove; list renders dynamically. Animate new tags optionally.',
    requirements: ['Use map to render', 'Keys must be stable (id, not index)', 'No duplicate tags (case-insensitive)'],
    starter: `type Tag = { id: string; label: string };`,
    hints: ['crypto.randomUUID() or incremental id for keys', 'Filter duplicates before setState'],
    acceptance: ['Add/remove work', 'Stable keys', 'Duplicate prevention'],
    solutionApproach: 'Array of tag objects with unique ids; render with map and key={id}.',
    concepts: [
      { term: 'key', detail: 'Helps React match items across reorders; must be stable per item.' },
      { term: 'Index as key', detail: 'Breaks when list order changes—avoid for mutable lists.' },
    ],
    solution: `import { useState } from 'react';

type Tag = { id: string; label: string };

export function TagEditor() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [input, setInput] = useState('');

  const addTag = () => {
    const label = input.trim();
    if (!label) return;
    const exists = tags.some((t) => t.label.toLowerCase() === label.toLowerCase());
    if (exists) return;
    setTags((t) => [...t, { id: crypto.randomUUID(), label }]);
    setInput('');
  };

  const remove = (id: string) => setTags((t) => t.filter((x) => x.id !== id));

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTag()} />
      <button onClick={addTag}>Add</button>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            {tag.label}
            <button aria-label={\`Remove \${tag.label}\`} onClick={() => remove(tag.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    walkthrough: 'Each tag gets a UUID. map renders li with key=tag.id. Duplicate check normalizes case.',
    mistakes: ['Using index as key when removing from middle', 'Forgetting trim on input'],
    stretch: ['Drag to reorder with @dnd-kit', 'Max tag count'],
  }),

  challenge({
    slug: '08-use-interval-hook',
    title: 'useInterval Hook',
    difficulty: 'easy',
    topics: ['useEffect', 'useRef', 'custom hooks'],
    goals: ['Encapsulate setInterval logic', 'Keep callback fresh without resetting interval unnecessarily'],
    description: 'Implement `useInterval(callback, delayMs | null)`. When delay is null, pause. Use it to flip a boolean every second.',
    requirements: ['Pauses when delay is null', 'Clears interval on unmount', 'Callback may change without leaking stale closures (use ref pattern)'],
    starter: `export function useInterval(cb: () => void, delay: number | null) {}`,
    hints: ['Store latest callback in ref updated each render', 'Effect depends on delay only'],
    acceptance: ['Ticks regularly', 'Pause works', 'No memory leaks'],
    solutionApproach: 'Dan Abramov pattern: ref for callback, effect sets interval when delay changes.',
    concepts: [
      { term: 'Declarative interval', detail: 'delay null means paused—effect cleans up timer.' },
      { term: 'Ref indirection', detail: 'interval always calls ref.current() for latest callback.' },
    ],
    solution: `import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  const saved = useRef(callback);
  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export function Blinker() {
  const [on, setOn] = useState(false);
  useInterval(() => setOn((v) => !v), 1000);
  return <div style={{ opacity: on ? 1 : 0.3 }}>Blink</div>;
}`,
    walkthrough: 'Separating callback ref from delay effect avoids resetting timer every render when only callback identity changes.',
    mistakes: ['Including callback in effect deps causing reset every render', 'Forgetting clearInterval'],
    stretch: ['useTimeout hook', 'Drift correction'],
  }),

  challenge({
    slug: '09-component-composition',
    title: 'Component Composition',
    difficulty: 'easy',
    topics: ['children', 'composition'],
    goals: ['Use children and slots pattern', 'Avoid prop drilling for layout'],
    description:
      'Build a `Card` with `Card.Header`, `Card.Body`, and `Card.Footer` using composition (compound components or named exports). Consume it to show an article preview.',
    requirements: ['Flexible layout via children', 'Card applies shared border/padding', 'Subcomponents optional'],
    starter: `export function Card({ children }: { children: React.ReactNode }) {}`,
    hints: ['Attach static properties: Card.Header = function Header...', 'Or pass slots: header={<.../>}'],
    acceptance: ['Composable API', 'Article example renders'],
    solutionApproach: 'Compound components colocate API; children prop for body content.',
    concepts: [
      { term: 'Composition over inheritance', detail: 'Combine small components instead of mega props.' },
      { term: 'Compound components', detail: 'Card.Header shares implicit context optional.' },
    ],
    solution: `import { ReactNode } from 'react';

function CardRoot({ children }: { children: ReactNode }) {
  return <article className="card">{children}</article>;
}
function Header({ children }: { children: ReactNode }) {
  return <header className="card__header">{children}</header>;
}
function Body({ children }: { children: ReactNode }) {
  return <div className="card__body">{children}</div>;
}
function Footer({ children }: { children: ReactNode }) {
  return <footer className="card__footer">{children}</footer>;
}

export const Card = Object.assign(CardRoot, { Header, Body, Footer });

export function ArticlePreview() {
  return (
    <Card>
      <Card.Header><h2>ReactTeacher</h2></Card.Header>
      <Card.Body><p>Learn by building.</p></Card.Body>
      <Card.Footer><button>Read more</button></Card.Footer>
    </Card>
  );
}`,
    walkthrough: 'Object.assign attaches subcomponents to Card for ergonomic JSX namespace.',
    mistakes: ['One Card with 12 boolean layout props', 'Forgetting to export subcomponents'],
    stretch: ['React Context for Card theme', 'Polymorphic `as` prop'],
  }),

  challenge({
    slug: '10-focus-input-useref',
    title: 'Focus an Input with useRef',
    difficulty: 'easy',
    topics: ['useRef', 'DOM'],
    goals: ['Access DOM nodes imperatively', 'Focus inputs programmatically'],
    description: 'Login form: autofocus email on mount; "Forgot password?" focuses email; successful validation focuses password field.',
    requirements: ['useRef<HTMLInputElement>(null)', 'Call .focus() in handlers or useEffect', 'Do not store DOM in useState'],
    starter: `const emailRef = useRef<HTMLInputElement>(null);`,
    hints: ['ref={emailRef} on input', 'Optional: useEffect(() => emailRef.current?.focus(), [])'],
    acceptance: ['Mount focus works', 'Button focuses correct field'],
    solutionApproach: 'Refs bridge to DOM for focus—a side effect friendly operation.',
    concepts: [
      { term: 'useRef (DOM)', detail: 'React sets .current to the host node when mounted.' },
      { term: 'Imperative focus', detail: 'Necessary for accessibility shortcuts and wizard flows.' },
    ],
    solution: `import { useEffect, useRef } from 'react';

export function LoginFocus() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <form>
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <button type="button" onClick={() => emailRef.current?.focus()}>
        Forgot password?
      </button>
      <button type="button" onClick={() => passwordRef.current?.focus()}>
        Go to password
      </button>
    </form>
  );
}`,
    walkthrough: 'After mount, effect focuses email. Buttons call focus on demand without re-render.',
    mistakes: ['document.querySelector instead of ref', 'Focusing before input mounted'],
    stretch: ['Focus trap in modal', 'autoFocus prop comparison'],
  }),

  challenge({
    slug: '11-refactor-to-props',
    title: 'Refactor to Props',
    difficulty: 'easy',
    topics: ['props', 'lifting state'],
    goals: ['Identify hardcoded data', 'Make components reusable via props'],
    description:
      'You are given a monolithic `UserCard` with hardcoded name/avatar/role. Refactor into presentational `UserCard` + container that passes props. Add optional `onFollow` callback.',
    requirements: ['No hardcoded user data inside UserCard', 'Prop types for name, avatarUrl, role', 'onFollow optional'],
    starter: `// Before: function UserCard() { return <div>Jane Doe</div> }`,
    hints: ['Split data (container) from UI (presentational)', 'Default props for optional fields'],
    acceptance: ['Two users render from array', 'Follow button calls callback'],
    solutionApproach: 'Extract interface UserCardProps; parent maps users to cards.',
    concepts: [
      { term: 'Presentational components', detail: 'UI-only; easier to test and reuse.' },
      { term: 'Container pattern', detail: 'Parent owns data fetching/state.' },
    ],
    solution: `type UserCardProps = {
  name: string;
  avatarUrl: string;
  role: string;
  onFollow?: () => void;
};

export function UserCard({ name, avatarUrl, role, onFollow }: UserCardProps) {
  return (
    <div className="user-card">
      <img src={avatarUrl} alt="" />
      <h3>{name}</h3>
      <p>{role}</p>
      {onFollow && <button onClick={onFollow}>Follow</button>}
    </div>
  );
}

export function UserGallery() {
  const users = [
    { id: '1', name: 'Jane', avatarUrl: '/jane.png', role: 'Engineer' },
    { id: '2', name: 'John', avatarUrl: '/john.png', role: 'Designer' },
  ];
  return users.map((u) => (
    <UserCard key={u.id} {...u} onFollow={() => alert(\`Followed \${u.name}\`)} />
  ));
}`,
    walkthrough: 'UserCard becomes pure function of props. Gallery owns the list and wires events.',
    mistakes: ['Leaving hidden global user', 'Spreading id into DOM unintentionally'],
    stretch: ['TypeScript discriminated union for roles', 'Skeleton loading prop'],
  }),

  challenge({
    slug: '12-build-a-clock',
    title: 'Build a Clock',
    difficulty: 'easy',
    topics: ['useEffect', 'setInterval', 'Date'],
    goals: ['Update UI on a timer', 'Format time for display'],
    description: 'Analog or digital clock that updates every second. Toggle 12h/24h format. Show date optionally.',
    requirements: ['Tick every second with cleanup', 'Format hours/minutes/seconds', 'Toggle format button'],
    starter: `export function Clock() {
  const [now, setNow] = useState(new Date());
}`,
    hints: ['useEffect + setInterval 1000', 'Intl.DateTimeFormat for locale-aware formatting'],
    acceptance: ['Updates live', 'Format toggle works', 'Interval cleared on unmount'],
    solutionApproach: 'Store Date in state; interval sets new Date(); format derived with options.',
    concepts: [
      { term: 'Timer in useEffect', detail: 'Always return cleanup clearing interval.' },
      { term: 'Derived formatting', detail: 'Format from `now` during render, not separate string state.' },
    ],
    solution: `import { useEffect, useState } from 'react';

export function Clock() {
  const [now, setNow] = useState(() => new Date());
  const [use24h, setUse24h] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !use24h,
  }).format(now);

  return (
    <div>
      <time dateTime={now.toISOString()}>{time}</time>
      <button onClick={() => setUse24h((v) => !v)}>{use24h ? '24h' : '12h'}</button>
    </div>
  );
}`,
    walkthrough: 'Single source of truth `now`. Intl handles padding and AM/PM.',
    mistakes: ['Storing formatted string in state (drift)', 'Not clearing interval'],
    stretch: ['Analog SVG hands', 'Timezone selector'],
  }),

  challenge({
    slug: '13-progress-bar-component',
    title: 'Progress Bar Component',
    difficulty: 'easy',
    topics: ['props', 'a11y'],
    goals: ['Build accessible progress UI', 'Clamp values 0–100'],
    description:
      'Reusable `ProgressBar` with `value`, `max`, optional `label`. Animate width changes. Support indeterminate mode (loading unknown duration).',
    requirements: ['role="progressbar" with aria-valuenow/min/max', 'Clamp value between 0 and max', 'Indeterminate CSS animation when value is null'],
    starter: `type ProgressBarProps = { value: number | null; max?: number; label?: string };`,
    hints: ['percent = (value / max) * 100', 'aria-busy for indeterminate'],
    acceptance: ['Determinate and indeterminate modes', 'Accessible'],
    solutionApproach: 'Compute percentage; apply style width; ARIA reflects numbers.',
    concepts: [
      { term: 'ARIA progressbar', detail: 'Screen readers announce value and bounds.' },
      { term: 'Clamping', detail: 'Math.min(max, Math.max(0, value)) avoids overflow UI.' },
    ],
    solution: `type ProgressBarProps = {
  value: number | null;
  max?: number;
  label?: string;
};

export function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const indeterminate = value === null;
  const clamped = value === null ? 0 : Math.min(max, Math.max(0, value));
  const percent = indeterminate ? 0 : (clamped / max) * 100;

  return (
    <div>
      {label && <span id="pb-label">{label}</span>}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-labelledby={label ? 'pb-label' : undefined}
        className={indeterminate ? 'progress indeterminate' : 'progress'}
      >
        <div className="bar" style={{ width: \`\${percent}%\` }} />
      </div>
    </div>
  );
}`,
    walkthrough: 'Null value toggles indeterminate class for CSS keyframes; otherwise width reflects percent.',
    mistakes: ['Missing aria-valuenow', 'Not clamping >100%'],
    stretch: ['Stripe animation', 'Controlled upload demo'],
  }),

  challenge({
    slug: '14-performance-monitoring',
    title: 'Performance Monitoring',
    difficulty: 'easy',
    topics: ['Profiler API', 'useEffect'],
    goals: ['Measure render cost', 'Log slow renders in dev'],
    description:
      'Wrap a heavy child tree with React `<Profiler>` and log phases where duration exceeds a threshold (e.g. 16ms). Display last commit time in UI.',
    requirements: ['onRender callback', 'Track last duration in state', 'Only log in development'],
    starter: `<Profiler id="Heavy" onRender={onRender}>...</Profiler>`,
    hints: ['onRender(id, phase, actualDuration, ...)', 'phase is mount or update'],
    acceptance: ['Profiler wired', 'Threshold logging', 'UI shows metric'],
    solutionApproach: 'Profiler reports actualDuration; parent stores metrics for display.',
    concepts: [
      { term: 'Profiler', detail: 'Measures subtree render time in development builds.' },
      { term: 'actualDuration', detail: 'Time spent rendering the committed update.' },
    ],
    solution: `import { Profiler, ProfilerOnRenderCallback, useState } from 'react';

const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
  if (import.meta.env.DEV && actualDuration > 16) {
    console.warn(\`[\${id}] \${phase} took \${actualDuration.toFixed(1)}ms\`);
  }
};

export function PerfMonitor({ children }: { children: React.ReactNode }) {
  const [last, setLast] = useState(0);

  const handleRender: ProfilerOnRenderCallback = (...args) => {
    onRender(...args);
    setLast(args[2]);
  };

  return (
    <div>
      <p>Last render: {last.toFixed(1)} ms</p>
      <Profiler id="App" onRender={handleRender}>
        {children}
      </Profiler>
    </div>
  );
}`,
    walkthrough: 'Profiler wraps expensive subtree; callback receives timing after commit.',
    mistakes: ['Profiling production expecting numbers', 'Confusing actual vs base duration'],
    stretch: ['Integrate web-vitals LCP', 'Why did you render library'],
  }),

  challenge({
    slug: '15-mouse-tracker',
    title: 'MouseTracker',
    difficulty: 'easy',
    topics: ['events', 'useEffect'],
    goals: ['Listen to window events', 'Clean up listeners'],
    description: 'Track cursor position relative to a box. Show coordinates and whether pointer is inside the box.',
    requirements: ['mousemove on window or container', 'Cleanup on unmount', 'Visual dot follows cursor inside box'],
    starter: `const [pos, setPos] = useState({ x: 0, y: 0 });`,
    hints: ['getBoundingClientRect for relative coords', 'onMouseMove on div vs window'],
    acceptance: ['Coords accurate', 'Inside/outside indicator', 'Listener removed'],
    solutionApproach: 'Attach listener to container; compute local x/y from client coords - rect.',
    concepts: [
      { term: 'Effect cleanup', detail: 'removeEventListener in return prevents leaks.' },
      { term: 'Coordinate spaces', detail: 'clientX/Y vs offsetX/Y differ when nested.' },
    ],
    solution: `import { useEffect, useRef, useState } from 'react';

export function MouseTracker() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [local, setLocal] = useState({ x: 0, y: 0 });
  const [inside, setInside] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inBox = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      setInside(inBox);
      setLocal({ x: Math.round(x), y: Math.round(y) });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={boxRef} className="tracker-box" style={{ position: 'relative' }}>
      <p>{inside ? 'Inside' : 'Outside'} — {local.x}, {local.y}</p>
      {inside && (
        <span
          className="dot"
          style={{ position: 'absolute', left: local.x, top: local.y }}
        />
      )}
    </div>
  );
}`,
    walkthrough: 'Global mousemove plus rect math determines inside and local coords.',
    mistakes: ['No cleanup', 'Using state for dot without checking inside'],
    stretch: ['requestAnimationFrame throttle', 'Touch support'],
  }),

  challenge({
    slug: '16-simple-theme-switcher',
    title: 'Simple Theme Switcher',
    difficulty: 'easy',
    topics: ['useState', 'CSS variables'],
    goals: ['Toggle light/dark with state', 'Apply theme via class or data attribute'],
    description: 'App shell with theme toggle. Persist choice in localStorage. Apply `data-theme` on document root.',
    requirements: ['Two themes minimum', 'Persist to localStorage', 'Initial read avoids flash when possible'],
    starter: `type Theme = 'light' | 'dark';`,
    hints: ['useEffect sync document.documentElement.dataset.theme', 'Read localStorage in lazy useState initializer'],
    acceptance: ['Toggle works', 'Persists across refresh', 'Styles change globally'],
    solutionApproach: 'Theme state drives data attribute; CSS variables switch palettes.',
    concepts: [
      { term: 'data-theme', detail: 'Attribute selectors enable global theming without prop drilling colors.' },
      { term: 'Lazy init', detail: 'useState(() => localStorage.getItem(...)) runs once.' },
    ],
    solution: `import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  return { theme, toggle };
}

export function ThemeSwitcher() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>Current: {theme}</button>;
}`,
    walkthrough: 'Effect mirrors theme to DOM and storage whenever state changes.',
    mistakes: ['Only styling body inline', 'SSR mismatch without default'],
    stretch: ['System prefers-color-scheme', 'Three themes'],
  }),

  challenge({
    slug: '17-temperature-converter',
    title: 'Temperature Converter',
    difficulty: 'easy',
    topics: ['controlled inputs', 'derived state'],
    goals: ['Keep single source of truth', 'Convert C ↔ F bidirectionally'],
    description:
      'Two linked inputs: Celsius and Fahrenheit. Editing one updates the other using conversion formulas. Handle empty input gracefully.',
    requirements: [
      'F = C * 9/5 + 32',
      'Editing C updates F and vice versa',
      'Allow temporary empty field without NaN display',
    ],
    starter: `// Pick one canonical unit or track "last edited" field`,
    hints: [
      'Store { value: string, unit: "C" | "F" } for last edited field',
      'Or store celsius number | null and derive fahrenheit',
    ],
    acceptance: ['Bidirectional sync', 'No infinite loops', 'Empty allowed'],
    solutionApproach: 'Track which field was last edited and a string value; derive the other field.',
    concepts: [
      { term: 'Single source of truth', detail: 'Avoid storing both numbers independently—they desync.' },
      { term: 'Last-edited wins', detail: 'Canonical pattern for multi-unit converters.' },
    ],
    solution: `import { useState } from 'react';

const toF = (c: number) => (c * 9) / 5 + 32;
const toC = (f: number) => ((f - 32) * 5) / 9;

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');

  const fahrenheit =
    celsius === '' || Number.isNaN(Number(celsius))
      ? ''
      : String(Number((toF(Number(celsius))).toFixed(2)));

  const onC = (v: string) => setCelsius(v);
  const onF = (v: string) => {
    if (v === '') return setCelsius('');
    const n = Number(v);
    if (Number.isNaN(n)) return;
    setCelsius(String(Number(toC(n).toFixed(2))));
  };

  return (
    <div>
      <label>
        Celsius
        <input value={celsius} onChange={(e) => onC(e.target.value)} />
      </label>
      <label>
        Fahrenheit
        <input value={fahrenheit} onChange={(e) => onF(e.target.value)} />
      </label>
    </div>
  );
}`,
    walkthrough: 'Celsius string is canonical; Fahrenheit is derived on render unless user edits F which writes back to C.',
    mistakes: ['Two useState numbers updating each other in useEffect loop', 'Showing NaN'],
    stretch: ['Kelvin support', 'Input validation'],
  }),

  challenge({
    slug: '18-theme-toggle',
    title: 'Theme Toggle',
    difficulty: 'easy',
    topics: ['useState', 'toggle UI'],
    goals: ['Binary toggle pattern', 'Accessible switch semantics'],
    description:
      'Build an accessible theme toggle switch (not just a button) using `role="switch"` and `aria-checked`. Pair with icon sun/moon.',
    requirements: ['Keyboard operable (Space/Enter)', 'aria-checked reflects state', 'Visual switch animation'],
    starter: `<button role="switch" aria-checked={dark}>`,
    hints: ['onKeyDown for Space', 'Toggle with click'],
    acceptance: ['ARIA correct', 'Keyboard works', 'Theme applies'],
    solutionApproach: 'Switch is a button with switch role; state drives aria-checked and CSS.',
    concepts: [
      { term: 'role="switch"', detail: 'Communicates binary on/off to assistive tech.' },
      { term: 'aria-checked', detail: 'Required mirror of toggle state.' },
    ],
    solution: `import { useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      className={dark ? 'switch on' : 'switch'}
      onClick={() => setDark((d) => !d)}
    >
      <span aria-hidden>{dark ? '🌙' : '☀️'}</span>
    </button>
  );
}`,
    walkthrough: 'Button acts as switch; aria-checked updates; CSS class drives track/thumb.',
    mistakes: ['Using checkbox without label', 'Missing aria-checked'],
    stretch: ['Connect to useTheme hook', 'Motion-reduced styles'],
  }),

  challenge({
    slug: '19-use-toggle-hook',
    title: 'useToggle Hook',
    difficulty: 'easy',
    topics: ['custom hooks', 'useState', 'useCallback'],
    goals: ['Return stable API for boolean toggling', 'Support imperative set/on/off'],
    description:
      'Implement `useToggle(initial)` returning `[value, { toggle, set, on, off }]`. Use it in a panel show/hide demo.',
    requirements: [
      'toggle flips boolean',
      'on sets true, off sets false',
      'set accepts boolean directly',
      'Memoize handlers with useCallback',
    ],
    starter: `export function useToggle(initial = false) {}`,
    hints: ['useCallback depends on [] if using functional setState', 'Return tuple or object—document API'],
    acceptance: ['All methods work', 'Handlers stable across renders'],
    solutionApproach: 'useState plus useCallback wrappers for ergonomic boolean control.',
    concepts: [
      { term: 'Custom hook', detail: 'Extract reusable stateful logic; name starts with use.' },
      { term: 'useCallback', detail: 'Stable function identities for memoized children.' },
    ],
    solution: `import { useCallback, useState } from 'react';

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const set = useCallback((v: boolean) => setValue(v), []);

  return [value, { toggle, on, off, set }] as const;
}

export function CollapsiblePanel() {
  const [open, { toggle, off }] = useToggle(false);
  return (
    <div>
      <button onClick={toggle}>{open ? 'Hide' : 'Show'}</button>
      {open && (
        <section>
          <p>Content</p>
          <button onClick={off}>Close</button>
        </section>
      )}
    </div>
  );
}`,
    walkthrough: 'Hook encapsulates boolean state and verbs; panel consumes destructured API.',
    mistakes: ['Returning new object every render without memo (breaks memo children)', 'Naming hook Toggle without use prefix'],
    stretch: ['Add toggleWithAnimation delay', 'useToggle with reducer'],
  }),
];
