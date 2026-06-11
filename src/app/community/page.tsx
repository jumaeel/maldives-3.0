import type { Metadata } from "next";
import {
  ChatBubbleLeftRightIcon, CalendarDaysIcon, MegaphoneIcon,
  TrophyIcon, FireIcon, HandRaisedIcon, StarIcon,
} from "@heroicons/react/24/outline";
import { Card, PageHeader, Badge } from "@/components/ui";
import { threads, leaderboard } from "@/lib/data";

export const metadata: Metadata = { title: "Community" };

const EVENTS = [
  { date: "Jun 18", title: "Webinar: Manhaj of the Salaf", tag: "Online" },
  { date: "Jun 24", title: "Stadium Musalla Mapping Drive", tag: "Malé" },
  { date: "Jul 02", title: "Volunteer Onboarding (Level 1)", tag: "Online" },
];

const ANNOUNCEMENTS = [
  { title: "Wedding Reform toolkit reaches design stage", time: "2h ago" },
  { title: "Hospital Prayer Initiative: 2 pilot sites confirmed", time: "1d ago" },
  { title: "New Level 2 course: Contemporary Issues is live", time: "3d ago" },
];

const BADGES = [
  { icon: FireIcon, label: "7-day streak", tone: "text-orange-500" },
  { icon: HandRaisedIcon, label: "First Issue", tone: "text-emerald-500" },
  { icon: StarIcon, label: "Top Contributor", tone: "text-gold-500" },
  { icon: TrophyIcon, label: "Campaign Hero", tone: "text-violet-500" },
];

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader
        eyebrow="Module 05"
        title="Community Portal"
        subtitle="Forums, campaign groups, announcements and events — with points, badges, reputation and leaderboards to encourage sincere contribution."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Forums */}
        <div className="lg:col-span-2">
          <SectionTitle icon={ChatBubbleLeftRightIcon} title="Discussion Forums" />
          <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
            {threads.map((t) => (
              <div key={t.id} className="flex items-center gap-4 p-4 transition hover:bg-surface-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {t.author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{t.title}</p>
                  <p className="text-xs text-text-muted">{t.author} · {t.lastActive}</p>
                </div>
                <Badge>{t.tag}</Badge>
                <div className="hidden text-right text-xs text-text-muted sm:block">
                  <p className="font-semibold text-text">{t.replies} replies</p>
                  <p>{t.views} views</p>
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="mt-8">
            <SectionTitle icon={TrophyIcon} title="Leaderboard" />
            <Card className="mt-4 divide-y divide-border">
              {leaderboard.map((l) => (
                <div key={l.rank} className="flex items-center gap-4 p-4">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    l.rank === 1 ? "bg-gold-400 text-gold-900" : l.rank <= 3 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-surface-2 text-text-muted"
                  }`}>
                    {l.rank}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{l.name}</p>
                    <p className="text-xs text-text-muted">{l.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold tabular-nums">{l.points.toLocaleString()} pts</p>
                    <p className="text-xs text-text-muted">{l.badges} badges</p>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>

        {/* Sidebar: badges, events, announcements */}
        <div className="space-y-8">
          <div>
            <SectionTitle icon={StarIcon} title="Your Badges" />
            <Card className="mt-4 grid grid-cols-2 gap-3 p-5">
              {BADGES.map((b) => (
                <div key={b.label} className="flex flex-col items-center rounded-xl border border-border p-4 text-center">
                  <b.icon className={`h-8 w-8 ${b.tone}`} />
                  <p className="mt-2 text-xs font-medium">{b.label}</p>
                </div>
              ))}
            </Card>
          </div>

          <div>
            <SectionTitle icon={CalendarDaysIcon} title="Upcoming Events" />
            <Card className="mt-4 divide-y divide-border">
              {EVENTS.map((e) => (
                <div key={e.title} className="flex items-center gap-3 p-4">
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-soft text-center text-brand">
                    <span className="text-[10px] font-semibold uppercase">{e.date.split(" ")[0]}</span>
                    <span className="text-sm font-bold leading-none">{e.date.split(" ")[1]}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{e.title}</p>
                    <p className="text-xs text-text-muted">{e.tag}</p>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          <div>
            <SectionTitle icon={MegaphoneIcon} title="Announcements" />
            <Card className="mt-4 divide-y divide-border">
              {ANNOUNCEMENTS.map((a) => (
                <div key={a.title} className="p-4">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{a.time}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-brand" />
      <h2 className="font-display text-xl font-semibold">{title}</h2>
    </div>
  );
}
