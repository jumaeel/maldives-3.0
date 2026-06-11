# Maldives 3.0

> *"Inspired by the Best Three Generations"*
>
> A technology-driven research, education and reform platform helping Maldivian
> society draw closer to the Quran and Sunnah upon the understanding of the
> Salaf as-Salih (the Sahabah, Tabi'un and Atba' al-Tabi'in).

A modern, mobile-first platform that identifies societal issues, researches
them, gathers scholarly evidence, proposes practical solutions, coordinates
awareness campaigns, and tracks real implementation — blending the feel of
GitHub Issues, Notion, Wikipedia, Trello and a community forum with a clean,
modern Islamic design.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router) — App Router is identical to the requested v15; v16 is the current stable |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`, class-based dark mode) |
| Forms | **React Hook Form** + **Zod** (`@hookform/resolvers`) |
| Icons | **Heroicons** (+ `hugeicons-react` available) |
| Fonts | Geist (sans) + Fraunces (display) via `next/font` |

> **Note on backend** — the original brief also lists Supabase/PostgreSQL. This
> build delivers the complete **frontend** per the specified frontend stack,
> driven by a typed mock-data layer (`src/lib/data.ts`) that mirrors the intended
> schema. Swapping the data layer for Supabase queries is a drop-in next step.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Modules & routes

| Route | Module |
| --- | --- |
| `/` | Landing + dashboard (brand positioning, headline stats, featured issues) |
| `/map` | **Society Map** — 14 sectors with issue counts and scores |
| `/issues` | **Issue Management** — filter/sort by sector, status, votes |
| `/issues/[id]` | Issue detail with 7 tabs: Overview · Research · Islamic Evidence · Solutions · Campaigns · Institutions · Updates, plus the 9-stage status flow |
| `/issues/new` | Submit-issue form (React Hook Form + Zod validation) |
| `/knowledge` | **Knowledge Base** — searchable library with type filters |
| `/academy` | **Learning Academy** — 3 levels, courses, progress, certificates |
| `/community` | **Community Portal** — forums, leaderboard, badges, events |
| `/campaigns` | **Campaign Management** — objectives, tasks, volunteers, impact |
| `/authorities` | **Authority Engagement CRM** — institution pipeline & table |
| `/analytics` | **Analytics Dashboard** — sector progress, growth & score charts |
| `/score` | **Maldives Society Score** — overall + per-sector + yearly trend |

## Design system

- **Palette** — emerald green, gold accents, white (defined in `globals.css` `@theme`).
- **Dark / light mode** — class-based, no-flash inline theme script, toggle in the top bar.
- **Arabic-inspired geometric patterns** — SVG hero background + dot grid utilities.
- **Roles** — a demo role switcher (Guest · Volunteer · Core Team · Scholar · Administrator)
  and an EN / ދިވެހި / عربي language switcher in the top bar.
- **Scholar gate** — issues display an "Awaiting scholar approval" vs "Officially
  published" state, reflecting the rule that scholar approval precedes publication.

## Project structure

```
src/
  app/                 # App Router pages (one folder per module)
  components/          # Sidebar, Topbar, Footer, UI primitives, feature components
  lib/
    types.ts          # Domain types (Issue, Category, Course, Campaign, …)
    data.ts           # Typed mock data + helpers (mirrors intended DB schema)
```

## Next steps

1. Wire the data layer to **Supabase** (auth, RBAC, real-time, file uploads, audit logs).
2. Add full i18n for **Dhivehi / English / Arabic** (RTL-aware).
3. AI features — issue categorization, research summaries, recommendation engine.
4. PDF report generator + public transparency API for the mobile app.
