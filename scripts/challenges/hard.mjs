import { challenge } from './helpers.mjs';

export const hardChallenges = [
  challenge({
    slug: '01-timer-controls',
    title: 'Timer Controls',
    difficulty: 'hard',
    topics: ['useReducer', 'effects', 'refs'],
    goals: ['Pause/resume/reset timer', 'Accurate elapsed time with drift handling'],
    description:
      'Build a stopwatch with start, pause, reset, and lap recording. Elapsed time must stay accurate when pausing (do not keep interval running while paused).',
    requirements: ['Lap list with timestamps', 'Pause freezes elapsed', 'Reset clears laps', 'Display mm:ss.cs'],
    starter: `type State = { running: boolean; elapsed: number; laps: number[] };`,
    hints: ['Store startTimestamp and accumulated offset', 'requestAnimationFrame or 10ms interval only when running'],
    acceptance: ['Pause accurate', 'Laps recorded', 'Reset works'],
    solutionApproach: 'Track base elapsed + segment start time; reducer for actions.',
    concepts: [{ term: 'Drift-free timer', detail: 'Compute elapsed from Date.now() deltas, not tick count.' }],
    solution: `import { useEffect, useReducer, useRef } from 'react';

type State = { running: boolean; elapsed: number; laps: number[]; startedAt: number | null };

type Action =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'LAP' }
  | { type: 'TICK'; now: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { ...state, running: true, startedAt: action.now ?? Date.now() };
    case 'PAUSE': {
      if (!state.running || state.startedAt === null) return state;
      const add = Date.now() - state.startedAt;
      return { ...state, running: false, elapsed: state.elapsed + add, startedAt: null };
    }
    case 'RESET':
      return { running: false, elapsed: 0, laps: [], startedAt: null };
    case 'LAP':
      return { ...state, laps: [...state.laps, state.elapsed + (state.startedAt ? Date.now() - state.startedAt : 0)] };
    default:
      return state;
  }
}

function format(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const cs = Math.floor((ms % 1000) / 10);
  return \`\${String(m).padStart(2,'0')}:\${String(s % 60).padStart(2,'0')}.\${String(cs).padStart(2,'0')}\`;
}

export function TimerControls() {
  const [state, dispatch] = useReducer(reducer, { running: false, elapsed: 0, laps: [], startedAt: null });
  const [, force] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!state.running) return;
    const id = setInterval(() => force(), 50);
    return () => clearInterval(id);
  }, [state.running]);

  const current =
    state.elapsed + (state.running && state.startedAt ? Date.now() - state.startedAt : 0);

  return (
    <div>
      <p>{format(current)}</p>
      {!state.running ? (
        <button onClick={() => dispatch({ type: 'START' })}>Start</button>
      ) : (
        <button onClick={() => dispatch({ type: 'PAUSE' })}>Pause</button>
      )}
      <button onClick={() => dispatch({ type: 'LAP' })} disabled={!state.running}>Lap</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <ol>{state.laps.map((l, i) => <li key={i}>{format(l)}</li>)}</ol>
    </div>
  );
}`,
    walkthrough: 'Pause commits segment duration to elapsed; display derives live total while running.',
    mistakes: ['Leaving setInterval running while paused', 'Using only tick count for elapsed'],
    stretch: ['Countdown mode', 'Web Worker timer'],
  }),

  challenge({
    slug: '02-multi-step-form-branching',
    title: 'Multi-step Form with Branching Logic',
    difficulty: 'hard',
    topics: ['forms', 'state machines'],
    goals: ['Branch steps based on answers', 'Validate per branch'],
    description:
      'Insurance-style wizard: Q1 type (individual/business) branches to different step 2. Business asks company size; individual asks age band. Review step summarizes answers.',
    requirements: ['Branch map in config', 'Cannot skip steps', 'Back preserves branch'],
    starter: `const flow = { individual: ['age', 'review'], business: ['size', 'review'] };`,
    hints: ['Store answers object + currentStepId', 'next() looks up flow[answers.type]'],
    acceptance: ['Branches differ', 'Review shows all captured fields'],
    solutionApproach: 'Declarative step graph keyed by prior answers.',
    concepts: [{ term: 'State machine', detail: 'Transitions depend on state—ideal for branching wizards.' }],
    solution: `import { useState } from 'react';

type Answers = { type?: 'individual' | 'business'; age?: string; size?: string };

const nextStep = (a: Answers, current: string): string | null => {
  if (current === 'type') return a.type === 'business' ? 'size' : 'age';
  if (current === 'age' || current === 'size') return 'review';
  return null;
};

export function BranchingWizard() {
  const [step, setStep] = useState('type');
  const [answers, setAnswers] = useState<Answers>({});

  const goNext = () => {
    const n = nextStep(answers, step);
    if (n) setStep(n);
  };

  return (
    <div>
      {step === 'type' && (
        <select value={answers.type ?? ''} onChange={(e) => setAnswers({ ...answers, type: e.target.value as Answers['type'] })}>
          <option value="">Select…</option>
          <option value="individual">Individual</option>
          <option value="business">Business</option>
        </select>
      )}
      {step === 'age' && (
        <input placeholder="Age band" value={answers.age ?? ''} onChange={(e) => setAnswers({ ...answers, age: e.target.value })} />
      )}
      {step === 'size' && (
        <input placeholder="Company size" value={answers.size ?? ''} onChange={(e) => setAnswers({ ...answers, size: e.target.value })} />
      )}
      {step === 'review' && <pre>{JSON.stringify(answers, null, 2)}</pre>}
      {step !== 'review' && <button onClick={goNext} disabled={step === 'type' && !answers.type}>Next</button>}
    </div>
  );
}`,
    walkthrough: 'nextStep function encodes graph; UI renders step id; answers accumulate.',
    mistakes: ['Hardcoded step index (breaks on branch)', 'Losing answers on back'],
    stretch: ['XState machine', 'Persist partial to server'],
  }),

  challenge({
    slug: '03-prevent-unnecessary-rerenders',
    title: 'Prevent Unnecessary Re-renders',
    difficulty: 'hard',
    topics: ['memo', 'context', 'profiling'],
    goals: ['Optimize a intentionally slow tree', 'Measure before/after'],
    description:
      'Parent updates unrelated state every 100ms. Optimize children with memo, useMemo, useCallback, and split contexts so only relevant subtrees rerender.',
    requirements: ['Demonstrate >50% render reduction', 'Document which optimization applied where', 'Use React DevTools Profiler notes in comments'],
    starter: `// SlowChild renders 500 divs`,
    hints: ['Split ThemeContext: value vs dispatch', 'memo list items with stable keys'],
    acceptance: ['Profiler shows fewer child commits', 'Functionality unchanged'],
    solutionApproach: 'Isolate fast-changing state; memo expensive children; stabilize props.',
    concepts: [
      { term: 'Context splitting', detail: 'Consumers of dispatch should not rerender when value changes.' },
      { term: 'Profiler', detail: 'Commit chart shows which optimizations helped.' },
    ],
    solution: `import { createContext, memo, useCallback, useContext, useMemo, useState } from 'react';

const CountContext = createContext(0);
const DispatchContext = createContext(() => {});

const SlowList = memo(function SlowList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
});

export function OptimizedTree() {
  const [tick, setTick] = useState(0);
  const [items] = useState(() => Array.from({ length: 100 }, (_, i) => \`item-\${i}\`));

  const dispatch = useCallback(() => setTick((t) => t + 1), []);
  const value = useMemo(() => tick, [tick]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <CountContext.Provider value={value}>
        <FastHeader />
        <SlowList items={items} />
      </CountContext.Provider>
    </DispatchContext.Provider>
  );
}

const FastHeader = memo(function FastHeader() {
  const dispatch = useContext(DispatchContext);
  return <button onClick={dispatch}>Tick</button>;
});`,
    walkthrough: 'SlowList memoized with stable items; tick isolated in context consumed only where needed.',
    mistakes: ['Memo parent but pass inline objects', 'Context with {state, setState} single object'],
    stretch: ['useSyncExternalStore', 'Virtualize list'],
  }),

  challenge({
    slug: '04-dynamic-form-fields',
    title: 'Dynamic Form Fields',
    difficulty: 'hard',
    topics: ['forms', 'arrays'],
    goals: ['Add/remove field groups', 'Validate dynamically'],
    description:
      'Form builder: users add "field rows" choosing type (text, number, select). Each row has label + validation rules. Submit outputs JSON schema of the form.',
    requirements: ['Add/remove rows', 'Per-row type selector changes control', 'Validate all rows on submit'],
    starter: `type FieldRow = { id: string; type: 'text' | 'number' | 'select'; label: string; options?: string };`,
    hints: ['useFieldArray pattern with map', 'validate(rows) returns errors keyed by id'],
    acceptance: ['Dynamic types render correct input', 'Submit blocked if invalid'],
    solutionApproach: 'Array of field definitions drives render and validation.',
    concepts: [{ term: 'Field array', detail: 'Common pattern for repeatable form sections.' }],
    solution: `import { useState, FormEvent } from 'react';

type Row = { id: string; type: 'text' | 'number' | 'select'; label: string; options?: string };

export function DynamicFormBuilder() {
  const [rows, setRows] = useState<Row[]>([{ id: crypto.randomUUID(), type: 'text', label: '' }]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addRow = () => setRows((r) => [...r, { id: crypto.randomUUID(), type: 'text', label: '' }]);
  const remove = (id: string) => setRows((r) => r.filter((x) => x.id !== id));
  const update = (id: string, patch: Partial<Row>) =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    rows.forEach((row) => {
      if (!row.label.trim()) next[row.id] = 'Label required';
      if (row.type === 'select' && !row.options?.trim()) next[row.id] = 'Options required';
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    console.log(JSON.stringify(rows, null, 2));
  };

  return (
    <form onSubmit={onSubmit}>
      {rows.map((row) => (
        <div key={row.id}>
          <select value={row.type} onChange={(e) => update(row.id, { type: e.target.value as Row['type'] })}>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="select">Select</option>
          </select>
          <input value={row.label} onChange={(e) => update(row.id, { label: e.target.value })} placeholder="Label" />
          {row.type === 'select' && (
            <input value={row.options ?? ''} onChange={(e) => update(row.id, { options: e.target.value })} placeholder="a,b,c" />
          )}
          {errors[row.id] && <span role="alert">{errors[row.id]}</span>}
          <button type="button" onClick={() => remove(row.id)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addRow}>Add field</button>
      <button type="submit">Export JSON</button>
    </form>
  );
}`,
    walkthrough: 'rows array is source of truth; render switches on row.type; validation builds error map.',
    mistakes: ['Index keys on dynamic rows', 'Storing DOM refs per row unnecessarily'],
    stretch: ['Drag reorder', 'JSON Schema export'],
  }),

  challenge({
    slug: '05-art-drawing-tool',
    title: 'Art Drawing Tool',
    difficulty: 'hard',
    topics: ['canvas', 'refs', 'events'],
    goals: ['Draw on canvas with mouse/touch', 'Color and brush size', 'Clear and export PNG'],
    description:
      'HTML canvas drawing app: pencil tool, color picker, brush size slider, eraser, clear canvas, download PNG. Handle mouse down/move/up and touch events.',
    requirements: ['Smooth strokes', 'Device pixel ratio scaling', 'Export via toDataURL'],
    starter: `const canvasRef = useRef<HTMLCanvasElement>(null);`,
    hints: ['Scale canvas width/height by devicePixelRatio', 'lineTo on mousemove with lineCap round'],
    acceptance: ['Draws smoothly', 'Export downloads file', 'Clear works'],
    solutionApproach: '2D context path drawing with state for isDrawing.',
    concepts: [
      { term: 'Canvas DPR', detail: 'Multiply canvas buffer size by devicePixelRatio for sharp lines.' },
      { term: 'Pointer events', detail: 'Unified mouse/touch via pointerdown/move/up.' },
    ],
    solution: `import { useEffect, useRef, useState } from 'react';

export function DrawingTool() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000');
  const [size, setSize] = useState(4);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
  }, []);

  const pos = (e: React.PointerEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onDown = (e: React.PointerEvent) => {
    const ctx = ref.current!.getContext('2d')!;
    const { x, y } = pos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!drawing) return;
    const ctx = ref.current!.getContext('2d')!;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clear = () => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const download = () => {
    const url = ref.current!.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.png';
    a.click();
  };

  return (
    <div>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <input type="range" min={1} max={32} value={size} onChange={(e) => setSize(Number(e.target.value))} />
      <button onClick={clear}>Clear</button>
      <button onClick={download}>Download</button>
      <canvas
        ref={ref}
        style={{ width: '100%', height: 400, border: '1px solid #ccc', touchAction: 'none' }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={() => setDrawing(false)}
        onPointerLeave={() => setDrawing(false)}
      />
    </div>
  );
}`,
    walkthrough: 'Pointer events draw line segments; DPR effect sizes backing store for crisp strokes.',
    mistakes: ['Not scaling for retina', 'Missing touchAction none causing scroll'],
    stretch: ['Undo stack', 'Layers'],
  }),
];
