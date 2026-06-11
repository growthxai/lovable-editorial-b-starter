# Testimonials — Image Card Slider

Port the image-card-slider testimonial pattern from Sana (`sanalabs.com/products/sana`) into our React/Tailwind codebase. Identical layout, interaction, and animation — our own content and stack.

Reference files (same folder):
- `sana-products.html` — source HTML (lines 1359–1491)
- `sana-web2.css` — source CSS (`.image-card` at L1364, slider at L1401, dots/timer at L1510)
- `sana-brand.js` — source JS (image-card-slider init at L179, autoplay at L246)

---

## Components

### 1. `quote-card.tsx` — the individual card

A tall card with a fullbleed background image, quote on top, attribution on bottom.

**Sana CSS → Tailwind mapping:**

| Sana | Tailwind | Notes |
|------|----------|-------|
| `aspect-ratio: 4/5` | `aspect-[4/5]` | Taller on mobile: `aspect-[4/6]` at `<950px` |
| `border-radius: 2.4rem` | `rounded-3xl` | 24px — their rem base makes 2.4rem ≈ 38px, we use 24px |
| `padding: 3.2rem 2.7rem` | `p-8` | 32px uniform, close enough |
| `display: flex; flex-direction: column; justify-content: space-between` | `flex flex-col justify-between` | — |
| `overflow: hidden; position: relative` | `overflow-hidden relative` | — |
| `.bg` (absolute cover image, z-index 1) | `absolute inset-0 z-0` + `object-cover` | — |
| `> *:not(.bg)` z-index 5 | `relative z-10` on content elements | — |
| `.white` class → white text | `variant="light"` → `text-white` | — |
| `.fade` span → reduced opacity | `opacity-60` | Title line faded |

```
┌─────────────────────┐
│ "Quote text here,   │  ← text-lg, z-10
│  spanning multiple  │
│  lines."            │
│                     │
│                     │  ← bg image (absolute, object-cover)
│                     │
│ Title (60% opacity) │  ← text-sm, opacity-60
│ Company name        │  ← text-sm
└─────────────────────┘
  aspect-ratio: 4/5
  rounded-3xl
```

**Props:**

```ts
interface QuoteCardProps {
  quote: string;
  title: string;
  company: string;
  backgroundImage: string;
  variant?: "light" | "dark";
}
```

---

### 2. `quote-card-slider.tsx` — the carousel

Horizontal slider with custom pagination dots + autoplay timer.

**Sana behavior:**
- Flickity: `cellAlign: "left"`, `groupCells: true`, `contain: true`, draggable
- 4 cards visible at desktop, 3 at `≤1400px`, 1 at `≤950px`
- Viewport overflow visible (cards peek from the right edge)
- Section overflow hidden (no horizontal scrollbar)
- Autoplay: 5s per slide, starts when scrolled into view (IntersectionObserver)
- Custom dots: inactive = `0.6rem` circles, active = `8rem` pill with timer bar filling left→right
- Play/pause toggle button next to dots
- When paused: timer bar snaps to 100% with `0.2s ease`

**Our implementation approach:**
- No Flickity — CSS scroll-snap + `scrollBy()` for dragging, or pure transform-based sliding
- `useRef` for the scroll container
- Reuse the autoplay pattern from `feature-showcase.tsx` (rAF timer, progress tracking, IntersectionObserver)
- Custom dots + play/pause button (same PauseIcon/PlayIcon SVGs we already have)

**Sana CSS → Tailwind mapping (slider):**

