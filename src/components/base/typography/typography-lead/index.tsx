import { cn } from "@/lib/utils";

/**
 * TypographyLead — emphasized intro paragraph below a heading.
 *
 * shadcn's lead verbatim — `text-xl text-muted-foreground`. Use for Hero
 * sublines below the H1, SectionTitle subtitles, intro paragraphs that
 * follow a TypographyH2 / H3.
 */
export default function TypographyLead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>;
}
