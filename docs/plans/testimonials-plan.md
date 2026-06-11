# Testimonials Plan

Port all 3 testimonial variants from `lovable-colorful-template-starter`. Replace dependencies with our own.

---

## Task 1 — Port useAutoCycle hook

Shared hook for any auto-rotating UI. Currently the feature-showcase has this logic inline — extract it so testimonial-01 (and feature-showcase later) can reuse it.

**Creates:** `src/lib/use-auto-cycle.ts`
**Changes:** none yet (refactor feature-showcase later)

```ts
import { useCallback, useEffect, useRef, useState } from "react";

export function useAutoCycle(length: number, intervalMs = 5000) {
  const [active, setActiveState] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const rafRef = useRef<number>();
  const startRef = useRef(Date.now());

  const advance = useCallback(() => {
    setActiveState((prev) => (prev + 1) % length);
    startRef.current = Date.now();
  }, [length]);

  useEffect(() => {
    if (paused) {
      clearInterval(timerRef.current);
      return;
    }
    startRef.current = Date.now();
    timerRef.current = setInterval(advance, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [paused, advance, intervalMs]);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      setProgress(Math.min(elapsed / intervalMs, 1));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, active, intervalMs]);

  const setActive = useCallback(
    (idx: number) => {
      setActiveState(idx);
      startRef.current = Date.now();
      setProgress(0);
      clearInterval(timerRef.current);
      if (!paused) {
        timerRef.current = setInterval(advance, intervalMs);
      }
    },
    [paused, advance, intervalMs],
  );

  const togglePause = useCallback(() => setPaused((p) => !p), []);

  return { active, setActive, paused, togglePause, progress };
}
```

---

## Task 2 — Testimonial01 (card carousel)

Auto-cycling horizontal card carousel. Active card centered, inactive cards dimmed.

**Creates:** `src/pages/landing/components/testimonial-01.tsx`

**Original deps replaced:**
- `TypographyP` → `<p className="text-sm">`
- `TypographySmall` → `<span className="text-sm font-medium">`
- `TypographyMuted` → `<span className="text-xs text-muted-foreground">`
- `CyclerNav` → inline nav with progress bar (reuse PauseIcon/PlayIcon from feature-showcase, or extract to shared)
- `useAutoCycle` → our ported hook

```tsx
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAutoCycle } from "@/lib/use-auto-cycle";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/data/landing";

const CARD_W = 320;
const GAP = 8;

interface Testimonial01Props {
  testimonials: Testimonial[];
}

export function Testimonial01({ testimonials }: Testimonial01Props) {
  const { active, setActive, paused, togglePause, progress } = useAutoCycle(
    testimonials.length,
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = active * (CARD_W + GAP);

  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-hidden" ref={trackRef}>
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(calc(50% - ${CARD_W / 2}px - ${offset}px))`,
          }}
        >
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 flex flex-col rounded-2xl p-6 cursor-pointer transition-all duration-500",
                i === active
                  ? "bg-card border border-border shadow-sm"
                  : "bg-muted/50 border border-transparent opacity-60",
              )}
              style={{ width: `${CARD_W}px` }}
            >
              <p className="text-sm text-center text-foreground flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex flex-col items-center text-center mt-5">
                <Avatar className="h-14 w-14 mb-3">
                  <AvatarImage src={t.avatar} alt={t.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">{t.name}</span>
                <span className="text-xs text-muted-foreground">
                  {t.title}, {t.company}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Cycler nav — dots with progress bar + play/pause */}
      <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Testimonials">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-colors",
              i === active ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <span className="relative z-[2]">{i + 1}</span>
            {i === active && (
              <div
                className="absolute inset-y-0 left-0 z-[1] bg-foreground/10"
                style={{ width: `${progress * 100}%` }}
              />
            )}
          </button>
        ))}
        <button
          onClick={togglePause}
          aria-label={paused ? "Resume" : "Pause"}
          className="flex h-[2.375rem] w-[2.375rem] items-center justify-center rounded-full bg-foreground/6 text-foreground"
        >
          {paused ? "▶" : "⏸"}
        </button>
      </nav>
    </div>
  );
}
```

---

## Task 3 — Testimonial02 (polaroid pair)

2 tilted polaroid portraits per page desktop, 1 mobile. Manual arrow nav.

**Creates:**
- `src/pages/landing/components/testimonial-02.tsx`
- `src/pages/landing/components/quote-slide.tsx`
- `src/pages/landing/components/arrow-nav.tsx`

**Original deps replaced:** none (self-contained). Just update imports.

```tsx
// testimonial-02.tsx — same structure as original
// Uses own quote-slide.tsx and arrow-nav.tsx
// Data from props instead of import

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { QuoteSlide } from "./quote-slide";
import { ArrowNav } from "./arrow-nav";
import type { QuoteSlide as QuoteSlideType } from "@/data/landing";

function slidesPerPage(width: number): number {
  return width >= 950 ? 2 : 1;
}

interface Testimonial02Props {
  slides: QuoteSlideType[];
}

export function Testimonial02({ slides }: Testimonial02Props) {
  // ... same logic as original, using slides prop
}
```

```tsx
// quote-slide.tsx — polaroid card with tilted image + quote
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface QuoteSlideProps {
  quote: string;
  author: string;
  title: string;
  company: string;
  imageUrl?: string;
  rotation?: number;
}

