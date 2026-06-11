import type { Metadata } from "next";
import { Card, PageHeader, ScoreRing, ProgressBar } from "@/components/ui";
import { CategoryIcon } from "@/components/category-icon";
import { categories, scoreHistory } from "@/lib/data";

export const metadata: Metadata = { title: "Maldives Society Score" };

export default function ScorePage() {
  const overall = Math.round(categories.reduce((s, c) => s + c.score, 0) / categories.length);
  const ranked = [...categories].sort((a, b) => b.score - a.score);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader
        eyebrow="Special Feature"
        title="Maldives Society Score"
        subtitle="Each sector receives a score calculated from completed initiatives and assessments. Track progress over the years as society draws closer to the Quran and Sunnah."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Overall + trend */}
        <Card className="p-6 lg:col-span-1">
          <p className="text-sm text-text-muted">Overall Society Score</p>
          <div className="mt-4 flex items-center gap-5">
            <ScoreRing value={overall} size={104} />
            <div>
              <p className="font-display text-4xl font-bold">{overall}%</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                ▲ +{overall - scoreHistory[0].score} since 2022
              </p>
            </div>
          </div>
          <TrendChart />
        </Card>

        {/* Sector rings */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="font-display text-xl font-semibold">Score by Sector</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {ranked.map((c) => (
              <div key={c.key} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <CategoryIcon k={c.key} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    <span className="text-sm font-semibold tabular-nums">{c.score}%</span>
                  </div>
                  <ProgressBar value={c.score} className="mt-1.5" tone={c.score >= 70 ? "emerald" : "gold"} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function TrendChart() {
  const w = 280;
  const h = 110;
  const pad = 8;
  const min = 40;
  const max = 80;
  const pts = scoreHistory.map((d, i) => {
    const x = pad + (i / (scoreHistory.length - 1)) * (w - pad * 2);
    const y = h - pad - ((d.score - min) / (max - min)) * (h - pad * 2);
    return { x, y, ...d };
  });
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${path} L${pts[pts.length - 1].x},${h - pad} L${pts[0].x},${h - pad} Z`;

  return (
    <div className="mt-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-muted">
        Progress over years
      </p>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        <defs>
          <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#scoreFill)" />
        <path d={path} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
        {pts.map((p) => (
          <g key={p.year}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="#10b981" />
            <text x={p.x} y={h - 1} textAnchor="middle" className="fill-current text-text-muted" style={{ fontSize: 9 }}>
              {p.year}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
