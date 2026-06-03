import { JS_BASICS_TOPIC_COUNT } from './jsBasicsTopics';

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

/** Beginner-friendly guided tour — foundations first, then React-oriented topics. */
export const jsBasicsTutorialSteps: JsBasicsTutorialStep[] = [
  {
    id: 'welcome',
    focus: 'welcome',
    title: 'Welcome — zero JavaScript assumed',
    body: 'We start with the absolute basics: types, `<` and `<=`, `if`, loops, arrays — then build up to what React needs. Use Next to continue.',
    tip: 'Purple words on the page are React-only ideas. This tour explains JavaScript first, then how React uses it.',
  },
  // 0 Data types
  {
    id: 'dt-intro',
    focus: 'topic',
    topicIndex: 0,
    title: '1. Data types — what values can be',
    body: 'Numbers, text, true/false, lists, and grouped data are all different types. JavaScript picks the type from what you write — you do not label it unless you use TypeScript later.',
  },
  {
    id: 'dt-code',
    focus: 'code',
    topicIndex: 0,
    title: 'typeof checks',
    body: '`typeof 42` is `"number"`. `typeof "hi"` is `"string"`. Arrays show as `"object"` — that is normal.',
    codeHighlights: ['typeof', 'number', 'string', 'boolean'],
  },
  // 1 Operators
  {
    id: 'op-intro',
    focus: 'topic',
    topicIndex: 1,
    title: '2. Math and comparisons',
    body: '`<` means “less than”, `<=` “less than or equal”, `>` and `>=` the opposite way. `===` checks exact equality. These expressions become `true` or `false`.',
  },
  {
    id: 'op-code',
    focus: 'code',
    topicIndex: 1,
    title: 'See <, <=, ===',
    body: '`age < 18` is true when age is 17. `score === 100` is true only when score is exactly 100. Use `===`, not `==`.',
    codeHighlights: ['<', '>=', '===', '!=='],
  },
  // 2 Variables
  {
    id: 'v-intro',
    focus: 'topic',
    topicIndex: 2,
    title: '3. Variables = named storage',
    body: 'A variable is a name for a value — like labeling a box “count” and putting 0 inside.',
  },
  {
    id: 'v-code',
    focus: 'code',
    topicIndex: 2,
    title: 'const vs let',
    body: '`const` = do not reassign. `let` = you may assign again. `name = "Alan"` after `let name = "Ada"` is reassigning.',
    codeHighlights: ['const', 'let'],
    tip: 'Skip `var`. React uses `const`/`let` plus state for UI values.',
  },
  // 3 if/else
  {
    id: 'if-intro',
    focus: 'topic',
    topicIndex: 3,
    title: '4. if and else — choose a path',
    body: 'If the condition in parentheses is true, the first block runs. Otherwise `else` or `else if` runs. This is how programs make decisions.',
  },
  {
    id: 'if-code',
    focus: 'code',
    topicIndex: 3,
    title: 'if / else if / else',
    body: 'Read top to bottom: check `score >= 60`, then `>= 40`, else fail. Only one branch runs.',
    codeHighlights: ['if', 'else if', 'else'],
  },
  // 4 Loops
  {
    id: 'loop-intro',
    focus: 'topic',
    topicIndex: 4,
    title: '5. Loops — repeat code',
    body: '`for` counts with an index (`i++` adds 1). `while` repeats until the condition is false. Both are core JavaScript before you rely on `.map` in React.',
  },
  {
    id: 'loop-code',
    focus: 'code',
    topicIndex: 4,
    title: 'for and while',
    body: '`for (let i = 0; i < 3; i++)` runs 3 times with i = 0, 1, 2. The `while` loop does the same idea with `n++`.',
    codeHighlights: ['for', 'while', 'i++', 'n++'],
  },
  // 5 Arrays basics
  {
    id: 'arr-intro',
    focus: 'topic',
    topicIndex: 5,
    title: '6. Arrays — ordered lists',
    body: 'Items sit in order. First item is index `0`, not 1. `.length` tells you how many items exist.',
  },
  {
    id: 'arr-code',
    focus: 'code',
    topicIndex: 5,
    title: 'Index and length',
    body: '`nums[0]` is the first element. `nums[nums.length - 1]` is the last — a pattern you will use often.',
    codeHighlights: ['[0]', '.length'],
  },
  // 6 Multidimensional
  {
    id: 'md-intro',
    focus: 'topic',
    topicIndex: 6,
    title: '7. Grids and nested arrays',
    body: 'An array of arrays is a table or board. `grid[row][col]` picks one cell — row first, then column.',
  },
  {
    id: 'md-code',
    focus: 'code',
    topicIndex: 6,
    title: 'grid[row][col]',
    body: 'Tic-tac-toe boards and spreadsheets are often 2D arrays. `grid[0][0]` is top-left.',
    codeHighlights: ['grid[0][0]', 'grid[2][1]', 'matrix[1][0]'],
  },
  // 7 Functions
  {
    id: 'f-intro',
    focus: 'topic',
    topicIndex: 7,
    title: '8. Functions — reusable steps',
    body: 'Write once, call many times. React uses functions for components, clicks, and list rendering.',
  },
  {
    id: 'f-code',
    focus: 'code',
    topicIndex: 7,
    title: 'function and =>',
    body: 'Arrow `=>` is the modern short form you will see in every React file.',
    codeHighlights: ['function', '=>', '.map'],
  },
  // 8 Objects
  {
    id: 'o-intro',
    focus: 'topic',
    topicIndex: 8,
    title: '9. Objects — grouped fields',
    body: 'One object holds related properties. React props are objects passed to components.',
  },
  {
    id: 'o-code',
    focus: 'code',
    topicIndex: 8,
    title: 'Destructuring',
    body: '`{ name, id } = user` unpacks fields in one line — same idea as props in a component.',
    codeHighlights: ['{ name, id }', '{ title, done }'],
    tip: 'Props in React are read-only objects from parent to child.',
  },
  // 9 map filter spread
  {
    id: 'a-intro',
    focus: 'topic',
    topicIndex: 9,
    title: '10. map, filter, spread',
    body: 'Transform lists without manual `for` loops. React needs new arrays when state changes.',
  },
  {
    id: 'a-code',
    focus: 'code',
    topicIndex: 9,
    title: 'New arrays, not mutate',
    body: '`[...items, newItem]` copies then adds. `.map` updates one item immutably.',
    codeHighlights: ['.map', '.filter', '[...items'],
  },
  // 10 Logic
  {
    id: 'lg-intro',
    focus: 'topic',
    topicIndex: 10,
    title: '11. &&, ||, and !',
    body: 'Combine true/false checks: both true (`&&`), either true (`||`), opposite (`!`).',
  },
  {
    id: 'lg-code',
    focus: 'code',
    topicIndex: 10,
    title: 'Logic in conditions',
    body: '`canSubmit` needs email and password rules. `!isLoggedIn` means “not logged in.”',
    codeHighlights: ['&&', '||', '!'],
  },
  // 11 JSX conditionals
  {
    id: 'j-intro',
    focus: 'topic',
    topicIndex: 11,
    title: '12. Conditionals in JSX',
    body: 'No `if` inside markup — use `&&` and `? :` instead.',
  },
  {
    id: 'j-code',
    focus: 'code',
    topicIndex: 11,
    title: '&& and ternary',
    body: 'Show loading only when `isLoading` is true. Pick error or list with `? :`.',
    codeHighlights: ['&&', '?', ':'],
  },
  // 12 Template strings
  {
    id: 't-intro',
    focus: 'topic',
    topicIndex: 12,
    title: '13. Template strings',
    body: 'Backticks and `${value}` build strings with variables inside.',
  },
  {
    id: 't-code',
    focus: 'code',
    topicIndex: 12,
    title: '${expression}',
    body: 'Greetings and API URLs often use this pattern.',
    codeHighlights: ['${name}', '${page}'],
  },
  // 13 Optional chaining
  {
    id: 'oc-intro',
    focus: 'topic',
    topicIndex: 13,
    title: '14. Optional chaining ?.',
    body: 'Safe access when data from an API might be missing.',
  },
  {
    id: 'oc-code',
    focus: 'code',
    topicIndex: 13,
    title: '?.',
    body: 'Returns undefined instead of crashing if a step in the chain is missing.',
    codeHighlights: ['?.'],
  },
  // 14 Async
  {
    id: 'af-intro',
    focus: 'topic',
    topicIndex: 14,
    title: '15. fetch and await',
    body: 'Load data from the network; show loading and errors in React state.',
  },
  {
    id: 'af-code',
    focus: 'code',
    topicIndex: 14,
    title: 'async / await',
    body: '`await fetch` waits for the response, then `json()` parses it.',
    codeHighlights: ['async', 'await', 'fetch'],
    tip: 'Store results in state so the UI updates when data arrives.',
  },
  // 15 Promises
  {
    id: 'p-intro',
    focus: 'topic',
    topicIndex: 15,
    title: '16. Promises (.then)',
    body: 'Older style — same flow as async/await, different syntax.',
  },
  {
    id: 'p-code',
    focus: 'code',
    topicIndex: 15,
    title: 'then / catch',
    body: 'Chain steps when each finishes; `.catch` handles errors.',
    codeHighlights: ['.then', '.catch'],
  },
  // 16 Modules
  {
    id: 'm-intro',
    focus: 'topic',
    topicIndex: 16,
    title: '17. import / export',
    body: 'Split code across files; import hooks from `"react"`.',
  },
  {
    id: 'm-code',
    focus: 'code',
    topicIndex: 16,
    title: 'Modules',
    body: 'One default export per file is common for `App`.',
    codeHighlights: ['export', 'import', 'useState'],
  },
  // 17 Handlers
  {
    id: 'h-intro',
    focus: 'topic',
    topicIndex: 17,
    title: '18. Click handlers',
    body: 'Pass the function — do not call it with `()` on render.',
  },
  {
    id: 'h-code',
    focus: 'code',
    topicIndex: 17,
    title: 'onClick reference',
    body: 'Use `() =>` when you need to pass arguments to the handler.',
    codeHighlights: ['onClick', '() =>'],
  },
  // 18 Mutate
  {
    id: 'ms-intro',
    focus: 'topic',
    topicIndex: 18,
    title: '19. Never mutate state',
    body: 'Copy arrays and objects so React detects changes.',
  },
  {
    id: 'ms-code',
    focus: 'code',
    topicIndex: 18,
    title: 'spread and map',
    body: 'Avoid `push` on state arrays — build a new array instead.',
    codeHighlights: ['setItems', '[...items', '.map'],
  },
  // 19 Types
  {
    id: 'ty-intro',
    focus: 'topic',
    topicIndex: 19,
    title: '20. TypeScript lite',
    body: 'Types document shape — read them as hints, not something you must master day one.',
  },
  {
    id: 'ty-code',
    focus: 'code',
    topicIndex: 19,
    title: 'type and useState<Item[]>',
    body: 'Fields like `id`, `name`, `price` tell you what objects in challenges contain.',
    codeHighlights: ['type Item', 'useState<Item[]>'],
  },
  {
    id: 'finish',
    focus: 'finish',
    title: 'You toured all JS Basics!',
    body: `You covered all ${JS_BASICS_TOPIC_COUNT} topics from absolute basics through React patterns. Re-read any section, then try the easy challenges.`,
    tip: 'Hover purple highlights on the page for React vs plain JS comparisons.',
  },
];
