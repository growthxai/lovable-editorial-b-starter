import { cn } from "@/lib/utils";
import { Button } from "@/components/base/button";

const ARROW_PATH =
  "M2.72108 45.7939C2.26007 46.2626 1.89146 46.7887 1.61551 47.3492C1.1725 48.2487 0.968963 49.2352 1.00382 50.2144C1.05551 51.6663 1.63136 53.1018 2.72782 54.2129L45.7089 98.1936C48.025 100.563 51.8237 100.607 54.1936 98.2911C56.5636 95.975 56.6072 92.1763 54.2912 89.8064L21.2531 56H93C96.3137 56 99 53.3137 99 50C99 46.6863 96.3137 44 93 44H21.2531L54.2911 10.1936C56.6072 7.82368 56.5635 4.02494 54.1936 1.70888C51.8237 -0.607181 48.0249 -0.563517 45.7089 1.80641L2.72108 45.7939Z";

interface ArrowNavProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function ArrowNav({
  direction,
  onClick,
  disabled,
  className,
}: ArrowNavProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className={cn(
        "relative h-16 w-16 rounded-full bg-background text-foreground hover:bg-background/90 hover:text-foreground disabled:opacity-20 disabled:hover:bg-background [&_svg]:!size-[41%]",
        className,
      )}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path
          d={ARROW_PATH}
          fill="currentColor"
          transform={direction === "next" ? "translate(100, 100) rotate(180)" : undefined}
        />
      </svg>
    </Button>
  );
}