export function QuoteSlide({ quote, author, title, company, imageUrl, rotation = 0 }: QuoteSlideProps) {
  return (
    <figure className="flex flex-col gap-6 lg:flex-row lg:gap-12 items-center">
      {imageUrl && (
        <div
          className="shrink-0 w-48 h-56 rounded-lg overflow-hidden bg-muted shadow-lg"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <img src={imageUrl} alt={author} className="w-full h-full object-cover" />
        </div>
      )}
      <blockquote className="flex-1 space-y-4">
        <p className="text-lg text-foreground">&ldquo;{quote}&rdquo;</p>
        <figcaption className="text-sm text-muted-foreground">
          {author}, {title} at {company}
        </figcaption>
      </blockquote>
    </figure>
  );
}
```

```tsx
// arrow-nav.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArrowNavProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}

export function ArrowNav({ direction, onClick, disabled }: ArrowNavProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous" : "Next"}
    >
      {direction === "prev" ? <ChevronLeft /> : <ChevronRight />}
    </Button>
  );
}
```

---

## Task 4 — Testimonial03 (centered spotlight)

Single centered quote, full width, arrow nav below.

**Creates:** `src/pages/landing/components/testimonial-03.tsx`

Reuses `quote-slide.tsx` and `arrow-nav.tsx` from task 3.

```tsx
// testimonial-03.tsx — same structure as original
// Single slide visible, centered, arrows below
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { QuoteSlide } from "./quote-slide";
import { ArrowNav } from "./arrow-nav";
import type { QuoteSlide as QuoteSlideType } from "@/data/landing";

interface Testimonial03Props {
  slides: QuoteSlideType[];
}

export function Testimonial03({ slides }: Testimonial03Props) {
  // ... same logic as original, using slides prop
}
```

---

## Task 5 — Seed data

**Changes:** `src/data/landing.ts`

```ts
export interface Testimonial {
  name: string;
  initials: string;
  avatar?: string;
  title: string;
  company: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    initials: "SC",
    title: "VP Engineering",
    company: "Acme",
    quote: "This tool transformed how our team collaborates. We shipped 3x faster in the first quarter.",
  },
  {
    name: "Marcus Rivera",
    initials: "MR",
    title: "Product Lead",
    company: "Globex",
    quote: "The AI features feel like magic. It handles the repetitive work so we can focus on strategy.",
  },
  {
    name: "Emma Johansson",
    initials: "EJ",
    title: "CTO",
    company: "Initech",
    quote: "We evaluated 6 tools before choosing this one. The integration was seamless.",
  },
  {
    name: "David Kim",
    initials: "DK",
    title: "Head of Ops",
    company: "Umbrella",
    quote: "Our operational costs dropped 40% in the first month. The ROI speaks for itself.",
  },
  {
    name: "Aisha Patel",
    initials: "AP",
    title: "Director of Growth",
    company: "Stark Industries",
    quote: "The analytics dashboard alone was worth the investment. Finally, data we can act on.",
  },
];

export interface QuoteSlide {
  quote: string;
  author: string;
  title: string;
  company: string;
  imageUrl?: string;
  rotation?: number;
}

export const quoteSlides: QuoteSlide[] = [
  {
    quote: "This tool transformed how our team collaborates. We shipped 3x faster in the first quarter.",
    author: "Sarah Chen",
    title: "VP Engineering",
    company: "Acme",
    rotation: -3,
  },
  {
    quote: "The AI features feel like magic. It handles the repetitive work so we can focus on strategy.",
    author: "Marcus Rivera",
    title: "Product Lead",
    company: "Globex",
    rotation: 2,
  },
  {
    quote: "We evaluated 6 tools before choosing this one. The integration was seamless.",
    author: "Emma Johansson",
    title: "CTO",
    company: "Initech",
    rotation: -2,
  },
  {
    quote: "Our operational costs dropped 40% in the first month. The ROI speaks for itself.",
    author: "David Kim",
    title: "Head of Ops",
    company: "Umbrella",
    rotation: 3,
  },
];
```

---

## Task 6 — Wire into landing page

**Changes:** `src/pages/landing/index.tsx`

Add `Testimonial01` (default) between FeatureShowcase and future CTA section. The other variants are available for forks to swap in.

---

## Files created/changed summary

| File | Action |
|------|--------|
| `src/lib/use-auto-cycle.ts` | Create |
| `src/pages/landing/components/testimonial-01.tsx` | Create |
| `src/pages/landing/components/testimonial-02.tsx` | Create |
| `src/pages/landing/components/testimonial-03.tsx` | Create |
| `src/pages/landing/components/quote-slide.tsx` | Create (shared by 02 + 03) |
| `src/pages/landing/components/arrow-nav.tsx` | Create (shared by 02 + 03) |
| `src/data/landing.ts` | Change — add testimonials + quoteSlides |
| `src/pages/landing/index.tsx` | Change — add Testimonial01 section |

## Build order

1. Task 1: `use-auto-cycle.ts` → build
2. Task 5: seed data → build
3. Task 2: `testimonial-01.tsx` → build, verify
4. Task 3: `quote-slide.tsx` + `arrow-nav.tsx` + `testimonial-02.tsx` → build, verify
5. Task 4: `testimonial-03.tsx` → build, verify
6. Task 6: wire into landing → build, verify in browser
