import { cn } from "@/lib/utils";

/**
 * TypographyH2 — marketing section title.
 *
 * Borrows shadcn's scroll-m-20 anchor offset on top of the starter's
 * marketing-flavored section title sizing (text-3xl lg:text-4xl, font-semibold,
 * tracking-tight). `font-heading` ties to the active StylePack.
 *
 * Used by SectionTitle inside section-01.tsx and by any block-internal section
 * headings.
 */
export default function TypographyH2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl lg:text-4xl font-semibold tracking-tight font-heading",
        className,
      )}
    >
      {children}
    </h2>
  );
}
