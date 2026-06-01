import { challenge } from './helpers.mjs';

export const veryHardChallenges = [
  challenge({
    slug: '01-connect-four',
    title: 'Connect Four',
    difficulty: 'very-hard',
    topics: ['game logic', 'minimax optional'],
    goals: ['Implement 7x6 board', 'Win detection', 'Two-player or vs AI'],
    description:
      'Full Connect Four: drop discs in columns, gravity fills lowest slot, detect 4 in a row (horizontal/vertical/diagonal). Optional: minimax AI opponent.',
    requirements: ['Valid move only in non-full column', 'Highlight winning cells', 'Reset game', 'Turn indicator'],
    starter: `const ROWS = 6, COLS = 7;`,
    hints: ['Check win from last move only in 4 directions', 'Board as 2D array or flat with index math'],
    acceptance: ['Win/draw detected', 'Illegal moves prevented'],
    solutionApproach: 'Immutable board updates; win check radiates from last placed cell.',
    concepts: [{ term: 'Last-move win check', detail: 'O(1) amortized per move instead of scanning full board.' }],
    solution: `import { useState } from 'react';

const ROWS = 6;
const COLS = 7;
type Cell = 'R' | 'Y' | null;
type Board = Cell[][];

function createBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function drop(board: Board, col: number, player: 'R' | 'Y'): { board: Board; row: number } | null {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) {
      const next = board.map((row, ri) =>
        row.map((c, ci) => (ri === r && ci === col ? player : c))
      );
      return { board: next, row: r };
    }
  }
  return null;
}

function countDir(board: Board, r: number, c: number, dr: number, dc: number, p: Cell) {
  let n = 0;
  while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === p) {
    n++;
    r += dr;
    c += dc;
  }
  return n;
}

function checkWin(board: Board, r: number, c: number, p: Cell) {
  const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
  return dirs.some(([dr, dc]) => {
    const line =
      countDir(board, r, c, dr, dc, p) +
      countDir(board, r - dr, c - dc, -dr, -dc, p) -
      1;
    return line >= 4;
  });
}

export function ConnectFour() {
  const [board, setBoard] = useState(createBoard);
  const [player, setPlayer] = useState<'R' | 'Y'>('R');
  const [winner, setWinner] = useState<Cell | 'draw' | null>(null);

  const play = (col: number) => {
    if (winner) return;
    const res = drop(board, col, player);
    if (!res) return;
    setBoard(res.board);
    if (checkWin(res.board, res.row, col, player)) setWinner(player);
    else if (res.board.every((row) => row.every(Boolean))) setWinner('draw');
    else setPlayer((p) => (p === 'R' ? 'Y' : 'R'));
  };

  return (
    <div>
      <p>{winner ? (winner === 'draw' ? 'Draw' : \`Winner: \${winner}\`) : \`Turn: \${player}\`}</p>
      <div className="board">
        {Array.from({ length: COLS }, (_, col) => (
          <button key={col} onClick={() => play(col)} aria-label={\`Column \${col + 1}\`}>↓</button>
        ))}
        {board.map((row, r) => (
          <div key={r} className="row">
            {row.map((cell, c) => (
              <div key={c} className={\`cell \${cell ?? ''}\`} />
            ))}
          </div>
        ))}
      </div>
      <button onClick={() => { setBoard(createBoard()); setPlayer('R'); setWinner(null); }}>Reset</button>
    </div>
  );
}`,
    walkthrough: 'Drop finds lowest empty row; win scans 4 directions from last move only.',
    mistakes: ['Cloning board shallowly mutating rows', 'Full board scan each move unnecessarily'],
    stretch: ['Minimax AI', 'Animated disc drop'],
  }),

  challenge({
    slug: '02-advanced-custom-hooks',
    title: 'Advanced Custom Hooks',
    difficulty: 'very-hard',
    topics: ['custom hooks', 'composition'],
    goals: ['Compose smaller hooks into advanced API', 'Handle edge cases and SSR'],
    description:
      'Build `useMediaQuery`, `useLocalStorage`, and compose them into `usePrefersDarkMode` that syncs theme to localStorage and system preference with zero flash.',
    requirements: [
      'useMediaQuery(list) with matchMedia + listener',
      'useLocalStorage key with JSON parse/stringify',
      'Composed hook: system | light | dark with persistence',
    ],
    starter: `export function useMediaQuery(query: string) {}`,
    hints: ['SSR: default false until useEffect', 'storage event for cross-tab'],
    acceptance: ['Hooks reusable', 'No hydration mismatch', 'System changes propagate'],
    solutionApproach: 'Layered hooks; effects subscribe to external systems; lazy init for storage.',
    concepts: [
      { term: 'Hook composition', detail: 'Small hooks combine into higher-level behavior.' },
      { term: 'Hydration safety', detail: 'Defer browser-only reads to useEffect.' },
    ],
    solution: `import { useCallback, useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const fn = () => setMatches(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [query]);

  return matches;
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

type ThemeSetting = 'system' | 'light' | 'dark';

export function usePrefersDarkMode() {
  const [setting, setSetting] = useLocalStorage<ThemeSetting>('theme-setting', 'system');
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)');
  const resolved = setting === 'system' ? (systemDark ? 'dark' : 'light') : setting;

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);

  const set = useCallback((s: ThemeSetting) => setSetting(s), [setSetting]);

  return { setting, resolved, set };
}`,
    walkthrough: 'Media query hook listens to changes; storage hook persists setting; composed hook resolves effective theme.',
    mistakes: ['Reading localStorage during SSR render', 'Not removing matchMedia listeners'],
    stretch: ['useEventCallback', 'Subscription hook with useSyncExternalStore'],
  }),

  challenge({
    slug: '03-list-virtualization',
    title: 'List Virtualization: Manual Virtual Scrolling',
    difficulty: 'very-hard',
    topics: ['performance', 'DOM'],
    goals: ['Render only visible rows', 'Maintain scroll height', 'Handle variable heights optional'],
    description:
      'Virtual list of 100,000 items (fixed row height 40px). Compute visible start/end from scrollTop. Absolute-position rows inside tall spacer. No react-window—manual implementation.',
    requirements: ['Smooth scroll', 'O(visible) DOM nodes', 'Scroll to index API', 'Overscan 5 rows'],
    starter: `const itemHeight = 40; const totalHeight = items.length * itemHeight;`,
    hints: ['startIndex = floor(scrollTop / itemHeight)', 'transform translateY(startIndex * itemHeight)'],
    acceptance: ['Large list (e.g. 100k items) scrolls without lag', 'DOM node count stays O(visible rows), not total items'],
    solutionApproach: 'Scroll container with inner height spacer; translate visible slice.',
    concepts: [
      { term: 'Windowing', detail: 'Only mount rows in viewport plus overscan buffer.' },
      { term: 'Overscan', detail: 'Extra rows above/below reduce blank flashes during fast scroll.' },
    ],
    solution: `import { useMemo, useRef, useState } from 'react';

const ROW = 40;
const OVERSCAN = 5;

export function VirtualList({ count }: { count: number }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [height, setHeight] = useState(600);

  const { start, end, offset } = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / ROW) - OVERSCAN);
    const visible = Math.ceil(height / ROW) + OVERSCAN * 2;
    const endIndex = Math.min(count, startIndex + visible);
    return { start: startIndex, end: endIndex, offset: startIndex * ROW };
  }, [scrollTop, height, count]);

  const items = useMemo(() => {
    const slice = [];
    for (let i = start; i < end; i++) slice.push(i);
    return slice;
  }, [start, end]);

  return (
    <div
      ref={parentRef}
      style={{ height, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: count * ROW, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offset}px)\` }}>
          {items.map((i) => (
            <div key={i} style={{ height: ROW, lineHeight: \`\${ROW}px\` }}>
              Row {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
    walkthrough: 'Total height preserves scrollbar; translateY positions window; slice maps only visible indices.',
    mistakes: ['Rendering all items with display:none', 'Wrong total height breaking scroll'],
    stretch: ['Variable row heights', 'react-window comparison'],
  }),
];
