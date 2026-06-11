# Feature Showcase 02 — Scroll-pinned LTR

Scroll-driven feature showcase. Left: progress bars + text nav. Right: sticky mockup. No GSAP — pure scroll listener + CSS sticky.

Reference: Sana's pinned-videos (GSAP ScrollTrigger) + Framer's LTR text-to-visual layout.

---

## Layout — Desktop (lg:)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ <section ref={sectionRef}>                                               │
│   min-height: (N + 1) × 100vh    ← creates scroll distance              │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────────────────┐ │
│ │ <div>  sticky top-0 h-screen                                        │ │
│ │   <div> mx-auto max-w-page px-6 lg:px-8                            │ │
│ │     <div> grid grid-cols-1 lg:grid-cols-12 gap-8 h-full            │ │
│ │                                                                      │ │
│ │  ┌─ lg:col-span-5 ─────────────┐  ┌─ lg:col-span-7 ──────────────┐│ │
│ │  │  flex col, justify-center    │  │  flex, items-center           ││ │
│ │  │  landing (auto-size h3)      │  │                               ││ │
│ │  │                              │  │  ┌───────────────────────┐   ││ │
│ │  │  ┌─ progress bars ────────┐  │  │  │ ╭─────────────────╮ │   ││ │
│ │  │  │ ━━━━━━  ▓▓▓▓──  ───── │  │  │  │ │  browser chrome  │ │   ││ │
│ │  │  └────────────────────────┘  │  │  │ ├─────────────────┤ │   ││ │
│ │  │                              │  │  │ │                 │ │   ││ │
│ │  │  ┌─ text items ───────────┐  │  │  │ │    Mockup for   │ │   ││ │
│ │  │  │                        │  │  │  │ │   active item   │ │   ││ │
│ │  │  │  Automate     (muted)  │  │  │  │ │   (cross-fade)  │ │   ││ │
│ │  │  │                        │  │  │  │ │                 │ │   ││ │
│ │  │  │  Analyze      (ACTIVE) │  │  │  │ ╰─────────────────╯ │   ││ │
│ │  │  │  Turn data    (sub)    │  │  │  └───────────────────────┘   ││ │
│ │  │  │                        │  │  │                               ││ │
│ │  │  │  Act          (muted)  │  │  │                               ││ │
│ │  │  │                        │  │  │                               ││ │
│ │  │  └────────────────────────┘  │  │                               ││ │
│ │  └──────────────────────────────┘  └───────────────────────────────┘│ │
│ │                                                                      │ │
│ └──────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│   (empty scroll space — user scrolls through this)                       │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

## Layout — Mobile (<lg)

Two zones: an hgroup that scrolls away naturally, then a pinned area with progress bars + active label + mockup. Matches Sana's mobile pinned-videos pattern.

```
┌─────────────────────────────────────┐
│                                     │  scrolls normally (not pinned)
│  ┌─ hgroup ──────────────────────┐  │
│  │ landing                       │  │
│  │                               │  │
│  │  h2: Run complex, multi-step  │  │
│  │      processes                │  │
│  │                               │  │
│  │  p: Accelerate work with AI   │  │
│  │     agents that collaborate…  │  │
│  │                               │  │
│  └───────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤  ← hgroup scrolls out of view
│                                     │
│ <section>  min-height: (N+1)×100vh  │
│                                     │
│ ┌─ sticky top-0 ─────────────────┐  │
│ │                                 │  │
│ │  ━━━━━  ▓▓▓▓──  ─────          │  │  progress bars
│ │                                 │  │
│ │  Analyze        (active only)   │  │  only active label shown
│ │                                 │  │
│ │  ┌───────────────────────────┐  │  │
│ │  │ ╭─────────────────────╮  │  │  │
│ │  │ │ browser chrome       │  │  │  │
│ │  │ ├─────────────────────┤  │  │  │
│ │  │ │                     │  │  │  │
│ │  │ │   Mockup for        │  │  │  │  mockup swaps on scroll
│ │  │ │   active feature    │  │  │  │
│ │  │ │                     │  │  │  │
│ │  │ ╰─────────────────────╯  │  │  │
│ │  └───────────────────────────┘  │  │
│ │                                 │  │
│ └─────────────────────────────────┘  │
│                                     │
│  (scroll space)                     │
│                                     │
└─────────────────────────────────────┘
```

