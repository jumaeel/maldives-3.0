import { STATUS_FLOW } from "@/lib/data";
import type { IssueStatus } from "@/lib/types";
import { cn } from "./ui";

export function StatusFlow({ current }: { current: IssueStatus }) {
  const idx = STATUS_FLOW.indexOf(current);
  return (
    <div className="flex flex-wrap items-center gap-y-3 overflow-x-auto py-1">
      {STATUS_FLOW.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={s} className="flex items-center">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                  active
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-600/20"
                    : done
                    ? "bg-emerald-600 text-white"
                    : "bg-surface-2 text-text-muted"
                )}
              >
                {done ? "✓" : i + 1}
              </span>
              <span
                className={cn(
                  "whitespace-nowrap text-xs font-medium",
                  active ? "text-text" : done ? "text-text-muted" : "text-text-muted/60"
                )}
              >
                {s}
              </span>
            </div>
            {i < STATUS_FLOW.length - 1 && (
              <span className={cn("mx-2 h-px w-6 shrink-0", done ? "bg-emerald-600" : "bg-border")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
