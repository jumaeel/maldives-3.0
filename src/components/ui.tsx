import Link from "next/link";
import type { ReactNode } from "react";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Card({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}) {
  return (
    <As
      className={cn(
        "rounded-2xl border border-border bg-surface shadow-sm",
        className
      )}
    >
      {children}
    </As>
  );
}

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        className ?? "bg-brand-soft text-brand"
      )}
    >
      {children}
    </span>
  );
}

export function ProgressBar({
  value,
  className,
  tone = "emerald",
}: {
  value: number;
  className?: string;
  tone?: "emerald" | "gold";
}) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-2", className)}>
      <div
        className={cn(
          "h-full rounded-full transition-all",
          tone === "gold" ? "bg-gold-400" : "bg-emerald-500"
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  icon,
  href,
}: {
  label: string;
  value: ReactNode;
  sub?: string;
  icon?: ReactNode;
  href?: string;
}) {
  const inner = (
    <Card className="p-5 transition hover:border-brand/40">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-muted">{label}</p>
          <p className="mt-1 font-display text-3xl font-semibold tracking-tight">{value}</p>
          {sub && <p className="mt-1 text-xs text-text-muted">{sub}</p>}
        </div>
        {icon && (
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
            {icon}
          </span>
        )}
      </div>
    </Card>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  action,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function ScoreRing({ value, size = 64 }: { value: number; size?: number }) {
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color = value >= 70 ? "#10b981" : value >= 50 ? "#e0b13a" : "#ef4444";
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        className="rotate-90 fill-text font-semibold"
        style={{ transformOrigin: "center", fontSize: size * 0.26 }}
      >
        {value}
      </text>
    </svg>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface-2/40 p-6 text-center text-sm text-text-muted">
      {children}
    </div>
  );
}
