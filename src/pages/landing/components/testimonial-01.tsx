import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { QuoteCard } from "./quote-card";
import type { QuoteTestimonial } from "@/data/landing";

/* ------------------------------------------------------------------ */
/*  Icons (same SVGs as feature-showcase)                              */
/* ------------------------------------------------------------------ */

function PauseIcon() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0.895 12C0.595 12 0.37 11.916 0.22 11.747C0.073 11.579 0 11.326 0 10.988V1.005C0 0.672 0.075 0.422 0.225 0.253C0.376 0.084 0.599 0 0.895 0H2.366C2.658 0 2.88 0.082 3.03 0.246C3.184 0.41 3.261 0.663 3.261 1.005V10.988C3.261 11.326 3.184 11.579 3.03 11.747C2.88 11.916 2.658 12 2.366 12H0.895ZM5.64 12C5.34 12 5.114 11.916 4.964 11.747C4.814 11.579 4.739 11.326 4.739 10.988V1.005C4.739 0.672 4.814 0.422 4.964 0.253C5.114 0.084 5.34 0 5.64 0H7.099C7.399 0 7.624 0.082 7.775 0.246C7.925 0.41 8 0.663 8 1.005V10.988C8 11.326 7.925 11.579 7.775 11.747C7.624 11.916 7.399 12 7.099 12H5.64Z" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 9.968V1.032C0 0.681 0.09 0.422 0.271 0.253C0.452 0.084 0.668 0 0.917 0C1.141 0 1.365 0.061 1.589 0.184L9.218 4.551C9.494 4.707 9.692 4.854 9.813 4.994C9.938 5.133 10 5.302 10 5.5C10 5.694 9.938 5.863 9.813 6.006C9.692 6.146 9.494 6.293 9.218 6.449L1.589 10.817C1.365 10.939 1.141 11 0.917 11C0.668 11 0.452 10.914 0.271 10.741C0.09 10.572 0 10.314 0 9.968Z" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Responsive visible-count                                           */
/* ------------------------------------------------------------------ */

function useVisibleCount() {
  const [count, setCount] = useState(() => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth <= 950) return 1;
    if (window.innerWidth <= 1400) return 3;
    return 4;
  });

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 950px)");
    const mqTablet = window.matchMedia("(max-width: 1400px)");

    function update() {
      if (mqMobile.matches) setCount(1);
      else if (mqTablet.matches) setCount(3);
      else setCount(4);
    }

    mqMobile.addEventListener("change", update);
    mqTablet.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqTablet.removeEventListener("change", update);
    };
  }, []);

  return count;
}

/* ------------------------------------------------------------------ */
/*  Container width measurement                                        */
/* ------------------------------------------------------------------ */

function useContainerWidth(ref: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return width;
}

/* ------------------------------------------------------------------ */
/*  QuoteCardSlider                                                    */
/* ------------------------------------------------------------------ */

const GAP = 24;
const AUTOPLAY_DURATION = 5000;
const DRAG_THRESHOLD = 40;

interface QuoteCardSliderProps {
  testimonials: QuoteTestimonial[];
}

