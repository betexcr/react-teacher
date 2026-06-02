export type JsBasicsTopic = {
  title: string;
  explanation: readonly string[];
  code: string;
};

export const jsBasicsTopics: readonly JsBasicsTopic[] = [
  {
    title: 'Variables',
    explanation: [
      'Variables store values you use later — a count, a name, a list of todos.',
      'Use `const` when the binding will not change (you will not assign a new value to that name). Use `let` when you need to assign again later — that is called reassigning: the same variable name gets a new value, like changing name from `"Ada"` to `"Alan"`.',
      'Do not use `var` in new code. In React, most values live in state (`useState`), but you still use `const`/`let` for locals, loop variables, and helpers.',
    ],
    code: `const count = 0;        // count always points to 0
let name = 'Ada';       // name can be changed later
name = 'Alan';          // reassign: same variable, new value`,
  },
  {
    title: 'Functions & arrows',
    explanation: [
      'Functions are reusable blocks of code. You call them with parentheses and pass inputs called arguments.',
      'Arrow functions (`=>`) are shorter and show up everywhere in React — event handlers, `.map` callbacks, and custom hooks. If the body is one expression, you can omit `return` and braces.',
    ],
    code: `function add(a, b) { return a + b; }
const double = (n) => n * 2;           // implicit return
items.map((item) => item.id)             // one arg, return item.id`,
  },
  {
    title: 'Objects & destructuring',
    explanation: [
      'Objects group related fields: `{ id: 1, name: "Sam" }`. React props and state are often objects or arrays of objects.',
      'Destructuring pulls fields out in one line instead of writing `user.name` repeatedly. In components, props arrive as an object — you destructure in the parameter list.',
    ],
    code: `const user = { id: 1, name: 'Sam' };
const { name, id } = user;               // same as user.name, user.id
function Card({ title, done }: { title: string; done: boolean }) {
  // title and done come from props
}`,
  },
  {
    title: 'Arrays: map, filter, spread',
    explanation: [
      '`map` runs a function on each item and returns a new array (great for rendering lists in JSX). `filter` keeps only items that pass a test.',
      'Spread (`...arr`) copies an array or object. React state updates must produce new arrays/objects — spread and `map` are how you add, remove, or update items without mutating the old array.',
    ],
    code: `const ids = items.map((x) => x.id);
const active = todos.filter((t) => !t.done);
const next = [...items, newItem];        // add one item
const updated = items.map((x) =>
  x.id === id ? { ...x, qty: x.qty + 1 } : x  // update one item
);`,
  },
  {
    title: 'Conditionals in JSX',
    explanation: [
      'Inside JSX you cannot write `if`/`else` statements directly in the middle of markup. Use expressions instead.',
      '`&&` means “render this only when the left side is true”. The ternary `? :` picks between two options. Both patterns show up in almost every challenge.',
    ],
    code: `{isLoading && <p>Loading…</p>}
{error ? <p>{error}</p> : <List data={data} />}
{count === 0 ? 'Empty' : count}`,
  },
  {
    title: 'Comparisons & booleans',
    explanation: [
      'Use `===` to compare values (not `==`, which coerces types and causes bugs). Expressions like `count === 0` evaluate to true or false.',
      'Combine conditions with `&&` (and) and `||` (or). `!` flips true to false — common for toggles, validation, and conditional JSX in React components.',
    ],
    code: `if (count === 0) { /* disabled when zero */ }
const canSubmit = email.includes('@') && !loading;
!done && <Badge />   // render Badge when done is false`,
  },
  {
    title: 'Template strings',
    explanation: [
      'Template strings use backticks instead of quotes. `${expression}` inserts a value into the string.',
      'Useful for dynamic text, API URLs with query params, and class names built from state.',
    ],
    code: '`Hello, ${name}!`\n`/api/users?page=${page}`',
  },
  {
    title: 'Optional chaining',
    explanation: [
      'When data comes from an API, nested fields might be missing. `user.profile.avatar` throws an error if `profile` is undefined.',
      'Optional chaining (`?.`) stops safely and returns undefined instead of crashing. In React, you often use this right after `fetch`, before copying data into state or rendering JSX.',
    ],
    code: `user?.profile?.avatar   // undefined if user or profile is missing
response?.data?.length`,
  },
  {
    title: 'Async: fetch & await',
    explanation: [
      'Network requests take time. `fetch(url)` returns a Promise — a value that completes later.',
      '`async`/`await` lets you write asynchronous code in a straight line: `await` pauses until the response arrives, then you parse JSON. Pair with loading and error state in React (see the Fetching Data challenge).',
    ],
    code: `async function loadUsers() {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Failed');
  return res.json();   // parse body as JSON
}`,
  },
  {
    title: 'Promises (.then)',
    explanation: [
      'Before `async`/`await`, the same flow used `.then` for “when done” and `.catch` for errors. You will still see this style in older examples.',
      '`fetch(url).then(...).catch(...)` is equivalent to `try`/`await` with async functions — same idea, different syntax.',
    ],
    code: `fetch(url)
  .then((r) => r.json())   // when response arrives, parse JSON
  .then(setUsers)          // pass result to state setter
  .catch(setError);        // if anything failed`,
  },
  {
    title: 'Modules (import / export)',
    explanation: [
      'Each file can export values; other files import them. React components are usually one export per file.',
      'Named export: `export function Counter`. Default export: one main export per file (often `App`). Import hooks from `"react"` the same way.',
    ],
    code: `export function Counter() {}
export default App;
import { useState } from 'react';`,
  },
  {
    title: 'Handlers: reference vs call',
    explanation: [
      '`onClick={save}` passes the function to React — React calls it when the user clicks.',
      '`onClick={save()}` calls `save` immediately on every render — wrong for buttons. Use `() => save()` or `() => setCount(c => c + 1)` when you need to pass arguments or wrap an update.',
    ],
    code: `<button onClick={() => setCount((c) => c + 1)}>+</button>
<button onClick={handleClick}>OK</button>   // no () here`,
  },
  {
    title: 'Never mutate state',
    explanation: [
      'Mutating means changing an array or object in place — `push`, direct property assignment, `qty++`. React compares references; if you mutate, React may not detect a change and the UI will not update.',
      'Always create a new array or object: spread, `map`, `filter`. That is why easy challenges stress immutable updates.',
    ],
    code: `// bad: items.push(x); item.qty++
// good:
setItems([...items, x]);
setItems(items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));`,
  },
  {
    title: 'Types (TypeScript lite)',
    explanation: [
      'Challenge starters often use TypeScript. `type` describes the shape of an object; `useState<Item[]>` means “array of Item”.',
      'You do not need to master TypeScript — read the types as documentation for what fields exist (`id`, `name`, `price`, etc.) and match them in your code.',
    ],
    code: `type Item = { id: string; name: string; price: number };
const [items, setItems] = useState<Item[]>([]);`,
  },
];
