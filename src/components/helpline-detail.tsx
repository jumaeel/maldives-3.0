import {
  UserPlusIcon, PencilSquareIcon, SparklesIcon, CalendarDaysIcon,
  StarIcon, ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Card, Badge } from "./ui";
import { InitiativeIcon } from "./initiative-icon";
import { HelplineBooking } from "./helpline-booking";
import { helplineServices, specialists } from "@/lib/initiatives";

const STEPS = [
  { icon: UserPlusIcon, title: "Log in", desc: "Create a private, secure account." },
  { icon: PencilSquareIcon, title: "Tell us your issue", desc: "Describe what you're going through, once." },
  { icon: SparklesIcon, title: "Get matched", desc: "We route you to the right kind of help." },
  { icon: CalendarDaysIcon, title: "Book an appointment", desc: "Online or in person, at a time that suits you." },
];

export function HelplineDetail() {
  return (
    <div className="space-y-12">
      {/* How it works */}
      <section>
        <h2 className="font-display text-2xl font-semibold">How it works</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Card key={s.title} className="p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="font-display text-2xl font-bold text-border">{i + 1}</span>
              </div>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-text-muted">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Services */}
      <section>
        <h2 className="font-display text-2xl font-semibold">Who you can talk to</h2>
        <p className="mt-1 text-text-muted">Every specialist works strictly within the bounds of the Sharia.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {helplineServices.map((s) => (
            <Card key={s.key} className="p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
                  <InitiativeIcon name={s.icon} className="h-6 w-6" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                    <span className="text-sm text-text-muted" dir="rtl">{s.nameDv}</span>
                  </div>
                  <p className="mt-1 text-sm text-text-muted">{s.desc}</p>
                  <div className="mt-3 flex gap-2 text-xs">
                    <Badge>{s.providers} specialists</Badge>
                    <Badge className="bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300">{s.avgWait}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Booking + specialists */}
      <section className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-display text-2xl font-semibold">Request an appointment</h2>
          <p className="mt-1 text-text-muted">Confidential. Free. Usually answered within a day.</p>
          <div className="mt-5">
            <HelplineBooking />
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Available specialists</p>
          {specialists.slice(0, 4).map((sp) => (
            <Card key={sp.id} className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {sp.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{sp.name}</p>
                  <p className="truncate text-xs text-text-muted">{sp.role}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-gold-600 dark:text-gold-400">
                  <StarIcon className="h-3.5 w-3.5" /> {sp.rating} · {sp.sessions} sessions
                </span>
                <span className="text-brand">{sp.nextSlot}</span>
              </div>
            </Card>
          ))}
          <Card className="flex items-start gap-2 bg-brand-soft p-4 text-sm text-brand">
            <ShieldCheckIcon className="h-5 w-5 shrink-0" />
            No charms, amulets, or fortune-telling — only Quran, Sunnah and qualified care.
          </Card>
        </aside>
      </section>
    </div>
  );
}
