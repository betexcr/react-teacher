import { getCodeExample, isMostlyCode, splitBackIntoProseAndCode } from './code-examples.mjs';

/** Build interview-style question + multi-paragraph explanation from a topic seed. */
export function interviewCard(question, ...paragraphs) {
  return {
    question,
    explanation: paragraphs.filter(Boolean).join('\n\n'),
  };
}

/** One short, deck-specific interview angle—avoid repeating the same filler on every card. */
const DECK_INTERVIEW_HINT = {
  'TypeScript in React':
    'Interview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught.',
  'React 19':
    'Interview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced.',
  'Component Lifecycle':
    'Interview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote.',
  'Performance Optimization':
    'Interview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization.',
  'Application Architecture':
    'Interview tip: describe where this lived in a feature folder or app shell and what coupling it reduced.',
  'Design Patterns':
    'Interview tip: give a component API example—why compound components, render props, or a hook beat prop drilling.',
  'Routing & Navigation':
    'Interview tip: tie this to a URL, layout, or redirect users could bookmark or share.',
  'Testing React Applications':
    'Interview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards.',
  'Data Fetching & Management':
    'Interview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided.',
  'Forms & Validation':
    'Interview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async).',
  'Security Best Practices':
    'Interview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both.',
  'Server Components & SSR':
    'Interview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong.',
  'Tools & Build Pipeline':
    'Interview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit.',
  'React Ecosystem & Integration':
    'Interview tip: name the library and the responsibility you did not reimplement in React state.',
  'Next Framework':
    'Interview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router.',
  'React Internals':
    'Interview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper.',
  Accessibility:
    'Interview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences.',
  'Styling in React':
    'Interview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed.',
  Hooks:
    'Interview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition.',
};

function formatCodeBlock(code) {
  return '```tsx\n' + code.trim() + '\n```';
}

export function enrichCard(deckTitle, deckId, front, back, explicitCode) {
  const question = front.trim().endsWith('?')
    ? front.trim()
    : front.trim().endsWith('.')
      ? front.trim().slice(0, -1) + '?'
      : `What is ${front.trim()}?`;

  const code = explicitCode ?? getCodeExample(deckId, front, back);
  const { prose: splitProse } = splitBackIntoProseAndCode(back);
  let core = back.trim();
  if (code) {
    if (splitProse) {
      core = splitProse.trim();
    } else if (isMostlyCode(back)) {
      core = null;
    }
  }

  const hint = DECK_INTERVIEW_HINT[deckTitle];
  const parts = [core, code ? formatCodeBlock(code) : null, hint].filter(Boolean);

  return interviewCard(question, ...parts);
}
