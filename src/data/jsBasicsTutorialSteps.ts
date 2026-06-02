export type TutorialFocus = 'welcome' | 'topic' | 'prose' | 'code' | 'legend' | 'finish';

export type JsBasicsTutorialStep = {
  id: string;
  focus: TutorialFocus;
  topicIndex?: number;
  proseIndex?: number;
  title: string;
  body: string;
  tip?: string;
  codeHighlights?: string[];
};

export function tutorialTargetId(step: JsBasicsTutorialStep): string {
  switch (step.focus) {
    case 'welcome':
      return 'js-basics-welcome';
    case 'finish':
      return 'js-basics-finish';
    case 'topic':
      return `js-basics-topic-${step.topicIndex}`;
    case 'prose':
      return `js-basics-topic-${step.topicIndex}-prose-${step.proseIndex ?? 0}`;
    case 'code':
      return `js-basics-topic-${step.topicIndex}-code`;
    case 'legend':
      return `js-basics-topic-${step.topicIndex}-legend`;
    default:
      return 'js-basics-welcome';
  }
}

/** Beginner-friendly guided tour — one small idea per step. */
export const jsBasicsTutorialSteps: JsBasicsTutorialStep[] = [
  {
    id: 'welcome',
    focus: 'welcome',
    title: 'Welcome — zero JavaScript assumed',
    body: 'This tour walks the whole JS Basics page one bite at a time. We highlight each section, explain it in plain English, and pulse the important code. Use Next to continue — you can exit anytime.',
    tip: 'Purple words on the page are React-only ideas. This tour explains both JavaScript and how React uses it.',
  },
  // 1 Variables
  {
    id: 'v-intro',
    focus: 'topic',
    topicIndex: 0,
    title: '1. Variables = named storage',
    body: 'A variable is just a name for a value — like labeling a box “count” and putting 0 inside. Programs read and change these boxes as they run.',
  },
  {
    id: 'v-const-let',
    focus: 'prose',
    topicIndex: 0,
    proseIndex: 1,
    title: 'const vs let',
    body: '`const` means “this name will always point to the same binding” — you cannot assign a new value to it. `let` means “I may assign again later.” Reassigning keeps the same name but swaps the value inside.',
    codeHighlights: ['const', 'let'],
  },
  {
    id: 'v-code',
    focus: 'code',
    topicIndex: 0,
    title: 'See it in code',
    body: 'Line 1: `count` stays 0 forever with `const`. Line 2–3: `name` starts as Ada, then becomes Alan — that second assignment is reassigning a `let`.',
    codeHighlights: ['const count', 'let name', "name = 'Alan'"],
    tip: 'Skip `var` in new code. React apps use `const`/`let` plus state for UI values.',
  },
  // 2 Functions
  {
    id: 'f-intro',
    focus: 'topic',
    topicIndex: 1,
    title: '2. Functions = reusable steps',
    body: 'A function is a named recipe. You write it once, then call it whenever you need that work — like a button that runs “add these numbers.”',
  },
  {
    id: 'f-code',
    focus: 'code',
    topicIndex: 1,
    title: 'Regular vs arrow functions',
    body: '`function add(a, b)` is the classic form. `(n) => n * 2` is an arrow function — shorter, and very common in React for clicks and list rendering.',
    codeHighlights: ['function add', '=>', '.map'],
  },
  // 3 Objects
  {
    id: 'o-intro',
    focus: 'topic',
    topicIndex: 2,
    title: '3. Objects = grouped fields',
    body: 'An object bundles related data: `{ id: 1, name: "Sam" }`. Instead of many separate variables, one object keeps them together — like a contact card.',
  },
  {
    id: 'o-code',
    focus: 'code',
    topicIndex: 2,
    title: 'Destructuring = unpack in one line',
    body: '`const { name, id } = user` pulls fields out of `user`. React components do the same with props: `{ title, done }` in the parameter list.',
    codeHighlights: ['const user', 'const { name, id }', '{ title, done }'],
    tip: 'Props in React are just objects passed from parent to child.',
  },
  // 4 Arrays
  {
    id: 'a-intro',
    focus: 'topic',
    topicIndex: 3,
    title: '4. Lists of things (arrays)',
    body: 'Arrays hold ordered lists — todos, products, messages. You rarely loop manually in React; you use `map` and `filter` to transform lists.',
  },
  {
    id: 'a-code',
    focus: 'code',
    topicIndex: 3,
    title: 'map, filter, spread',
    body: '`map` builds a new array from an old one. `filter` keeps matching items. `[...items, newItem]` copies then adds — React needs new arrays, not mutated ones.',
    codeHighlights: ['.map', '.filter', '[...items'],
  },
  // 5 Conditionals in JSX
  {
    id: 'j-intro',
    focus: 'topic',
    topicIndex: 4,
    title: '5. Showing things conditionally',
    body: 'In React markup (JSX), you pick what appears based on true/false — loading spinners, error messages, empty states.',
  },
  {
    id: 'j-code',
    focus: 'code',
    topicIndex: 4,
    title: '&& and ? : in JSX',
    body: '`condition && <Thing />` renders Thing only when condition is true. `a ? b : c` picks b or c. Curly braces `{ }` embed JavaScript inside JSX.',
    codeHighlights: ['&&', '?', ':'],
  },
  // 6 Comparisons
  {
    id: 'c-intro',
    focus: 'topic',
    topicIndex: 5,
    title: '6. True / false checks',
    body: 'Comparisons return boolean values (true or false). Buttons disable when count is zero; forms validate before submit.',
  },
  {
    id: 'c-code',
    focus: 'code',
    topicIndex: 5,
    title: '===, &&, ||, !',
    body: 'Always prefer `===` over `==`. Chain checks with `&&` and `||`. `!` means “not” — flip true to false.',
    codeHighlights: ['===', '&&', '||', '!'],
  },
  // 7 Template strings
  {
    id: 't-intro',
    focus: 'topic',
    topicIndex: 6,
    title: '7. Strings with values inside',
    body: 'Template strings use backticks and let you insert variables with `${name}`. Handy for greetings, URLs, and dynamic CSS classes.',
  },
  {
    id: 't-code',
    focus: 'code',
    topicIndex: 6,
    title: 'Backticks + ${}',
    body: 'Backticks (`) are not normal quotes. Anything inside `${...}` is evaluated and stitched into the string.',
    codeHighlights: ['${name}', '${page}'],
  },
  // 8 Optional chaining
  {
    id: 'oc-intro',
    focus: 'topic',
    topicIndex: 7,
    title: '8. Safe deep reads',
    body: 'API data may be incomplete. Reading `user.profile.avatar` crashes if `profile` is missing. Optional chaining stops safely.',
  },
  {
    id: 'oc-code',
    focus: 'code',
    topicIndex: 7,
    title: 'The ?. operator',
    body: '`user?.profile?.avatar` returns undefined instead of throwing. Use after fetch before you trust the shape of the response.',
    codeHighlights: ['?.'],
  },
  // 9 Async fetch
  {
    id: 'af-intro',
    focus: 'topic',
    topicIndex: 8,
    title: '9. Loading data from the internet',
    body: 'Websites fetch JSON from servers. That takes time — the page should show loading, then data, or an error.',
  },
  {
    id: 'af-code',
    focus: 'code',
    topicIndex: 8,
    title: 'async, await, fetch',
    body: '`fetch` starts a request. `await` pauses the function until the response arrives. `res.json()` turns text into a JavaScript object.',
    codeHighlights: ['async', 'await', 'fetch', '.json()'],
    tip: 'In React you store the result in state so the UI re-renders when data arrives.',
  },
  // 10 Promises
  {
    id: 'p-intro',
    focus: 'topic',
    topicIndex: 9,
    title: '10. Promises (.then)',
    body: 'Before async/await, chains of `.then` handled “when the data is ready.” Same idea — different spelling.',
  },
  {
    id: 'p-code',
    focus: 'code',
    topicIndex: 9,
    title: 'then and catch',
    body: 'Each `.then` runs when the previous step finishes. `.catch` handles failures. `setUsers` at the end is a React state setter.',
    codeHighlights: ['.then', '.catch', 'setUsers'],
  },
  // 11 Modules
  {
    id: 'm-intro',
    focus: 'topic',
    topicIndex: 10,
    title: '11. Splitting code across files',
    body: 'Each file can export functions or components. Other files import them. React apps are many small files wired together.',
  },
  {
    id: 'm-code',
    focus: 'code',
    topicIndex: 10,
    title: 'import / export',
    body: '`export` shares code. `import { useState } from "react"` pulls hooks from the React package — not from the browser itself.',
    codeHighlights: ['export', 'import', 'useState', "'react'"],
  },
  // 12 Handlers
  {
    id: 'h-intro',
    focus: 'topic',
    topicIndex: 11,
    title: '12. Click handlers',
    body: 'Buttons need functions that run on click. React passes your function reference — it does not call it immediately.',
  },
  {
    id: 'h-code',
    focus: 'code',
    topicIndex: 11,
    title: 'Reference vs call ()',
    body: '`onClick={handleClick}` — correct: React calls it on click. `onClick={save()}` — wrong: runs on every render. Use `() =>` when you need to pass arguments.',
    codeHighlights: ['onClick', '() =>', 'handleClick'],
  },
  // 13 Mutate state
  {
    id: 'ms-intro',
    focus: 'topic',
    topicIndex: 12,
    title: '13. Never mutate state',
    body: 'Do not push to arrays or change object fields directly when that data lives in React state. React compares references to detect changes.',
  },
  {
    id: 'ms-code',
    focus: 'code',
    topicIndex: 12,
    title: 'Copy, then replace',
    body: 'Bad: `items.push(x)`. Good: `setItems([...items, x])` or `map` to update one item. Always return a new array/object.',
    codeHighlights: ['setItems', '[...items', '.map'],
  },
  // 14 Types
  {
    id: 'ty-intro',
    focus: 'topic',
    topicIndex: 13,
    title: '14. TypeScript hints (lite)',
    body: 'Types describe shape: which fields exist on an object. You do not need to be a TypeScript expert — read types as inline documentation.',
  },
  {
    id: 'ty-code',
    focus: 'code',
    topicIndex: 13,
    title: 'type and useState<Item[]>',
    body: '`type Item = { id, name, price }` documents fields. `useState<Item[]>([])` means “array of Item, starting empty.”',
    codeHighlights: ['type Item', 'useState<Item[]>'],
  },
  {
    id: 'finish',
    focus: 'finish',
    title: 'You toured all JS Basics!',
    body: 'Scroll the page anytime for the full write-ups and purple React tooltips. When this feels familiar, jump into the easy React challenges.',
    tip: 'Stuck on a word? Hover purple highlights on the page for React vs plain JS comparisons.',
  },
];
