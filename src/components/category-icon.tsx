import {
  UsersIcon, AcademicCapIcon, HeartIcon, TrophyIcon, GlobeAltIcon,
  NewspaperIcon, BuildingLibraryIcon, BanknotesIcon, SparklesIcon,
  BoltIcon, UserGroupIcon, CpuChipIcon, BriefcaseIcon, TagIcon,
} from "@heroicons/react/24/outline";
import type { CategoryKey } from "@/lib/types";

const MAP: Record<CategoryKey, React.ComponentType<{ className?: string }>> = {
  family: UsersIcon,
  education: AcademicCapIcon,
  healthcare: HeartIcon,
  sports: TrophyIcon,
  tourism: GlobeAltIcon,
  media: NewspaperIcon,
  government: BuildingLibraryIcon,
  economy: BanknotesIcon,
  environment: SparklesIcon,
  youth: BoltIcon,
  mosques: BuildingLibraryIcon,
  community: UserGroupIcon,
  technology: CpuChipIcon,
  business: BriefcaseIcon,
};

export function CategoryIcon({ k, className }: { k: CategoryKey; className?: string }) {
  const Icon = MAP[k] ?? TagIcon;
  return <Icon className={className} />;
}
