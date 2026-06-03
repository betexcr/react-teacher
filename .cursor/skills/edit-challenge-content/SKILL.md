---
name: edit-challenge-content
description: >-
  Adds or edits ReactTeacher coding challenges via scripts/challenges source files
  and regenerates markdown. Use when changing challenge text, solutions, acceptance
  criteria, hints, resources, difficulty, or adding a new challenge slug.
---

# Edit challenge content

## Source files

| File | Purpose |
|------|---------|
| `scripts/challenges/easy.mjs` | Easy challenges |
| `scripts/challenges/medium.mjs` | Medium |
| `scripts/challenges/hard.mjs` | Hard |
| `scripts/challenges/very-hard.mjs` | Very hard |
| `scripts/challenges/index.mjs` | Exports ordered list |
| `scripts/challenges/acceptance.mjs` | Curated acceptance `{ summary, detail }` |
| `scripts/challenges/resources.mjs` | Per-challenge doc links |
| `scripts/challenges/helpers.mjs` | `challenge()` helper |

## Workflow

1. Locate the challenge in the correct `*.mjs` file (search by `slug` or `title`).
2. Edit fields on the `challenge({ ... })` call.
3. If acceptance or resources change, update `acceptance.mjs` / `resources.mjs` for `'<difficulty>/<slug>'`.
4. Run `npm run generate` from repo root.
5. Spot-check `challenges/<difficulty>/<slug>/CHALLENGE.md` and `SOLUTION.md`.
6. If UI/tooltips look wrong, see [solution-code-tooltips](../solution-code-tooltips/SKILL.md).

## Rules

- **Solutions:** function components + hooks only. Error boundaries: `react-error-boundary`, not `class extends Component`.
- **Slug:** kebab-case; changing slug breaks URLs—keep slug unless migrating intentionally.
- **Do not** manually edit generated trees long-term; always re-run generate.
- New challenge: add to appropriate `*.mjs`, register in `index.mjs` order, add acceptance + resources entries, generate.

## Verify

```powershell
npm run generate
npm run build
```

Open `/challenges/<difficulty>/<slug>` in dev (`npm run dev`).
