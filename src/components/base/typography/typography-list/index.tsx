import { cn } from "@/lib/utils";

/**
 * TypographyList — bulleted unordered list.
 *
 * shadcn's list verbatim. `list-disc` bullets, indented, comfortable item
 * spacing via `[&>li]:mt-2`. Use inside pricing tier feature lists, FAQ
 * answers with multiple bullet points, longform prose lists.
 */
export default function TypographyList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>{children}</ul>;
}
