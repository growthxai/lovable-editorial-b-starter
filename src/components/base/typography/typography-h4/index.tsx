import { cn } from "@/lib/utils";

/**
 * TypographyH4 — card-level title / footer column header / accordion trigger.
 *
 * shadcn's H4 verbatim + `font-heading`. Smallest heading. Used inside
 * pricing tier names, FAQ accordion triggers, footer column headers.
 */
export default function TypographyH4({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight font-heading",
        className,
      )}
    >
      {children}
    </h4>
  );
}
