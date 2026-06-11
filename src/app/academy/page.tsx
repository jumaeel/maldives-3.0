import type { Metadata } from "next";
import {
  PlayCircleIcon, ClipboardDocumentCheckIcon, DocumentTextIcon,
  ChartBarIcon, TrophyIcon, LockClosedIcon, CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Card, PageHeader, Badge, ProgressBar } from "@/components/ui";
import { courses } from "@/lib/data";
import type { Course } from "@/lib/types";

export const metadata: Metadata = { title: "Learning Academy" };

const LEVELS = [
  { n: 1 as const, title: "Foundations", desc: "Tawheed, Aqeedah, Basic Fiqh & Seerah", color: "from-emerald-500 to-emerald-700" },
  { n: 2 as const, title: "Development", desc: "Usul al-Fiqh, Contemporary Issues, Da'wah & Leadership", color: "from-emerald-600 to-emerald-800" },
  { n: 3 as const, title: "Specialisation", desc: "Research, Public Policy, Community Reform & Media", color: "from-gold-500 to-gold-700" },
];

const FEATURES = [
  { icon: PlayCircleIcon, label: "Video Lessons" },
  { icon: ClipboardDocumentCheckIcon, label: "Quizzes" },
  { icon: DocumentTextIcon, label: "Assignments" },
  { icon: ChartBarIcon, label: "Progress Tracking" },
  { icon: TrophyIcon, label: "Certificates" },
];

export default function AcademyPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader
        eyebrow="Module 04"
        title="Learning Academy"
        subtitle="An internal training system. Volunteers must complete learning paths before promotion — building knowledge upon the manhaj of the Salaf."
      />

      <div className="mb-8 flex flex-wrap gap-3">
        {FEATURES.map((f) => (
          <span key={f.label} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium">
            <f.icon className="h-4 w-4 text-brand" /> {f.label}
          </span>
        ))}
      </div>

      <div className="space-y-10">
        {LEVELS.map((lvl) => {
          const list = courses.filter((c) => c.level === lvl.n);
          const locked = lvl.n > 1; // demo: higher levels gated
          return (
            <section key={lvl.n}>
              <div className={`mb-4 flex items-center justify-between rounded-2xl bg-gradient-to-r ${lvl.color} p-5 text-white`}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/80">Level {lvl.n}</p>
                  <h2 className="font-display text-2xl font-bold">{lvl.title}</h2>
                  <p className="text-sm text-white/85">{lvl.desc}</p>
                </div>
                {locked && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
                    <LockClosedIcon className="h-4 w-4" /> Complete prior level
                  </span>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {list.map((c) => (
                  <CourseCard key={c.id} c={c} locked={locked} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function CourseCard({ c, locked }: { c: Course; locked: boolean }) {
  const done = c.progress === 100;
  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">{c.title}</h3>
          <p className="text-sm text-text-muted" dir="rtl">{c.titleAr}</p>
        </div>
        {done && <CheckCircleIcon className="h-6 w-6 text-emerald-500" />}
      </div>
      <p className="mt-2 flex-1 text-sm text-text-muted">{c.description}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-text-muted">
        <Badge>{c.lessons} lessons</Badge>
        <Badge>{c.hours}h</Badge>
        {c.hasCert && <Badge className="bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300">Certificate</Badge>}
      </div>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-text-muted">{c.enrolled.toLocaleString()} enrolled</span>
          <span className="font-semibold">{c.progress}%</span>
        </div>
        <ProgressBar value={c.progress} tone={c.level === 3 ? "gold" : "emerald"} />
      </div>
      <button
        disabled={locked}
        className="mt-4 rounded-lg bg-emerald-600 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-text-muted"
      >
        {locked ? "Locked" : done ? "Review · Get Certificate" : c.progress > 0 ? "Continue" : "Start course"}
      </button>
    </Card>
  );
}