export function Testimonial01({ testimonials }: QuoteCardSliderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleCount = useVisibleCount();
  const containerWidth = useContainerWidth(containerRef);

  /* --- page math -------------------------------------------------- */
  const pageCount = Math.ceil(testimonials.length / visibleCount);
  const cardWidth =
    containerWidth > 0
      ? visibleCount === 1
        ? containerWidth * 0.85
        : (containerWidth - GAP * (visibleCount - 1)) / visibleCount
      : 0;
  const trackWidth =
    testimonials.length * cardWidth + (testimonials.length - 1) * GAP;

  /* --- autoplay state --------------------------------------------- */
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const isPlayingRef = useRef(false);
  const elapsedRef = useRef(0);
  const startTimeRef = useRef(performance.now());
  const rafRef = useRef<number>();
  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  /* --- drag state ------------------------------------------------- */
  const [isDragging, setIsDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const dragStartX = useRef(0);

  /* --- offset calculation ----------------------------------------- */
  const getOffset = useCallback(
    (page: number) => {
      if (containerWidth === 0) return 0;
      const pageOffset = page * visibleCount * (cardWidth + GAP);
      const maxOffset = Math.max(0, trackWidth - containerWidth);
      return Math.min(pageOffset, maxOffset);
    },
    [containerWidth, visibleCount, cardWidth, trackWidth],
  );

  /* --- page navigation -------------------------------------------- */
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    setProgress(0);
    elapsedRef.current = 0;
    startTimeRef.current = performance.now();
  }, []);

  /* --- rAF tick loop ---------------------------------------------- */
  const tick = useCallback(
    (now: number) => {
      if (isPlayingRef.current) {
        const delta = now - startTimeRef.current;
        startTimeRef.current = now;
        elapsedRef.current += delta;

        let p = elapsedRef.current / AUTOPLAY_DURATION;
        if (p < 0) p = 0;
        if (p > 1) p = 1;
        setProgress(p);

        if (elapsedRef.current >= AUTOPLAY_DURATION) {
          const nextPage = (currentPageRef.current + 1) % pageCount;
          goToPage(nextPage);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [pageCount, goToPage],
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  /* --- IntersectionObserver: auto-start on scroll in --------------- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsPlaying(true);
        isPlayingRef.current = true;
        startTimeRef.current = performance.now();
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* --- play / pause ----------------------------------------------- */
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      isPlayingRef.current = next;
      if (next) {
        startTimeRef.current = performance.now();
      }
      return next;
    });
  }, []);

  /* --- reset page when breakpoint changes ------------------------- */
  useEffect(() => {
    goToPage(0);
  }, [visibleCount, goToPage]);

  /* --- drag handlers ---------------------------------------------- */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      dragStartX.current = e.clientX;
      setIsDragging(true);
      setDragDelta(0);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartX.current;
      setDragDelta(delta);
    },
    [isDragging],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragDelta) > DRAG_THRESHOLD) {
      const direction = dragDelta < 0 ? 1 : -1;
      const nextPage = Math.max(0, Math.min(pageCount - 1, currentPageRef.current + direction));
      goToPage(nextPage);
    }

    setDragDelta(0);
  }, [isDragging, dragDelta, pageCount, goToPage]);

  /* --- render ----------------------------------------------------- */
  const baseOffset = getOffset(currentPage);
  const offset = baseOffset - dragDelta;

  return (
    <section ref={sectionRef} className="overflow-hidden py-10">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        {/* Track container */}
        <div
          ref={containerRef}
          className={cn(
            "overflow-visible select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className={cn(
              "flex",
              !isDragging && "transition-transform duration-500 ease-out",
            )}
            style={{
              gap: `${GAP}px`,
              transform: `translateX(-${offset}px)`,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="shrink-0"
                style={{
                  width: cardWidth > 0 ? `${cardWidth}px` : undefined,
                }}
              >
                <QuoteCard
                  quote={t.quote}
                  title={t.title}
                  company={t.company}
                  backgroundImage={t.backgroundImage}
                  variant={t.variant}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots + play/pause */}
        <nav
          className="mt-16 flex items-center justify-center gap-4"
          aria-label="Testimonials"
        >
          {/* SPEC-GAP: bg-black/* used instead of bg-foreground/* — TW3 can't apply opacity modifier to custom OKLCH tokens */}
          {/* Dots pill */}
          <div className="inline-flex h-8 items-center gap-2 rounded-full bg-black/5 px-4">
            {Array.from({ length: pageCount }, (_, i) => {
              const isActive = i === currentPage;
              return (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  aria-label={`Page ${i + 1}`}
                  className={cn(
                    "relative h-2.5 overflow-hidden rounded-full transition-[width,background-color] duration-400 ease-out",
                    isActive
                      ? "w-20 bg-black/10"
                      : "w-2.5 bg-black/30 hover:bg-black",
                  )}
                >
                  {isActive && (
                    <div
                      className={cn(
                        "absolute top-0 left-0 h-full rounded-full bg-black",
                        !isPlaying && "w-full transition-[width] duration-200 ease-out",
                      )}
                      style={isPlaying ? { width: `${progress * 100}%` } : undefined}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Play/pause — separate circle */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex size-8 items-center justify-center rounded-full bg-black/5 text-foreground transition-colors hover:bg-black/10"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </nav>
      </div>
    </section>
  );
}
