import { challenge } from './helpers.mjs';

export const mediumChallenges = [
  challenge({
    slug: '01-todo-list-manager',
    title: 'Todo List Manager',
    difficulty: 'medium',
    topics: ['useState', 'filtering', 'CRUD'],
    goals: ['CRUD on a collection', 'Filter tabs (all/active/done)'],
    description: 'Full todo app: add, toggle complete, delete, filter All/Active/Completed, and show remaining count.',
    requirements: ['Unique id per todo', 'Filters work', 'Footer shows items left', 'Clear completed button'],
    starter: `type Todo = { id: string; text: string; done: boolean };`,
    hints: ['Derive filtered list: todos.filter(...)', 'Toggle with map immutably'],
    acceptance: ['All CRUD works', 'Filters correct', 'Clear completed'],
    solutionApproach: 'Array state + filter enum; derived visible todos.',
    concepts: [
      { term: 'Derived UI lists', detail: 'Do not store filtered array—compute from todos + filter.' },
    ],
    solution: `import { useMemo, useState } from 'react';

type Todo = { id: string; text: string; done: boolean };
type Filter = 'all' | 'active' | 'completed';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setTodos((xs) => [...xs, { id: crypto.randomUUID(), text: t, done: false }]);
    setText('');
  };

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'completed') return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
      <button onClick={add}>Add</button>
      <ul>
        {visible.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} onChange={() => setTodos((xs) => xs.map((x) => x.id === t.id ? { ...x, done: !x.done } : x))} />
            {t.text}
            <button onClick={() => setTodos((xs) => xs.filter((x) => x.id !== t.id))}>×</button>
          </li>
        ))}
      </ul>
      <footer>{remaining} left</footer>
      {(['all','active','completed'] as Filter[]).map((f) => (
        <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
      ))}
      <button onClick={() => setTodos((xs) => xs.filter((x) => !x.done))}>Clear completed</button>
    </div>
  );
}`,
    walkthrough: 'useMemo avoids refiltering unnecessarily; CRUD uses immutable array ops.',
    mistakes: ['Storing filtered todos in state', 'Index keys'],
    stretch: ['localStorage sync', 'Drag reorder'],
  }),

  challenge({
    slug: '02-image-carousel',
    title: 'Image Carousel',
    difficulty: 'medium',
    topics: ['state', 'effects', 'a11y'],
    goals: ['Cycle slides with prev/next', 'Optional autoplay with pause on hover'],
    description: 'Carousel with images, indicators, prev/next, keyboard arrows, and autoplay every 5s (pause on hover/focus).',
    requirements: ['Wrap index with modulo', 'aria-live polite for slide title', 'Autoplay cleanup'],
    starter: `const slides = [{ src, alt, title }];`,
    hints: ['index = (index + 1) % slides.length', 'useEffect interval when autoplay enabled'],
    acceptance: ['Navigation works', 'Autoplay pauses', 'Keyboard support'],
    solutionApproach: 'Active index state; effects for timer; keydown listener.',
    concepts: [{ term: 'Modulo wrap', detail: 'Enables infinite carousel without duplicate slides.' }],
    solution: `import { useEffect, useState } from 'react';

const slides = [
  { src: '/1.jpg', alt: 'Mountains', title: 'Peaks' },
  { src: '/2.jpg', alt: 'Ocean', title: 'Sea' },
];

export function Carousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setI((n) => (n + 1) % slides.length);
  const prev = () => setI((n) => (n - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const slide = slides[i];
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <img src={slide.src} alt={slide.alt} />
      <p aria-live="polite">{slide.title}</p>
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
      {slides.map((_, idx) => (
        <button key={idx} aria-label={\`Go to slide \${idx + 1}\`} onClick={() => setI(idx)} />
      ))}
    </div>
  );
}`,
    walkthrough: 'Index wraps with modulo; autoplay effect depends on paused flag.',
    mistakes: ['Autoplay without cleanup', 'Missing alt text'],
    stretch: ['Touch swipe', 'Crossfade transition'],
  }),

  challenge({
    slug: '03-event-delegation',
    title: 'Event Delegation',
    difficulty: 'medium',
    topics: ['events', 'DOM'],
    goals: ['Handle events on parent for dynamic children', 'Use data attributes to identify targets'],
    description:
      'Render a dynamic list of buttons (add/remove). Use **one** click handler on `<ul>` to detect which item was clicked via `event.target` and `data-id`.',
    requirements: ['Single listener on list container', 'Works for newly added items without rebinding', 'Delete vs select actions'],
    starter: `<ul onClick={handleListClick}>`,
    hints: ['if (!(e.target instanceof HTMLElement)) return', 'const id = target.closest("[data-id]")?.getAttribute("data-id")'],
    acceptance: ['One delegated handler', 'Dynamic items work'],
    solutionApproach: 'Native event bubbling + closest to find actionable element.',
    concepts: [{ term: 'Event delegation', detail: 'Parent handles events from children—fewer listeners, dynamic-friendly.' }],
    solution: `import { useState } from 'react';

type Item = { id: string; label: string };

export function DelegatedList() {
  const [items, setItems] = useState<Item[]>([{ id: '1', label: 'Alpha' }]);

  const onListClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-action]');
    if (!target) return;
    const id = target.dataset.id!;
    const action = target.dataset.action;
    if (action === 'delete') setItems((xs) => xs.filter((x) => x.id !== id));
    if (action === 'select') alert(\`Selected \${id}\`);
  };

  return (
    <div>
      <button onClick={() => setItems((xs) => [...xs, { id: crypto.randomUUID(), label: 'New' }])}>Add</button>
      <ul onClick={onListClick}>
        {items.map((item) => (
          <li key={item.id} data-id={item.id}>
            {item.label}
            <button data-id={item.id} data-action="select">Select</button>
            <button data-id={item.id} data-action="delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    walkthrough: 'React synthetic events still bubble; closest finds button with data attributes.',
    mistakes: ['Attaching per-item listeners in useEffect', 'Not checking closest null'],
    stretch: ['Virtualized list with delegation', 'Touch events'],
  }),

  challenge({
    slug: '04-memoizing-expensive-calculation',
    title: 'Memoizing Expensive Calculation',
    difficulty: 'medium',
    topics: ['useMemo'],
    goals: ['Skip recomputation when deps unchanged', 'Identify expensive pure functions'],
    description:
      'Given a slow `fibonacci(n)` and slider input n, display result. Without useMemo UI stutters; with useMemo it is smooth. Compare both modes.',
    requirements: ['useMemo around fib(n)', 'Deps [n]', 'Show elapsed ms optional'],
    starter: `function fib(n: number): number { /* iterative slow */ }`,
    hints: ['useMemo(() => fib(n), [n])', 'Do not call fib directly in render without memo'],
    acceptance: ['Memoized path smooth', 'Changing unrelated state does not recompute'],
    solutionApproach: 'useMemo caches last result until n changes.',
    concepts: [{ term: 'useMemo', detail: 'Caches a computed value; not for side effects.' }],
    solution: `import { useMemo, useState } from 'react';

function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

export function FibDemo() {
  const [n, setN] = useState(35);
  const [unrelated, setUnrelated] = useState(0);

  const result = useMemo(() => fib(n), [n]);

  return (
    <div>
      <input type="range" min={25} max={40} value={n} onChange={(e) => setN(Number(e.target.value))} />
      <p>fib({n}) = {result}</p>
      <button onClick={() => setUnrelated((u) => u + 1)}>Rerender ({unrelated})</button>
    </div>
  );
}`,
    walkthrough: 'Bumping unrelated counter does not re-run fib because deps unchanged.',
    mistakes: ['useMemo with missing deps', 'Memoizing cheap ops (no benefit)'],
    stretch: ['useDeferredValue', 'Web worker'],
  }),

  challenge({
    slug: '05-form-validation',
    title: 'Form Validation',
    difficulty: 'medium',
    topics: ['forms', 'validation'],
    goals: ['Validate on blur and submit', 'Show field-level errors'],
    description: 'Registration form: username (3+ chars), email, password (8+ with number), confirm password match. Disable submit until valid.',
    requirements: ['Touched state per field', 'Errors only after blur or submit', 'Confirm password match rule'],
    starter: `type Errors = Partial<Record<'username' | 'email' | 'password' | 'confirm', string>>;`,
    hints: ['validate(values) returns errors object', 'onBlur sets touched[field]=true'],
    acceptance: ['Errors accurate', 'Submit blocked when invalid'],
    solutionApproach: 'Controlled fields + validate function + touched map.',
    concepts: [{ term: 'Touched vs dirty', detail: 'Improve UX by not showing errors immediately on type.' }],
    solution: `import { useState, FormEvent } from 'react';

function validate(v: Record<string, string>) {
  const e: Record<string, string> = {};
  if (v.username.length < 3) e.username = 'Min 3 characters';
  if (!v.email.includes('@')) e.email = 'Invalid email';
  if (!/\\d/.test(v.password) || v.password.length < 8) e.password = '8+ chars with number';
  if (v.password !== v.confirm) e.confirm = 'Passwords must match';
  return e;
}

export function RegisterForm() {
  const [values, setValues] = useState({ username: '', email: '', password: '', confirm: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const errors = validate(values);
  const show = (f: string) => touched[f] && errors[f];

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ username: true, email: true, password: true, confirm: true });
    if (Object.keys(errors).length) return;
    alert('OK');
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  return (
    <form onSubmit={onSubmit} noValidate>
      {(['username','email','password','confirm'] as const).map((f) => (
        <label key={f}>
          {f}
          <input value={values[f]} onChange={set(f)} onBlur={() => setTouched((t) => ({ ...t, [f]: true }))} />
          {show(f) && <span role="alert">{errors[f]}</span>}
        </label>
      ))}
      <button type="submit" disabled={Object.keys(errors).length > 0}>Register</button>
    </form>
  );
}`,
    walkthrough: 'errors recomputed each render; touched gates visibility; submit marks all touched.',
    mistakes: ['Validating only on submit', 'Storing errors in state redundantly'],
    stretch: ['react-hook-form', 'Zod schema'],
  }),

  challenge({
    slug: '06-nested-state-manager',
    title: 'Nested State Manager',
    difficulty: 'medium',
    topics: ['immutable updates', 'nested objects'],
    goals: ['Update deeply nested state safely', 'Use spread at each level'],
    description:
      'Settings panel: `user.profile.name`, `user.profile.avatar`, `user.preferences.notifications.email`. Update one leaf without mutating siblings.',
    requirements: ['Immutable updates at arbitrary depth', 'Helper updateProfile(path, value) optional', 'UI reflects nested structure'],
    starter: `const [user, setUser] = useState({ profile: { name: '', avatar: '' }, preferences: { notifications: { email: true } } });`,
    hints: ['setUser(u => ({ ...u, profile: { ...u.profile, name: v } }))', 'Consider useImmer for ergonomics'],
    acceptance: ['Leaf updates isolated', 'No mutation warnings'],
    solutionApproach: 'Spread each ancestor object when changing a nested field.',
    concepts: [{ term: 'Structural sharing', detail: 'New objects only along the path to the changed leaf.' }],
    solution: `import { useState } from 'react';

type User = {
  profile: { name: string; avatar: string };
  preferences: { notifications: { email: boolean; push: boolean } };
};

export function NestedSettings() {
  const [user, setUser] = useState<User>({
    profile: { name: 'Ada', avatar: '' },
    preferences: { notifications: { email: true, push: false } },
  });

  const setName = (name: string) =>
    setUser((u) => ({ ...u, profile: { ...u.profile, name } }));

  const setEmailNotif = (email: boolean) =>
    setUser((u) => ({
      ...u,
      preferences: {
        ...u.preferences,
        notifications: { ...u.preferences.notifications, email },
      },
    }));

  return (
    <div>
      <input value={user.profile.name} onChange={(e) => setName(e.target.value)} />
      <label>
        <input type="checkbox" checked={user.preferences.notifications.email} onChange={(e) => setEmailNotif(e.target.checked)} />
        Email notifications
      </label>
    </div>
  );
}`,
    walkthrough: 'Each setter copies every object from root to the changed property.',
    mistakes: ['user.profile.name = x directly', 'Shallow copy missing nested level'],
    stretch: ['use-immer', 'Normalized store'],
  }),

  challenge({
    slug: '07-state-history-manager',
    title: 'State History Manager',
    difficulty: 'medium',
    topics: ['useReducer', 'undo'],
    goals: ['Implement undo/redo stack', 'Separate present from past/future'],
    description: 'Canvas-like editor storing shapes array. Support Undo, Redo, and new actions that push history.',
    requirements: ['Undo restores previous state', 'Redo only after undo', 'New action clears redo stack'],
    starter: `type HistoryState<T> = { past: T[]; present: T; future: T[] };`,
    hints: ['Reducer with UNDO, REDO, SET actions', 'On SET: past.push(present), present=new, future=[]'],
    acceptance: ['Undo/redo correct', 'Branching history cleared'],
    solutionApproach: 'Classic past/present/future model with reducer.',
    concepts: [{ term: 'Undo stack', detail: 'Present is current; past is stack of snapshots.' }],
    solution: `import { useReducer } from 'react';

type History<T> = { past: T[]; present: T; future: T[] };

type Action<T> =
  | { type: 'SET'; payload: T }
  | { type: 'UNDO' }
  | { type: 'REDO' };

function historyReducer<T>(state: History<T>, action: Action<T>): History<T> {
  switch (action.type) {
    case 'SET':
      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: [],
      };
    case 'UNDO':
      if (!state.past.length) return state;
      return {
        past: state.past.slice(0, -1),
        present: state.past[state.past.length - 1],
        future: [state.present, ...state.future],
      };
    case 'REDO':
      if (!state.future.length) return state;
      return {
        past: [...state.past, state.present],
        present: state.future[0],
        future: state.future.slice(1),
      };
    default:
      return state;
  }
}

export function HistoryEditor() {
  const [state, dispatch] = useReducer(historyReducer<string[]>, {
    past: [],
    present: [],
    future: [],
  });

  const addShape = () =>
    dispatch({ type: 'SET', payload: [...state.present, 'shape-' + Date.now()] });

  return (
    <div>
      <button onClick={addShape}>Add</button>
      <button onClick={() => dispatch({ type: 'UNDO' })} disabled={!state.past.length}>Undo</button>
      <button onClick={() => dispatch({ type: 'REDO' })} disabled={!state.future.length}>Redo</button>
      <ul>{state.present.map((s) => <li key={s}>{s}</li>)}</ul>
    </div>
  );
}`,
    walkthrough: 'SET pushes present to past and clears future. UNDO/REDO shift stacks.',
    mistakes: ['Mutating past array', 'Forgetting to clear future on new edit'],
    stretch: ['Limit history depth', 'Command pattern with inverse ops'],
  }),

  challenge({
    slug: '08-advanced-theme-manager',
    title: 'Advanced Theme Manager',
    difficulty: 'medium',
    topics: ['themes', 'CSS variables'],
    goals: ['Multiple theme presets', 'Preview before apply'],
    description: 'Theme gallery with presets (ocean, forest, midnight). Preview pane shows components; Apply commits to document.',
    requirements: ['Draft vs applied theme', 'CSS variables per preset', 'Reset to system default'],
    starter: `const presets = { ocean: { '--bg': '#0af' }, ... };`,
    hints: ['Draft state in component; Apply copies to context/document', 'matchMedia for system'],
    acceptance: ['Preview differs from applied until Apply', 'Reset works'],
    solutionApproach: 'Draft/applied split prevents half-finished theme leaking globally.',
    concepts: [{ term: 'Design tokens', detail: 'Map presets to CSS custom properties.' }],
    solution: `import { useState } from 'react';

const presets: Record<string, Record<string, string>> = {
  ocean: { '--bg': '#e0f7fa', '--text': '#006064' },
  forest: { '--bg': '#e8f5e9', '--text': '#1b5e20' },
  midnight: { '--bg': '#121212', '--text': '#e0e0e0' },
};

function applyVars(vars: Record<string, string>) {
  Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
}

export function AdvancedThemeManager() {
  const [applied, setApplied] = useState('ocean');
  const [draft, setDraft] = useState(applied);

  const preview = presets[draft];
  const commit = () => {
    applyVars(presets[draft]);
    setApplied(draft);
  };

  return (
    <div>
      <select value={draft} onChange={(e) => setDraft(e.target.value)}>
        {Object.keys(presets).map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
      <div style={preview as React.CSSProperties} className="preview">Preview</div>
      <button onClick={commit}>Apply</button>
      <button onClick={() => { setDraft('ocean'); applyVars(presets.ocean); setApplied('ocean'); }}>Reset</button>
    </div>
  );
}`,
    walkthrough: 'Select updates draft only; Apply writes CSS variables globally.',
    mistakes: ['Applying on every select change without user confirm', 'Hardcoding colors in components'],
    stretch: ['Import/export JSON theme', 'Contrast checker'],
  }),

  challenge({
    slug: '09-use-async-hook',
    title: 'useAsync Hook',
    difficulty: 'medium',
    topics: ['custom hooks', 'async'],
    goals: ['Normalize async state machine', 'Handle race conditions'],
    description: 'Implement `useAsync(asyncFn, deps)` returning `{ status, data, error, execute, reset }`.',
    requirements: ['Statuses: idle | pending | success | error', 'Ignore stale responses', 'execute() triggers fetch'],
    starter: `export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {}`,
    hints: ['Increment requestId ref on each execute', 'Compare before setState'],
    acceptance: ['Race safe', 'Reset clears', 'Deps change refetches optional'],
    solutionApproach: 'Request id or AbortController discards outdated results.',
    concepts: [{ term: 'Stale closure', detail: 'Async responses may arrive after newer request—guard with id.' }],
    solution: `import { useCallback, useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'pending' | 'success' | 'error';

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const idRef = useRef(0);

  const execute = useCallback(async () => {
    const id = ++idRef.current;
    setStatus('pending');
    setError(null);
    try {
      const result = await fn();
      if (id === idRef.current) {
        setData(result);
        setStatus('success');
      }
    } catch (e) {
      if (id === idRef.current) {
        setError(e as Error);
        setStatus('error');
      }
    }
  }, deps);

  useEffect(() => { execute(); }, [execute]);

  const reset = () => {
    idRef.current++;
    setStatus('idle');
    setData(null);
    setError(null);
  };

  return { status, data, error, execute, reset };
}`,
    walkthrough: 'Each execute bumps id; only matching id may commit results.',
    mistakes: ['No stale guard', 'Missing error state'],
    stretch: ['AbortController', 'React Query comparison'],
  }),

  challenge({
    slug: '10-use-reducer-implementation',
    title: 'useReducer Implementation',
    difficulty: 'medium',
    topics: ['useReducer'],
    goals: ['Model complex transitions', 'Keep reducers pure'],
    description: 'Shopping checkout flow: cart items, step (cart → shipping → payment), and discounts. All transitions via reducer.',
    requirements: ['Actions: ADD_ITEM, SET_STEP, APPLY_COUPON', 'Reducer is pure', 'useReducer with optional init'],
    starter: `type State = { step: number; items: Item[]; coupon: string | null };`,
    hints: ['switch(action.type)', 'Keep side effects outside reducer'],
    acceptance: ['All transitions via dispatch', 'State consistent'],
    solutionApproach: 'Finite steps encoded in state; dispatch events.',
    concepts: [{ term: 'Reducer', detail: '(state, action) => newState — predictable updates.' }],
    solution: `import { useReducer } from 'react';

type State = { step: 'cart' | 'shipping' | 'payment'; total: number; coupon: string | null };
type Action =
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'COUPON'; code: string }
  | { type: 'SET_TOTAL'; total: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT':
      if (state.step === 'cart') return { ...state, step: 'shipping' };
      if (state.step === 'shipping') return { ...state, step: 'payment' };
      return state;
    case 'BACK':
      if (state.step === 'payment') return { ...state, step: 'shipping' };
      if (state.step === 'shipping') return { ...state, step: 'cart' };
      return state;
    case 'COUPON':
      return { ...state, coupon: action.code };
    case 'SET_TOTAL':
      return { ...state, total: action.total };
    default:
      return state;
  }
}

export function Checkout() {
  const [state, dispatch] = useReducer(reducer, { step: 'cart', total: 0, coupon: null });
  return (
    <div>
      <p>Step: {state.step}</p>
      <button onClick={() => dispatch({ type: 'BACK' })}>Back</button>
      <button onClick={() => dispatch({ type: 'NEXT' })}>Next</button>
    </div>
  );
}`,
    walkthrough: 'Reducer centralizes step transitions; UI only dispatches intentions.',
    mistakes: ['Side effects inside reducer', 'Mutating state'],
    stretch: ['Redux DevTools', 'Middleware logging'],
  }),

  challenge({
    slug: '11-pagination-implementation',
    title: 'Pagination Implementation',
    difficulty: 'medium',
    topics: ['pagination', 'fetch'],
    goals: ['Client or server pagination', 'Accessible page controls'],
    description: 'Fetch paginated posts (?_page=&_limit=) from JSONPlaceholder. Show page numbers, prev/next, and total pages.',
    requirements: ['Track page and pageSize', 'Disable prev on page 1', 'Show loading per page'],
    starter: `const [page, setPage] = useState(1);`,
    hints: ['API returns X-Total-Count header or fetch total separately', 'useEffect depends on [page]'],
    acceptance: ['Page changes refetch', 'Bounds respected'],
    solutionApproach: 'Page state drives fetch URL; derive totalPages from total count.',
    concepts: [{ term: 'Server pagination', detail: 'Only load current slice—essential for large data.' }],
    solution: `import { useEffect, useState } from 'react';

export function PaginatedPosts() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetch(\`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=\${limit}\`)
      .then((r) => {
        setTotal(Number(r.headers.get('X-Total-Count') || 100));
        return r.json();
      })
      .then(setPosts);
  }, [page]);

  const pages = Math.ceil(total / limit);

  return (
    <div>
      <ul>{posts.map((p: { id: number; title: string }) => <li key={p.id}>{p.title}</li>)}</ul>
      <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
      <span>{page} / {pages}</span>
      <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
}`,
    walkthrough:
      'Effect refetches when page changes; buttons disabled at edges. JSONPlaceholder may omit X-Total-Count—use a sensible fallback total for the demo.',
    mistakes: ['Client slicing huge dataset', 'Off-by-one on total pages', 'Assuming every API sends X-Total-Count'],
    stretch: ['Page size selector', 'Cursor-based pagination'],
  }),

  challenge({
    slug: '12-theme-context',
    title: 'Theme Context',
    difficulty: 'medium',
    topics: ['Context API'],
    goals: ['Provide theme via context', 'Consume with custom hook'],
    description: 'Create ThemeProvider, useTheme hook, and themed Button/Text children without prop drilling.',
    requirements: ['Context default safe', 'Provider holds theme + toggle', 'useTheme throws outside provider (optional)'],
    starter: `const ThemeContext = createContext(null);`,
    hints: ['useMemo value object to avoid rerenders', 'export function useTheme() { const ctx = useContext...}'],
    acceptance: ['Deep tree consumes theme', 'Toggle updates all'],
    solutionApproach: 'Context shares { theme, setTheme }; consumers read via hook.',
    concepts: [{ term: 'Context', detail: 'Broadcasts value to subtree without intermediate props.' }],
    solution: `import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Ctx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const value = useMemo(
    () => ({ theme, toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')) }),
    [theme]
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme outside ThemeProvider');
  return ctx;
}

export function ThemedButton() {
  const { theme, toggle } = useTheme();
  return <button data-theme={theme} onClick={toggle}>Toggle ({theme})</button>;
}`,
    walkthrough: 'Provider memoizes value; hook enforces correct usage.',
    mistakes: ['New object in Provider value each render', 'Overusing context for frequently changing data'],
    stretch: ['Split contexts: theme vs dispatch', 'useContextSelector'],
  }),

  challenge({
    slug: '13-radiogroup-component',
    title: 'RadioGroup Component',
    difficulty: 'medium',
    topics: ['a11y', 'composition'],
    goals: ['Build accessible radio group', 'Manage roving focus optional'],
    description: 'Controlled RadioGroup with options `{ value, label, disabled }`. Only one selected. Arrow keys move selection.',
    requirements: ['role="radiogroup"', 'Each option role="radio" aria-checked', 'Controlled value from parent'],
    starter: `type Option = { value: string; label: string; disabled?: boolean };`,
    hints: ['onKeyDown ArrowUp/Down changes value', 'Click sets value'],
    acceptance: ['Keyboard navigation', 'ARIA correct'],
    solutionApproach: 'Parent owns value; RadioGroup renders radios as buttons with radio role.',
    concepts: [{ term: 'Radio group pattern', detail: 'One name, one selected value—WAI-ARIA radiogroup.' }],
    solution: `type Option = { value: string; label: string; disabled?: boolean };

export function RadioGroup({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  label: string;
}) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = options.findIndex((o) => o.value === value);
    if (e.key === 'ArrowDown') onChange(options[(idx + 1) % options.length].value);
    if (e.key === 'ArrowUp') onChange(options[(idx - 1 + options.length) % options.length].value);
  };

  return (
    <div role="radiogroup" aria-label={label} onKeyDown={onKeyDown}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          disabled={o.disabled}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}`,
    walkthrough: 'Controlled value from parent; keyboard wraps selection index.',
    mistakes: ['Native radio without grouping label', 'Forgetting aria-checked'],
    stretch: ['Roving tabindex', 'RadioGroupContext for compound API'],
  }),

  challenge({
    slug: '14-fallback-ui-class-components',
    title: 'Fallback UI (Class Components)',
    difficulty: 'medium',
    topics: ['ErrorBoundary', 'class components'],
    goals: ['Catch render errors with error boundary', 'Show fallback UI'],
    description: 'Class-based ErrorBoundary wrapping a component that throws. Show fallback with retry button resetting error state.',
    requirements: ['getDerivedStateFromError or componentDidCatch', 'Retry resets state', 'Log error in didCatch'],
    starter: `class ErrorBoundary extends React.Component`,
    hints: ['static getDerivedStateFromError() => ({ hasError: true })', 'key prop reset on child to remount'],
    acceptance: ['Fallback shows on throw', 'Retry recovers'],
    solutionApproach: 'Only class components can be error boundaries today.',
    concepts: [{ term: 'Error boundary', detail: 'Catches child render errors—not event handlers or async.' }],
    solution: `import React, { Component, ReactNode } from 'react';

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
}`,
    walkthrough: 'Boundary flips hasError; retry clears flag so children render again.',
    mistakes: ['Trying functional component as boundary without library', 'Expecting to catch event errors'],
    stretch: ['react-error-boundary package', 'Report to Sentry'],
  }),

  challenge({
    slug: '15-handling-api-errors',
    title: 'Handling API Errors',
    difficulty: 'medium',
    topics: ['fetch', 'errors'],
    goals: ['Map HTTP status to user messages', 'Retry transient failures'],
    description: 'Data hook that distinguishes 404 vs 500 vs network error. UI shows message and Retry for 5xx.',
    requirements: ['Typed error object', 'Max 3 retries with backoff', '404 shows not found UI'],
    starter: `class ApiError extends Error { status: number }`,
    hints: ['if (!res.ok) throw new ApiError(res.status)', 'exponential backoff setTimeout'],
    acceptance: ['Statuses mapped', 'Retry limited'],
    solutionApproach: 'Throw structured errors; component branches on error.kind.',
    concepts: [{ term: 'Error taxonomy', detail: 'Users need different copy for not-found vs server vs offline.' }],
    solution: `async function fetchUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`);
  if (res.status === 404) throw Object.assign(new Error('Not found'), { status: 404 });
  if (!res.ok) throw Object.assign(new Error('Server error'), { status: res.status });
  return res.json();
}

