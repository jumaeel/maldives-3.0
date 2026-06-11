import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeftIcon, CheckBadgeIcon, ChevronUpIcon, ShareIcon, FlagIcon,
} from "@heroicons/react/24/outline";
import { Card, Badge, cn } from "@/components/ui";
import { StatusFlow } from "@/components/status-flow";
import { IssueTabs } from "@/components/issue-tabs";
import { CategoryIcon } from "@/components/category-icon";
import { findIssue, issues, categoryName, SEVERITY_COLORS } from "@/lib/data";

export function generateStaticParams() {
  return issues.map((i) => ({ id: i.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const issue = findIssue(id);
  return { title: issue ? issue.title : "Issue" };
}

export default async function IssueDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const issue = findIssue(id);
  if (!issue) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/issues" className="inline-flex items-center gap-1.5 text-sm text-text-muted transition hover:text-brand">
        <ArrowLeftIcon className="h-4 w-4" /> All issues
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge>
              <CategoryIcon k={issue.category} className="h-3.5 w-3.5" />
              {categoryName(issue.category)}
            </Badge>
            <span className={cn("rounded-full px-2.5 py-0.5 font-medium", SEVERITY_COLORS[issue.severity])}>
              {issue.severity} severity
            </span>
            <span className="font-mono text-text-muted">{issue.id}</span>
            {issue.scholarApproved ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <CheckBadgeIcon className="h-4 w-4" /> Officially published
              </span>
            ) : (
              <span className="rounded-full bg-gold-50 px-2.5 py-0.5 font-medium text-gold-700 dark:bg-gold-900/30 dark:text-gold-300">
                Awaiting scholar approval
              </span>
            )}
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">{issue.title}</h1>
          <p className="mt-1 text-sm text-text-muted">
            Reported by {issue.reporter} · {issue.dateReported} · 📍 {issue.location}
          </p>

          {/* Status flow */}
          <Card className="mt-6 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">Progress</p>
            <StatusFlow current={issue.status} />
          </Card>

          {/* Tabs */}
          <div className="mt-8">
            <IssueTabs issue={issue} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Card className="p-5">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700">
              <ChevronUpIcon className="h-5 w-5" /> Upvote · {issue.votes}
            </button>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm font-medium transition hover:border-brand/40">
                <ShareIcon className="h-4 w-4" /> Share
              </button>
              <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm font-medium transition hover:border-brand/40">
                <FlagIcon className="h-4 w-4" /> Flag
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">At a glance</p>
            <dl className="mt-3 space-y-3 text-sm">
              <Row k="Status" v={issue.status} />
              <Row k="Votes" v={String(issue.votes)} />
              <Row k="Comments" v={String(issue.comments)} />
              <Row k="Evidence" v={String(issue.evidence.length)} />
              <Row k="Solutions" v={String(issue.solutions.length)} />
              <Row k="Campaigns" v={String(issue.campaigns.length)} />
            </dl>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-700 to-emerald-900 p-5 text-white">
            <p className="text-sm font-semibold">Scholar review gate</p>
            <p className="mt-1 text-xs text-emerald-100">
              An issue becomes officially published only after scholarly approval of its evidence and recommendations.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-text-muted">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}
