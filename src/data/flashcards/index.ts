import { reactFundamentalsDeck } from './react-fundamentals';
import { typescriptInReactDeck } from './typescript-in-react';
import { react19Deck } from './react-19';
import { componentLifecycleDeck } from './component-lifecycle';
import { performanceOptimizationDeck } from './performance-optimization';
import { applicationArchitectureDeck } from './application-architecture';
import { designPatternsDeck } from './design-patterns';
import { routingNavigationDeck } from './routing-navigation';
import { testingReactDeck } from './testing-react';
import { dataFetchingDeck } from './data-fetching';
import { formsValidationDeck } from './forms-validation';
import { securityDeck } from './security';
import { serverComponentsSsrDeck } from './server-components-ssr';
import { toolsBuildDeck } from './tools-build';
import { ecosystemIntegrationDeck } from './ecosystem-integration';
import { nextFrameworkDeck } from './next-framework';
import { reactInternalsDeck } from './react-internals';
import { accessibilityDeck } from './accessibility';
import { stylingDeck } from './styling';
import { hooksDeck } from './hooks';

export * from './types';

export const flashcardDecks = [
  reactFundamentalsDeck,
  typescriptInReactDeck,
  react19Deck,
  componentLifecycleDeck,
  performanceOptimizationDeck,
  applicationArchitectureDeck,
  designPatternsDeck,
  routingNavigationDeck,
  testingReactDeck,
  dataFetchingDeck,
  formsValidationDeck,
  securityDeck,
  serverComponentsSsrDeck,
  toolsBuildDeck,
  ecosystemIntegrationDeck,
  nextFrameworkDeck,
  reactInternalsDeck,
  accessibilityDeck,
  stylingDeck,
  hooksDeck,
];

export function getDeckById(id: string) {
  return flashcardDecks.find((d) => d.id === id);
}

export function getDeckBySlug(slug: string) {
  return flashcardDecks.find((d) => d.slug === slug);
}
