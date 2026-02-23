# FLIP Kanban Board

Interactive Kanban board showcasing the **FLIP animation technique** using [Motion](https://motion.dev/) (formerly Framer Motion) and React.

Click any card to advance it to the next column — every element animates smoothly via the GPU compositor with zero layout thrashing.

## What is FLIP?

**F**irst, **L**ast, **I**nvert, **P**lay — a technique that turns expensive layout animations into cheap `transform` animations:

1. **First** — record the element's current position
2. **Last** — apply the DOM change, measure the new position
3. **Invert** — use `transform` to snap the element back to its old position
4. **Play** — remove the transform and let the GPU animate to the final state

The result: only one layout recalculation (frame 1), then pure compositor work for the rest of the animation (~0.1ms/frame vs ~10-16ms/frame).

## What animates

| Element | How | Why |
|---------|-----|-----|
| **Card (moving)** | `layoutId` | FLIP-animates across columns |
| **Sibling cards** | `layout` | Shift up/down to fill gaps |
| **Columns** | `layout` | Height adjusts as cards enter/leave |
| **Count badges** | `layout` | Number updates with layout animation |
| **Enter/exit** | `AnimatePresence` | Fade + scale on mount/unmount |

## Tech stack

- **React 19** + TypeScript
- **Motion 12** — `layout`, `layoutId`, `AnimatePresence`
- **Tailwind CSS 4** (Vite plugin)
- **Vite 7**

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
