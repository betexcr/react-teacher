/** Build challenge-specific code highlight tooltips from solution source data. */

function pickWalkthrough(walkthrough, keywords) {
  if (!walkthrough) return '';
  const parts = walkthrough.split(/(?<=[.!?])\s+/);
  const re = new RegExp(keywords, 'i');
  const hit = parts.find((p) => re.test(p));
  return hit ? hit.trim() : walkthrough.trim();
}

function conceptMap(concepts) {
  return Object.fromEntries(concepts.map((c) => [c.term.toLowerCase(), c.detail]));
}

function findInCode(code, snippet) {
  return snippet && code.includes(snippet);
}

/**
 * @param {import('./helpers.mjs').ChallengeDef} c
 * @returns {{ match: string; label: string; tip: string }[]}
 */
export function buildCodeHighlights(c) {
  const code = c.solution;
  const concepts = conceptMap(c.concepts);
  const highlights = [];
  const seen = new Set();

  const add = (match, label, tip) => {
    const m = match?.trim();
    if (!m || m.length < 2 || !findInCode(code, m) || seen.has(m)) return;
    seen.add(m);
    highlights.push({
      match: m,
      label: label.trim(),
      tip: tip.trim().replace(/\s+/g, ' '),
    });
  };

  // useState: [value, setter] = useState(init)
  for (const m of code.matchAll(
    /const\s*\[\s*(\w+)\s*,\s*(set\w+)\s*\]\s*=\s*(useState(?:<[^>]+>)?)\s*\(([^)]*)\)/g,
  )) {
    const [full, varName, setter, , init] = m;
    const initText = init?.trim() ? ` It starts at ${init.trim()}.` : '';
    add(
      full,
      `${varName} state`,
      `\`${varName}\` is the value the UI shows.${initText} \`${setter}\` updates it when the user interacts. ${pickWalkthrough(c.walkthrough, varName)}`,
    );
  }

  // useReducer
  for (const m of code.matchAll(/const\s*\[\s*(\w+)\s*,\s*dispatch\s*\]\s*=\s*useReducer\s*\(/g)) {
    add(
      m[0],
      'useReducer',
      `\`${m[1]}\` is updated by dispatching actions instead of many separate setters. ${concepts['reducer'] || pickWalkthrough(c.walkthrough, 'dispatch|action|reducer')}`,
    );
  }

  // useRef
  for (const m of code.matchAll(/const\s+(\w+)\s*=\s*useRef(?:<[^>]+>)?\s*\(([^)]*)\)/g)) {
    add(
      m[0],
      `ref ${m[1]}`,
      `\`${m[1]}\` keeps a mutable value across renders without triggering re-renders when .current changes. ${concepts['useref'] || pickWalkthrough(c.walkthrough, 'ref|previous|dom')}`,
    );
  }

  // useEffect + cleanup
  const effectBlocks = code.match(/useEffect\s*\(\s*\(\)\s*=>\s*\{[\s\S]*?\n\s*\},\s*\[[^\]]*\]\s*\)/g);
  if (effectBlocks) {
    for (const block of effectBlocks) {
      const hasCleanup = /return\s+\(\)\s*=>/.test(block);
      add(
        block.length > 200 ? block.slice(0, 200) : block,
        'useEffect',
        `Runs after render to ${pickWalkthrough(c.walkthrough, 'fetch|load|subscribe|timer|interval|mount') || 'sync with something outside React'}.${hasCleanup ? ' The returned cleanup function runs on unmount or before the next run.' : ''} ${concepts['useeffect'] || ''}`,
      );
      break;
    }
  }

  // useCallback
  for (const m of code.matchAll(/const\s+(\w+)\s*=\s*useCallback\s*\([\s\S]*?\},\s*\[[^\]]*\]\s*\)/g)) {
    const short = m[0].length > 120 ? `${m[0].slice(0, 117)}...` : m[0];
    add(
      short,
      `useCallback ${m[1]}`,
      `\`${m[1]}\` keeps a stable function reference between renders. ${concepts['usecallback'] || pickWalkthrough(c.walkthrough, 'callback|load|memo|stable')}`,
    );
  }

  // useMemo
  for (const m of code.matchAll(/const\s+(\w+)\s*=\s*useMemo\s*\([\s\S]*?\},\s*\[[^\]]*\]\s*\)/g)) {
    const short = m[0].length > 120 ? `${m[0].slice(0, 117)}...` : m[0];
    add(
      short,
      `useMemo ${m[1]}`,
      `\`${m[1]}\` caches an expensive computed value until dependencies change. ${concepts['usememo'] || pickWalkthrough(c.walkthrough, 'memo|compute|cache')}`,
    );
  }

  // createContext / Provider
  if (code.includes('createContext')) {
    const m = code.match(/const\s+(\w+)\s*=\s*createContext[^;]+;/);
    if (m) add(m[0], 'createContext', `Shares data with any child below without passing props on every level. ${concepts['context'] || ''}`);
  }
  for (const m of code.matchAll(/<(\w*Provider)\b[^>]*>/g)) {
    add(`<${m[1]}`, m[1], `${m[1]} supplies the context value to components nested inside it. ${pickWalkthrough(c.walkthrough, 'theme|context|provider')}`);
  }

  // fetch + AbortController
  if (code.includes('fetch(')) {
    const fetchCall = code.match(/fetch\s*\([^)]+\)/)?.[0];
    if (fetchCall) {
      add(
        fetchCall,
        'fetch',
        `Loads remote data. ${pickWalkthrough(c.walkthrough, 'fetch|load|api|users|data')}`,
      );
    }
  }
  if (code.includes('AbortController')) {
    add(
      'AbortController',
      'AbortController',
      `Cancels the request if the user leaves or a new fetch replaces the old one — avoids updating state after unmount. ${concepts['abortcontroller'] || pickWalkthrough(c.walkthrough, 'abort|unmount|cancel')}`,
    );
  }
  if (code.includes('.finally(')) {
    add('.finally(', 'finally', `Runs after success or failure — here it typically turns off the loading flag.`);
  }

  // Line-by-line meaningful patterns
  for (const line of code.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('//') || t.startsWith('import ') || t.startsWith('export ') || t.startsWith('type ')) {
      continue;
    }

    const onClick = t.match(/onClick=\{([^}]+)\}/);
    if (onClick) {
      const handler = onClick[1].trim();
      const snippet = `onClick={${handler}}`;
      let label = 'onClick';
      let action = 'runs when the user clicks this button';
      if (/setCount\(0\)/.test(handler) || /set\w+\(0\)/.test(handler)) {
        label = 'reset click';
        action = 'resets the value to zero';
      } else if (/\+\s*1/.test(handler)) {
        label = 'increment click';
        action = 'adds 1 using the latest state';
      } else if (/\-\s*1/.test(handler)) {
        label = 'decrement click';
        action = 'subtracts 1 using the latest state';
      } else if (/set\w+/.test(handler)) {
        label = 'click handler';
        action = `updates state (${handler.split('(')[0]})`;
      }
      add(snippet, label, `${action.charAt(0).toUpperCase()}${action.slice(1)}. ${pickWalkthrough(c.walkthrough, 'button|click|increment|decrement|reset')}`);
    }

    const disabled = t.match(/disabled=\{([^}]+)\}/);
    if (disabled) {
      add(
        `disabled={${disabled[1]}}`,
        'disabled',
        `Disabled when ${disabled[1]} — UI follows state instead of manual DOM tweaks. ${concepts['controlled updates'] || concepts['controlled component'] || pickWalkthrough(c.walkthrough, 'disabled|zero|cannot')}`,
      );
    }

    if (t.includes('aria-live')) {
      add('aria-live="polite"', 'aria-live', `Assistive tech announces updates when this text changes (e.g. the count).`);
    }
    if (t.includes('role="alert"')) {
      add('role="alert"', 'role="alert"', `Marks an error message so screen readers treat it as urgent.`);
    }

    const mapCall = t.match(/\.map\s*\(\s*\([^)]*\)\s*=>\s*[^)]+\)/);
    if (mapCall) {
      add(
        mapCall[0].length > 80 ? mapCall[0].slice(0, 77) + '...' : mapCall[0],
        '.map()',
        `Turns each item in your data into a JSX row. ${concepts['immutable updates'] || pickWalkthrough(c.walkthrough, 'list|map|render|item')}`,
      );
    }

    if (t.includes('...') && (t.includes('setItems') || t.includes('set') || t.includes('return ['))) {
      const spread = t.match(/\[\.\.\.[^\]]+\]/)?.[0] || t.match(/\{\.\.\.[^}]+\}/)?.[0];
      if (spread) {
        add(
          spread,
          'spread copy',
          `Copies the old collection then changes it — React sees a new reference and re-renders. ${concepts['immutable updates'] || ''}`,
        );
      }
    }

    if (/if\s*\(loading\)/.test(t) || /if\s*\(error\)/.test(t)) {
      const cond = t.match(/if\s*\([^)]+\)/)?.[0];
      if (cond) {
        add(
          cond,
          'early return',
          `Short-circuits the render to show loading or error UI before the main content. ${pickWalkthrough(c.walkthrough, 'loading|error|fetch')}`,
        );
      }
    }

    if (/\?\s*</.test(t) && t.includes('return')) {
      const short = t.length > 90 ? t.slice(0, 87) + '...' : t;
      add(short, 'ternary UI', `Picks which UI branch to show based on a condition. ${pickWalkthrough(c.walkthrough, 'loading|error|empty')}`);
    }

    if (/&&\s*</.test(t)) {
      const short = t.length > 90 ? t.slice(0, 87) + '...' : t;
      add(short, '&& render', `Only renders the element when the left side is true.`);
    }

    if (/value=\{/.test(t) && /onChange=\{/.test(t)) {
      add(
        t.length > 100 ? t.slice(0, 97) + '...' : t,
        'controlled input',
        `Input text is owned by React state — value plus onChange keep the field in sync. ${concepts['controlled component'] || pickWalkthrough(c.walkthrough, 'input|value|controlled')}`,
      );
    }

    if (/key=\{/.test(t)) {
      const keyExpr = t.match(/key=\{([^}]+)\}/)?.[1];
      add(
        `key={${keyExpr}}`,
        'key',
        `Helps React track each list row — use a stable id (${keyExpr}), not the array index, when items can reorder.`,
      );
    }
  }

  // Concept-driven extras when term hints at code shape
  for (const { term, detail } of c.concepts) {
    const lower = term.toLowerCase();
    if (lower.includes('profiler') && code.includes('Profiler')) {
      add('Profiler', 'Profiler', `${detail}`);
    }
    if (lower.includes('forwardref') && code.includes('forwardRef')) {
      add('forwardRef', 'forwardRef', `${detail}`);
    }
    if (lower.includes('memo') && code.includes('memo(')) {
      add('memo(', 'memo', `${detail}`);
    }
    if (lower.includes('delegation') && code.includes('onClick')) {
      const parentHandler = code.match(/onClick=\{[^}]+\}/)?.[0];
      if (parentHandler) add(parentHandler, 'event delegation', `${detail}`);
    }
  }

  return highlights.sort((a, b) => b.match.length - a.match.length);
}

export function formatCodeHighlightsSection(highlights) {
  if (!highlights.length) return '';
  const lines = highlights.map(
    (h) => `- \`${h.match.replace(/`/g, '\\`')}\` — **${h.label}** — ${h.tip}`,
  );
  return `## Code highlights\n\n${lines.join('\n')}\n`;
}
