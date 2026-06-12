import {
  LifebuoyIcon, CodeBracketIcon, AcademicCapIcon, HeartIcon,
  BookOpenIcon, ShieldCheckIcon, RocketLaunchIcon,
} from "@heroicons/react/24/outline";

function ShipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 18l1.5-5h15L21 18" />
      <path d="M3 18c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" />
      <path d="M12 13V3l6 4-6 2" />
      <path d="M12 7H8" />
    </svg>
  );
}

const MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Lifebuoy: LifebuoyIcon,
  Code: CodeBracketIcon,
  AcademicCap: AcademicCapIcon,
  Heart: HeartIcon,
  BookOpen: BookOpenIcon,
  ShieldCheck: ShieldCheckIcon,
  RocketLaunch: RocketLaunchIcon,
  Ship: ShipIcon,
};

export function InitiativeIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[name] ?? RocketLaunchIcon;
  return <Icon className={className} />;
}
