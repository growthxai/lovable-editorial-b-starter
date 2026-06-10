import { cn } from "@/lib/utils";

/**
 * TypographyLarge — slightly emphasized text, semibold.
 *
 * shadcn's large verbatim. Use for pricing tier names, bento card eyebrows,
 * dialog titles inside modals — content that's smaller than a heading but
 * stronger than body.
 */
export default function TypographyLarge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("text-lg font-semibold", className)}>{children}</div>;
}
