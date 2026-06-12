import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, ArrowTopRightOnSquareIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Card, PageHeader, Badge } from "@/components/ui";
import { InitiativeIcon } from "@/components/initiative-icon";
import { initiatives, isRevealed } from "@/lib/initiatives";

export const metadata: Metadata = { title: "Products & Initiatives" };

const STATUS_TONE: Record<string, string> = {
  Live: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  Beta: "bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300",
  Building: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
  Planned: "bg-surface-2 text-text-muted",
};

export default function InitiativesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader
        eyebrow="Products & Initiatives"
        title="Things we are building"
        subtitle="Real products and community efforts that grow out of Maldives 3.0 — practical technology and service for the benefit of the ummah, fi sabilillah."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {initiatives.map((it) =>
          isRevealed(it) ? (
            <Card key={it.slug} className="flex flex-col p-6 transition hover:border-brand/40">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
                    <InitiativeIcon name={it.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold">{it.name}</h3>
                    <p className="text-sm text-text-muted">{it.category}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_TONE[it.status]}`}>
                  {it.status}
                </span>
              </div>

              <p className="mt-4 font-display text-base italic text-brand">“{it.tagline}”</p>
              <p className="mt-2 flex-1 text-sm text-text-muted">{it.summary}</p>

              <div className="mt-5 grid grid-cols-4 gap-2">
                {it.stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-border p-2.5 text-center">
                    <p className="font-display text-lg font-bold">{s.value}</p>
                    <p className="text-[10px] text-text-muted">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Link
                  href={`/initiatives/${it.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Learn more <ArrowRightIcon className="h-4 w-4" />
                </Link>
                {it.url && (
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:border-brand/40"
                  >
                    Visit <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </Card>
          ) : (
            <Card key={it.slug} className="flex flex-col justify-center p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-text-muted">
                    <LockClosedIcon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-text-muted">Undisclosed initiative</h3>
                    <p className="text-sm text-text-muted">To be announced</p>
                  </div>
                </div>
                <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-semibold text-text-muted">
                  In progress
                </span>
              </div>
              <p className="mt-4 text-sm text-text-muted">
                Another initiative is being prepared and will be revealed in due course, in shā’ Allah.
              </p>
            </Card>
          )
        )}
      </div>

      <Card className="mt-8 flex flex-col items-center justify-between gap-4 border-dashed p-6 text-center sm:flex-row sm:text-left">
        <div>
          <Badge>Got an idea?</Badge>
          <p className="mt-2 font-medium">Have a project that could benefit the ummah?</p>
          <p className="text-sm text-text-muted">Propose it as an initiative — the community can help build it.</p>
        </div>
        <Link href="/community" className="rounded-xl border border-border px-4 py-2.5 font-semibold transition hover:border-brand/40">
          Propose an initiative
        </Link>
      </Card>
    </div>
  );
}
