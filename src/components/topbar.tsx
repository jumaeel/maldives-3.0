"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MagnifyingGlassIcon, BellIcon, ChevronDownIcon, PlusIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "./ui";

const ROLES = ["Guest", "Volunteer", "Core Team", "Scholar", "Administrator"] as const;
const LANGS = ["EN", "ދިވެހި", "عربي"] as const;

export function Topbar() {
  const [role, setRole] = useState<(typeof ROLES)[number]>("Volunteer");
  const [lang, setLang] = useState<(typeof LANGS)[number]>("EN");
  const [roleOpen, setRoleOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-surface/80 px-4 backdrop-blur lg:px-6">
      <div className="ml-12 flex flex-1 items-center lg:ml-0">
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-text-muted" />
          <input
            placeholder="Search issues, articles, fatwas…"
            className="h-9 w-full rounded-lg border border-border bg-surface-2/60 pl-9 pr-3 text-sm outline-none transition focus:border-brand/50 focus:bg-surface"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Language */}
        <div className="hidden items-center rounded-lg border border-border bg-surface p-0.5 sm:flex">
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium transition",
                lang === l ? "bg-brand-soft text-brand" : "text-text-muted hover:text-text"
              )}
            >
              {l}
            </button>
          ))}
        </div>

        <Link
          href="/issues/new"
          className="hidden items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:inline-flex"
        >
          <PlusIcon className="h-4 w-4" /> Submit Issue
        </Link>

        <button
          aria-label="Notifications"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:text-brand"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gold-400" />
        </button>

        <ThemeToggle />

        {/* Role switcher (demo) */}
        <div className="relative">
          <button
            onClick={() => setRoleOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface py-1 pl-1 pr-2 transition hover:border-brand/40"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-xs font-bold text-white">
              MS
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-xs font-semibold leading-tight">Mariyam S.</span>
              <span className="block text-[10px] leading-tight text-text-muted">{role}</span>
            </span>
            <ChevronDownIcon className="h-4 w-4 text-text-muted" />
          </button>
          {roleOpen && (
            <div className="absolute right-0 top-11 w-44 overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-lg">
              <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                View as role
              </p>
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setRoleOpen(false);
                  }}
                  className={cn(
                    "block w-full rounded-md px-2 py-1.5 text-left text-sm transition",
                    role === r ? "bg-brand-soft text-brand" : "hover:bg-surface-2"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
