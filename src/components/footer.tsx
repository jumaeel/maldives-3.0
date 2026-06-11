import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold">Maldives 3.0</p>
            <p className="mt-2 max-w-xs text-sm text-text-muted">
              Research. Educate. Reform. Building a Maldives closer to the Quran and Sunnah
              upon the understanding of the first three generations.
            </p>
          </div>
          <FooterCol
            title="Platform"
            links={[
              ["Society Map", "/map"],
              ["Issues", "/issues"],
              ["Campaigns", "/campaigns"],
              ["Analytics", "/analytics"],
            ]}
          />
          <FooterCol
            title="Learn"
            links={[
              ["Knowledge Base", "/knowledge"],
              ["Learning Academy", "/academy"],
              ["Community", "/community"],
              ["Society Score", "/score"],
            ]}
          />
          <FooterCol
            title="Languages"
            links={[
              ["English", "/"],
              ["ދިވެހި (Dhivehi)", "/"],
              ["العربية (Arabic)", "/"],
            ]}
          />
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-text-muted sm:flex-row">
          <p>© {2026} Maldives 3.0 · A research, education & reform platform.</p>
          <p className="font-display italic">"Inspired by the Best Three Generations"</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-text-muted">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="transition hover:text-brand">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