export function UserProfile({ id }: { id: string }) {
  const { status, data, error, execute } = useAsync(() => fetchUser(id), [id]);

  if (status === 'error') {
    const e = error as Error & { status?: number };
    if (e.status === 404) return <p>User not found.</p>;
    return (
      <div>
        <p>Server error. Try again.</p>
        <button onClick={execute}>Retry</button>
      </div>
    );
  }
  if (status === 'pending') return <p>Loading…</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}`,
    walkthrough: 'Errors carry status; UI chooses message and whether retry makes sense.',
    mistakes: ['Generic "Error" for everything', 'Infinite retry loops'],
    stretch: ['Toast notifications', 'Error boundary for unexpected'],
  }),

  challenge({
    slug: '16-cache-management',
    title: 'Cache Management',
    difficulty: 'medium',
    topics: ['cache', 'useRef'],
    goals: ['Cache fetch results by key', 'Invalidate on demand'],
    description: 'Simple in-memory cache Map for API responses. `useCachedFetch(key, fetcher)` returns cached data if fresh (<60s).',
    requirements: ['TTL 60 seconds', 'invalidate(key) function', 'Share cache module-wide'],
    starter: `const cache = new Map<string, { data: unknown; ts: number }>();`,
    hints: ['Check Date.now() - ts < TTL', 'useState trigger after cache miss fetch'],
    acceptance: ['Second mount uses cache', 'Invalidate refetches'],
    solutionApproach: 'Module-level Map + timestamp; hook reads/writes cache.',
    concepts: [{ term: 'Stale-while-revalidate', detail: 'Show cached data while refreshing in background (stretch).' }],
    solution: `const cache = new Map<string, { data: unknown; ts: number }>();
