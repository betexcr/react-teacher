/**
 * Curated docs per challenge (2–4 links). Keys: `{difficulty}/{slug}`.
 * Prefer React learn guides + reference pages that match what the challenge practices.
 */

/** @type {Record<string, { title: string; url: string }[]>} */
export const CHALLENGE_RESOURCES = {
  // —— Easy ——
  'easy/01-counter-component': [
    { title: 'Adding Interactivity', url: 'https://react.dev/learn/adding-interactivity' },
    { title: 'useState – Reference', url: 'https://react.dev/reference/react/useState' },
    { title: 'Responding to Events', url: 'https://react.dev/learn/responding-to-events' },
  ],
  'easy/02-shopping-cart-state': [
    { title: 'Updating Arrays in State', url: 'https://react.dev/learn/updating-arrays-in-state' },
    { title: 'useState – Reference', url: 'https://react.dev/reference/react/useState' },
    { title: 'Updating Objects in State', url: 'https://react.dev/learn/updating-objects-in-state' },
  ],
  'easy/03-use-previous-hook': [
    { title: 'Referencing Values with Refs', url: 'https://react.dev/learn/referencing-values-with-refs' },
    { title: 'useRef – Reference', url: 'https://react.dev/reference/react/useRef' },
    { title: 'Reusing Logic with Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' },
  ],
  'easy/04-event-handling': [
    { title: 'Responding to Events', url: 'https://react.dev/learn/responding-to-events' },
    { title: 'React event objects', url: 'https://react.dev/reference/react-dom/components/common#react-event-object' },
    { title: 'useState – Reference', url: 'https://react.dev/reference/react/useState' },
  ],
  'easy/05-controlled-input-field': [
    { title: 'Controlled inputs', url: 'https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable' },
    { title: 'Textarea & select (controlled)', url: 'https://react.dev/reference/react-dom/components/textarea' },
    { title: 'Forms – React DOM', url: 'https://react.dev/reference/react-dom/components/form' },
  ],
  'easy/06-fetching-data': [
    { title: 'Fetching data with Effects', url: 'https://react.dev/learn/synchronizing-with-effects#fetching-data' },
    { title: 'useEffect – Reference', url: 'https://react.dev/reference/react/useEffect' },
    { title: 'You Might Not Need an Effect', url: 'https://react.dev/learn/you-might-not-need-an-effect' },
  ],
  'easy/07-dynamic-list-rendering': [
    { title: 'Rendering Lists', url: 'https://react.dev/learn/rendering-lists' },
    { title: 'Keys in lists', url: 'https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key' },
    { title: 'Conditional rendering', url: 'https://react.dev/learn/conditional-rendering' },
  ],
  'easy/08-use-interval-hook': [
    { title: 'Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects' },
    { title: 'Reusing Logic with Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' },
    { title: 'useEffect – Reference', url: 'https://react.dev/reference/react/useEffect' },
  ],
  'easy/09-component-composition': [
    { title: 'Passing Props to a Component', url: 'https://react.dev/learn/passing-props-to-a-component' },
    { title: 'Passing JSX as children', url: 'https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children' },
    { title: 'Your UI as a tree', url: 'https://react.dev/learn/understanding-your-ui-as-a-tree' },
  ],
  'easy/10-focus-input-useref': [
    { title: 'Manipulating the DOM with Refs', url: 'https://react.dev/learn/manipulating-the-dom-with-refs' },
    { title: 'useRef – Reference', url: 'https://react.dev/reference/react/useRef' },
    { title: 'Referencing Values with Refs', url: 'https://react.dev/learn/referencing-values-with-refs' },
  ],
  'easy/11-refactor-to-props': [
    { title: 'Passing Props to a Component', url: 'https://react.dev/learn/passing-props-to-a-component' },
    { title: 'Sharing State Between Components', url: 'https://react.dev/learn/sharing-state-between-components' },
    { title: 'Thinking in React', url: 'https://react.dev/learn/thinking-in-react' },
  ],
  'easy/12-build-a-clock': [
    { title: 'Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects' },
    { title: 'useEffect – Reference', url: 'https://react.dev/reference/react/useEffect' },
    { title: 'Removing Effects', url: 'https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed' },
  ],
  'easy/13-progress-bar-component': [
    { title: 'Passing Props to a Component', url: 'https://react.dev/learn/passing-props-to-a-component' },
    { title: 'ARIA: progressbar role', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role' },
    { title: 'Conditional rendering', url: 'https://react.dev/learn/conditional-rendering' },
  ],
  'easy/14-performance-monitoring': [
    { title: 'Profiler – Reference', url: 'https://react.dev/reference/react/Profiler' },
    { title: 'useEffect – Reference', url: 'https://react.dev/reference/react/useEffect' },
    { title: 'React Performance tools', url: 'https://react.dev/learn/react-developer-tools' },
  ],
  'easy/15-mouse-tracker': [
    { title: 'Adding Event Listeners in Effects', url: 'https://react.dev/learn/synchronizing-with-effects#adding-a-window-event-listener' },
    { title: 'useEffect – Reference', url: 'https://react.dev/reference/react/useEffect' },
    { title: 'Responding to Events', url: 'https://react.dev/learn/responding-to-events' },
  ],
  'easy/16-simple-theme-switcher': [
    { title: 'useState – Reference', url: 'https://react.dev/reference/react/useState' },
    { title: 'CSS custom properties (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties' },
    { title: 'Conditional rendering', url: 'https://react.dev/learn/conditional-rendering' },
  ],
  'easy/17-temperature-converter': [
    { title: 'Derived state (when to calculate during render)', url: 'https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state' },
    { title: 'Controlled inputs', url: 'https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable' },
    { title: 'Sharing State Between Components', url: 'https://react.dev/learn/sharing-state-between-components' },
  ],
  'easy/18-theme-toggle': [
    { title: 'useState – Reference', url: 'https://react.dev/reference/react/useState' },
    { title: 'Conditional rendering', url: 'https://react.dev/learn/conditional-rendering' },
    { title: 'Styling with class names', url: 'https://react.dev/learn/adding-interactivity#updating-the-dom-based-on-state' },
  ],
  'easy/19-use-toggle-hook': [
    { title: 'Reusing Logic with Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' },
    { title: 'useCallback – Reference', url: 'https://react.dev/reference/react/useCallback' },
    { title: 'useState – Reference', url: 'https://react.dev/reference/react/useState' },
  ],

  // —— Medium ——
  'medium/01-todo-list-manager': [
    { title: 'Updating Arrays in State', url: 'https://react.dev/learn/updating-arrays-in-state' },
    { title: 'Managing State', url: 'https://react.dev/learn/managing-state' },
    { title: 'Controlled inputs', url: 'https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable' },
  ],
  'medium/02-image-carousel': [
    { title: 'Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects' },
    { title: 'useState – Reference', url: 'https://react.dev/reference/react/useState' },
    { title: 'ARIA: carousel pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/' },
  ],
  'medium/03-event-delegation': [
    { title: 'Responding to Events', url: 'https://react.dev/learn/responding-to-events' },
    { title: 'Event delegation (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling' },
    { title: 'React event objects', url: 'https://react.dev/reference/react-dom/components/common#react-event-object' },
  ],
  'medium/04-memoizing-expensive-calculation': [
    { title: 'useMemo – Reference', url: 'https://react.dev/reference/react/useMemo' },
    { title: 'Keeping Components Pure', url: 'https://react.dev/learn/keeping-components-pure' },
    { title: 'You Might Not Need an Effect', url: 'https://react.dev/learn/you-might-not-need-an-effect' },
  ],
  'medium/05-form-validation': [
    { title: 'Forms – React DOM', url: 'https://react.dev/reference/react-dom/components/form' },
    { title: 'Controlled inputs', url: 'https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable' },
    { title: 'Managing State', url: 'https://react.dev/learn/managing-state' },
  ],
  'medium/06-nested-state-manager': [
    { title: 'Updating Objects in State', url: 'https://react.dev/learn/updating-objects-in-state' },
    { title: 'Immutable update patterns', url: 'https://react.dev/learn/updating-objects-in-state#write-immutable-update-logic-with-spread-syntax' },
    { title: 'useState – Reference', url: 'https://react.dev/reference/react/useState' },
  ],
  'medium/07-state-history-manager': [
    { title: 'Extracting State Logic into a Reducer', url: 'https://react.dev/learn/extracting-state-logic-into-a-reducer' },
    { title: 'useReducer – Reference', url: 'https://react.dev/reference/react/useReducer' },
    { title: 'Managing State', url: 'https://react.dev/learn/managing-state' },
  ],
  'medium/08-advanced-theme-manager': [
    { title: 'CSS custom properties (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties' },
    { title: 'useState – Reference', url: 'https://react.dev/reference/react/useState' },
    { title: 'Updating Objects in State', url: 'https://react.dev/learn/updating-objects-in-state' },
  ],
  'medium/09-use-async-hook': [
    { title: 'Reusing Logic with Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' },
    { title: 'Fetching data with Effects', url: 'https://react.dev/learn/synchronizing-with-effects#fetching-data' },
    { title: 'useEffect – Reference', url: 'https://react.dev/reference/react/useEffect' },
  ],
  'medium/10-use-reducer-implementation': [
    { title: 'Extracting State Logic into a Reducer', url: 'https://react.dev/learn/extracting-state-logic-into-a-reducer' },
    { title: 'useReducer – Reference', url: 'https://react.dev/reference/react/useReducer' },
    { title: 'Typing useReducer (TypeScript)', url: 'https://react.dev/learn/typescript#typing-usereducer' },
  ],
  'medium/11-pagination-implementation': [
    { title: 'Fetching data with Effects', url: 'https://react.dev/learn/synchronizing-with-effects#fetching-data' },
    { title: 'useEffect – Reference', url: 'https://react.dev/reference/react/useEffect' },
    { title: 'Managing State', url: 'https://react.dev/learn/managing-state' },
  ],
  'medium/12-theme-context': [
    { title: 'Passing Data Deeply with Context', url: 'https://react.dev/learn/passing-data-deeply-with-context' },
    { title: 'useContext – Reference', url: 'https://react.dev/reference/react/useContext' },
    { title: 'createContext – Reference', url: 'https://react.dev/reference/react/createContext' },
  ],
  'medium/13-radiogroup-component': [
    { title: 'Accessibility in React', url: 'https://react.dev/learn/accessibility' },
    { title: 'ARIA: radio group pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/radio/' },
    { title: 'Passing Props to a Component', url: 'https://react.dev/learn/passing-props-to-a-component' },
  ],
  'medium/14-fallback-ui-class-components': [
    { title: 'Error boundaries (learn)', url: 'https://react.dev/learn/error-boundaries' },
    { title: 'react-error-boundary', url: 'https://github.com/bvaughn/react-error-boundary' },
    { title: 'Error Boundaries (reference)', url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary' },
  ],
  'medium/15-handling-api-errors': [
    { title: 'Fetching data with Effects', url: 'https://react.dev/learn/synchronizing-with-effects#fetching-data' },
    { title: 'Conditional rendering', url: 'https://react.dev/learn/conditional-rendering' },
    { title: 'useEffect – Reference', url: 'https://react.dev/reference/react/useEffect' },
  ],
  'medium/16-cache-management': [
    { title: 'Referencing Values with Refs', url: 'https://react.dev/learn/referencing-values-with-refs' },
    { title: 'You Might Not Need an Effect', url: 'https://react.dev/learn/you-might-not-need-an-effect' },
    { title: 'Caching with useMemo', url: 'https://react.dev/reference/react/useMemo' },
  ],
  'medium/17-reusable-tabs-component': [
    { title: 'Passing JSX as children', url: 'https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children' },
    { title: 'ARIA: tabs pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/' },
    { title: 'Accessibility in React', url: 'https://react.dev/learn/accessibility' },
  ],
  'medium/18-share-state-with-context': [
    { title: 'Passing Data Deeply with Context', url: 'https://react.dev/learn/passing-data-deeply-with-context' },
    { title: 'Sharing State Between Components', url: 'https://react.dev/learn/sharing-state-between-components' },
    { title: 'useContext – Reference', url: 'https://react.dev/reference/react/useContext' },
  ],
  'medium/19-memo-prevent-rerenders': [
    { title: 'memo – Reference', url: 'https://react.dev/reference/react/memo' },
    { title: 'useCallback – Reference', url: 'https://react.dev/reference/react/useCallback' },
    { title: 'useMemo – Reference', url: 'https://react.dev/reference/react/useMemo' },
  ],
  'medium/20-multi-step-form-persistent-state': [
    { title: 'Managing State', url: 'https://react.dev/learn/managing-state' },
    { title: 'Forms – React DOM', url: 'https://react.dev/reference/react-dom/components/form' },
    { title: 'Lifting state up', url: 'https://react.dev/learn/sharing-state-between-components' },
  ],
  'medium/21-multiple-contexts': [
    { title: 'Passing Data Deeply with Context', url: 'https://react.dev/learn/passing-data-deeply-with-context' },
    { title: 'Scaling up with reducer and context', url: 'https://react.dev/learn/scaling-up-with-reducer-and-context' },
    { title: 'useContext – Reference', url: 'https://react.dev/reference/react/useContext' },
  ],
  'medium/22-reusable-input-component': [
    { title: 'forwardRef – Reference', url: 'https://react.dev/reference/react/forwardRef' },
    { title: 'Controlled inputs', url: 'https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable' },
    { title: 'Passing Props to a Component', url: 'https://react.dev/learn/passing-props-to-a-component' },
  ],
  'medium/23-reusable-button-component': [
    { title: 'Passing Props to a Component', url: 'https://react.dev/learn/passing-props-to-a-component' },
    { title: 'TypeScript: typing components', url: 'https://react.dev/learn/typescript#typing-component-props' },
    { title: 'Accessibility in React', url: 'https://react.dev/learn/accessibility' },
  ],
  'medium/24-reusable-drawer-component': [
    { title: 'createPortal – Reference', url: 'https://react.dev/reference/react-dom/createPortal' },
    { title: 'ARIA: dialog modal pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/' },
    { title: 'Accessibility in React', url: 'https://react.dev/learn/accessibility' },
  ],
  'medium/25-tic-tac-toe-game': [
    { title: 'Tutorial: Tic-Tac-Toe', url: 'https://react.dev/learn/tutorial-tic-tac-toe' },
    { title: 'Managing State', url: 'https://react.dev/learn/managing-state' },
    { title: 'Immutable board updates', url: 'https://react.dev/learn/tutorial-tic-tac-toe#checking-for-a-winner' },
  ],
  'medium/26-multi-theme-manager': [
    { title: 'Passing Data Deeply with Context', url: 'https://react.dev/learn/passing-data-deeply-with-context' },
    { title: 'CSS custom properties (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties' },
    { title: 'useContext – Reference', url: 'https://react.dev/reference/react/useContext' },
  ],

  // —— Hard ——
  'hard/01-timer-controls': [
    { title: 'Extracting State Logic into a Reducer', url: 'https://react.dev/learn/extracting-state-logic-into-a-reducer' },
    { title: 'useReducer – Reference', url: 'https://react.dev/reference/react/useReducer' },
    { title: 'useRef – Reference', url: 'https://react.dev/reference/react/useRef' },
  ],
  'hard/02-multi-step-form-branching': [
    { title: 'Managing State', url: 'https://react.dev/learn/managing-state' },
    { title: 'Forms – React DOM', url: 'https://react.dev/reference/react-dom/components/form' },
    { title: 'Choosing the State Structure', url: 'https://react.dev/learn/choosing-the-state-structure' },
  ],
  'hard/03-prevent-unnecessary-rerenders': [
    { title: 'memo – Reference', url: 'https://react.dev/reference/react/memo' },
    { title: 'useContext – Reference', url: 'https://react.dev/reference/react/useContext' },
    { title: 'Profiler – Reference', url: 'https://react.dev/reference/react/Profiler' },
  ],
  'hard/04-dynamic-form-fields': [
    { title: 'Updating Arrays in State', url: 'https://react.dev/learn/updating-arrays-in-state' },
    { title: 'Choosing the State Structure', url: 'https://react.dev/learn/choosing-the-state-structure' },
    { title: 'Forms – React DOM', url: 'https://react.dev/reference/react-dom/components/form' },
  ],
  'hard/05-art-drawing-tool': [
    { title: 'Manipulating the DOM with Refs', url: 'https://react.dev/learn/manipulating-the-dom-with-refs' },
    { title: 'Canvas API (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API' },
    { title: 'Responding to Events', url: 'https://react.dev/learn/responding-to-events' },
  ],

  // —— Very hard ——
  'very-hard/01-connect-four': [
    { title: 'Tutorial: Tic-Tac-Toe (state patterns)', url: 'https://react.dev/learn/tutorial-tic-tac-toe' },
    { title: 'Choosing the State Structure', url: 'https://react.dev/learn/choosing-the-state-structure' },
    { title: 'Updating Arrays in State', url: 'https://react.dev/learn/updating-arrays-in-state' },
  ],
  'very-hard/02-advanced-custom-hooks': [
    { title: 'Reusing Logic with Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' },
    { title: 'Rules of Hooks', url: 'https://react.dev/reference/rules/rules-of-hooks' },
    { title: 'Passing Props to a Component', url: 'https://react.dev/learn/passing-props-to-a-component' },
  ],
  'very-hard/03-list-virtualization': [
    { title: 'Rendering large lists (react-window)', url: 'https://github.com/bvaughn/react-window' },
    { title: 'Rendering Lists', url: 'https://react.dev/learn/rendering-lists' },
    { title: 'useMemo – Reference', url: 'https://react.dev/reference/react/useMemo' },
  ],
};

const TOPIC_LEARN_URLS = {
  useState: 'https://react.dev/reference/react/useState',
  useEffect: 'https://react.dev/reference/react/useEffect',
  useRef: 'https://react.dev/reference/react/useRef',
  useReducer: 'https://react.dev/reference/react/useReducer',
  useContext: 'https://react.dev/reference/react/useContext',
  useMemo: 'https://react.dev/reference/react/useMemo',
  useCallback: 'https://react.dev/reference/react/useCallback',
  'Context API': 'https://react.dev/learn/passing-data-deeply-with-context',
  Context: 'https://react.dev/learn/passing-data-deeply-with-context',
  'custom hooks': 'https://react.dev/learn/reusing-logic-with-custom-hooks',
  events: 'https://react.dev/learn/responding-to-events',
  SyntheticEvent: 'https://react.dev/reference/react-dom/components/common#react-event-object',
  'controlled components': 'https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable',
  'controlled inputs': 'https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable',
  forms: 'https://react.dev/reference/react-dom/components/form',
  ErrorBoundary: 'https://react.dev/learn/error-boundaries',
  'Profiler API': 'https://react.dev/reference/react/Profiler',
  fetch: 'https://react.dev/learn/synchronizing-with-effects#fetching-data',
  lists: 'https://react.dev/learn/rendering-lists',
  keys: 'https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key',
  composition: 'https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children',
  children: 'https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children',
  props: 'https://react.dev/learn/passing-props-to-a-component',
  a11y: 'https://react.dev/learn/accessibility',
  portals: 'https://react.dev/reference/react-dom/createPortal',
  forwardRef: 'https://react.dev/reference/react/forwardRef',
  'React.memo': 'https://react.dev/reference/react/memo',
  memo: 'https://react.dev/reference/react/memo',
  canvas: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API',
  performance: 'https://react.dev/reference/react/memo',
};

/**
 * @param {string} difficulty
 * @param {string} slug
 * @param {string[]} topics
 * @returns {{ title: string; url: string }[]}
 */
export function getChallengeResources(difficulty, slug, topics) {
  const key = `${difficulty}/${slug}`;
  if (CHALLENGE_RESOURCES[key]) {
    return CHALLENGE_RESOURCES[key];
  }

  const seen = new Set();
  const fromTopics = [];
  for (const topic of topics) {
    const url = TOPIC_LEARN_URLS[topic];
    if (!url || seen.has(url)) continue;
    seen.add(url);
    fromTopics.push({ title: `${topic} – React docs`, url });
    if (fromTopics.length >= 3) break;
  }

  if (fromTopics.length) return fromTopics;

  return [
    { title: 'React Learn', url: 'https://react.dev/learn' },
    { title: 'React Reference', url: 'https://react.dev/reference/react' },
  ];
}
