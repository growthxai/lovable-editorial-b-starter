import { cn } from "@/lib/utils";

/**
 * TypographySmall — label / cite line.
 *
 * shadcn's small verbatim — `text-sm leading-none font-medium`. Use for
 * testimonial cite lines (author name + role), form field labels, mockup
 * row labels.
 */
export default function TypographySmall({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <small className={cn("text-sm leading-none font-medium", className)}>{children}</small>
  );
}
