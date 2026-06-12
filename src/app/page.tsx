import Link from "next/link";
import {
  ArrowRightIcon, ExclamationTriangleIcon, UsersIcon, AcademicCapIcon,
  MegaphoneIcon, BuildingOffice2Icon, CheckBadgeIcon, BookOpenIcon,
  MapIcon, ChartBarIcon, SparklesIcon,
} from "@heroicons/react/24/outline";
import { Card, StatCard, Badge, ProgressBar } from "@/components/ui";
import { HowItWorks } from "@/components/how-it-works";
import { categories, issues, metrics, campaigns, SEVERITY_COLORS, categoryName } from "@/lib/data";

export default function Home() {
  const topSectors = [...categories].sort((a, b) => b.score - a.score).slice(0, 6);
  const featured = issues.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="pattern-hero border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="max-w-3xl animate-fade-up">
            <Badge className="bg-gold-100 text-gold-800 dark:bg-gold-900/40 dark:text-gold-300">
              <SparklesIcon className="h-3.5 w-3.5" /> Inspired by the Best Three Generations
            </Badge>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A Maldives closer to the{" "}
              <span className="text-emerald-600 dark:text-emerald-400">Quran &amp; Sunnah</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-text-muted">
              Maldives 3.0 identifies societal issues, researches them, gathers scholarly
              evidence, proposes practical solutions, coordinates awareness, and tracks
              real implementation — upon the understanding of the Salaf as-Salih.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/map"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Explore the Society Map <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/issues"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 font-semibold transition hover:border-brand/40"
              >
                Browse Issues
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How the platform works — worked example */}
      <HowItWorks />

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard label="Issues Tracked" value={metrics.totalIssues} icon={<ExclamationTriangleIcon className="h-5 w-5" />} href="/issues" />
          <StatCard label="Active Volunteers" value={metrics.activeVolunteers.toLocaleString()} icon={<UsersIcon className="h-5 w-5" />} href="/community" />
          <StatCard label="Scholars" value={metrics.scholars} icon={<CheckBadgeIcon className="h-5 w-5" />} />
          <StatCard label="Campaigns" value={metrics.campaigns} icon={<MegaphoneIcon className="h-5 w-5" />} href="/campaigns" />
          <StatCard label="Institutions" value={metrics.institutions} icon={<BuildingOffice2Icon className="h-5 w-5" />} href="/authorities" />
          <StatCard label="Solutions Live" value={metrics.solutionsImplemented} icon={<CheckBadgeIcon className="h-5 w-5" />} />
        </div>

        {/* Society score + featured issues */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Top Sectors</h2>
              <Link href="/score" className="text-sm font-medium text-brand hover:underline">
                Society Score →
              </Link>
            </div>
            <ul className="mt-5 space-y-4">
              {topSectors.map((c) => (
                <li key={c.key} className="flex items-center gap-3">
                  <div className="w-24 shrink-0 text-sm font-medium">{c.name}</div>
                  <ProgressBar value={c.score} tone={c.score >= 70 ? "emerald" : "gold"} />
                  <span className="w-10 shrink-0 text-right text-sm font-semibold tabular-nums">{c.score}%</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Featured Issues</h2>
              <Link href="/issues" className="text-sm font-medium text-brand hover:underline">
                View all →
              </Link>
            </div>
            <div className="mt-5 space-y-4">
              {featured.map((issue) => (
                <Link key={issue.id} href={`/issues/${issue.id}`}>
                  <Card className="p-5 transition hover:border-brand/40">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <Badge>{categoryName(issue.category)}</Badge>
                      <span className={`rounded-full px-2.5 py-0.5 font-medium ${SEVERITY_COLORS[issue.severity]}`}>
                        {issue.severity}
                      </span>
                      <span className="text-text-muted">· {issue.status}</span>
                      {issue.scholarApproved && (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <CheckBadgeIcon className="h-4 w-4" /> Scholar approved
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold">{issue.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-text-muted">{issue.description}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-text-muted">
                      <span>{issue.id}</span>
                      <span>▲ {issue.votes} votes</span>
                      <span>💬 {issue.comments}</span>
                      <span>📍 {issue.location}</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="mt-14">
          <h2 className="font-display text-2xl font-semibold">Eight Modules. One Mission.</h2>
          <p className="mt-1 text-text-muted">Everything needed to research, reform and reach the community.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map((m) => (
              <Link key={m.href} href={m.href}>
                <Card className="h-full p-5 transition hover:-translate-y-0.5 hover:border-brand/40">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <m.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-semibold">{m.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{m.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Active campaigns banner */}
        <Card className="mt-14 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 p-8 text-white">
              <h2 className="font-display text-2xl font-semibold">Join an active campaign</h2>
              <p className="mt-2 text-emerald-100">
                Coordinated, measurable efforts turning research into real change across the islands.
              </p>
              <Link
                href="/campaigns"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2.5 font-semibold text-emerald-800 transition hover:bg-white"
              >
                See all campaigns <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {campaigns.filter((c) => c.status === "Active").slice(0, 3).map((c) => (
                <Link key={c.id} href="/campaigns" className="block p-5 transition hover:bg-surface-2">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{c.name}</p>
                    <span className="text-sm font-semibold text-brand">{c.progress}%</span>
                  </div>
                  <ProgressBar value={c.progress} className="mt-2" />
                  <p className="mt-2 text-xs text-text-muted">{c.volunteers} volunteers · {c.impact}</p>
                </Link>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

const MODULES = [
  { href: "/map", title: "Society Map", desc: "14 sectors of Maldivian society at a glance.", icon: MapIcon },
  { href: "/issues", title: "Issue Management", desc: "From submission to scholar-approved solutions.", icon: ExclamationTriangleIcon },
  { href: "/knowledge", title: "Knowledge Base", desc: "Articles, fatwas, research & policy library.", icon: BookOpenIcon },
  { href: "/academy", title: "Learning Academy", desc: "Three-level training with certificates.", icon: AcademicCapIcon },
  { href: "/community", title: "Community Portal", desc: "Forums, events, points, badges & ranks.", icon: UsersIcon },
  { href: "/campaigns", title: "Campaigns", desc: "Objectives, tasks, volunteers & impact.", icon: MegaphoneIcon },
  { href: "/authorities", title: "Authority CRM", desc: "Engagement with ministries & institutions.", icon: BuildingOffice2Icon },
  { href: "/analytics", title: "Analytics", desc: "Live metrics, charts & sector progress.", icon: ChartBarIcon },
];
