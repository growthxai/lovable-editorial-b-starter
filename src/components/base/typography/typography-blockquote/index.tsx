import { cn } from "@/lib/utils";

/**
 * TypographyBlockquote — pull-quote / editorial quote treatment.
 *
 * shadcn's blockquote verbatim. Italic, left border accent, comfortable
 * spacing. Use inside testimonial blocks for editorial pull-quotes or any
 * sectioned long-form callout.
 */
export default function TypographyBlockquote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
}
