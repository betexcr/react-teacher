import { dataFetchingExtras } from './data-fetching.mjs';
import { hooksExtras } from './hooks.mjs';
import { typescriptExtras } from './typescript.mjs';
import { react19Extras } from './react-19.mjs';
import { lifecycleExtras } from './lifecycle.mjs';
import { performanceExtras } from './performance.mjs';
import { architectureExtras } from './architecture.mjs';
import { designPatternsExtras } from './design-patterns.mjs';
import { routingExtras } from './routing.mjs';
import { testingExtras } from './testing.mjs';
import { formsExtras } from './forms.mjs';
import { securityExtras } from './security.mjs';
import { serverComponentsExtras } from './server-components.mjs';
import { toolsExtras } from './tools.mjs';
import { ecosystemExtras } from './ecosystem.mjs';
import { nextExtras } from './next.mjs';
import { internalsExtras } from './internals.mjs';
import { accessibilityExtras } from './accessibility.mjs';
import { stylingExtras } from './styling.mjs';

const BY_DECK = {
  'data-fetching': dataFetchingExtras,
  hooks: hooksExtras,
  'typescript-in-react': typescriptExtras,
  'react-19': react19Extras,
  'component-lifecycle': lifecycleExtras,
  'performance-optimization': performanceExtras,
  'application-architecture': architectureExtras,
  'design-patterns': designPatternsExtras,
  'routing-navigation': routingExtras,
  'testing-react': testingExtras,
  'forms-validation': formsExtras,
  security: securityExtras,
  'server-components-ssr': serverComponentsExtras,
  'tools-build': toolsExtras,
  'ecosystem-integration': ecosystemExtras,
  'next-framework': nextExtras,
  'react-internals': internalsExtras,
  accessibility: accessibilityExtras,
  styling: stylingExtras,
};

function normalizeFront(front) {
  return front.trim().replace(/\?$/, '');
}

/** @returns {{ detail?: string; code?: string }} */
export function getCardExtras(deckId, front) {
  const key = normalizeFront(front);
  const deck = BY_DECK[deckId];
  if (!deck) return {};
  return deck[key] ?? deck[front.trim()] ?? {};
}
