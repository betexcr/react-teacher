import type { ReactPattern } from './types';
import compoundComponents from './content/compound-components.md?raw';
import customHooks from './content/custom-hooks.md?raw';
import containerPresentational from './content/container-presentational.md?raw';
import providerContext from './content/provider-context.md?raw';
import controlledUncontrolled from './content/controlled-uncontrolled.md?raw';
import composition from './content/composition.md?raw';
import stateReducer from './content/state-reducer.md?raw';
import renderProps from './content/render-props.md?raw';
import higherOrderComponents from './content/higher-order-components.md?raw';
import polymorphicComponents from './content/polymorphic-components.md?raw';
import headlessUi from './content/headless-ui.md?raw';
import portals from './content/portals.md?raw';
import errorBoundaries from './content/error-boundaries.md?raw';
import lazySuspense from './content/lazy-suspense.md?raw';
import liftingStateUp from './content/lifting-state-up.md?raw';
import optimisticUi from './content/optimistic-ui.md?raw';

export const reactPatterns: ReactPattern[] = [
  {
    slug: 'compound-components',
    title: 'Compound Components',
    subtitle: 'Shared implicit state via context',
    pageTitle: 'Compound Components Pattern',
    content: compoundComponents,
  },
  {
    slug: 'custom-hooks',
    title: 'Custom Hooks',
    subtitle: 'Reusable stateful logic',
    pageTitle: 'Custom Hooks Pattern',
    content: customHooks,
  },
  {
    slug: 'container-presentational',
    title: 'Container / Presentational',
    subtitle: 'Separate data from UI',
    pageTitle: 'Container / Presentational Pattern',
    content: containerPresentational,
  },
  {
    slug: 'provider-context',
    title: 'Provider / Context',
    subtitle: 'Share values without prop drilling',
    pageTitle: 'Provider / Context Pattern',
    content: providerContext,
  },
  {
    slug: 'controlled-uncontrolled',
    title: 'Controlled vs Uncontrolled',
    subtitle: 'Who owns form input state',
    pageTitle: 'Controlled vs Uncontrolled Components',
    content: controlledUncontrolled,
  },
  {
    slug: 'composition',
    title: 'Composition',
    subtitle: 'Children and slot props',
    pageTitle: 'Composition Pattern',
    content: composition,
  },
  {
    slug: 'state-reducer',
    title: 'State Reducer',
    subtitle: 'Predictable state transitions',
    pageTitle: 'State Reducer Pattern',
    content: stateReducer,
  },
  {
    slug: 'render-props',
    title: 'Render Props',
    subtitle: 'Inject state into JSX via functions',
    pageTitle: 'Render Props Pattern',
    content: renderProps,
  },
  {
    slug: 'higher-order-components',
    title: 'Higher-Order Components',
    subtitle: 'Enhance components with wrappers',
    pageTitle: 'Higher-Order Components (HOC)',
    content: higherOrderComponents,
  },
  {
    slug: 'polymorphic-components',
    title: 'Polymorphic Components',
    subtitle: 'Flexible `as` prop rendering',
    pageTitle: 'Polymorphic Components Pattern',
    content: polymorphicComponents,
  },
  {
    slug: 'headless-ui',
    title: 'Headless UI',
    subtitle: 'Behavior without prescribed markup',
    pageTitle: 'Headless UI Pattern',
    content: headlessUi,
  },
  {
    slug: 'portals',
    title: 'Portals',
    subtitle: 'Render outside the parent DOM tree',
    pageTitle: 'React Portals Pattern',
    content: portals,
  },
  {
    slug: 'error-boundaries',
    title: 'Error Boundaries',
    subtitle: 'Isolate render failures',
    pageTitle: 'Error Boundaries Pattern',
    content: errorBoundaries,
  },
  {
    slug: 'lazy-suspense',
    title: 'Lazy Loading & Suspense',
    subtitle: 'Code-split routes and features',
    pageTitle: 'Lazy Loading & Suspense Pattern',
    content: lazySuspense,
  },
  {
    slug: 'lifting-state-up',
    title: 'Lifting State Up',
    subtitle: 'Shared state in a common ancestor',
    pageTitle: 'Lifting State Up Pattern',
    content: liftingStateUp,
  },
  {
    slug: 'optimistic-ui',
    title: 'Optimistic UI',
    subtitle: 'Instant feedback before the server confirms',
    pageTitle: 'Optimistic UI Pattern',
    content: optimisticUi,
  },
];

export function getPatternBySlug(slug: string): ReactPattern | undefined {
  return reactPatterns.find((p) => p.slug === slug);
}
