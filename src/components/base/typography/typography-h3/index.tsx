import { cn } from "@/lib/utils";

/**
 * TypographyH3 — subsection / card title.
 *
 * shadcn's H3 verbatim + `font-heading`. Used inside bento cards, pricing tier
 * headers, and any block-level subsection.
 *
 * For serif display quotes (e.g. testimonial-02 / testimonial-03), use this
 * with `className="font-serif"` to override the heading family.
 */
export default function TypographyH3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight font-heading",
        className,
      )}
    >
      {children}
    </h3>
  );
}
