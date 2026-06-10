import { cn } from "@/lib/utils";

/**
 * TypographyH1 — marketing-display H1.
 *
 * Adopts shadcn's H1 utility additions (scroll-m-20, text-balance) on top
 * of the starter's marketing-display sizing (text-4xl → lg:text-6xl, font-bold,
 * tracking-tighter, leading-[1.05]). `font-heading` ties the family to the
 * active StylePack's heading font (via `--font-heading` CSS variable).
 *
 * For Hero / lead landing-page H1s. NOT for in-content prose H1 — for that
 * pass `className` overrides to scale down.
 */
export default function TypographyH1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-balance leading-[1.05] font-heading",
        className,
      )}
    >
      {children}
    </h1>
  );
}