const TTL = 60_000;

export function invalidate(key: string) {
  cache.delete(key);
}

export function useCachedFetch<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const hit = cache.get(key);
    if (hit && Date.now() - hit.ts < TTL) {
      setData(hit.data as T);
      return;
    }
    fetcher().then((d) => {
      cache.set(key, { data: d, ts: Date.now() });
      setData(d);
    });
  }, [key]);

  return data;
}`,
    walkthrough: 'Cache hit short-circuits network; invalidate deletes entry forcing refetch.',
    mistakes: ['Caching errors forever', 'No TTL'],
    stretch: ['LRU eviction', 'React Query'],
  }),

  challenge({
    slug: '17-reusable-tabs-component',
    title: 'Build a Reusable Tabs Component',
    difficulty: 'medium',
    topics: ['composition', 'a11y'],
    goals: ['Tabs with keyboard support', 'Controlled or uncontrolled mode'],
    description: 'Tabs, TabList, Tab, TabPanels pattern. Support controlled `activeIndex` and default uncontrolled.',
    requirements: ['aria-selected on tabs', 'Arrow keys switch tabs', 'Only active panel visible'],
    starter: `const TabsContext = createContext(...);`,
    hints: ['Tablist role tablist, tab role tab', 'tabpanel role tabpanel'],
    acceptance: ['Keyboard works', 'Controlled mode works'],
    solutionApproach: 'Context shares active index and setIndex; compound subcomponents.',
    concepts: [{ term: 'WAI-ARIA Tabs', detail: 'tablist > tab + tabpanel linkage via ids.' }],
    solution: `import { createContext, useContext, useState, ReactNode } from 'react';