Key differences from desktop:
- hgroup is **not pinned** — scrolls away before the pinned section starts
- Only the **active label** is shown — not the full stacked list
- Text label cross-fades instead of expand/collapse
- Mockup uses browser chrome (not phone frame — we don't have a phone asset yet)

---

## Scroll mechanics

### What GSAP does (Sana)

```js
gsap.to(video1, {
  scrollTrigger: {
    trigger: video1,
    start: "top 50%",
    end: "+=150%",
    scrub: true,
    onEnter: () => { /* swap active, play video */ },
    onEnterBack: () => { /* reverse active */ },
    onUpdate: (self) => {
      bar.style.width = (self.progress * 100) + "%";
    },
  },
});
```

Key behaviors:
1. Section pinned (`pin: true` on last trigger)
2. Each video has its own ScrollTrigger with progress 0→1
3. `onEnter`/`onEnterBack`: swap `.active` class
4. `onUpdate`: fill progress bar to `self.progress%`
5. Scroll direction handled by separate enter/enterBack callbacks

### Our equivalent — performance-first

Two rendering tiers:
- **`activeIndex`** changes rarely (once per feature) → React state, triggers re-render for text/mockup swap
- **`itemProgress`** changes every frame → `useRef` + direct DOM mutation, no React re-render

```tsx
const sectionRef = useRef<HTMLElement>(null);
const [activeIndex, setActiveIndex] = useState(0);
const barRefs = useRef<(HTMLDivElement | null)[]>([]);
const activeIndexRef = useRef(0);

const handleScroll = useCallback(() => {
  const el = sectionRef.current;
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  const scrolled = -rect.top;
  const progress = Math.max(0, Math.min(1, scrolled / scrollable));

  const N = features.length;
  const idx = Math.min(N - 1, Math.floor(progress * N));
  const itemProgress = (progress * N) % 1;

  // Tier 1: only setState when index actually changes (rare)
  if (idx !== activeIndexRef.current) {
    activeIndexRef.current = idx;
    setActiveIndex(idx);
  }

  // Tier 2: direct DOM mutation every frame (no re-render)
  barRefs.current.forEach((bar, i) => {
    if (!bar) return;
    if (i < idx) bar.style.width = "100%";
    else if (i === idx) bar.style.width = `${itemProgress * 100}%`;
    else bar.style.width = "0%";
  });
}, [features.length]);

useEffect(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // initial position
  return () => window.removeEventListener("scroll", handleScroll);
}, [handleScroll]);
```

### Behavior mapping

| GSAP (Sana) | Ours | Match? |
|---|---|---|
| `pin: true` on last trigger | `sticky top-0 h-screen` on inner div | Same — content stays fixed while page scrolls |
| `trigger: videoN, start: "top 50%"` | `idx = floor(progress * N)` | Same — scroll position determines active item |
| `onEnter` / `onEnterBack` → swap `.active` | `setActiveIndex(idx)` only when index changes | Same — active item swaps, works both scroll directions |
| `onUpdate: self.progress` → `bar.style.width` | `barRef.style.width` via direct DOM mutation | Same — bar fills 0→100%, no React re-render per frame |
| `scrub: true` | `scroll` listener with `{ passive: true }` | Same — tied to scroll position, not time |
| `end: "+=150%"` / `"+=100%"` per trigger | `min-height: (N + 1) * 100vh` | Similar — controls scroll distance per feature |
| `video.play()` / `video.pause()` | Not needed — static mockups | Simplified |
| GSAP inserts pin spacer div | Section min-height creates the space | Same result |

---

## Progress bars

```
3 features → 3 bars, horizontal with gap-2

Scroll at 50% (midway through feature 1):

  ━━━━━━━━━━━━━━━━━━   ▓▓▓▓▓▓▓▓▓─────────   ──────────────────
  bar 0: complete       bar 1: 50% filled     bar 2: empty
```

```tsx
<div className="flex gap-2 mb-8">
  {features.map((_, i) => (
    <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-black/20">
      <div
        ref={(el) => { barRefs.current[i] = el; }}
        className="h-full rounded-full bg-foreground"
        style={{ width: "0%" }}
      />
    </div>
  ))}
</div>
```

Bars use `bg-black/20` for the track (same TW3 workaround as testimonials) and `bg-foreground` for the fill. Width is set via ref — never through React state.

---

## Text nav

```
Inactive:                          Active:
┌────────────────────────┐         ┌────────────────────────┐
│                        │         │                        │
│  h3: Automate          │         │  h3: Analyze           │
│  text-muted-foreground │         │  text-foreground       │
│                        │         │                        │
│  (subtitle collapsed)  │         │  p: Turn data into     │
│  max-h-0 opacity-0     │         │  live dashboards       │
│                        │         │  max-h-24 opacity-100  │
│                        │         │  (animates open)       │
└────────────────────────┘         └────────────────────────┘
```

Wrapped in `.landing` so `<h3>` gets auto-sized (24px desktop / 20px mobile) with `font-heading` and style pack weight.

```tsx
<div className="landing flex flex-col gap-4">
  {features.map((feature, i) => {
    const isActive = i === activeIndex;
    return (
      <button
        key={feature.key}
        onClick={() => scrollToFeature(i)}
        className="text-left"
      >
        <h3
          className={cn(
            "text-balance transition-colors duration-300",
            isActive ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {feature.label}
        </h3>
        <div
          className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-500 ease-out",
            isActive ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <p className="text-pretty text-sm text-muted-foreground pt-2">
            {feature.heading}
          </p>
        </div>
      </button>
    );
  })}
</div>
```

Typography rules applied:
- `.landing` wrapper for auto-sized headings
- `text-balance` on headings
- `text-pretty` on body paragraphs
- No weight classes on headings — style pack owns it
- `text-muted-foreground` for subtitle (helper text)

---

## Mockup (right column)

All mockups in DOM. Active gets `opacity-100`, others `opacity-0`. Cross-fade via `transition-opacity duration-500`.

```tsx
<div className="relative w-full">
  <img
    src="/browser-chrome.svg"
    alt=""
    className="pointer-events-none relative z-[1] w-full"
  />
  <div
    className="absolute z-[2] w-full overflow-hidden bg-card"
    style={{ top: "4.75%", height: "95.25%" }}
  >
    {features.map((feature, i) => (
      <div
        key={feature.key}
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          i === activeIndex ? "opacity-100" : "opacity-0",
        )}
      >
        {feature.mockup}
      </div>
    ))}
  </div>
</div>
```

Reuses existing `AutomateMockup`, `AnalyzeMockup`, `ActMockup` and browser chrome from `feature-showcase.tsx`.

---

## Click-to-scroll

Text items are `<button>` elements. Clicking scrolls to that feature's segment:

```tsx
const scrollToFeature = useCallback((index: number) => {
  const el = sectionRef.current;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  const targetScroll = (index / features.length) * scrollable;
  const sectionTop = rect.top + window.scrollY;
  window.scrollTo({ top: sectionTop + targetScroll, behavior: "smooth" });
}, [features.length]);
```

Matches Sana's nav link click handler that computes `offsetTop` and smooth-scrolls.

---

## Section height

| Features | GSAP total pin distance | Our min-height |
|---|---|---|
| 3 | 150% + 100% + 100% = 350vh | (3+1) × 100vh = 400vh |

```tsx
<section
  ref={sectionRef}
  style={{ minHeight: `${(features.length + 1) * 100}vh` }}
>
  <div className="sticky top-0 h-screen">
    {/* pinned content */}
  </div>
</section>
```

The `+1` buffer ensures the last feature's progress bar reaches 100% before unpinning.

---

## Performance notes

- `handleScroll` wrapped in `useCallback` — stable reference, effect doesn't re-subscribe
- Progress bars mutated via `ref.style.width` — zero React re-renders per scroll frame
- `activeIndex` only triggers re-render when it actually changes (3 times total for 3 features)
- `{ passive: true }` on scroll listener — browser can optimize scrolling
- All mockups pre-rendered in DOM — opacity swap is a compositor-only operation (GPU)
- Transitions specify exact properties (`transition-colors`, `transition-opacity`, `transition-[max-height,opacity]`) — never `transition: all`

---

## Files

| File | Action |
|---|---|
| `src/pages/landing/components/feature-showcase-02.tsx` | Create |
| `src/pages/landing/index.tsx` | Wire in for review (temporary) |

Reuses existing:
- `Feature` type from `feature-showcase.tsx`
- `AutomateMockup`, `AnalyzeMockup`, `ActMockup` from `mockups.tsx`
- Browser chrome SVG (`/browser-chrome.svg`)

No new data, no new dependencies.

---

## Build order

1. Create `feature-showcase-02.tsx` → `npm run build`
2. Wire into landing page → verify in browser
3. Test: scroll through section, verify progress bars fill, text swaps, mockup cross-fades
4. Test: scroll back up, verify everything reverses
5. Test: click text items, verify smooth-scroll to segment
6. Test: mobile — verify stacked layout works
