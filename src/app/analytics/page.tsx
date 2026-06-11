import type { Metadata } from "next";
import {
  ExclamationTriangleIcon, UsersIcon, CheckBadgeIcon, MegaphoneIcon,
  BuildingOffice2Icon, RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { Card, PageHeader, StatCard, ProgressBar } from "@/components/ui";
import { categories, metrics, scoreHistory, issues, STATUS_FLOW } from "@/lib/data";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  const sectorRanked = [...categories].sort((a, b) => b.score - a.score);
  const statusCounts = STATUS_FLOW.map((s) => ({
    status: s,
    count: issues.filter((i) => i.status === s).length,
  }));

  // Synthetic volunteer-growth series for the bar chart
  const volunteerGrowth = [
    { m: "Jan", v: 720 }, { m: "Feb", v: 810 }, { m: "Mar", v: 905 },
    { m: "Apr", v: 1040 }, { m: "May", v: 1180 }, { m: "Jun", v: 1284 },
  ];
  const maxV = Math.max(...volunteerGrowth.map((d) => d.v));

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader
        eyebrow="Module 08"
        title="Analytics Dashboard"
        subtitle="A live view of the platform — issues, volunteers, scholars, campaigns, institutions and solutions implemented, with sector and growth charts."
      />

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Issues" value={metrics.totalIssues} icon={<ExclamationTriangleIcon className="h-5 w-5" />} />
        <StatCard label="Active Volunteers" value={metrics.activeVolunteers.toLocaleString()} icon={<UsersIcon className="h-5 w-5" />} />
        <StatCard label="Scholars" value={metrics.scholars} icon={<CheckBadgeIcon className="h-5 w-5" />} />
        <StatCard label="Campaigns" value={metrics.campaigns} icon={<MegaphoneIcon className="h-5 w-5" />} />
        <StatCard label="Institutions" value={metrics.institutions} icon={<BuildingOffice2Icon className="h-5 w-5" />} />
        <StatCard label="Solutions Live" value={metrics.solutionsImplemented} icon={<RocketLaunchIcon className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sector progress */}
        <Card className="p-6">
          <h2 className="font-display text-xl font-semibold">Sector Progress</h2>
          <ul className="mt-5 space-y-3">
            {sectorRanked.map((c) => (
              <li key={c.key} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-sm">{c.name}</span>
                <ProgressBar value={c.score} tone={c.score >= 70 ? "emerald" : "gold"} />
                <span className="w-10 text-right text-sm font-semibold tabular-nums">{c.score}%</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Volunteer growth bar chart */}
        <Card className="p-6">
          <h2 className="font-display text-xl font-semibold">Volunteer Growth</h2>
          <div className="mt-6 flex h-56 items-end justify-between gap-3">
            {volunteerGrowth.map((d) => (
              <div key={d.m} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all"
                    style={{ height: `${(d.v / maxV) * 100}%` }}
                    title={`${d.v} volunteers`}
                  />
                </div>
                <span className="text-xs text-text-muted">{d.m}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Society score trend */}
        <Card className="p-6">
          <h2 className="font-display text-xl font-semibold">Society Score Trend</h2>
          <div className="mt-6 flex h-48 items-end justify-between gap-4">
            {scoreHistory.map((d) => (
              <div key={d.year} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-semibold">{d.score}%</span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-gold-500 to-gold-300"
                    style={{ height: `${d.score}%` }}
                  />
                </div>
                <span className="text-xs text-text-muted">{d.year}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Issue status distribution */}
        <Card className="p-6">
          <h2 className="font-display text-xl font-semibold">Issues by Stage</h2>
          <ul className="mt-5 space-y-2.5">
            {statusCounts.map((s) => {
              const pct = (s.count / issues.length) * 100;
              return (
                <li key={s.status} className="flex items-center gap-3">
                  <span className="w-36 shrink-0 text-sm text-text-muted">{s.status}</span>
                  <ProgressBar value={pct} />
                  <span className="w-6 text-right text-sm font-semibold tabular-nums">{s.count}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Card className="mt-6 bg-gradient-to-br from-emerald-700 to-emerald-900 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold">Public Transparency Dashboard</h2>
            <p className="mt-1 max-w-xl text-sm text-emerald-100">
              All headline metrics are published openly. A Mobile-App-Ready API and PDF report
              generator make this data portable for partners and the public.
            </p>
          </div>
          <button className="rounded-xl bg-white/95 px-5 py-2.5 font-semibold text-emerald-800 transition hover:bg-white">
            Export PDF report
          </button>
        </div>
      </Card>
    </div>
  );
}