const Ctx = createContext<{ index: number; setIndex: (i: number) => void } | null>(null);

export function Tabs({ children, index: controlled, onChange }: { children: ReactNode; index?: number; onChange?: (i: number) => void }) {
  const [internal, setInternal] = useState(0);
  const index = controlled ?? internal;
  const setIndex = (i: number) => {
    onChange?.(i);
    if (controlled === undefined) setInternal(i);
  };
  return <Ctx.Provider value={{ index, setIndex }}>{children}</Ctx.Provider>;
}

export function TabList({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>;
}

export function Tab({ i, children }: { i: number; children: ReactNode }) {
  const ctx = useContext(Ctx)!;
  return (
    <button role="tab" aria-selected={ctx.index === i} onClick={() => ctx.setIndex(i)}>
      {children}
    </button>
  );
}

export function TabPanel({ i, children }: { i: number; children: ReactNode }) {
  const ctx = useContext(Ctx)!;
  if (ctx.index !== i) return null;
  return <div role="tabpanel">{children}</div>;
}`,
    walkthrough: 'Controlled index prop overrides internal state; panels conditionally render.',
    mistakes: ['All panels visible', 'Missing aria roles'],
    stretch: ['Lazy mount panels', 'Vertical tabs'],
  }),

  challenge({
    slug: '18-share-state-with-context',
    title: 'Share State with Context',
    difficulty: 'medium',
    topics: ['Context', 'lifting state'],
    goals: ['Avoid prop drilling for auth-like state', 'Split read/write contexts optional'],
    description: 'Auth context: user, login, logout. Navbar shows user; Profile page edits name—all without drilling props.',
    requirements: ['AuthProvider at app root', 'useAuth hook', 'login sets mock user'],
    starter: `type User = { id: string; name: string } | null;`,
    hints: ['Separate AuthDispatch context to limit rerenders (advanced)'],
    acceptance: ['Any depth reads user', 'Logout clears'],
    solutionApproach: 'Provider stores user + actions object.',
    concepts: [{ term: 'Provider pattern', detail: 'Centralizes cross-cutting session state.' }],
    solution: `import { createContext, useContext, useState, ReactNode } from 'react';

type User = { id: string; name: string };
type Auth = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<Auth | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const value: Auth = {
    user,
    login: (name) => setUser({ id: '1', name }),
    logout: () => setUser(null),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth requires AuthProvider');
  return ctx;
}`,
    walkthrough: 'login/logout mutate user; consumers re-render when context value changes.',
    mistakes: ['Putting entire app in one context with fast-changing values', 'Not memoizing value'],
    stretch: ['Persist session', 'JWT decode mock'],
  }),

  challenge({
    slug: '19-memo-prevent-rerenders',
    title: 'Memo Usage: Prevent Unnecessary Re-renders',
    difficulty: 'medium',
    topics: ['React.memo', 'useCallback', 'useMemo'],
    goals: ['Identify avoidable child re-renders', 'Stabilize props'],
    description: 'Parent with fast-updating counter and expensive child list. Use React.memo + useCallback so list only rerenders when items change.',
    requirements: ['React.memo on child', 'Stable onItemClick with useCallback', 'Demonstrate with console.log render counts'],
    starter: `const List = React.memo(function List(...) {});`,
    hints: ['Deps [items] for callback', 'Do not inline objects as props'],
    acceptance: ['Counter updates do not rerender list', 'Item change does rerender'],
    solutionApproach: 'Memo child; memoize callbacks and derived data passed as props.',
    concepts: [
      { term: 'React.memo', detail: 'Shallow compare props; skip render if equal.' },
      { term: 'Referential equality', detail: 'New function/object props break memo.' },
    ],
    solution: `import { memo, useCallback, useState } from 'react';

const List = memo(function List({ items, onSelect }: { items: string[]; onSelect: (i: string) => void }) {
  console.log('List render');
  return (
    <ul>
      {items.map((i) => (
        <li key={i}><button onClick={() => onSelect(i)}>{i}</button></li>
      ))}
    </ul>
  );
});

export function MemoDemo() {
  const [count, setCount] = useState(0);
  const [items] = useState(['a', 'b', 'c']);
  const onSelect = useCallback((i: string) => alert(i), []);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <List items={items} onSelect={onSelect} />
    </div>
  );
}`,
    walkthrough: 'Counter clicks do not change items or onSelect reference—List skips render.',
    mistakes: ['Memo without stable props (useless)', 'Memo everything (premature)'],
    stretch: ['Profiler comparison', 'context selector libraries'],
  }),

  challenge({
    slug: '20-multi-step-form-persistent-state',
    title: 'Multi-step Form with Persistent State',
    difficulty: 'medium',
    topics: ['forms', 'state'],
    goals: ['Preserve answers across steps', 'Validate per step'],
    description: '3-step wizard (account → profile → review). Back keeps data. Persist draft to sessionStorage.',
    requirements: ['Single form state object', 'Per-step validation gate', 'sessionStorage restore on mount'],
    starter: `type FormData = { email: string; name: string; plan: string };`,
    hints: ['useEffect save JSON.stringify(form)', 'step++ only if validateStep(step) empty'],
    acceptance: ['Back preserves', 'Refresh restores draft'],
    solutionApproach: 'One state blob; step index; storage sync effect.',
    concepts: [{ term: 'Wizard state', detail: 'Keep one source of truth—not one state per step.' }],
    solution: `import { useEffect, useState } from 'react';

