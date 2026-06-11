"use client";

import { useMemo, useState } from "react";
import {
  DocumentTextIcon, BookOpenIcon, AcademicCapIcon, NewspaperIcon,
  PlayCircleIcon, PresentationChartBarIcon, MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Card, Badge, cn } from "./ui";
import { articles, categoryName } from "@/lib/data";
import type { Article } from "@/lib/types";

const TYPES = ["All", "Article", "Fatwa", "Research Paper", "Policy Document", "Awareness", "Video", "Presentation"] as const;

const TYPE_ICON: Record<Article["type"], React.ComponentType<{ className?: string }>> = {
  Article: BookOpenIcon,
  Fatwa: AcademicCapIcon,
  "Research Paper": DocumentTextIcon,
  "Policy Document": DocumentTextIcon,
  Awareness: NewspaperIcon,
  Video: PlayCircleIcon,
  Presentation: PresentationChartBarIcon,
};

export function KnowledgeBrowser() {
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      articles.filter((a) => {
        if (type !== "All" && a.type !== type) return false;
        if (q && !`${a.title} ${a.excerpt} ${a.author}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [type, q]
  );

  return (
    <div>
      <div className="relative mb-5">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the library — articles, fatwas, research…"
          className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 outline-none transition focus:border-brand/50"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition",
              type === t ? "bg-emerald-600 text-white" : "border border-border text-text-muted hover:border-brand/40 hover:text-text"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => {
          const Icon = TYPE_ICON[a.type];
          return (
            <Card key={a.id} className="flex h-full flex-col p-5 transition hover:border-brand/40">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <Badge className="bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300">{a.type}</Badge>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{a.title}</h3>
              <p className="mt-1 flex-1 text-sm text-text-muted">{a.excerpt}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-text-muted">
                <span>{a.author}</span>
                <span>{categoryName(a.category)} · {a.readMins} min</span>
              </div>
            </Card>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-text-muted">
          Nothing found. Try a different search or filter.
        </div>
      )}
    </div>
  );
}
