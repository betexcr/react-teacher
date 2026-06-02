/**
 * Beginner-friendly acceptance criteria per challenge.
 * Keys: `{difficulty}/{slug}`. Each entry is an array of { summary, detail }.
 */

const a = (summary, detail) => ({ summary, detail });

/** @type {Record<string, { summary: string; detail: string }[]>} */
export const CHALLENGE_ACCEPTANCE = {
  // —— Easy ——
  'easy/01-counter-component': [
    a(
      'Count updates on each click',
      'Click the increment button several times and confirm the number on screen goes up by one each time. This shows your state updates correctly when the user interacts with the app.'
    ),
    a(
      'Reset works from any value',
      'Set the count to a non-zero number, then press Reset and confirm it returns to zero. Reset should work no matter how high the count got.'
    ),
    a(
      'Decrement disabled at 0',
      'When the count is 0, the decrement button should be disabled or do nothing so the count never goes below zero. Try clicking it at 0 to confirm it cannot make the number negative.'
    ),
  ],
  'easy/02-shopping-cart-state': [
    a(
      'Add/merge works',
      'Add the same product twice and confirm the cart shows one line with quantity 2 instead of two duplicate rows. Merging by product id keeps the cart easy to read.'
    ),
    a(
      'Totals correct',
      'Add a few items with different prices and quantities, then check that subtotal and total match what you get by hand. Wrong math here means your state updates are off.'
    ),
    a(
      'Remove works',
      'Remove an item from the cart and confirm it disappears and the totals update right away. The list and totals should always stay in sync.'
    ),
  ],
  'easy/03-use-previous-hook': [
    a(
      'First render shows no previous value',
      'On the very first paint, usePrevious has nothing stored yet, so it should return undefined. If your UI has a "before" line, it should show empty, a dash, or "none" — not a number. That is expected, not a bug.'
    ),
    a(
      'Later renders show the last value',
      'Change the count (or whatever value you track), then confirm the "before" line shows the value from the previous render, one step behind the current count. After each change, "before" should lag by exactly one update.'
    ),
  ],
  'easy/04-event-handling': [
    a(
      'Digits append',
      'Click digit buttons and confirm the display builds the number left to right, like a calculator. Each new digit should attach to the end without clearing what was already there.'
    ),
    a(
      'Clear and backspace work',
      'Clear should reset the display to empty or zero. Backspace should remove only the last digit. Try both after entering several digits so you know undo and reset behave correctly.'
    ),
  ],
  'easy/05-controlled-input-field': [
    a(
      'Preview mirrors inputs',
      'Type in the form fields and confirm the live preview updates as you type with the same text. In a controlled input, React state is the single source of truth for what appears on screen.'
    ),
    a(
      'Validation visible',
      'Enter invalid data (for example too short a name or a bad email) and confirm error messages appear near the fields. Users need clear feedback before they can fix mistakes.'
    ),
    a(
      'Submit prevented default',
      'Submit the form with invalid data and confirm the page does not reload and errors stay visible. Call preventDefault on submit so React can handle validation instead of the browser refreshing.'
    ),
  ],
  'easy/06-fetching-data': [
    a(
      'Loading shows first',
      'When data is being fetched, you should see a loading message or spinner before results appear. That tells users the app is working, not broken.'
    ),
    a(
      'Errors readable',
      'Trigger a failed request (wrong URL or offline) and confirm a clear error message appears instead of a blank screen. Beginners should understand what went wrong without opening the console.'
    ),
    a(
      'Refetch works',
      'Use the retry or refetch control and confirm loading shows again, then new data or a new error appears. Refetch proves your effect or handler can run more than once safely.'
    ),
  ],
  'easy/07-dynamic-list-rendering': [
    a(
      'Add/remove work',
      'Add several items and remove one; the list should update immediately with no stale rows left behind. Each action should change only what you expect.'
    ),
    a(
      'Stable keys',
      'Each list item should use a unique, stable key (like an id), not the array index alone. Add and remove items and confirm inputs or checkboxes stay tied to the correct row.'
    ),
    a(
      'Duplicate prevention',
      'Try adding the same item twice when duplicates are not allowed and confirm the app blocks it or shows a message. This protects data quality in real apps.'
    ),
  ],
  'easy/08-use-interval-hook': [
    a(
      'Ticks regularly',
      'Start the timer or counter and confirm it updates on a steady schedule (for example every second). The interval callback should fire repeatedly while running.'
    ),
    a(
      'Pause works',
      'Pause the timer and confirm the value stops changing until you resume. Pause should clear or stop the interval without resetting the count unless you ask for that.'
    ),
    a(
      'No memory leaks',
      'Start and stop the timer several times, then leave the page or unmount the component. Open the browser console and confirm there are no errors about updating unmounted components. Cleanup in useEffect prevents leaked intervals.'
    ),
  ],
  'easy/09-component-composition': [
    a(
      'Composable API',
      'Build small pieces (like Card, Card.Header, Card.Body) that fit together in JSX the way the challenge describes. Parents should pass children or slots instead of one giant component with dozens of props.'
    ),
    a(
      'Article example renders',
      'Render the sample article layout from the challenge and confirm title, body, and optional footer all show in the right places. If the example looks right, your composition pattern works.'
    ),
  ],
  'easy/10-focus-input-useref': [
    a(
      'Mount focus works',
      'When the page first loads, the intended input should already have focus (cursor blinking inside it). useRef lets you call focus on the real DOM node after mount.'
    ),
    a(
      'Button focuses correct field',
      'Click a "focus name" or "focus email" button and confirm the matching field receives focus, not the other one. Each button should target the ref you wired to that input.'
    ),
  ],
  'easy/11-refactor-to-props': [
    a(
      'Two users render from array',
      'Map over a users array and confirm two (or more) profile cards render with the correct names and avatars from data. Lists of components should come from data, not copy-pasted JSX.'
    ),
    a(
      'Follow button calls callback',
      'Click Follow on a user card and confirm the parent receives the user id or name (console log or updated parent state is fine). The child should not own global follow state unless the challenge says so.'
    ),
  ],
  'easy/12-build-a-clock': [
    a(
      'Updates live',
      'Leave the clock open and confirm the time changes every second without refreshing the page. An interval or effect should keep the display in sync with real time.'
    ),
    a(
      'Format toggle works',
      'Switch between 12-hour and 24-hour (or similar) and confirm the display format changes while the time stays correct. Toggle is just state driving how you format the same Date.'
    ),
    a(
      'Interval cleared on unmount',
      'Navigate away or unmount the clock and confirm no console warnings about setState on unmounted components. Return a cleanup function from useEffect that clears the interval.'
    ),
  ],
  'easy/13-progress-bar-component': [
    a(
      'Determinate and indeterminate modes',
      'With a percent prop, the bar should fill to match (for example 50% half full). In indeterminate mode, show a moving or pulsing animation when progress is unknown. Both modes should look distinct.'
    ),
    a(
      'Accessible',
      'Inspect the bar in devtools or a screen reader and confirm role="progressbar", aria-valuenow (when determinate), and aria-valuemin/max or aria-busy (when indeterminate) are set. Assistive tech needs these to describe progress.'
    ),
  ],
  'easy/14-performance-monitoring': [
    a(
      'Profiler wired',
      'Wrap the slow part of your tree in React Profiler with an onRender callback. When the child renders, your callback should run so you can measure render time.'
    ),
    a(
      'Threshold logging',
      'When a render takes longer than your threshold (for example 16ms), log a warning to the console. This mimics how teams spot slow components in development.'
    ),
    a(
      'UI shows metric',
      'Show the last render duration (or similar) on screen so you can see it change when you trigger a slow update. Visible metrics make profiling easier than console-only logs.'
    ),
  ],
  'easy/15-mouse-tracker': [
    a(
      'Coords accurate',
      'Move the mouse inside the tracked area and confirm x and y update and roughly match the pointer position. Coordinates should feel responsive, not stuck.'
    ),
    a(
      'Inside/outside indicator',
      'Move the pointer in and out of the box and confirm the UI clearly says whether the mouse is inside or outside. This proves your hit area matches the element bounds.'
    ),
    a(
      'Listener removed',
      'Unmount the component or toggle tracking off and confirm listeners are removed (no duplicate updates, no errors after unmount). Effect cleanup should remove mousemove or related listeners.'
    ),
  ],
  'easy/16-simple-theme-switcher': [
    a(
      'Toggle works',
      'Click the theme control and confirm light and dark (or similar) switch immediately on screen. State should drive which theme class or variables are active.'
    ),
    a(
      'Persists across refresh',
      'Pick a theme, refresh the browser, and confirm the same theme is still active. Save the choice in localStorage (or similar) so users do not lose their preference.'
    ),
    a(
      'Styles change globally',
      'Confirm background, text, and other tokens change across the whole page, not just one small box. Theme variables or classes on a root element should affect the entire layout.'
    ),
  ],
  'easy/17-temperature-converter': [
    a(
      'Bidirectional sync',
      'Type Celsius and confirm Fahrenheit updates, then type Fahrenheit and confirm Celsius updates. Only one field should be the "source" per edit so both stay mathematically consistent.'
    ),
    a(
      'No infinite loops',
      'Edit either field quickly and confirm the app does not freeze or flicker from endless updates. Guard conversions so updating one field does not immediately re-trigger the same change in a loop.'
    ),
    a(
      'Empty allowed',
      'Clear one input and confirm the other can show empty or placeholder instead of NaN or 0 forced incorrectly. Empty is valid while the user is still typing.'
    ),
  ],
  'easy/18-theme-toggle': [
    a(
      'ARIA correct',
      'The toggle should expose accessible name and state (for example aria-pressed or aria-checked) so screen readers know whether dark mode is on. Check attributes in devtools.'
    ),
    a(
      'Keyboard works',
      'Tab to the control and activate it with Space or Enter. Keyboard users should get the same theme change as mouse users without needing to click.'
    ),
    a(
      'Theme applies',
      'After toggling, confirm visual styles (background, text color, etc.) update across the UI. ARIA and keyboard only matter if the theme actually changes when activated.'
    ),
  ],
  'easy/19-use-toggle-hook': [
    a(
      'All methods work',
      'Test toggle, setTrue, and setFalse (or the API your challenge defines) and confirm the boolean state matches each call. The hook should encapsulate all ways to change the flag.'
    ),
    a(
      'Handlers stable across renders',
      'Log or compare function identity between renders; toggle/set handlers from useToggle should stay the same reference when using useCallback inside the hook. Stable handlers help memoized children avoid extra renders.'
    ),
  ],

  // —— Medium ——
  'medium/01-todo-list-manager': [
    a(
      'All CRUD works',
      'Add todos, mark them complete, edit them, and delete them. Every action should update the list immediately with no ghost items.'
    ),
    a(
      'Filters correct',
      'Switch between All, Active, and Completed and confirm only the right todos show. Filtering should read from state, not hide items in the DOM only.'
    ),
    a(
      'Clear completed',
      'Mark several todos done, run Clear completed, and confirm finished items disappear while active ones remain. Bulk actions should update state in one step.'
    ),
  ],
  'medium/02-image-carousel': [
    a(
      'Navigation works',
      'Use next/previous buttons or dots and confirm the visible slide changes with the correct image and caption. Index state should wrap or clamp per the spec.'
    ),
    a(
      'Autoplay pauses',
      'When autoplay runs, hover or focus the carousel (or press pause if provided) and confirm slides stop advancing until you resume. Users need control over motion.'
    ),
    a(
      'Keyboard support',
      'Use arrow keys (and Home/End if required) to change slides when the carousel is focused. Keyboard support is required for accessible carousels.'
    ),
  ],
  'medium/03-event-delegation': [
    a(
      'One delegated handler',
      'Attach a single click handler on the list container instead of one per row. Click different rows and confirm the handler still identifies which item was clicked via event.target or closest.'
    ),
    a(
      'Dynamic items work',
      'Add a new row after load and click it; the same delegated handler should work without rebinding listeners. Delegation scales when the list changes often.'
    ),
  ],
  'medium/04-memoizing-expensive-calculation': [
    a(
      'Memoized path smooth',
      'Run the expensive calculation with useMemo and confirm the UI stays responsive when inputs change slowly. You should not see long freezes on every keystroke if only relevant deps changed.'
    ),
    a(
      'Changing unrelated state does not recompute',
      'Update state that does not affect the calculation (for example a unrelated counter) and confirm the heavy work does not run again (log inside the calculation or watch devtools). useMemo should skip work when deps are unchanged.'
    ),
  ],
  'medium/05-form-validation': [
    a(
      'Errors accurate',
      'Submit or blur fields with bad values and confirm each error message matches the rule (required, min length, email format, etc.). Errors should appear next to the right field.'
    ),
    a(
      'Submit blocked when invalid',
      'Try submitting with errors present and confirm the form does not call onSuccess or reset valid-looking data. Invalid forms should stay on screen until fixed.'
    ),
  ],
  'medium/06-nested-state-manager': [
    a(
      'Leaf updates isolated',
      'Change a nested field (for example a todo inside a project) and confirm only that branch updates while siblings stay the same. Immutable updates copy each level you change.'
    ),
    a(
      'No mutation warnings',
      'Use React Strict Mode and confirm the console never warns about mutating state directly. Always replace objects and arrays with new copies when updating nested data.'
    ),
  ],
  'medium/07-state-history-manager': [
    a(
      'Undo/redo correct',
      'Make several edits, undo step by step, then redo and confirm each state matches what you had at that point. History stacks should mirror user actions in order.'
    ),
    a(
      'Branching history cleared',
      'Undo a few steps, make a new edit, and confirm redo history after that point is discarded. New actions should fork history instead of mixing old redo with new changes.'
    ),
  ],
  'medium/08-advanced-theme-manager': [
    a(
      'Preview differs from applied until Apply',
      'Adjust colors or tokens in the editor and confirm the live preview updates, but the rest of the app keeps the old theme until you click Apply. Draft vs applied theme prevents accidental global changes.'
    ),
    a(
      'Reset works',
      'Change several settings, click Reset, and confirm preview and applied theme return to defaults. Reset should restore known baseline values in state.'
    ),
  ],
  'medium/09-use-async-hook': [
    a(
      'Race safe',
      'Trigger two requests in a row quickly (change id or search fast) and confirm only the latest result is shown, not an older slow response. Ignore or abort stale responses inside the hook.'
    ),
    a(
      'Reset clears',
      'Call reset on the hook and confirm data, error, and loading return to idle initial state. Reset lets parents clear async state when closing a modal or form.'
    ),
    a(
      'Deps change refetches optional',
      'If your hook accepts dependencies, change them and confirm a new fetch runs; if deps are omitted, document that behavior. Optional refetch on dep change matches useEffect mental model.'
    ),
  ],
  'medium/10-use-reducer-implementation': [
    a(
      'All transitions via dispatch',
      'Every state change should go through dispatch with a typed action, not setState scattered in components. Search your code for direct state assignment on reducer state and remove it.'
    ),
    a(
      'State consistent',
      'Run through add, toggle, delete, and filter flows and confirm counts and lists always match what actions imply. Reducer returns should be predictable for the same action sequence.'
    ),
  ],
  'medium/11-pagination-implementation': [
    a(
      'Page changes refetch',
      'Click next page or a page number and confirm a new network request runs (network tab) and new rows appear. Page index in state should drive which slice or API page loads.'
    ),
    a(
      'Bounds respected',
      'On the first page, previous should be disabled; on the last page, next should be disabled. Page numbers should not go below 1 or above total pages.'
    ),
  ],
  'medium/12-theme-context': [
    a(
      'Deep tree consumes theme',
      'Place theme provider high and read theme from a deeply nested component without prop drilling. Changing theme there should not require passing props through every level.'
    ),
    a(
      'Toggle updates all',
      'Toggle theme from a child button and confirm every consumer in the tree re-renders with the new colors or class. Context broadcasts one value to all subscribers.'
    ),
  ],
  'medium/13-radiogroup-component': [
    a(
      'Keyboard navigation',
      'Tab into the group and move selection with arrow keys per the radio pattern. Focus should move between options and update the selected value.'
    ),
    a(
      'ARIA correct',
      'Confirm role="radiogroup", each option has role="radio", and aria-checked reflects selection. Screen readers should announce the group label and which option is selected.'
    ),
  ],
  'medium/14-fallback-ui-class-components': [
    a(
      'Fallback shows on throw',
      'Render a child that throws during render and confirm the error boundary shows your fallback UI instead of a white screen. Only class error boundaries catch render errors in React.'
    ),
    a(
      'Retry recovers',
      'Click retry or reset state so the child can render again without a full page reload. Recovery should clear the error flag and attempt a normal render.'
    ),
  ],
  'medium/15-handling-api-errors': [
    a(
      'Statuses mapped',
      'Simulate 404, 500, and network failure and confirm the user sees different, helpful messages (not one generic string). Mapping status codes guides users on what to do next.'
    ),
    a(
      'Retry limited',
      'Use retry and confirm it stops after a max count or shows that limit is reached. Unlimited retries can hammer a failing API and confuse users.'
    ),
  ],
  'medium/16-cache-management': [
    a(
      'Second mount uses cache',
      'Fetch data once, unmount, mount again within cache lifetime, and confirm data appears without a loading flash or duplicate fetch. Cache avoids redundant network work.'
    ),
    a(
      'Invalidate refetches',
      'Call invalidate (or similar) and confirm fresh data loads and replaces stale cache. Invalidation is how you refresh after a mutation.'
    ),
  ],
  'medium/17-reusable-tabs-component': [
    a(
      'Keyboard works',
      'Use arrow keys to move between tabs and Enter or Space to activate. Focus order and roving tabindex should follow the ARIA tabs pattern.'
    ),
    a(
      'Controlled mode works',
      'Pass activeTab and onChange from the parent and confirm the parent controls which panel shows. Controlled mode lets routing or URL sync drive the selected tab.'
    ),
  ],
  'medium/18-share-state-with-context': [
    a(
      'Any depth reads user',
      'Log in or set a user in context and confirm a deeply nested component shows the same name without props through every layer. Context shares auth-like data globally.'
    ),
    a(
      'Logout clears',
      'Logout should set user to null and hide protected UI everywhere at once. All consumers must see the cleared user on the next render.'
    ),
  ],
  'medium/19-memo-prevent-rerenders': [
    a(
      'Counter updates do not rerender list',
      'Increment a parent counter while list items are memoized; list rows should not re-render if their props did not change (React DevTools highlight helps). memo skips render when props are shallow-equal.'
    ),
    a(
      'Item change does rerender',
      'Edit one list item and confirm only that row (or rows with changed props) re-renders. memo should not block updates when item data actually changes.'
    ),
  ],
  'medium/20-multi-step-form-persistent-state': [
    a(
      'Back preserves',
      'Fill step 1, go to step 2, go back, and confirm step 1 fields still have your entries. Step state should live above individual step components.'
    ),
    a(
      'Refresh restores draft',
      'Fill part of the form, refresh the page, and confirm saved draft values return from localStorage (or your storage). Users should not lose long forms on accident.'
    ),
  ],
  'medium/21-multiple-contexts': [
    a(
      'Both contexts work',
      'Use theme context and user context (or the pair in your spec) in the same tree and confirm each provides the right values. Multiple providers can nest without conflict.'
    ),
    a(
      'Independent updates',
      'Change only theme and confirm user context consumers do not get unrelated updates, and vice versa. Separate contexts keep concerns isolated.'
    ),
  ],
  'medium/22-reusable-input-component': [
    a(
      'Ref focuses input',
      'Parent holds a ref on your Input wrapper and call focus(); the inner native input should receive focus. forwardRef passes the ref to the DOM element.'
    ),
    a(
      'A11y wired',
      'Wire id, label htmlFor, aria-invalid, and aria-describedby for errors. Reusable inputs should not force parents to redo basic accessibility every time.'
    ),
  ],
  'medium/23-reusable-button-component': [
    a(
      'Loading prevents double submit',
      'Click submit while loading is true and confirm only one action fires (button disabled or ignore clicks). Prevents duplicate orders or duplicate API posts.'
    ),
    a(
      'Variants distinct',
      'Render primary, secondary, and danger (or your variants) side by side and confirm each looks clearly different. Variants should be prop-driven, not copy-pasted styles.'
    ),
  ],
  'medium/24-reusable-drawer-component': [
    a(
      'Portal renders',
      'Open the drawer and inspect the DOM; content should render under document.body via createPortal, not trapped inside a parent with overflow hidden.'
    ),
    a(
      'Escape closes',
      'With the drawer open, press Escape and confirm it closes and focus returns sensibly. Modal dialogs must be dismissible by keyboard.'
    ),
    a(
      'Overlay click closes',
      'Click the dimmed backdrop and confirm the drawer closes; clicking inside the panel should not close it. Distinguish overlay target from panel content in the handler.'
    ),
  ],
  'medium/25-tic-tac-toe-game': [
    a(
      'Win detected',
      'Play until three in a row and confirm the game announces the winner and stops accepting moves on filled lines. Win check should run after each valid move.'
    ),
    a(
      'Cannot play after win',
      'After someone wins, clicking empty squares should do nothing. State should be terminal until you start a new game.'
    ),
    a(
      'History jump works',
      'Make several moves, jump back in the move history, and confirm the board shows that past position. Time travel requires immutable board copies per move.'
    ),
  ],
  'medium/26-multi-theme-manager': [
    a(
      'System tracks OS',
      'Set theme to system and change OS light/dark preference; the app should follow without a manual toggle. matchMedia listens for prefers-color-scheme changes.'
    ),
    a(
      'Tabs stay in sync',
      'Open two tabs, change theme in one, and confirm the other updates (storage event or broadcast). Shared persistence keeps experience consistent across tabs.'
    ),
  ],

  // —— Hard ——
  'hard/01-timer-controls': [
    a(
      'Pause accurate',
      'Run the timer, pause, wait several seconds, resume, and confirm elapsed time does not include the paused interval. Pause should stop counting without resetting unless reset is pressed.'
    ),
    a(
      'Laps recorded',
      'Record multiple laps while running and confirm each lap time and total elapsed list correctly. Laps are snapshots of elapsed time at the moment you tap lap.'
    ),
    a(
      'Reset works',
      'After running and adding laps, reset should clear elapsed time and lap list back to the starting state. Reset must stop any running interval too.'
    ),
  ],
  'hard/02-multi-step-form-branching': [
    a(
      'Branches differ',
      'Answer a branching question (for example "Are you a business?") and confirm later steps show different fields than the other branch. Only one branch path should be required to finish.'
    ),
    a(
      'Review shows all captured fields',
      'Reach the review step and confirm every answer from every visited step appears correctly, including branch-specific fields. Review proves state was stored per step, not lost on navigation.'
    ),
  ],
  'hard/03-prevent-unnecessary-rerenders': [
    a(
      'Profiler shows fewer child commits',
      'Use React Profiler before and after memoization or context splits and confirm expensive children render less often when unrelated parent state changes. Fewer commits means less wasted work.'
    ),
    a(
      'Functionality unchanged',
      'Walk through all user flows and confirm behavior matches the unoptimized version. Performance fixes must not break features users rely on.'
    ),
  ],
  'hard/04-dynamic-form-fields': [
    a(
      'Dynamic types render correct input',
      'Add fields of type text, number, checkbox, or select from your schema and confirm each renders the right HTML control and label. Type in config should drive which component mounts.'
    ),
    a(
      'Submit blocked if invalid',
      'Leave required dynamic fields empty or invalid and confirm submit is blocked with errors. Validation rules should apply per field type, not only on static fields.'
    ),
  ],
  'hard/05-art-drawing-tool': [
    a(
      'Draws smoothly',
      'Click and drag on the canvas and confirm continuous strokes without large gaps. Mouse or pointer events should stream points while the button is held.'
    ),
    a(
      'Export downloads file',
      'Click export and confirm a PNG (or required format) downloads with your drawing visible. toDataURL or similar should capture the current canvas pixels.'
    ),
    a(
      'Clear works',
      'Draw something, press Clear, and confirm the canvas is empty and you can draw again from scratch. Clear should reset both pixels and any stroke state in memory.'
    ),
  ],

  // —— Very hard ——
  'very-hard/01-connect-four': [
    a(
      'Win/draw detected',
      'Play until four in a row and confirm the winner is announced; fill the board with no winner and confirm a draw message. Game should end in a terminal state.'
    ),
    a(
      'Illegal moves prevented',
      'Try dropping in a full column or clicking after game over and confirm nothing changes. Valid moves only keep game state trustworthy.'
    ),
  ],
  'very-hard/02-advanced-custom-hooks': [
    a(
      'Hooks reusable',
      'Use each custom hook in at least two components and confirm behavior is identical without copying effect logic. Hooks should accept clear parameters and return a stable API.'
    ),
    a(
      'No hydration mismatch',
      'If a hook reads window or localStorage, confirm server HTML matches first client render (defer read to useEffect or gate rendering). Mismatches cause React hydration errors in SSR apps.'
    ),
    a(
      'System changes propagate',
      'Change OS theme, online status, or media query (per your hooks) and confirm all subscribers update. Listeners in effects should subscribe and clean up correctly.'
    ),
  ],
  'very-hard/03-list-virtualization': [
    a(
      'Large list scrolls without lag',
      'Render on the order of 100k items and scroll quickly; the UI should stay smooth with no multi-second freezes. Only visible rows should do heavy work each frame.'
    ),
    a(
      'DOM node count stays small',
      'Inspect the list container in devtools while scrolling and confirm only roughly viewport plus overscan rows exist, not one node per item in the full dataset. Virtualization trades a few DOM nodes for huge lists.'
    ),
  ],
};

export function getAcceptanceCriteria(difficulty, slug) {
  return CHALLENGE_ACCEPTANCE[`${difficulty}/${slug}`];
}
