# Hero Section Plan

## Structure

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│         [rotating text], done with AI                        │  h1.display
│                                                              │
│         Subtitle text — one or two lines max                 │  p.text-lg
│                                                              │
│                    [Primary CTA]                             │  Button (shadcn)
│                                                              │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │
│  │logo │ │logo │ │logo │ │logo │ │logo │ │logo │ │logo │ │  Partner grid
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ │  7 cols → 3 on mobile
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

All Tailwind. Semantic HTML (`<section>`, `<hgroup>`, `<ul>`). shadcn Button for CTA.
All timer IDs (setInterval, setTimeout) stored in refs for proper cleanup.

---

## Phases

### Phase A — TextRotator component

`pages/landing/components/text-rotator.tsx`

```tsx
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function TextRotator({ words, interval = 2500, className }: TextRotatorProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisible(false);
      timeoutRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 500);
    }, interval);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [words.length, interval]);

  return (
    <span
      aria-live="polite"
      className={cn(
        "inline-block transition-[opacity,transform] duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
        className,
      )}
    >
      {words[index]}
    </span>
  );
}
```

### Phase B — PartnerLogoGrid component

`pages/landing/components/partner-logo-grid.tsx`

```tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Logo {
  key: string;
  src: string;
  alt: string;
}

interface PartnerLogoGridProps {
  logos: Logo[];
  swapInterval?: number;
  fadeDuration?: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const MOBILE_MAX = 949;

export function PartnerLogoGrid({
  logos,
  swapInterval = 2000,
  fadeDuration = 1000,
}: PartnerLogoGridProps) {
  const visibleCount = useCallback(
    () => (typeof window !== "undefined" && window.innerWidth <= MOBILE_MAX ? 3 : 7),
    [],
  );

  const [slots, setSlots] = useState<Logo[]>(() => logos.slice(0, visibleCount()));
  const [hiddenSlot, setHiddenSlot] = useState<number | null>(null);
  const poolRef = useRef<Logo[]>(shuffle(logos.slice(visibleCount())));
  const slotPoolRef = useRef<number[]>(
    shuffle(Array.from({ length: visibleCount() }, (_, i) => i)),
  );
  const swapIntervalRef = useRef<ReturnType<typeof setInterval>>();
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Swap tick
  useEffect(() => {
    swapIntervalRef.current = setInterval(() => {
      const count = visibleCount();

      if (poolRef.current.length === 0) {
        const shownKeys = new Set(slots.map((s) => s.key));
        poolRef.current = shuffle(logos.filter((l) => !shownKeys.has(l.key)));
      }
      if (slotPoolRef.current.length === 0) {
        slotPoolRef.current = shuffle(Array.from({ length: count }, (_, i) => i));
      }
      if (poolRef.current.length === 0) return;

      const slotIdx = slotPoolRef.current.pop()!;
      const newLogo = poolRef.current.pop()!;

      setHiddenSlot(slotIdx);

      fadeTimeoutRef.current = setTimeout(() => {
        setSlots((prev) => {
          const next = [...prev];
          const old = next[slotIdx];
          if (old) poolRef.current.push(old);
          next[slotIdx] = newLogo;
          return next;
        });
        setHiddenSlot(null);
      }, fadeDuration);
    }, swapInterval);

    return () => {
      clearInterval(swapIntervalRef.current);
      clearTimeout(fadeTimeoutRef.current);
    };
  }, [logos, slots, swapInterval, fadeDuration, visibleCount]);

  // Pause on tab hidden
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        clearInterval(swapIntervalRef.current);
        clearTimeout(fadeTimeoutRef.current);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Resize
  useEffect(() => {
    const onResize = () => {
      const count = visibleCount();
      setSlots(logos.slice(0, count));
      poolRef.current = shuffle(logos.slice(count));
      slotPoolRef.current = shuffle(Array.from({ length: count }, (_, i) => i));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [logos, visibleCount]);

  return (
    <ul className="grid grid-cols-3 gap-8 lg:grid-cols-7" role="list" aria-label="Partners">
      {slots.map((logo, i) => (
        <li
          key={i}
          className={cn(
            "flex h-24 items-center justify-center transition-opacity duration-1000 lg:h-40",
            i >= 3 && "hidden lg:flex",
            hiddenSlot === i && "opacity-0",
          )}
        >
          <img
            src={logo.src}
            alt={logo.alt}
            className="h-full w-full max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
```

### Phase C — Hero section

`pages/landing/components/hero.tsx`

```tsx
import { Button } from "@/components/ui/button";
import { TextRotator } from "./text-rotator";
import { PartnerLogoGrid } from "./partner-logo-grid";
import { heroWords, partnerLogos } from "@/data/landing";

export function Hero() {
  return (
    <section className="landing px-4 py-20 text-center lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <hgroup>
          <h1 className="display mb-6">
            <TextRotator words={heroWords} />,{"\n"}done with AI
          </h1>
          <p className="text-lg text-muted-foreground">
            Accelerate work with AI agents that collaborate, automate,
            and think alongside your teams.
          </p>
        </hgroup>
        <div className="mt-6">
          <Button size="lg">Get started</Button>
        </div>
      </div>
      <aside className="mx-auto mt-16 max-w-5xl" aria-label="Trusted by">
        <PartnerLogoGrid logos={partnerLogos} />
      </aside>
    </section>
  );
}
```

### Phase D — Data + wire up

`data/landing.ts`:

```ts
export const heroWords = [
  "Real work",
  "Advanced analysis",
  "Deep research",
  "Meeting prep",
  "Data insights",
];

export interface PartnerLogo {
  key: string;
  src: string;
  alt: string;
}

export const partnerLogos: PartnerLogo[] = [
  // Replace with actual logos in public/logos/
];
```

Wire `Hero` into `pages/landing/index.tsx`.

---

## Build order

1. **Phase A**: `text-rotator.tsx` → build, verify fade works
2. **Phase B**: `partner-logo-grid.tsx` → build, verify swap works
3. **Phase C**: `hero.tsx` → compose, verify layout
4. **Phase D**: `data/landing.ts` + wire into landing page → build, verify in browser
