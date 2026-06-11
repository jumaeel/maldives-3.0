"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Card, Badge, cn } from "./ui";
import { issues, categories, categoryName, SEVERITY_COLORS, STATUS_FLOW } from "@/lib/data";
import type { CategoryKey, IssueStatus } from "@/lib/types";

export function IssueList() {
  const params = useSearchParams();
  const initialCat = params.get("category") as CategoryKey | null;

  const [cat, setCat] = useState<CategoryKey | "all">(initialCat ?? "all");
  const [status, setStatus] = useState<IssueStatus | "all">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"votes" | "recent">("votes");

  const filtered = useMemo(() => {
    let list = issues.filter((i) => {
      if (cat !== "all" && i.category !== cat) return false;
      if (status !== "all" && i.status !== status) return false;
      if (q && !(`${i.title} ${i.description} ${i.id}`.toLowerCase().includes(q.toLowerCase()))) return false;
      return true;
    });
    list = [...list].sort((a, b) =>
      sort === "votes" ? b.votes - a.votes : +new Date(b.dateReported) - +new Date(a.dateReported)
    );
    return list;
  }, [cat, status, q, sort]);

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      {/* Filters */}
      <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search issues…"
          className="h-9 w-full rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-brand/50"
        />
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-muted">Category</p>
          <div className="flex flex-wrap gap-1.5 lg:flex-col lg:flex-nowrap">
            <FilterChip active={cat === "all"} onClick={() => setCat("all")}>All sectors</FilterChip>
            {categories.map((c) => (
              <FilterChip key={c.key} active={cat === c.key} onClick={() => setCat(c.key)}>
                {c.name}
              </FilterChip>
            ))}
          </div>
        </div>
      </aside>

      {/* List */}
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as IssueStatus | "all")}
            className="h-9 rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-brand/50"
          >
            <option value="all">All statuses</option>
            {STATUS_FLOW.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "votes" | "recent")}
            className="h-9 rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-brand/50"
          >
            <option value="votes">Most voted</option>
            <option value="recent">Most recent</option>
          </select>
          <span className="ml-auto text-sm text-text-muted">{filtered.length} issues</span>
        </div>

        <div className="space-y-4">
          {filtered.map((issue) => (
            <Link key={issue.id} href={`/issues/${issue.id}`}>
              <Card className="p-5 transition hover:border-brand/40">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Badge>{categoryName(issue.category)}</Badge>
                  <span className={cn("rounded-full px-2.5 py-0.5 font-medium", SEVERITY_COLORS[issue.severity])}>
                    {issue.severity}
                  </span>
                  <span className="rounded-full bg-surface-2 px-2.5 py-0.5 font-medium text-text-muted">
                    {issue.status}
                  </span>
                  {issue.scholarApproved && (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <CheckBadgeIcon className="h-4 w-4" /> Scholar approved
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold">{issue.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-text-muted">{issue.description}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-text-muted">
                  <span className="font-mono">{issue.id}</span>
                  <span>▲ {issue.votes}</span>
                  <span>💬 {issue.comments}</span>
                  <span>📍 {issue.location}</span>
                  <span>🗓 {issue.dateReported}</span>
                </div>
              </Card>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-border p-10 text-center text-text-muted">
              No issues match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-1.5 text-left text-sm font-medium transition",
        active ? "bg-brand-soft text-brand" : "text-text-muted hover:bg-surface-2 hover:text-text"
      )}
    >
      {children}
    </button>
  );
}
