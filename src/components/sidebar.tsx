"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HomeIcon, ChartBarIcon, StarIcon, MapIcon, ExclamationTriangleIcon,
  MegaphoneIcon, BuildingOffice2Icon, BookOpenIcon, AcademicCapIcon,
  ChatBubbleLeftRightIcon, Bars3Icon, XMarkIcon,
} from "@heroicons/react/24/outline";
import { navGroups } from "./nav";
import { cn } from "./ui";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: HomeIcon,
  ChartBar: ChartBarIcon,
  Star: StarIcon,
  Map: MapIcon,
  ExclamationTriangle: ExclamationTriangleIcon,
  Megaphone: MegaphoneIcon,
  BuildingOffice: BuildingOffice2Icon,
  BookOpen: BookOpenIcon,
  AcademicCap: AcademicCapIcon,
  ChatBubbleLeftRight: ChatBubbleLeftRightIcon,
};

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5 px-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 2l2.39 4.84 5.34.78-3.86 3.77.91 5.32L12 14.98l-4.78 2.53.91-5.32L4.27 8.42l5.34-.78z" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base font-bold tracking-tight">Maldives 3.0</span>
        <span className="block text-[10px] font-medium uppercase tracking-widest text-text-muted">
          Research · Educate · Reform
        </span>
      </span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
      {navGroups.map((group) => (
        <div key={group.heading}>
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
            {group.heading}
          </p>
          <ul className="space-y-1">
            {group.items.map((item) => {
              const Icon = ICONS[item.icon] ?? HomeIcon;
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                      active
                        ? "bg-brand-soft text-brand"
                        : "text-text-muted hover:bg-surface-2 hover:text-text"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="fixed left-4 top-3.5 z-40 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted lg:hidden"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
        <div className="flex h-16 items-center border-b border-border">
          <Brand />
        </div>
        <NavLinks />
        <div className="border-t border-border p-4">
          <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-4 text-white">
            <p className="text-xs font-semibold">"Inspired by the Best Three Generations"</p>
            <p className="mt-1 text-[11px] text-emerald-100">
              Closer to the Quran &amp; Sunnah.
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-surface shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-border pr-3">
              <Brand />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-text-muted">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
