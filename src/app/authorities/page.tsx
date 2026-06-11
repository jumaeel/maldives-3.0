import type { Metadata } from "next";
import { Card, PageHeader, Badge, ProgressBar, StatCard } from "@/components/ui";
import { institutions } from "@/lib/data";

export const metadata: Metadata = { title: "Authority CRM" };

const STAGES = ["Identified", "Contacted", "Meeting Held", "Engaged", "Partnered"] as const;

const TYPE_TONE: Record<string, string> = {
  Ministry: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
  Hospital: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
  School: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
  University: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  "Sports Assoc.": "bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300",
  Business: "bg-surface-2 text-text-muted",
};

export default function AuthoritiesPage() {
  const partnered = institutions.filter((i) => i.stage === "Partnered").length;
  const meetings = institutions.reduce((s, i) => s + i.meetings, 0);
  const docs = institutions.reduce((s, i) => s + i.documentsSent, 0);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader
        eyebrow="Module 07"
        title="Authority Engagement CRM"
        subtitle="Track every interaction with ministries, hospitals, schools, universities, sports associations and businesses — from first contact to partnership."
      />

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Institutions" value={institutions.length} />
        <StatCard label="Partnered" value={partnered} />
        <StatCard label="Meetings Held" value={meetings} />
        <StatCard label="Documents Sent" value={docs} />
      </div>

      {/* Pipeline */}
      <Card className="mb-8 p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">Engagement Pipeline</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {STAGES.map((stage) => {
            const count = institutions.filter((i) => i.stage === stage).length;
            return (
              <div key={stage} className="rounded-xl border border-border p-4 text-center">
                <p className="font-display text-2xl font-bold">{count}</p>
                <p className="mt-1 text-xs text-text-muted">{stage}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface-2/50 text-left text-xs uppercase tracking-wider text-text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Institution</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Contact</th>
                <th className="px-5 py-3 text-center font-semibold">Meetings</th>
                <th className="px-5 py-3 text-center font-semibold">Docs</th>
                <th className="px-5 py-3 font-semibold">Last Response</th>
                <th className="px-5 py-3 font-semibold">Stage</th>
                <th className="px-5 py-3 font-semibold">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {institutions.map((i) => (
                <tr key={i.id} className="transition hover:bg-surface-2/50">
                  <td className="px-5 py-4 font-medium">{i.name}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_TONE[i.type]}`}>{i.type}</span>
                  </td>
                  <td className="px-5 py-4 text-text-muted">{i.contact}</td>
                  <td className="px-5 py-4 text-center tabular-nums">{i.meetings}</td>
                  <td className="px-5 py-4 text-center tabular-nums">{i.documentsSent}</td>
                  <td className="px-5 py-4 text-text-muted">{i.lastResponse}</td>
                  <td className="px-5 py-4"><Badge>{i.stage}</Badge></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={i.progress} className="w-20" tone={i.progress >= 70 ? "emerald" : "gold"} />
                      <span className="text-xs font-semibold tabular-nums">{i.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
