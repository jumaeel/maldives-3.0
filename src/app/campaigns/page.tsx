import type { Metadata } from "next";
import { UsersIcon, CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Card, PageHeader, Badge, ProgressBar, StatCard } from "@/components/ui";
import { CategoryIcon } from "@/components/category-icon";
import { campaigns } from "@/lib/data";

export const metadata: Metadata = { title: "Campaigns" };

const STATUS_TONE: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  Planning: "bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300",
  Completed: "bg-surface-2 text-text-muted",
};

export default function CampaignsPage() {
  const active = campaigns.filter((c) => c.status === "Active").length;
  const volunteers = campaigns.reduce((s, c) => s + c.volunteers, 0);
  const done = campaigns.filter((c) => c.status === "Completed").length;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader
        eyebrow="Module 06"
        title="Campaign Management"
        subtitle="Coordinated awareness and reform campaigns — each with clear objectives, tasks, volunteers, progress and measured impact."
      />

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Campaigns" value={campaigns.length} />
        <StatCard label="Active" value={active} />
        <StatCard label="Volunteers" value={volunteers} />
        <StatCard label="Completed" value={done} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {campaigns.map((c) => (
          <Card key={c.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <CategoryIcon k={c.category} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                  <p className="text-xs text-text-muted">{c.id}</p>
                </div>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_TONE[c.status]}`}>
                {c.status}
              </span>
            </div>

            <p className="mt-4 text-sm text-text-muted">{c.objective}</p>

            <div className="mt-5">
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="text-text-muted">Progress</span>
                <span className="font-semibold">{c.progress}%</span>
              </div>
              <ProgressBar value={c.progress} tone={c.status === "Planning" ? "gold" : "emerald"} />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <Mini icon={CheckCircleIcon} label="Tasks" value={`${c.tasksDone}/${c.tasksTotal}`} />
              <Mini icon={UsersIcon} label="Volunteers" value={String(c.volunteers)} />
              <Mini icon={SparklesIcon} label="Impact" value="Live" />
            </div>

            <div className="mt-4 rounded-xl bg-surface-2/60 p-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Impact</p>
              <p className="mt-1 text-sm font-medium">{c.impact}</p>
            </div>

            <button className="mt-5 w-full rounded-xl bg-emerald-600 py-2.5 font-semibold text-white transition hover:bg-emerald-700">
              {c.status === "Completed" ? "View report" : "Join campaign"}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Mini({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <Icon className="mx-auto h-5 w-5 text-brand" />
      <p className="mt-1 text-sm font-semibold">{value}</p>
      <p className="text-[11px] text-text-muted">{label}</p>
    </div>
  );
}
