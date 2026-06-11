import {
  LifebuoyIcon, CodeBracketIcon, AcademicCapIcon, HeartIcon,
  BookOpenIcon, ShieldCheckIcon, RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Lifebuoy: LifebuoyIcon,
  Code: CodeBracketIcon,
  AcademicCap: AcademicCapIcon,
  Heart: HeartIcon,
  BookOpen: BookOpenIcon,
  ShieldCheck: ShieldCheckIcon,
  RocketLaunch: RocketLaunchIcon,
};

export function InitiativeIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[name] ?? RocketLaunchIcon;
  return <Icon className={className} />;
}
