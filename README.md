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

## Performance tradeoffs

### Advantages

- **No layout thrashing during animation** — layout is calculated once upfront, then every frame uses `transform` only (GPU compositor), keeping per-frame cost at ~0.1ms
- **Smooth element reordering** — siblings, parents, and the moving element all animate simultaneously without fighting the browser's layout engine
- **Animates DOM insertions/removals** — elements moving between containers, entering, and exiting all get smooth transitions, which is impossible with CSS transitions alone
- **Spring physics** — natural-feeling motion with momentum and deceleration instead of robotic linear easing

### Disadvantages

- **Higher CPU usage** — Motion runs JS on the main thread: `getBoundingClientRect()` calls before and after render, delta calculations, spring physics solver (~16-18 `requestAnimationFrame` callbacks per animation), and `AnimatePresence` bookkeeping
- **Bundle size** — Motion adds ~18-20kB (gzipped) to the bundle
- **Style recalcs are unchanged** — Motion doesn't reduce style recalculation cost; it's the same as a plain React re-render

### When to use it

- **Use Motion FLIP** when elements change position in the DOM (reordering lists, moving between containers, entering/exiting) and you need smooth visual continuity
- **Use CSS transitions** when you're animating property changes on the same element (hover effects, color changes, opacity toggles) — no JS overhead needed
- **Use neither** for static content where instant updates are acceptable and the extra CPU/bundle cost isn't justified

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