type FormData = { email: string; name: string; plan: string };
const KEY = 'wizard';

export function Wizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(() => {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { email: '', name: '', plan: 'free' };
  });

  useEffect(() => {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  }, [data]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <div>
      {step === 0 && (
        <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
      )}
      {step === 1 && (
        <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
      )}
      {step === 2 && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {step > 0 && <button onClick={back}>Back</button>}
      {step < 2 && <button onClick={next}>Next</button>}
    </div>
  );
}`,
    walkthrough: 'All fields live in data; step only controls which inputs render.',
    mistakes: ['Separate useState per step losing data', 'Not parsing storage safely'],
    stretch: ['Zod per-step schemas', 'Animate transitions'],
  }),

  challenge({
    slug: '21-multiple-contexts',
    title: 'Multiple Contexts',
    difficulty: 'medium',
    topics: ['Context'],
    goals: ['Compose multiple providers', 'Avoid unnecessary coupling'],
    description: 'App uses ThemeContext and LocaleContext (en/es). Components may consume one or both. Order providers correctly.',
    requirements: ['Nested providers', 'Hooks useTheme + useLocale', 'Changing locale does not reset theme'],
    starter: `export function AppProviders({ children }) { ... }`,
    hints: ['Combine in AppProviders component', 'Memoize context values separately'],
    acceptance: ['Both contexts work', 'Independent updates'],
    solutionApproach: 'Separate contexts for orthogonal concerns.',
    concepts: [{ term: 'Provider composition', detail: 'Nest providers; each concern isolated.' }],
    solution: `const LocaleContext = createContext<'en' | 'es'>('en');
