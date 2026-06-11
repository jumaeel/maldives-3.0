import Link from "next/link";
import type { Metadata } from "next";
import { Card, PageHeader, Badge } from "@/components/ui";
import { CategoryIcon } from "@/components/category-icon";
import { categories } from "@/lib/data";

export const metadata: Metadata = { title: "Society Map" };

export default function MapPage() {
  const totals = categories.reduce(
    (acc, c) => ({
      total: acc.total + c.total,
      solved: acc.solved + c.solved,
      inProgress: acc.inProgress + c.inProgress,
      research: acc.research + c.research,
      awareness: acc.awareness + c.awareness,
    }),
    { total: 0, solved: 0, inProgress: 0, research: 0, awareness: 0 }
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader
        eyebrow="Module 01"
        title="Society Map"
        subtitle="A visual map of every sector of Maldivian society. Explore issues, progress and the path to reform across 14 categories."
      />

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <Summary label="Total Issues" value={totals.total} />
        <Summary label="Solved" value={totals.solved} tone="emerald" />
        <Summary label="In Progress" value={totals.inProgress} tone="gold" />
        <Summary label="Research" value={totals.research} />
        <Summary label="Awareness" value={totals.awareness} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.key} href={`/issues?category=${c.key}`}>
            <Card className="group h-full p-5 transition hover:-translate-y-0.5 hover:border-brand/40">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <CategoryIcon k={c.key} className="h-6 w-6" />
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    c.score >= 70
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : c.score >= 50
                      ? "bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300"
                      : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                  }`}
                >
                  {c.score}%
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{c.name}</h3>
              <p className="text-sm text-text-muted" dir="rtl">{c.nameDv}</p>

              <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <Stat label="Total" value={c.total} />
                <Stat label="Solved" value={c.solved} />
                <Stat label="In Progress" value={c.inProgress} />
                <Stat label="Research" value={c.research} />
                <Stat label="Awareness" value={c.awareness} />
                <div className="flex items-center justify-end">
                  <Badge>View issues →</Badge>
                </div>
              </dl>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Summary({ label, value, tone }: { label: string; value: number; tone?: "emerald" | "gold" }) {
  return (
    <Card className="p-4">
      <p className="text-xs text-text-muted">{label}</p>
      <p
        className={`mt-1 font-display text-2xl font-semibold ${
          tone === "emerald" ? "text-emerald-600 dark:text-emerald-400" : tone === "gold" ? "text-gold-600 dark:text-gold-400" : ""
        }`}
      >
        {value}
      </p>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-surface-2/60 px-2 py-1">
      <dt className="text-text-muted">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
