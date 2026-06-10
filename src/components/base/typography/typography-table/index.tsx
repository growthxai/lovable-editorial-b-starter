import { cn } from "@/lib/utils";

/**
 * TypographyTable — accessible data-table wrapper.
 *
 * shadcn's table wrapper. Consumers compose <thead>/<tbody>/<tr>/<th>/<td>
 * inside. Use the helper class strings below for rows and cells:
 *
 *   row:      m-0 border-t p-0 even:bg-muted
 *   th/td:    border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right
 *   th adds:  font-bold
 *
 * For pricing comparison tables, feature-matrix grids, etc.
 */
export default function TypographyTable({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("my-6 w-full overflow-y-auto", className)}>
      <table className="w-full">{children}</table>
    </div>
  );
}
