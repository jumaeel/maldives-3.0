import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui";
import { InitiativeIcon } from "@/components/initiative-icon";
import { HelplineDetail } from "@/components/helpline-detail";
import { DevsDetail } from "@/components/devs-detail";
import { initiatives, findInitiative } from "@/lib/initiatives";

export function generateStaticParams() {
  return initiatives.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const it = findInitiative(slug);
  return { title: it ? it.name : "Initiative" };
}

const STATUS_TONE: Record<string, string> = {
  Live: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  Beta: "bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300",
  Building: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
  Planned: "bg-surface-2 text-text-muted",
};

export default async function InitiativeDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const it = findInitiative(slug);
  if (!it) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/initiatives" className="inline-flex items-center gap-1.5 text-sm text-text-muted transition hover:text-brand">
        <ArrowLeftIcon className="h-4 w-4" /> All initiatives
      </Link>

      {/* Hero */}
      <div className="pattern-hero mt-4 rounded-3xl border border-border p-8 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-sm">
              <InitiativeIcon name={it.icon} className="h-8 w-8" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{it.name}</h1>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_TONE[it.status]}`}>
                  {it.status}
                </span>
              </div>
              <p className="mt-1 font-display text-lg italic text-brand">“{it.tagline}”</p>
            </div>
          </div>
          {it.url && (
            <a
              href={it.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
            >
              Visit {it.name} <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
          )}
        </div>

        <p className="mt-6 max-w-3xl text-lg text-text-muted">{it.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {it.highlights.map((h) => (
            <Badge key={h}>{h}</Badge>
          ))}
        </div>

        <div className="mt-6 grid max-w-xl grid-cols-4 gap-3">
          {it.stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-surface/70 p-3 text-center backdrop-blur">
              <p className="font-display text-xl font-bold">{s.value}</p>
              <p className="text-[11px] text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="mt-12">
        {slug === "helpline-mv" && <HelplineDetail />}
        {slug === "devs-fisabilillah" && <DevsDetail />}
      </div>
    </div>
  );
}
