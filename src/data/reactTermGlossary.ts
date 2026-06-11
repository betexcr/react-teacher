/** React vocabulary: plain-JS contrast for JS Basics tooltips. */
export type ReactTermId =
  | 'react'
  | 'state'
  | 'useState'
  | 'stateSetter'
  | 'props'
  | 'component'
  | 'components'
  | 'jsx'
  | 'jsxComponent'
  | 'hooks'
  | 'customHooks'
  | 'rerender'
  | 'render'
  | 'eventHandler'
  | 'onClick'
  | 'reactImport';

export const REACT_TERM_LABELS: Record<ReactTermId, string> = {
  react: 'React',
  state: 'state',
  useState: 'useState',
  stateSetter: 'setState',
  props: 'props',
  component: 'component',
  components: 'components',
  jsx: 'JSX',
  jsxComponent: '<Component />',
  hooks: 'hooks',
  customHooks: 'custom hooks',
  rerender: 're-render',
  render: 'render',
  eventHandler: 'event handlers',
  onClick: 'onClick',
  reactImport: "import from 'react'",
};

export const REACT_TERM_TIPS: Record<ReactTermId, string> = {
  react:
    'Plain JS: you pick a DOM node and change it yourself. React: a library that builds UI from components + state, then updates the DOM when data changes.',
  state:
    'Plain JS: a variable holds a value; changing it does not update the screen unless you write DOM code. React state: changing it (via its setter) tells React to re-run your component and refresh the UI.',
  useState:
    'React hook — not built into JavaScript. Returns [value, setter]. Replaces let count + manual DOM updates for anything that should show on screen.',
  stateSetter:
    'The setSomething function from useState (setCount, setItems, …). Call this instead of count = 5 so React knows the UI may need to update.',
  props:
    'Plain JS: pass arguments to a function. React props: read-only inputs from parent to child component — like function args, but for UI pieces.',
  component:
    'A function (or class) that returns JSX. Plain JS has no component model; you would build HTML strings or DOM nodes by hand.',
  components:
    'Reusable UI pieces you compose together (<App />, <Button />). React calls them when rendering; plain JS has no equivalent syntax.',
  jsx:
    'Syntax that looks like HTML inside JavaScript. Compiles to React.createElement(...). Not a browser feature — needs a build step (Vite, etc.).',
  jsxComponent:
    'Uppercase JSX tags are your React components (<List />, <Badge />). Lowercase tags (<button>, <p>) are built-in HTML elements — still JSX, but not custom components.',
  hooks:
    'React functions whose names start with use (useState, useEffect, …). Only run inside components. Plain JS has no hooks — they add state and lifecycle to function components.',
  customHooks:
    'Your own useSomething functions that call other hooks. Share stateful logic between components; in plain JS you would duplicate logic without automatic re-renders.',
  rerender:
    'React runs your component function again with new state/props and reconciles the DOM. Plain JS: you would manually find and update every affected DOM node.',
  render:
    'In React: turning your component tree into DOM (or HTML on the server). Plain JS: you orchestrate every DOM update yourself.',
  eventHandler:
    'Plain JS: element.addEventListener("click", fn). React: pass fn to props like onClick={fn} — React wires it and normalizes the event object.',
  onClick:
    'React prop for click handling (camelCase, not onclick). React wraps the native event in a SyntheticEvent for consistent behavior across browsers.',
  reactImport:
    'Hooks and APIs live in the react package — not in the browser. import { useState } from "react" is bundler + npm, unlike fetch or console.',
};

const PROSE_PATTERNS: { id: ReactTermId; pattern: RegExp }[] = [
  { id: 'customHooks', pattern: /\bcustom hooks\b/gi },
  { id: 'useState', pattern: /\buseState(?:<[^>]+>)?\b/g },
  { id: 'reactImport', pattern: /\bfrom\s+['"]react['"]/g },
  { id: 'eventHandler', pattern: /\bevent handlers\b/gi },
  { id: 'onClick', pattern: /\bonClick\b/g },
  { id: 'components', pattern: /\bcomponents\b/gi },
  { id: 'component', pattern: /\bcomponent\b/gi },
  { id: 'rerender', pattern: /\bre-?render(?:s|ing|ed)?\b/gi },
  { id: 'jsx', pattern: /\bJSX\b/g },
  { id: 'hooks', pattern: /\bhooks\b/gi },
  { id: 'props', pattern: /\bprops\b/gi },
  { id: 'react', pattern: /\bReact\b/g },
  { id: 'state', pattern: /\bstate\b/gi },
  { id: 'render', pattern: /\brender(?:ing|s)?\b/gi },
];

const CODE_PATTERNS: { id: ReactTermId; pattern: RegExp }[] = [
  ...PROSE_PATTERNS,
  { id: 'stateSetter', pattern: /\bset[A-Z][a-zA-Z0-9]*\b/g },
  { id: 'jsxComponent', pattern: /<([A-Z][A-Za-z0-9]*)/g },
  { id: 'onClick', pattern: /\bon[A-Z][a-zA-Z]*=/g },
];

export const REACT_TERM_PHRASES = PROSE_PATTERNS;

function findTermIds(text: string, patterns: { id: ReactTermId; pattern: RegExp }[]): ReactTermId[] {
  const found = new Set<ReactTermId>();
  for (const { id, pattern } of patterns) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) found.add(id);
  }
  return [...found];
}

export function collectReactTermIds(text: string): ReactTermId[] {
  return findTermIds(text, CODE_PATTERNS);
}

export function findReactTermMatches(text: string): { start: number; end: number; id: ReactTermId; text: string }[] {
  const matches: { start: number; end: number; id: ReactTermId; text: string }[] = [];

  for (const { id, pattern } of PROSE_PATTERNS) {
    pattern.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(text)) !== null) {
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
