# ReactTeacher — agent guide

Interview-prep SPA: **53 React challenges**, **290+ flashcards**, JS Basics, and system-design write-ups. Production: https://reactteacher.vercel.app · Repo: https://github.com/betexcr/react-teacher

## Stack

- React 19, TypeScript, Vite 8, React Router 7
- Static SPA on Vercel (`vercel.json` SPA rewrite; `middleware.ts` for bot/OG meta)
- No backend; challenge solutions are reference code in markdown, not executed in-app

## Commands

| Command | Use |
|---------|-----|
| `npm run dev` | `generate` then Vite dev server (port 5173) |
| `npm run generate` | Challenges, flashcards, `public/challenges`, OG images, `og-manifest.ts` |
| `npm run build` | Full production build (runs `generate` first) |
| `npm run lint` | ESLint |

**Windows (PowerShell):** chain with `;`, not `&&`.

**Deploy:** `npx vercel deploy --prod --yes` (project `reactteacher`, alias https://reactteacher.vercel.app). Only push/commit when the user asks.

## Content pipelines (edit source, then generate)

### Challenges

| Role | Path |
|------|------|
| **Source of truth** | `scripts/challenges/{easy,medium,hard,very-hard}.mjs` |
| Acceptance copy | `scripts/challenges/acceptance.mjs` |
| Resource links | `scripts/challenges/resources.mjs` |
| Solution code tooltips | `scripts/challenges/solution-highlights.mjs` |
| Generator | `scripts/generate-challenges.mjs` |
| **Generated** (do not hand-edit long-term) | `challenges/**`, `public/challenges/**`, `src/data/challenges-index.json` |

After changing challenge data: `npm run generate`.

Challenge solutions must use **function components** and hooks. For error boundaries, use `react-error-boundary` in sample code—not class `Component` solutions.

### Flashcards

| Role | Path |
|------|------|
| Source | `scripts/flashcard-content/*.mjs`, `scripts/generate-flashcards.mjs` |
| Generated | `src/data/flashcards/*.ts` |

### SEO / OG

- Routes meta: `src/data/seo.ts`, `src/components/PageMeta.tsx`
- OG assets: `scripts/generate-og-images.mjs`, `public/og/**`, `src/data/og-manifest.ts`

### JS Basics (in-app, not generated)

- Topics: `src/data/jsBasicsTopics.ts`
- Tutorial steps: `src/data/jsBasicsTutorialSteps.ts`
- Glossary tooltips: `src/data/reactTermGlossary.ts`, `src/utils/formatJsBasicsProse.tsx`

## App structure

```
src/
├── App.tsx, main.tsx          # Router
├── pages/                     # Route pages
├── components/                # UI (MarkdownView, CodeBlock, challenge browser, …)
├── data/                      # JSON/TS content consumed by UI
├── lib/                       # challenges.ts, solutionHighlights.ts, markdown
├── utils/                     # annotateSolutionCode, prose formatters
├── hooks/                     # scroll, progress
└── styles/app.css             # Global styles (large single file)
```

Challenge detail loads markdown from `public/challenges` at build time; solution code blocks get per-challenge hover highlights via `solutionHighlights` + `annotateSolutionCode.tsx`.

## Conventions

- **Functional React only** in challenge solutions and UI examples.
- **Minimal diffs**; match existing naming and file layout.
- **No commits/push** unless the user requests.
- Regenerate instead of patching dozens of `CHALLENGE.md` / `SOLUTION.md` files by hand.
- Solution highlight tips: no `In "Challenge Title",` prefix; tips should stand alone.
- In `solution-highlights.mjs`, avoid unescaped `'` inside single-quoted strings (e.g. `'@'`).

## Project skills

Use `.cursor/skills/` when working in these areas:

| Skill | When |
|-------|------|
| `edit-challenge-content` | New/edited challenges, acceptance, resources |
| `solution-code-tooltips` | Hover highlights on solution code |
| `edit-flashcards` | Flashcard decks and generator |
| `deploy-reactteacher` | Push and Vercel production deploy |

## Related docs

- Human README: [README.md](README.md)
- Claude Code: [CLAUDE.md](CLAUDE.md) (same rules, shell notes)
