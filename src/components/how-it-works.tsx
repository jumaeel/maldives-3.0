import Link from "next/link";
import {
  PencilSquareIcon, InboxArrowDownIcon, MagnifyingGlassIcon, CheckBadgeIcon,
  LightBulbIcon, MegaphoneIcon, BuildingOffice2Icon, WrenchScrewdriverIcon,
  CheckCircleIcon, ArrowRightIcon,
} from "@heroicons/react/24/outline";

const STEPS = [
  { stage: "Submitted", icon: PencilSquareIcon, what: "A volunteer raises a real societal issue.", ex: "“Sports events scheduled during prayer times” is submitted." },
  { stage: "Under Review", icon: InboxArrowDownIcon, what: "The core team triages and assigns it.", ex: "Routed to the Sports sector; a researcher is assigned." },
  { stage: "Researching", icon: MagnifyingGlassIcon, what: "Statistics, studies and field notes are gathered.", ex: "Fixture audit finds 18 of 24 events overlapped with prayer." },
  { stage: "Scholar Review", icon: CheckBadgeIcon, what: "Scholars approve the Islamic evidence — required before publishing.", ex: "Evidence from Qur’an 4:103 & Sahih al-Bukhari is approved." },
  { stage: "Solution Design", icon: LightBulbIcon, what: "Practical, evidenced solutions are drafted.", ex: "Prayer breaks, musalla facilities and stadium announcements." },
  { stage: "Awareness Campaign", icon: MegaphoneIcon, what: "The community is mobilised to spread the message.", ex: "Posters and briefings distributed to 9 venues." },
  { stage: "Authority Engagement", icon: BuildingOffice2Icon, what: "Institutions are engaged through the CRM.", ex: "FA Maldives agrees to add prayer breaks to fixtures." },
  { stage: "Implemented", icon: WrenchScrewdriverIcon, what: "The change takes effect on the ground.", ex: "9 venues now schedule prayer breaks." },
  { stage: "Completed", icon: CheckCircleIcon, what: "Impact is recorded and the sector’s Society Score rises.", ex: "The Sports sector moves closer to the Sunnah." },
];

export function HowItWorks() {
  return (
    <section className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand">How it works</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            From issue to impact
          </h2>
          <p className="mt-3 text-text-muted">
            Every issue follows the same clear path — researched, scholar-approved, and tracked
            until society actually changes. Here is one real example travelling the full journey.
          </p>
        </div>

        {/* Worked example banner */}
        <div className="mt-8 inline-flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm">
          <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-semibold text-brand">Worked example</span>
          <span className="font-medium">Sports events scheduled during prayer times</span>
          <span className="font-mono text-xs text-text-muted">MV-1042</span>
        </div>

        {/* Timeline */}
        <ol className="mt-8 grid gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.stage} className="relative flex gap-4 rounded-2xl p-2 transition hover:bg-surface">
              <div className="flex flex-col items-center">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <s.icon className="h-6 w-6" />
                </span>
                {i < STEPS.length - 1 && <span className="mt-1 w-px flex-1 bg-border md:hidden" />}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display font-bold">{s.stage}</h3>
                </div>
                <p className="mt-1 text-sm text-text-muted">{s.what}</p>
                <p className="mt-2 rounded-lg bg-brand-soft px-3 py-2 text-xs text-brand">{s.ex}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/issues/MV-1042"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            See this issue in full <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/issues/new"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 font-semibold transition hover:border-brand/40"
          >
            Submit an issue
          </Link>
        </div>
      </div>
    </section>
  );
}
