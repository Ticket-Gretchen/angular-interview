# Senior Angular Developer - Technical Challenge

## Overview

This challenge assesses your ability to work with existing Angular code—debugging, refactoring, and extending a real-world application. You'll work with a **Cultural Event Dashboard** that has some bugs and uses legacy patterns that need modernization.

**Time:** ~3 hours  
**Focus:** Quality over quantity. Complete what you can, document trade-offs.

---

## Getting Started

```bash
npm install
npm start
```

The app runs at `http://localhost:4200`. Explore it first—create events, navigate around, check the console for any issues.

---

## The Challenges

### Part 1: Bug Hunt (Fix 2-3 bugs)

The application has several bugs. Find and fix them.

#### Bug 1: Memory Leak

**Location:** `pages/event-list/event-list.component.ts`

Navigate between the event list and event details a few times. Watch the console—you'll see duplicate log messages appearing. There's a memory leak caused by subscriptions that aren't cleaned up.

**Your task:** Fix the memory leak using modern Angular patterns (`takeUntilDestroyed`, `DestroyRef`, or similar).

---

#### Bug 2: UI Not Updating

**Location:** `components/event-card/event-card.component.ts`

Click the favorite button (star icon) on any event card. The state changes internally, but the UI doesn't reflect it reliably.

**Your task:** Find why change detection isn't triggering and fix it.

---

#### Bug 3: Countdown Not Updating

**Location:** `pages/event-detail/event-detail.component.ts`

Open any event's detail page. The countdown timer shows initial values but doesn't tick down, even though `console.log` shows the values are changing.

**Your task:** Understand why Angular isn't detecting the changes and fix the countdown display.

---

### Part 2: Refactor (Choose 1-2)

#### Refactor A: Modernize Template Syntax

**Location:** `components/event-filter/event-filter.component.ts`

This component uses legacy `*ngIf` and `*ngFor` directives. Refactor to use the new control flow syntax:

- `*ngIf` → `@if`
- `*ngFor` → `@for` (with `track` expression)

**Bonus:** Convert the `@Input`/`@Output` decorators to signal-based `input()` and `output()` functions.

---

#### Refactor B: Migrate to SignalStore

**Location:** `store/event.store.ts`

The current store uses `BehaviorSubject` for state management. Refactor it to use **@ngrx/signals SignalStore**.

Requirements:

- Use `withState`, `withComputed`, `withMethods` pattern
- Use `patchState` for state updates
- Expose signals instead of observables
- Maintain the same functionality

---

### Part 3: Extend (If time permits)

Add a small feature of your choice. Ideas:

- Add sorting to the event list (by date, price, name)
- Implement debounced search
- Add a "recently viewed" feature
- Improve accessibility (keyboard navigation, ARIA labels)

---

## What We're Looking For

1. **Debugging Skills** — Can you identify and fix Angular-specific issues?
2. **Modern Angular** — Do you know the latest patterns (Signals, control flow, SignalStore)?
3. **Code Quality** — Is your code clean, typed, and maintainable?
4. **Problem Solving** — How do you approach unfamiliar code?

---

## Submission

1. Fix/refactor the code
2. Update this section with notes:

### Your Notes

_Document what you did, any trade-offs, and what you'd do with more time:_

```
[Your notes here]
```

3. Commit your changes with clear messages
4. Submit via [method TBD]

---

## Hints

- Check the comments in each file—they contain hints about what's wrong
- Use Angular DevTools browser extension for debugging
- `takeUntilDestroyed()` is from `@angular/core/rxjs-interop`
- SignalStore docs: https://ngrx.io/guide/signals

---

Good luck! 🎭
