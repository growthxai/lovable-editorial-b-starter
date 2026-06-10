import { cn } from "@/lib/utils";

/**
 * TypographyMuted — helper text in muted-foreground tone.
 *
 * shadcn's muted verbatim — `text-sm text-muted-foreground`. Use for footer
 * copyright lines, nav links (when not converted to link components),
 * "Already have an account?"–style hints, FAQ supporting text.
 */
export default function TypographyMuted({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
