/** Tooltips for important tokens in challenge solution code. */
export type SolutionCodeTermId =
  | 'useState'
  | 'useEffect'
  | 'useRef'
  | 'useCallback'
  | 'useMemo'
  | 'useReducer'
  | 'useContext'
  | 'stateSetter'
  | 'updaterFn'
  | 'useEffectCleanup'
  | 'fetch'
  | 'abortController'
  | 'promiseChain'
  | 'jsxReturn'
  | 'jsxConditional'
  | 'jsxTernary'
  | 'mapList'
  | 'keyProp'
  | 'onClick'
  | 'onChange'
  | 'controlledInput'
  | 'disabledProp'
  | 'ariaLive'
  | 'roleAlert'
  | 'spread'
  | 'filter'
  | 'exportComponent'
  | 'reactImport'
  | 'typescriptType'
  | 'propsDestructuring'
  | 'createContext'
  | 'provider'
  | 'memo'
  | 'children'
  | 'refCurrent';

export const SOLUTION_CODE_LABELS: Record<SolutionCodeTermId, string> = {
  useState: 'useState',
  useEffect: 'useEffect',
  useRef: 'useRef',
  useCallback: 'useCallback',
  useMemo: 'useMemo',
  useReducer: 'useReducer',
  useContext: 'useContext',
  stateSetter: 'setState',
  updaterFn: 'updater fn',
  useEffectCleanup: 'effect cleanup',
  fetch: 'fetch',
  abortController: 'AbortController',
  promiseChain: '.then / .catch',
  jsxReturn: 'return JSX',
  jsxConditional: '&& render',
  jsxTernary: '? :',
  mapList: '.map()',
  keyProp: 'key',
  onClick: 'onClick',
  onChange: 'onChange',
  controlledInput: 'controlled input',
  disabledProp: 'disabled',
  ariaLive: 'aria-live',
  roleAlert: 'role="alert"',
  spread: 'spread ...',
  filter: '.filter()',
  exportComponent: 'export',
  reactImport: "from 'react'",
  typescriptType: 'TypeScript type',
  propsDestructuring: 'props',
  createContext: 'createContext',
  provider: 'Provider',
  memo: 'memo',
  children: 'children',
  refCurrent: '.current',
};

export const SOLUTION_CODE_TIPS: Record<SolutionCodeTermId, string> = {
  useState:
    'Hook that stores UI data between renders. Returns [value, setter] — call the setter to update and re-render.',
  useEffect:
    'Runs side effects after render: fetch data, subscriptions, timers. Can return a cleanup function.',
  useRef:
    'Mutable box that persists across renders without causing re-renders when changed. Often used for DOM nodes or instance values.',
  useCallback:
    'Caches a function identity between renders. Helps avoid re-running effects or unnecessary child re-renders when passed as a prop.',
  useMemo:
    'Caches a computed value until dependencies change. Skips expensive work on unrelated re-renders.',
  useReducer:
    'Like useState for complex updates: dispatch actions to a reducer function instead of many setters.',
  useContext:
    'Reads a value from a React context — share data (theme, user) without passing props through every level.',
  stateSetter:
    'setSomething from useState. Never assign to state directly (count = 1) — always call the setter so React updates the UI.',
  updaterFn:
    'setCount((c) => c + 1) uses the latest state from React. Safer than setCount(count + 1) when updates batch or chain.',
  useEffectCleanup:
    'Return a function from useEffect to cancel timers, abort fetch, or remove listeners when the component unmounts or before re-run.',
  fetch:
    'Browser API to request URLs. Returns a Promise. Pair with loading/error state and often AbortController in React.',
  abortController:
    'Cancel an in-flight fetch when the user navigates away or a new request replaces the old one — avoids setState on unmounted components.',
  promiseChain:
    '.then runs on success, .catch on failure, .finally always runs (e.g. turn off loading). Same flow as async/await.',
  jsxReturn:
    'Component functions return JSX — the UI tree React will render. Parentheses wrap multi-line markup.',
  jsxConditional:
    'condition && <Component /> renders only when condition is true — common for loading text or optional UI.',
  jsxTernary:
    'condition ? <A /> : <B /> picks one of two UI branches — good for error vs success views.',
  mapList:
    'Transforms each array item into JSX (usually <li>). The standard way to render lists in React.',
  keyProp:
    'Stable unique key per list item (often id). Helps React match rows correctly when the list reorders or updates.',
  onClick:
    'Pass a function reference — React calls it on click. Use () => fn() when you need to pass arguments.',
  onChange:
    'Fires when an input value changes. In controlled inputs, wire to setState so React owns the value.',
  controlledInput:
    'value comes from state and onChange updates state — React is the single source of truth for the input text.',
  disabledProp:
    'Declarative UI: disable a button from state (e.g. count === 0) instead of manually toggling DOM attributes.',
  ariaLive:
    'Screen readers announce updates when this region changes — useful for counters and dynamic status text.',
  roleAlert:
    'Marks error messages so assistive tech treats them as important announcements.',
  spread:
    '[...items, newItem] or {...obj, field: val} copies then updates — preferred over mutating state arrays/objects.',
  filter:
    'Returns a new array with only items that pass a test — e.g. hide completed todos without changing the original.',
  exportComponent:
    'Makes this component importable from other files — default export for App, named export for reusable pieces.',
  reactImport:
    'Hooks and React APIs come from the react package via your bundler — not global browser variables.',
  typescriptType:
    'Documents shape of data (fields on User, Item, etc.). Helps autocomplete and catch mistakes before runtime.',
  propsDestructuring:
    'Parameters like ({ title, onClose }) unpack props — same idea as function arguments for component inputs.',
  createContext:
    'Creates a context object for sharing values down the tree without prop drilling.',
  provider:
    'Wraps part of the tree and supplies a context value to all descendants that call useContext.',
  memo:
    'Wraps a component to skip re-render when props are unchanged — performance optimization for expensive children.',
  children:
    'Nested content passed between tags <Card>…</Card> — available as props.children inside Card.',
  refCurrent:
    'ref.current points at the DOM node (or value) stored in the ref — e.g. input.focus() in useEffect.',
};

