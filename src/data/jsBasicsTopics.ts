export type JsBasicsTopic = {
  title: string;
  explanation: readonly string[];
  code: string;
};

export const jsBasicsTopics: readonly JsBasicsTopic[] = [
  {
    title: 'Data types',
    explanation: [
      'Every value in JavaScript has a type. You do not declare types in plain JS (TypeScript adds that later) — the language figures it out from what you write.',
      'Common types: `number` (42, 3.14), `string` (`"hello"`), `boolean` (`true` / `false`), `null` (intentionally empty), `undefined` (not set yet), `object` (including plain objects and arrays).',
      'Use `typeof value` to check a type while learning. React mostly passes strings, numbers, booleans, arrays, and objects as props and state.',
    ],
    code: `typeof 42          // "number"
typeof 'hi'        // "string"
typeof true        // "boolean"
typeof null        // "object" (historic quirk)
typeof undefined   // "undefined"
typeof [1, 2]      // "object" (arrays are objects)`,
  },
  {
    title: 'Math & comparison operators',
    explanation: [
      'Math: `+` add, `-` subtract, `*` multiply, `/` divide, `%` remainder (e.g. `10 % 3` is 1).',
      'Comparisons return `true` or `false`: `<` less than, `>` greater than, `<=` less than or equal, `>=` greater than or equal.',
      '`===` means “same value and type” (use this). `!==` means “not equal”. Avoid `==` — it converts types and causes bugs.',
    ],
    code: `const age = 17;
age < 18           // true  (too young)
age >= 18          // false
score === 100      // strict equal
score !== 0        // not equal
total = price * qty + tax`,
  },
  {
    title: 'Variables (const & let)',
    explanation: [
      'Variables store values you use later — a count, a name, a list of todos.',
      'Use `const` when the binding will not change (you will not assign a new value to that name). Use `let` when you need to assign again later — that is called reassigning: the same variable name gets a new value, like changing name from `"Ada"` to `"Alan"`.',
      'Do not use `var` in new code. In React, most UI values live in state (`useState`), but you still use `const`/`let` for locals, loop variables, and helpers.',
    ],
    code: `const count = 0;        // count always points to 0
let name = 'Ada';       // name can be changed later
name = 'Alan';          // reassign: same variable, new value`,
  },
  {
    title: 'if, else, and conditions',
    explanation: [
      '`if (condition) { ... }` runs the block only when `condition` is true. Use `else` for the other path, and `else if` for more branches.',
      'The condition is usually a comparison (`age >= 18`) or a boolean variable (`isLoggedIn`). Curly braces `{ }` group multiple lines; one line can omit braces but beginners should keep them.',
      'React uses the same logic in JavaScript — and later you will mirror it in JSX with `&&` and `? :` instead of `if` inside markup.',
    ],
    code: `if (score >= 60) {
  console.log('Pass');
} else if (score >= 40) {
  console.log('Retake');
} else {
  console.log('Fail');
}

if (isOpen) toggle();`,
  },
  {
    title: 'Loops: for and while',
    explanation: [
      'Loops repeat code. `for` is common when you know how many times: `for (let i = 0; i < 5; i++)` — start at 0, stop before 5, add 1 each time (`i++`).',
      '`while (condition) { ... }` repeats while the condition stays true. Always make sure the condition eventually becomes false, or the loop runs forever.',
      'In React you often use `.map` on arrays instead of manual `for` loops to render lists — but `for`/`while` still appear in algorithms and non-UI scripts.',
    ],
    code: `for (let i = 0; i < 3; i++) {
  console.log(i);   // 0, then 1, then 2
}

let n = 0;
while (n < 3) {
  n++;              // same idea: stop when n reaches 3
}`,
  },
  {
    title: 'Arrays: lists and indexes',
    explanation: [
      'An array is an ordered list: `[10, 20, 30]`. Indexes start at `0` — first item is `arr[0]`, second is `arr[1]`. `arr.length` is how many items.',
      'Arrays can hold any types, even mixed. You will store lists of todos, users, or products — then loop or `.map` over them in React.',
      'Read and update by index while learning; in React state prefer copying the whole array (spread / `map`) instead of mutating in place.',
    ],
    code: `const nums = [10, 20, 30];
nums[0]              // 10 (first)
nums[1]              // 20
nums.length          // 3

const names = ['Ada', 'Alan'];
names[names.length - 1]   // last item: 'Alan'`,
  },
  {
    title: 'Multidimensional arrays',
    explanation: [
      'An array can contain other arrays — like a grid or table: `[[1, 2], [3, 4]]`. Access with two indexes: `grid[0][1]` is row 0, column 1 → `2`.',
      'Useful for boards (tic-tac-toe), tables, or grouped data. Each “row” is an array; the outer array holds all rows.',
      'In React you might map over rows, then map over cells — or flatten to a list of objects with `id` fields instead of raw 2D arrays.',
    ],
    code: `const grid = [
  ['X', 'O', ''],
  ['', 'X', 'O'],
  ['O', '', 'X'],
];
grid[0][0]           // 'X' — row 0, col 0
grid[2][1]           // ''  — row 2, col 1

const matrix = [[1, 2], [3, 4]];
matrix[1][0]         // 3`,
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
    title: 'Logic: &&, ||, and !',
    explanation: [
      'Beyond comparisons, you combine booleans: `&&` (and — both must be true), `||` (or — at least one true), `!` (not — flip true/false).',
      'Example: `email.includes("@") && !loading` means “valid-looking email and not currently loading.” These show up in validation and conditional UI.',
      'In JSX you will also use `&&` to render something only when a condition is true — see the next section.',
    ],
    code: `const canSubmit = email.includes('@') && password.length >= 8;
const showGuest = !isLoggedIn;
const label = error || 'OK';   // use error message, or 'OK' if empty

if (count === 0) { /* disabled when zero */ }`,
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

export const JS_BASICS_TOPIC_COUNT = jsBasicsTopics.length;
