import {
  ShieldCheckIcon, UsersIcon, AcademicCapIcon, NewspaperIcon,
  BoltIcon, BuildingLibraryIcon, DocumentTextIcon, PlayCircleIcon,
  ChartBarIcon, MegaphoneIcon, ChatBubbleLeftRightIcon, ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Card, Badge } from "./ui";

const FOCUS = [
  { icon: ShieldCheckIcon, title: "Aqeedah & Identity", desc: "Protecting Maldivian Islamic identity and creed from erosion." },
  { icon: UsersIcon, title: "Family & Society", desc: "The family, marriage and social fabric under modern pressures." },
  { icon: BoltIcon, title: "Secularism & Ideology", desc: "Examining liberal, secular and atheistic narratives entering society." },
  { icon: NewspaperIcon, title: "Media & Narrative", desc: "How stories shape belief — and how to respond with truth." },
  { icon: AcademicCapIcon, title: "Youth & Education", desc: "Equipping the next generation with clarity and conviction." },
  { icon: BuildingLibraryIcon, title: "Policy & Reform", desc: "Evidence-based positions for lawmakers and institutions." },
];

const OUTPUTS = [
  { icon: DocumentTextIcon, label: "Research papers" },
  { icon: ChatBubbleLeftRightIcon, label: "Essays & articles" },
  { icon: PlayCircleIcon, label: "Video & short-form" },
  { icon: ChartBarIcon, label: "Infographics & data" },
  { icon: MegaphoneIcon, label: "Talking points" },
  { icon: BuildingLibraryIcon, label: "Policy briefings" },
];

export function KalhuoffummiDetail() {
  return (
    <div className="space-y-12">
      {/* The story / metaphor */}
      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[1.2fr_1fr]">
          <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-[#04140d] p-8 text-white">
            <Badge className="bg-white/15 text-white">The name</Badge>
            <h2 className="mt-3 font-display text-2xl font-bold">Why “Kalhuoffummi”?</h2>
            <p className="mt-3 leading-relaxed text-emerald-100">
              Kalhuoffummi was the ship Muhammad Thakurufaanu (Bodu Thakurufaanu) and his
              brothers sailed in their struggle to liberate the Maldives from Portuguese
              occupation. It became a symbol of courage, sincerity and a nation refusing to
              lose its faith and freedom.
            </p>
            <p className="mt-3 leading-relaxed text-emerald-100">
              Today the invasion is not of ships and cannons but of ideas — an
              <strong className="text-white"> ideological war</strong> over the hearts, minds
              and identity of the Maldivian people. This think tank is our Kalhuoffummi:
              built to defend, with knowledge and wisdom, what our forefathers defended with sacrifice.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" className="h-24 w-24 text-brand">
              <path d="M3 18l1.5-5h15L21 18" />
              <path d="M3 18c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" />
              <path d="M12 13V3l6 4-6 2" />
              <path d="M12 7H8" />
            </svg>
            <p className="font-display text-lg italic text-text-muted">
              “A nation that knows its faith cannot be conquered.”
            </p>
          </div>
        </div>
      </Card>

      {/* Focus areas */}
      <section>
        <h2 className="font-display text-2xl font-semibold">Research focus areas</h2>
        <p className="mt-1 text-text-muted">Six fronts in the battle of ideas — researched, evidenced, and answered.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FOCUS.map((f) => (
            <Card key={f.title} className="p-5 transition hover:border-brand/40">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-text-muted">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* What we produce */}
      <section>
        <h2 className="font-display text-2xl font-semibold">What we produce</h2>
        <p className="mt-1 text-text-muted">Rigorous research, translated into content people actually read, watch and share.</p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {OUTPUTS.map((o) => (
            <Card key={o.label} className="flex flex-col items-center gap-2 p-4 text-center">
              <o.icon className="h-7 w-7 text-brand" />
              <p className="text-sm font-medium">{o.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { n: "01", t: "Research", d: "Identify the narrative, study the claims, gather evidence from revelation and reality." },
          { n: "02", t: "Create", d: "Turn findings into clear, beautiful, shareable content in Dhivehi, English and Arabic." },
          { n: "03", t: "Reach", d: "Distribute through media, schools, mosques and the Maldives 3.0 platform." },
        ].map((s) => (
          <Card key={s.n} className="p-6">
            <span className="font-display text-3xl font-bold text-border">{s.n}</span>
            <h3 className="mt-2 font-semibold">{s.t}</h3>
            <p className="mt-1 text-sm text-text-muted">{s.d}</p>
          </Card>
        ))}
      </section>

      {/* CTA */}
      <Card className="flex flex-col items-center justify-between gap-4 bg-gradient-to-br from-emerald-700 to-emerald-900 p-7 text-center text-white sm:flex-row sm:text-left">
        <div>
          <h2 className="font-display text-2xl font-semibold">Join the crew</h2>
          <p className="mt-1 max-w-xl text-emerald-100">
            Researchers, writers, editors, designers and video creators — board the Kalhuoffummi
            and help defend the Maldives with truth and excellence.
          </p>
        </div>
        <Link
          href="/community"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/95 px-5 py-3 font-semibold text-emerald-800 transition hover:bg-white"
        >
          Get involved <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Card>
    </div>
  );
}
