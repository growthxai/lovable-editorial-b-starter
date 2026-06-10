import { cn } from "@/lib/utils";

/**
 * TypographyP — body paragraph.
 *
 * shadcn's P verbatim. `leading-7` for comfortable reading, `mt-6` on every P
 * after the first sibling for natural rhythm. Default body font (which
 * resolves to `--font-body` via tailwind's `font-sans`).
 *
 * Use for FAQ answers, bento card descriptions, longform prose blocks.
 */
export default function TypographyP({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>{children}</p>;
}
