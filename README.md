# ReactTeacher

Interview prep for React: **53 coding challenges** and **290+ flashcards** across 20 topics, in a dark, focused learning UI.

**Repository:** https://github.com/betexcr/react-teacher

```bash
git clone https://github.com/betexcr/react-teacher.git
cd react-teacher
```

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## What's included

### React Challenges (53)

| Level | Count |
|-------|-------|
| Easy | 19 |
| Medium | 26 |
| Hard | 5 |
| Very Hard | 3 |

Each challenge has:

- `challenges/<level>/<slug>/CHALLENGE.md` — requirements, hints, acceptance criteria
- `challenges/<level>/<slug>/SOLUTION.md` — solution code and explanation

Regenerate markdown:

```bash
npm run generate
```

### Flashcards (20 sections, 290 cards)

All 20 sections are unlocked and available in the app.

Data lives in `src/data/flashcards/*.ts` (`question` + multi-paragraph `explanation`). Study URLs: `/flashcards/fundamentals`, `/flashcards/typescript`, etc. Regenerate from `scripts/generate-flashcards.mjs`.

## Project structure

```
react-teacher/
├── challenges/          # Generated challenge markdown
├── public/challenges/   # Copied for dev/build static serving
├── scripts/             # Generators
├── src/
│   ├── data/flashcards/
│   ├── layout/
│   ├── pages/
│   └── styles/
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Generate assets + start Vite |
| `npm run build` | Production build |
| `npm run generate` | Regenerate challenges, flashcards, public copy |

## Tech stack

- React 19 + TypeScript + Vite
- React Router 7
