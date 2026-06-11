import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { QuoteSlide } from "./quote-slide";
import { ArrowNav } from "./arrow-nav";
import type { QuoteSlideData } from "@/data/landing";

function slidesPerPage(width: number): number {
  return width >= 950 ? 2 : 1;
}

interface Testimonial02Props {
  slides: QuoteSlideData[];
}

export function Testimonial02({ slides }: Testimonial02Props) {
  const [perPage, setPerPage] = useState<number>(() =>
    typeof window === "undefined" ? 2 : slidesPerPage(window.innerWidth),
  );

  useEffect(() => {
    const onResize = () => setPerPage(slidesPerPage(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(slides.length / perPage));
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (activePage >= totalPages) setActivePage(0);
  }, [totalPages, activePage]);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [offset, setOffset] = useState(0);

  const recompute = () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const firstOfPage = slideRefs.current[activePage * perPage];
    if (!firstOfPage) return;
    const rawOffset = firstOfPage.offsetLeft;
    const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
    setOffset(Math.min(rawOffset, maxOffset));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => { recompute(); }, [activePage, perPage]);

  useEffect(() => {
    const onResize = () => recompute();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, perPage]);

  const onPrev = () => setActivePage(Math.max(0, activePage - 1));
  const onNext = () => setActivePage(Math.min(totalPages - 1, activePage + 1));

  return (
    <section className="py-10">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div ref={viewportRef} className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translate3d(-${offset}px, 0, 0)` }}
            >
              {slides.map((slide, i) => (
                <div
                  key={i}
                  ref={(el) => { slideRefs.current[i] = el; }}
                  className={cn(
                    "shrink-0",
                    "w-[91%] sm:w-1/2",
                    "pr-8 sm:pr-16 lg:pr-32 xl:pr-52",
                  )}
                >
                  <QuoteSlide
                    quote={slide.quote}
                    author={slide.author}
                    title={slide.title}
                    company={slide.company}
                    imageUrl={slide.imageUrl}
                    rotation={slide.rotation}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <ArrowNav direction="prev" onClick={onPrev} disabled={activePage === 0} />
            <ArrowNav direction="next" onClick={onNext} disabled={activePage === totalPages - 1} />
          </div>
        </div>
      </div>
    </section>
  );
}