/** Longer / more specific patterns first to reduce overlap. */
const CODE_PATTERNS: { id: SolutionCodeTermId; pattern: RegExp }[] = [
  { id: 'useEffectCleanup', pattern: /return\s+\(\)\s*=>/g },
  { id: 'abortController', pattern: /\bAbortController\b/g },
  { id: 'abortController', pattern: /\bAbortSignal\b/g },
  { id: 'useState', pattern: /\buseState\s*<[^>]+>/g },
  { id: 'useState', pattern: /\buseState\s*\(/g },
  { id: 'useEffect', pattern: /\buseEffect\s*\(/g },
  { id: 'useCallback', pattern: /\buseCallback\s*\(/g },
  { id: 'useMemo', pattern: /\buseMemo\s*\(/g },
  { id: 'useRef', pattern: /\buseRef\s*[<(]/g },
  { id: 'useReducer', pattern: /\buseReducer\s*\(/g },
  { id: 'useContext', pattern: /\buseContext\s*\(/g },
  { id: 'createContext', pattern: /\bcreateContext\s*[<(]/g },
  { id: 'reactImport', pattern: /\bfrom\s+['"]react['"]/g },
  { id: 'typescriptType', pattern: /\btype\s+[A-Z][a-zA-Z0-9]*/g },
  { id: 'typescriptType', pattern: /\binterface\s+[A-Z][a-zA-Z0-9]*/g },
  { id: 'exportComponent', pattern: /\bexport\s+(?:default\s+)?function\b/g },
  { id: 'exportComponent', pattern: /\bexport\s+function\b/g },
  { id: 'controlledInput', pattern: /\bvalue=\{/g },
  { id: 'propsDestructuring', pattern: /function\s+\w+\s*\(\s*\{[^}]+\}/g },
  { id: 'propsDestructuring', pattern: /\(\s*\{[^}]+\}\s*:/g },
  { id: 'stateSetter', pattern: /\bset[A-Z][a-zA-Z0-9]*\s*\(/g },
  { id: 'updaterFn', pattern: /\bset[A-Z][a-zA-Z0-9]*\s*\(\s*\([^)]*\)\s*=>/g },
  { id: 'promiseChain', pattern: /\.finally\s*\(/g },
  { id: 'promiseChain', pattern: /\.catch\s*\(/g },
  { id: 'promiseChain', pattern: /\.then\s*\(/g },
  { id: 'fetch', pattern: /\bfetch\s*\(/g },
  { id: 'ariaLive', pattern: /\baria-live\b/g },
  { id: 'roleAlert', pattern: /\brole=["']alert["']/g },
  { id: 'disabledProp', pattern: /\bdisabled=\{/g },
  { id: 'keyProp', pattern: /\bkey=\{/g },
  { id: 'onChange', pattern: /\bonChange=\{/g },
  { id: 'onClick', pattern: /\bonClick=\{/g },
  { id: 'mapList', pattern: /\.map\s*\(/g },
  { id: 'filter', pattern: /\.filter\s*\(/g },
  { id: 'spread', pattern: /\[\.\.\.[a-zA-Z_$][\w$]*/g },
  { id: 'spread', pattern: /\{\.\.\.[a-zA-Z_$][\w$]*/g },
  { id: 'provider', pattern: /\bProvider\b/g },
  { id: 'memo', pattern: /\bmemo\s*\(/g },
  { id: 'children', pattern: /\bchildren\b/g },
  { id: 'refCurrent', pattern: /\.current\b/g },
  { id: 'jsxTernary', pattern: /\?\s*<[\w]/g },
  { id: 'jsxConditional', pattern: /&&\s*<[\w]/g },
  { id: 'jsxReturn', pattern: /return\s*\(/g },
];

export function findSolutionCodeMatches(
  text: string,
): { start: number; end: number; id: SolutionCodeTermId; text: string }[] {
  const matches: { start: number; end: number; id: SolutionCodeTermId; text: string }[] = [];

  for (const { id, pattern } of CODE_PATTERNS) {
    const re = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`);
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      matches.push({
        start: m.index,
        end: m.index + m[0].length,
        id,
        text: m[0],
      });
    }
  }

  matches.sort((a, b) => a.start - b.start || b.end - a.end);

  const taken: typeof matches = [];
  let cursor = 0;
  for (const match of matches) {
    if (match.start < cursor) continue;
    taken.push(match);
    cursor = match.end;
  }

  return taken;
}

export function collectSolutionCodeTermIds(text: string): SolutionCodeTermId[] {
  const found = new Set<SolutionCodeTermId>();
  for (const m of findSolutionCodeMatches(text)) {
    found.add(m.id);
  }
  return [...found];
}
