import { cn } from "@/lib/utils";

/**
 * TypographyInlineCode — inline code reference.
 *
 * shadcn's inline-code verbatim. Muted background, mono font, slight padding.
 * Use for inline code references in FAQ answers, dev-facing landing pages,
 * and technical product copy.
 */
export default function TypographyInlineCode({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className,
      )}
    >
      {children}
    </code>
  );
}
