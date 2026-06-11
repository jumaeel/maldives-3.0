"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckBadgeIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { Card, Badge, cn } from "./ui";
import { findCampaign, findInstitution } from "@/lib/data";
import type { Issue } from "@/lib/types";

const TABS = [
  "Overview", "Research", "Islamic Evidence", "Solutions",
  "Campaigns", "Institutions", "Updates",
] as const;
type Tab = (typeof TABS)[number];

export function IssueTabs({ issue }: { issue: Issue }) {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div>
      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((t) => {
          const count = tabCount(issue, t);
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative whitespace-nowrap px-4 py-3 text-sm font-medium transition",
                tab === t ? "text-brand" : "text-text-muted hover:text-text"
              )}
            >
              {t}
              {count !== null && (
                <span className="ml-1.5 rounded-full bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold">
                  {count}
                </span>
              )}
              {tab === t && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />}
            </button>
          );
        })}
      </div>

      {tab === "Overview" && <Overview issue={issue} />}
      {tab === "Research" && <Research issue={issue} />}
      {tab === "Islamic Evidence" && <EvidenceTab issue={issue} />}
      {tab === "Solutions" && <Solutions issue={issue} />}
      {tab === "Campaigns" && <Campaigns issue={issue} />}
      {tab === "Institutions" && <Institutions issue={issue} />}
      {tab === "Updates" && <Updates issue={issue} />}
    </div>
  );
}

function tabCount(i: Issue, t: Tab): number | null {
  switch (t) {
    case "Research": return i.research.statistics.length + i.research.studies.length + i.research.reports.length + i.research.fieldNotes.length;
    case "Islamic Evidence": return i.evidence.length;
    case "Solutions": return i.solutions.length;
    case "Campaigns": return i.campaigns.length;
    case "Institutions": return i.institutions.length;
    case "Updates": return i.updates.length;
    default: return null;
  }
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-widest text-text-muted">{title}</h4>
      <ul className="mt-2 space-y-2">
        {items.map((it, idx) => (
          <li key={idx} className="flex gap-2 text-sm">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Overview({ issue }: { issue: Issue }) {
  return (
    <Card className="p-6">
      <p className="leading-relaxed">{issue.description}</p>
      <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          ["Category", issue.category],
          ["Location", issue.location],
          ["Severity", issue.severity],
          ["Reported", issue.dateReported],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-border p-3">
            <dt className="text-xs text-text-muted">{k}</dt>
            <dd className="mt-0.5 font-medium capitalize">{v}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function Research({ issue }: { issue: Issue }) {
  const r = issue.research;
  const empty = !(r.statistics.length || r.studies.length || r.reports.length || r.fieldNotes.length);
  return (
    <Card className="space-y-6 p-6">
      <Section title="Statistics" items={r.statistics} />
      <Section title="Studies" items={r.studies} />
      <Section title="Reports" items={r.reports} />
      <Section title="Field Notes" items={r.fieldNotes} />
      {empty && <p className="text-sm text-text-muted">Research has not started for this issue yet.</p>}
    </Card>
  );
}

function EvidenceTab({ issue }: { issue: Issue }) {
  return (
    <div className="space-y-4">
      {issue.evidence.map((e, idx) => (
        <Card key={idx} className="p-5">
          <div className="flex items-center justify-between">
            <Badge className="bg-gold-100 text-gold-800 dark:bg-gold-900/40 dark:text-gold-300">{e.type}</Badge>
            {e.approved ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <CheckBadgeIcon className="h-4 w-4" /> Approved by scholar
              </span>
            ) : (
              <span className="text-xs font-medium text-gold-600 dark:text-gold-400">Pending scholar review</span>
            )}
          </div>
          <p className="mt-3 font-display text-lg leading-relaxed">“{e.text}”</p>
          <p className="mt-2 text-sm font-medium text-text-muted">— {e.reference}</p>
        </Card>
      ))}
      {issue.evidence.length === 0 && <Card className="p-6 text-sm text-text-muted">No evidence gathered yet.</Card>}
    </div>
  );
}

const SOL_TONE: Record<string, string> = {
  Action: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  Policy: "bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300",
  Educational: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
  Institutional: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
};

function Solutions({ issue }: { issue: Issue }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {issue.solutions.map((s, idx) => (
        <Card key={idx} className="p-5">
          <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold", SOL_TONE[s.kind])}>
            {s.kind}
          </span>
          <h4 className="mt-3 font-semibold">{s.title}</h4>
          <p className="mt-1 text-sm text-text-muted">{s.detail}</p>
        </Card>
      ))}
    </div>
  );
}

function Campaigns({ issue }: { issue: Issue }) {
  const list = issue.campaigns.map(findCampaign).filter(Boolean);
  if (!list.length) return <Card className="p-6 text-sm text-text-muted">No campaigns linked yet.</Card>;
  return (
    <div className="space-y-4">
      {list.map((c) => c && (
        <Link key={c.id} href="/campaigns">
          <Card className="flex items-center justify-between p-5 transition hover:border-brand/40">
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-text-muted">{c.impact}</p>
            </div>
            <span className="text-sm font-semibold text-brand">{c.progress}%</span>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function Institutions({ issue }: { issue: Issue }) {
  const list = issue.institutions.map(findInstitution).filter(Boolean);
  if (!list.length) return <Card className="p-6 text-sm text-text-muted">No institutions engaged yet.</Card>;
  return (
    <div className="space-y-4">
      {list.map((i) => i && (
        <Link key={i.id} href="/authorities">
          <Card className="flex items-center justify-between p-5 transition hover:border-brand/40">
            <div>
              <p className="font-semibold">{i.name}</p>
              <p className="text-sm text-text-muted">{i.type} · {i.stage}</p>
            </div>
            <span className="text-sm font-semibold text-brand">{i.progress}%</span>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function Updates({ issue }: { issue: Issue }) {
  return (
    <Card className="p-6">
      <ol className="relative space-y-6 border-l border-border pl-6">
        {issue.updates.map((u, idx) => (
          <li key={idx} className="relative">
            <span className="absolute -left-[1.65rem] top-1 h-3 w-3 rounded-full border-2 border-surface bg-brand" />
            <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
              <span className="font-medium text-text">{u.status}</span>
              <span>· {u.author}</span>
              <span>· {u.date}</span>
            </div>
            <p className="mt-1 text-sm">{u.note}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}