| Sana | Tailwind | Notes |
|------|----------|-------|
| `.slide { width: calc((100% - 7.2rem) / 4); margin-right: 2.4rem }` | `w-[calc((100%-4.5rem)/4)] mr-6` or flex-based | 4-up with 24px gaps |
| `@1400px: width: calc((100% - 4.8rem) / 3)` | Responsive override | 3-up |
| `@950px: width: 85%` | `w-[85%]` | 1-up with peek |
| `.flickity-viewport { overflow: visible }` | `overflow-visible` on track | Cards peek past edge |
| `section:has(.image-card-slider) { overflow: hidden }` | `overflow-hidden` on section | Clips the peek |
| Dots: `0.6rem` circles, `background: rgba(0,0,0,0.3)` | `h-2.5 w-2.5 rounded-full bg-foreground/30` | — |
| Active dot: `width: 8rem` | `w-32` | Pill with progress bar |
| Timer bar: `background: rgba(0,0,0,1)`, height 100%, left-aligned | `bg-foreground h-full` | Fills left→right |
| UI wrapper: `margin-block-start: 6.3rem` | `mt-16` or `mt-[6.3rem]` | Space above dots |

**Interaction flow:**

```
1. Section scrolls into view → IntersectionObserver fires
2. isPlaying = true, autoplay begins
3. rAF loop: elapsed += delta, progress = elapsed / 5000
4. Active dot's timer bar width = progress * 100%
5. At progress >= 1: advance to next slide (wrap around)
6. User clicks dot → jump to that slide, reset timer
7. User clicks pause → freeze timer, bar snaps to 100%
8. User clicks play → resume from 0
9. User drags → pause autoplay, snap to nearest slide
```

---

## Seed data

`src/data/landing.ts` — add `QuoteTestimonial` type and array:

```ts
export interface QuoteTestimonial {
  quote: string;
  title: string;
  company: string;
  backgroundImage: string;
  variant: "light" | "dark";
}

export const quoteTestimonials: QuoteTestimonial[] = [
  {
    quote: "A compliance report that used to take our legal team an entire week now gets drafted in under 4 hours. The accuracy is remarkable.",
    title: "General Counsel",
    company: "Global financial services firm",
    backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    variant: "light",
  },
  {
    quote: "Our team tried to turn it off for a week as a test. By Wednesday, people were filing support tickets to get it back.",
    title: "VP of Engineering",
    company: "Series B fintech startup",
    backgroundImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    variant: "light",
  },
  {
    quote: "Sales cycles shortened by 30% because reps walk into every call with deep account context they never had time to assemble before.",
    title: "Chief Revenue Officer",
    company: "Enterprise SaaS company",
    backgroundImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    variant: "light",
  },
  {
    quote: "We replaced 6 disconnected internal tools with one surface. Onboarding new analysts went from 3 weeks to 3 days.",
    title: "Head of Operations",
    company: "Management consulting firm",
    backgroundImage: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&q=80",
    variant: "light",
  },
  {
    quote: "The thing that sold us was governance. We choose exactly which data sources it can access and audit every interaction.",
    title: "Chief Information Security Officer",
    company: "Healthcare technology provider",
    backgroundImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    variant: "light",
  },
  {
    quote: "People who never touched automation before are building their own workflows. It lowered the bar without lowering the ceiling.",
    title: "Director of Digital Transformation",
    company: "Commercial real estate group",
    backgroundImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    variant: "light",
  },
  {
    quote: "Portfolio monitoring that took a full analyst day now runs continuously. We catch signals we were completely missing before.",
    title: "Managing Partner",
    company: "Growth equity firm",
    backgroundImage: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
    variant: "light",
  },
  {
    quote: "I asked it for the action items from last Thursday's board meeting and had them in Slack in 12 seconds. That changed everything.",
    title: "Chief Technology Officer",
    company: "Logistics platform startup",
    backgroundImage: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
    variant: "light",
  },
];
```

---

## Files created/changed

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/landing/components/quote-card.tsx` | Create | Individual testimonial card |
| `src/pages/landing/components/quote-card-slider.tsx` | Create | Carousel with autoplay + dots |
| `src/data/landing.ts` | Change | Add `QuoteTestimonial` type + seed array |
| `src/pages/landing/index.tsx` | Change | Wire slider below FeatureShowcase |

---

## Build order

1. **Seed data** — add types + array to `data/landing.ts` → `npm run build`
2. **QuoteCard** — static card component → `npm run build`, verify layout
3. **QuoteCardSlider** — carousel + autoplay + dots → `npm run build`, verify in browser
4. **Wire up** — add to landing page → `npm run build`, verify full flow
