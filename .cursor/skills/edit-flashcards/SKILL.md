---
name: edit-flashcards
description: >-
  Edits ReactTeacher flashcard decks by changing scripts/flashcard-content source
  and running generate-flashcards.mjs. Use when adding cards, fixing explanations,
  or updating deck sections under src/data/flashcards.
---

# Edit flashcards

## Source of truth

- Content modules: `scripts/flashcard-content/*.mjs` (e.g. `fundamentals.mjs`)
- Enrichment/helpers: `scripts/flashcard-content/enrich.mjs`
- Generator: `scripts/generate-flashcards.mjs`

## Generated output

- `src/data/flashcards/*.ts` — one file per deck (`question`, multi-paragraph `explanation`)
- `src/data/flashcards/index.ts` — deck registry
- Study routes: `/flashcards/<deck-slug>` (see existing slugs in `index.ts`)

## Workflow

1. Edit the relevant `scripts/flashcard-content/*.mjs` deck data.
2. Run `npm run generate` (includes flashcard generation) or `node scripts/generate-flashcards.mjs`.
3. Confirm TypeScript compiles: `npm run build` or `tsc -b`.
4. Spot-check a few cards in the flashcard study UI.

## Conventions

- Explanations: clear, interview-focused prose; multiple short paragraphs beat one wall of text.
- Do not hand-edit `src/data/flashcards/*.ts` for permanent changes—they are regenerated.
- Keep card count and deck slugs stable unless intentionally restructuring navigation.
