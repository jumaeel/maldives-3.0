import type { Metadata } from "next";
import {
  CheckBadgeIcon, AcademicCapIcon, ExclamationTriangleIcon,
  LightBulbIcon, LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { Card, PageHeader, Badge, ProgressBar, cn } from "@/components/ui";
import {
  founder, teamGroups, teamStats, rankFromCourses, RANK_TONE, TOTAL_COURSES,
} from "@/lib/team";
import type { Member } from "@/lib/team";

export const metadata: Metadata = { title: "Our Team" };

function initials(name: string) {
  return name
    .replace(/^(Sheikh|Ustadh|Dr\.)\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader
        eyebrow="About"
        title="Our Team"
        subtitle="The people behind Maldives 3.0 — a founder, an operating team, a scholars committee and a core team working sincerely for the benefit of the ummah."
      />

      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {teamStats.map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <p className="font-display text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-text-muted">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Founder */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-2xl font-semibold">Founder</h2>
        <Card className="overflow-hidden">
          <div className="grid sm:grid-cols-[260px_1fr]">
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-emerald-600 to-emerald-900 p-8 text-white">
              <span className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 font-display text-3xl font-bold backdrop-blur">
                {initials(founder.name)}
              </span>
              <p className="mt-4 font-display text-xl font-bold">{founder.name}</p>
              <p className="text-sm text-emerald-100">{founder.role}</p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <AcademicCapIcon className="h-3.5 w-3.5" /> {rankFromCourses(founder.courses).title}
              </span>
            </div>
            <div className="p-7">
              <Badge className="bg-gold-100 text-gold-800 dark:bg-gold-900/40 dark:text-gold-300">Founder</Badge>
              <p className="mt-3 leading-relaxed text-text-muted">{founder.bio}</p>
              {founder.quals && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {founder.quals.map((q) => (
                    <li key={q} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm">
                      <AcademicCapIcon className="h-4 w-4 text-brand" /> {q}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-5">
                <Contributions m={founder} />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Groups */}
      {teamGroups.map((group) => (
        <section key={group.id} className="mb-12">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="font-display text-2xl font-semibold">{group.title}</h2>
              <p className="mt-1 max-w-2xl text-sm text-text-muted">{group.blurb}</p>
            </div>
            {group.id === "scholars" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <CheckBadgeIcon className="h-4 w-4" /> Approval required before publishing
              </span>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.members.map((m) => (
              <MemberCard key={`${group.id}-${m.name}-${m.role}`} m={m} scholar={group.id === "scholars"} />
            ))}
          </div>
        </section>
      ))}

      <Card className="p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          Platform rank — earned in the Academy
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <RankBadge courses={0} /> <span className="text-text-muted">0–2 courses</span>
          <RankBadge courses={3} /> <span className="text-text-muted">3–5</span>
          <RankBadge courses={6} /> <span className="text-text-muted">6–8</span>
          <RankBadge courses={9} /> <span className="text-text-muted">9–11</span>
          <RankBadge courses={12} /> <span className="text-text-muted">all 12</span>
        </div>
        <p className="mt-4 border-t border-border pt-4 text-sm text-text-muted">
          Names, qualifications and stats shown here are placeholders — edit{" "}
          <span className="font-mono text-text">src/lib/team.ts</span> to add your real team.
        </p>
      </Card>
    </div>
  );
}

function RankBadge({ courses }: { courses: number }) {
  const rank = rankFromCourses(courses);
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold", RANK_TONE[rank.tier])}>
      <AcademicCapIcon className="h-3 w-3" /> {rank.title}
    </span>
  );
}

function Contributions({ m }: { m: Member }) {
  const items = [
    { icon: AcademicCapIcon, label: "Courses", value: `${m.courses}/${TOTAL_COURSES}` },
    { icon: ExclamationTriangleIcon, label: "Issues", value: m.issues },
    { icon: LightBulbIcon, label: "Solutions", value: m.solutions },
    { icon: LifebuoyIcon, label: "Support", value: m.support },
  ];
  return (
    <div>
      <div className="mb-2">
        <div className="mb-1 flex items-center justify-between text-[11px] text-text-muted">
          <span>Academy progress</span>
          <span className="font-semibold text-text">{Math.round((m.courses / TOTAL_COURSES) * 100)}%</span>
        </div>
        <ProgressBar value={(m.courses / TOTAL_COURSES) * 100} tone={m.courses >= TOTAL_COURSES ? "gold" : "emerald"} />
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {items.map((it) => (
          <div key={it.label} className="rounded-lg border border-border px-1 py-1.5 text-center">
            <it.icon className="mx-auto h-3.5 w-3.5 text-brand" />
            <p className="mt-0.5 text-sm font-bold tabular-nums">{it.value}</p>
            <p className="text-[9px] uppercase tracking-wide text-text-muted">{it.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MemberCard({ m, scholar }: { m: Member; scholar?: boolean }) {
  return (
    <Card className="flex h-full flex-col p-5 transition hover:border-brand/40">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-bold text-white ${
            scholar ? "bg-gradient-to-br from-gold-500 to-gold-700" : "bg-gradient-to-br from-emerald-500 to-emerald-700"
          }`}
        >
          {initials(m.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{m.name}</p>
          <p className="truncate text-sm text-text-muted">{m.role}</p>
        </div>
        <RankBadge courses={m.courses} />
      </div>

      {m.bio && <p className="mt-3 text-sm text-text-muted">{m.bio}</p>}

      {m.quals && (
        <ul className="mt-3 space-y-1.5">
          {m.quals.map((q) => (
            <li key={q} className="flex items-start gap-2 text-xs text-text-muted">
              <AcademicCapIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" /> {q}
            </li>
          ))}
        </ul>
      )}

      {m.tags && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {m.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      )}

      <div className="mt-4 flex-1" />
      <div className="mt-2 border-t border-border pt-4">
        <Contributions m={m} />
      </div>
    </Card>
  );
}
