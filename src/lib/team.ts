// NOTE: These are representative placeholder names/qualifications consistent with
// the demo personas used across the app. Replace with your real team details.

export const TOTAL_COURSES = 12; // total courses across the 3 Academy levels

export interface Member {
  name: string;
  role: string;
  bio?: string;
  quals?: string[]; // degrees / certifications / specialties
  tags?: string[];
  // Platform contribution & academy progress
  courses: number; // Academy courses completed (out of TOTAL_COURSES) → drives rank
  issues: number; // issues raised
  solutions: number; // solutions contributed
  support: number; // support sessions / help provided
}

export interface Rank {
  title: string;
  tier: "seeker" | "student" | "companion" | "guide" | "mentor";
}

// Platform rank is earned from the Academy — how many courses a member has completed.
export function rankFromCourses(courses: number): Rank {
  if (courses >= TOTAL_COURSES) return { title: "Mentor", tier: "mentor" };
  if (courses >= 9) return { title: "Guide", tier: "guide" };
  if (courses >= 6) return { title: "Companion", tier: "companion" };
  if (courses >= 3) return { title: "Student", tier: "student" };
  return { title: "Seeker", tier: "seeker" };
}

export const RANK_TONE: Record<Rank["tier"], string> = {
  mentor: "bg-gold-100 text-gold-800 dark:bg-gold-900/40 dark:text-gold-300",
  guide: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  companion: "bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300",
  student: "bg-violet-100 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
  seeker: "bg-surface-2 text-text-muted",
};

export const founder: Member = {
  name: "Husvee",
  role: "Founder & Director",
  bio:
    "Founder of Maldives 3.0, dedicated to building technology and community efforts that bring Maldivian society closer to the Quran and Sunnah upon the understanding of the Salaf as-Salih.",
  quals: ["Product & platform vision", "Da'wah & community building"],
  tags: ["Founder"],
  courses: 12, issues: 20, solutions: 15, support: 30,
};

export interface TeamGroup {
  id: string;
  title: string;
  blurb: string;
  members: Member[];
}

export const teamGroups: TeamGroup[] = [
  {
    id: "operating",
    title: "Operating Team",
    blurb:
      "The day-to-day leadership that keeps the platform, partnerships and operations running.",
    members: [
      {
        name: "Mariyam Shifa",
        role: "Executive Director",
        bio: "Leads operations, strategy and the core team.",
        quals: ["MBA, Strategy & Leadership", "10+ yrs NGO operations"],
        courses: 12, issues: 14, solutions: 12, support: 8,
      },
      {
        name: "Hassan Rasheed",
        role: "Head of Programs",
        bio: "Owns the issue-to-implementation pipeline end to end.",
        quals: ["MA, Public Policy", "Program management"],
        courses: 10, issues: 11, solutions: 9, support: 5,
      },
      {
        name: "Fathimath Nasheed",
        role: "Partnerships & Authority Engagement",
        bio: "Builds relationships with ministries, hospitals and institutions.",
        quals: ["BA, International Relations", "Stakeholder relations"],
        courses: 8, issues: 9, solutions: 6, support: 12,
      },
      {
        name: "Ibrahim Waheed",
        role: "Communications & Media",
        bio: "Leads awareness, content and public transparency.",
        quals: ["BA, Media & Communications"],
        courses: 7, issues: 6, solutions: 4, support: 3,
      },
      {
        name: "Aminath Zara",
        role: "Finance & Administration",
        bio: "Stewardship of resources with amanah and transparency.",
        quals: ["ACCA (part-qualified)", "Nonprofit finance"],
        courses: 5, issues: 2, solutions: 1, support: 0,
      },
    ],
  },
  {
    id: "scholars",
    title: "Scholars Committee",
    blurb:
      "Qualified scholars who review evidence, approve recommendations and add fatwas. An issue is officially published only after their approval.",
    members: [
      {
        name: "Sheikh Ibrahim Hassan",
        role: "Chair · Fiqh & Family",
        bio: "Reviews fiqh analysis and family-related rulings.",
        quals: ["BA, Islamic University of Madinah (Sharia)", "Ijazah in Fiqh", "20+ yrs teaching"],
        tags: ["Fiqh", "Family"],
        courses: 12, issues: 6, solutions: 20, support: 320,
      },
      {
        name: "Sheikh Hassan Saeed",
        role: "Aqeedah & Manhaj",
        bio: "Guards the methodology of the Salaf in all recommendations.",
        quals: ["MA, Umm al-Qura University (Aqeedah)", "Specialist in Manhaj as-Salaf"],
        tags: ["Aqeedah"],
        courses: 12, issues: 4, solutions: 18, support: 280,
      },
      {
        name: "Ustadh Yoosuf Adam",
        role: "Ruqyah & Spiritual Treatment",
        bio: "Oversees Sharia-compliant ruqyah guidance for Helpline.mv.",
        quals: ["BA, Sharia", "Certified in prophetic ruqyah"],
        tags: ["Ruqyah"],
        courses: 11, issues: 3, solutions: 12, support: 175,
      },
      {
        name: "Dr. Abdullah Mohamed",
        role: "Usul al-Fiqh & Contemporary Issues",
        bio: "Advises on nawazil — applying fiqh to modern realities.",
        quals: ["PhD, Usul al-Fiqh, Islamic University of Madinah", "Contemporary fiqh research"],
        tags: ["Usul", "Nawazil"],
        courses: 12, issues: 5, solutions: 16, support: 90,
      },
    ],
  },
  {
    id: "core",
    title: "Core Team",
    blurb:
      "Researchers, builders and coordinators turning evidence into practical, measurable change.",
    members: [
      {
        name: "Aishath Leena",
        role: "Head of Research",
        bio: "Leads the research unit and curriculum analysis.",
        quals: ["MSc, Social Research Methods"],
        courses: 10, issues: 18, solutions: 9, support: 4,
      },
      {
        name: "Ahmed Saleem",
        role: "Lead Engineer · Devs Fisabilillah",
        bio: "Leads platform engineering and the open-source projects.",
        quals: ["BSc, Computer Science", "Full-stack (Next.js, Supabase)"],
        courses: 9, issues: 12, solutions: 14, support: 6,
      },
      {
        name: "Mariyam Shifa",
        role: "Campaigns Coordinator",
        bio: "Runs awareness campaigns and volunteer mobilisation.",
        quals: ["Campaign & community organising"],
        courses: 12, issues: 14, solutions: 12, support: 8,
      },
      {
        name: "Dr. Aishath Nadia",
        role: "Academy Lead · Wellbeing",
        bio: "Designs learning paths and faith-sensitive counselling standards.",
        quals: ["PhD, Clinical Psychology"],
        courses: 8, issues: 5, solutions: 10, support: 210,
      },
      {
        name: "Yoosuf Ali",
        role: "Community Manager",
        bio: "Forums, events, gamification and volunteer experience.",
        quals: ["BA, Community Development"],
        courses: 7, issues: 8, solutions: 5, support: 9,
      },
      {
        name: "Layla Ibrahim",
        role: "Design Lead",
        bio: "Owns the modern Islamic design system and brand.",
        quals: ["BA, Visual Communication"],
        courses: 6, issues: 4, solutions: 7, support: 2,
      },
    ],
  },
];

export const teamStats = [
  { label: "Operating Team", value: teamGroups[0].members.length },
  { label: "Scholars", value: teamGroups[1].members.length },
  { label: "Core Team", value: teamGroups[2].members.length },
  { label: "Volunteers", value: "1,200+" },
];
