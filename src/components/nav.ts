export interface NavItem {
  href: string;
  label: string;
  icon: string; // heroicon component key, resolved in Sidebar
}

export interface NavGroup {
  heading: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    heading: "Overview",
    items: [
      { href: "/", label: "Home", icon: "Home" },
      { href: "/analytics", label: "Analytics", icon: "ChartBar" },
      { href: "/score", label: "Society Score", icon: "Star" },
    ],
  },
  {
    heading: "Research & Reform",
    items: [
      { href: "/map", label: "Society Map", icon: "Map" },
      { href: "/issues", label: "Issues", icon: "ExclamationTriangle" },
      { href: "/campaigns", label: "Campaigns", icon: "Megaphone" },
      { href: "/authorities", label: "Authority CRM", icon: "BuildingOffice" },
    ],
  },
  {
    heading: "Products & Initiatives",
    items: [
      { href: "/initiatives", label: "Initiatives", icon: "RocketLaunch" },
    ],
  },
  {
    heading: "Knowledge & People",
    items: [
      { href: "/knowledge", label: "Knowledge Base", icon: "BookOpen" },
      { href: "/academy", label: "Learning Academy", icon: "AcademicCap" },
      { href: "/community", label: "Community", icon: "ChatBubbleLeftRight" },
    ],
  },
];
