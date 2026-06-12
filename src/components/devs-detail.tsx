import {
  UserGroupIcon, CodeBracketSquareIcon, BookOpenIcon, BriefcaseIcon,
  HeartIcon, ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Card, Badge } from "./ui";
import { devProjects } from "@/lib/initiatives";

const PILLARS = [
  { icon: UserGroupIcon, title: "Mentorship", desc: "Senior developers pair with juniors — code, career and character." },
  { icon: CodeBracketSquareIcon, title: "Build together", desc: "Open-source projects that serve the ummah, shipped with ihsan." },
  { icon: BookOpenIcon, title: "Knowledge circles", desc: "Weekly halaqah and tech study sessions — deen and dunya." },
  { icon: BriefcaseIcon, title: "Opportunities", desc: "A job board and honest referrals among the brothers." },
];

const STATUS_TONE: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  Maintained: "bg-surface-2 text-text-muted",
  "Seeking devs": "bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300",
};

export function DevsDetail() {
  return (
    <div className="space-y-12">
      {/* Intention */}
      <Card className="bg-gradient-to-br from-emerald-700 to-emerald-900 p-7 text-white">
        <HeartIcon className="h-8 w-8" />
        <p className="mt-3 max-w-3xl font-display text-xl leading-relaxed">
          “The most beloved of people to Allah are those most beneficial to people.”
        </p>
        <p className="mt-2 text-sm text-emerald-100">
          We write code as an act of service — sincerely, excellently, and for the benefit of the ummah.
          Beneficial software can be sadaqah jariyah.
        </p>
      </Card>

      {/* Pillars */}
      <section>
        <h2 className="font-display text-2xl font-semibold">What we do</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <Card key={p.title} className="p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <p.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-3 font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-text-muted">{p.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">Open-source projects</h2>
          <Badge>All free &amp; open</Badge>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {devProjects.map((p) => (
            <Card key={p.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{p.name}</h3>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_TONE[p.status]}`}>
                  {p.status}
                </span>
              </div>
              <p className="mt-1 flex-1 text-sm text-text-muted">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span key={t} className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-text-muted">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-text-muted">{p.contributors} contributors</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Join */}
      <Card className="flex flex-col items-center justify-between gap-4 p-7 text-center sm:flex-row sm:text-left">
        <div>
          <h2 className="font-display text-2xl font-semibold">Join the brotherhood</h2>
          <p className="mt-1 max-w-xl text-text-muted">
            Whether you're a beginner or a senior engineer — come learn, teach, and build something
            that outlives you. Free, sincere, and for the sake of Allah.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <a
            href="https://github.com/jumaeel/devs-fisabilillah"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            GitHub <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
        </div>
      </Card>
    </div>
  );
}