const ThemeContext = createContext<'light' | 'dark'>('light');

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<'en' | 'es'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <ThemeContext.Provider value={theme}>
      <LocaleContext.Provider value={locale}>
        {children}
        <button onClick={() => setLocale((l) => (l === 'en' ? 'es' : 'en'))}>Lang</button>
        <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>Theme</button>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}`,
    walkthrough: 'Independent state in AppProviders; children subscribe only to contexts they use.',
    mistakes: ['One mega context object causing all consumers to rerender', 'Wrong provider order when dependencies exist'],
    stretch: ['Context selector', 'i18n library integration'],
  }),

  challenge({
    slug: '22-reusable-input-component',
    title: 'Build a Reusable Input Component',
    difficulty: 'medium',
    topics: ['components', 'forwardRef'],
    goals: ['Support labels, errors, icons', 'Forward refs to native input'],
    description: 'Input with label, hint, error message, optional left icon, sizes, and disabled state. Works in forms with ref forwarding.',
    requirements: ['forwardRef to input element', 'id/htmlFor wiring', 'aria-describedby for hint/error'],
    starter: `export const Input = forwardRef<HTMLInputElement, InputProps>(...)`,
    hints: ['const id = useId()', 'aria-invalid={!!error}'],
    acceptance: ['Ref focuses input', 'A11y wired'],
    solutionApproach: 'forwardRef + useId for associations.',
    concepts: [{ term: 'forwardRef', detail: 'Lets parents imperatively access DOM node.' }],
    solution: `import { forwardRef, useId } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, ...rest }, ref) => {
    const id = useId();
    const hintId = hint ? \`\${id}-hint\` : undefined;
    const errId = error ? \`\${id}-error\` : undefined;
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={[hintId, errId].filter(Boolean).join(' ') || undefined}
          {...rest}
        />
        {hint && <span id={hintId}>{hint}</span>}
        {error && <span id={errId} role="alert">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';`,
    walkthrough: 'useId links label, hint, error for screen readers.',
    mistakes: ['Spreading props before explicit ones incorrectly', 'Missing displayName'],
    stretch: ['Variants with cva', 'Password toggle'],
  }),

  challenge({
    slug: '23-reusable-button-component',
    title: 'Build a Reusable Button Component',
    difficulty: 'medium',
    topics: ['components', 'polymorphism'],
    goals: ['Variants and loading state', 'Polymorphic `as` prop optional'],
    description: 'Button supports variants primary/ghost/danger, sizes sm/md/lg, loading spinner disabling interaction, and icon slots.',
    requirements: ['aria-busy when loading', 'disabled when loading', 'Variant styles via data attributes or classes'],
    starter: `type ButtonProps = { variant?: 'primary' | 'ghost'; loading?: boolean };`,
    hints: ['className joins variant classes', 'Spinner with aria-hidden'],
    acceptance: ['Loading prevents double submit', 'Variants distinct'],
    solutionApproach: 'Single component composes class names and conditional spinner.',
    concepts: [{ term: 'aria-busy', detail: 'Announces loading state to assistive tech.' }],
    solution: `type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger';
  loading?: boolean;
};

export function Button({ variant = 'primary', loading, children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      className={\`btn btn--\${variant}\`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="spinner" aria-hidden />}
      {children}
    </button>
  );
}`,
    walkthrough: 'loading sets disabled and aria-busy; variant drives CSS modifier.',
    mistakes: ['Not disabling during load', 'Spinner without aria-hidden'],
    stretch: ['as="a" polymorphism', 'Icon-only button labels'],
  }),

  challenge({
    slug: '24-reusable-drawer-component',
    title: 'Build a Reusable Drawer Component',
    difficulty: 'medium',
    topics: ['portals', 'a11y'],
    goals: ['Slide-over panel with focus trap', 'Close on escape and overlay click'],
    description: 'Drawer opens from right; portals to document.body; traps focus; restores focus on close.',
    requirements: ['createPortal', 'role dialog aria-modal', 'Escape closes', 'Focus trap basic'],
    starter: `import { createPortal } from 'react-dom';`,
    hints: ['useEffect focus first element', 'return focus to trigger on close'],
    acceptance: ['Portal renders', 'Escape closes', 'Overlay click closes'],
    solutionApproach: 'Portal + dialog semantics + effect for focus management.',
    concepts: [{ term: 'Portal', detail: 'Renders outside parent DOM hierarchy—ideal for modals.' }],
    solution: `import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

export function Drawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    ref.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}`,
    walkthrough: 'Portal mounts overlay at body; stopPropagation keeps drawer clicks from closing.',
    mistakes: ['No focus return', 'Forgetting aria-modal'],
    stretch: ['Headless UI Dialog', 'Animate with CSS transitions'],
  }),

  challenge({
    slug: '25-tic-tac-toe-game',
    title: 'Build a Tic-Tac-Toe Game',
    difficulty: 'medium',
    topics: ['state', 'game logic'],
    goals: ['Immutable board updates', 'Detect win/draw'],
    description: 'Classic tic-tac-toe with move history list and jump to any past move (time travel optional).',
    requirements: ['3x3 board', 'Alternate X/O', 'Highlight winning line', 'Status message'],
    starter: `function calculateWinner(squares: (string|null)[])`,
    hints: ['Copy squares array on each move', 'History: array of boards'],
    acceptance: ['Win detected', 'Cannot play after win', 'History jump works'],
    solutionApproach: 'Board as array; map clicks to new board copies; calculateWinner pure function.',
    concepts: [{ term: 'Immutable board', detail: 'Enables undo/history by storing past boards.' }],
    solution: `function calculateWinner(squares: (string | null)[]) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  }
  return null;
}

export function TicTacToe() {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const squares = history[step];
  const xIsNext = step % 2 === 0;
  const winner = calculateWinner(squares);

  const play = (i: number) => {
    if (squares[i] || winner) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setHistory([...history.slice(0, step + 1), next]);
    setStep(step + 1);
  };

  return (
    <div>
      <p>{winner ? \`Winner: \${winner}\` : \`Next: \${xIsNext ? 'X' : 'O'}\`}</p>
      <div className="board">
        {squares.map((sq, i) => (
          <button key={i} onClick={() => play(i)}>{sq}</button>
        ))}
      </div>
      <ol>{history.map((_, i) => (
        <li key={i}><button onClick={() => setStep(i)}>Go to move {i}</button></li>
      ))}</ol>
    </div>
  );
}`,
    walkthrough: 'History stack stores boards; step indexes into history for time travel.',
    mistakes: ['Mutating squares array', 'Allowing moves after winner'],
    stretch: ['AI opponent minimax', 'Animated moves'],
  }),

  challenge({
    slug: '26-multi-theme-manager',
    title: 'Multi-Theme Manager',
    difficulty: 'medium',
    topics: ['Context', 'CSS'],
    goals: ['Combine system + custom themes', 'Sync across tabs'],
    description: 'Theme manager: light, dark, system, plus custom user theme from color pickers. Listen to storage events for multi-tab sync.',
    requirements: ['system uses matchMedia', 'custom theme saved to localStorage', 'storage event updates other tabs'],
    starter: `type ThemeMode = 'light' | 'dark' | 'system' | 'custom';`,
    hints: ['window.addEventListener("storage", ...)', 'resolved = system === dark ? dark : light'],
    acceptance: ['System tracks OS', 'Tabs stay in sync'],
    solutionApproach: 'Resolve effective theme; persist mode; storage listener for sync.',
    concepts: [{ term: 'storage event', detail: 'Fires in other tabs when localStorage changes.' }],
    solution: `import { useEffect, useState } from 'react';

type Mode = 'light' | 'dark' | 'system';

export function MultiThemeManager() {
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem('mode') as Mode) || 'system');

  useEffect(() => {
    localStorage.setItem('mode', mode);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const dark = mode === 'dark' || (mode === 'system' && mq.matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'mode' && e.newValue) setMode(e.newValue as Mode);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [mode]);

  return (
    <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}`,
    walkthrough: 'Effective theme derives from mode + system preference; storage event keeps tabs aligned.',
    mistakes: ['Only listening in same tab', 'Not updating when OS theme changes'],
    stretch: ['Custom CSS variables from color picker', 'Theme export JSON'],
  }),
];
