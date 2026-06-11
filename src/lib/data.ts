import type {
  Category, Issue, Article, Course, Campaign, Institution,
  ForumThread, LeaderEntry, IssueStatus, CategoryKey,
} from "./types";

export const STATUS_FLOW: IssueStatus[] = [
  "Submitted", "Under Review", "Researching", "Scholar Review",
  "Solution Design", "Awareness Campaign", "Authority Engagement",
  "Implemented", "Completed",
];

export const SEVERITY_COLORS: Record<string, string> = {
  Low: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300",
  Moderate: "text-gold-700 bg-gold-50 dark:bg-gold-900/30 dark:text-gold-300",
  High: "text-orange-700 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-300",
  Critical: "text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-300",
};

export const categories: Category[] = [
  { key: "family",      name: "Family",      nameDv: "ޢާއިލާ",      icon: "Users",        total: 42, solved: 11, inProgress: 14, research: 9,  awareness: 8,  score: 71 },
  { key: "education",   name: "Education",   nameDv: "ތަޢުލީމު",    icon: "AcademicCap",  total: 56, solved: 18, inProgress: 20, research: 10, awareness: 8,  score: 78 },
  { key: "healthcare",  name: "Healthcare",  nameDv: "ޞިއްޙަތު",    icon: "Heart",        total: 38, solved: 9,  inProgress: 16, research: 7,  awareness: 6,  score: 65 },
  { key: "sports",      name: "Sports",      nameDv: "ކުޅިވަރު",    icon: "Trophy",       total: 24, solved: 6,  inProgress: 9,  research: 5,  awareness: 4,  score: 55 },
  { key: "tourism",     name: "Tourism",     nameDv: "ފަތުރުވެރިކަން", icon: "GlobeAlt",  total: 31, solved: 7,  inProgress: 12, research: 8,  awareness: 4,  score: 58 },
  { key: "media",       name: "Media",       nameDv: "މީޑިއާ",      icon: "Newspaper",    total: 29, solved: 5,  inProgress: 10, research: 9,  awareness: 5,  score: 40 },
  { key: "government",  name: "Government",  nameDv: "ސަރުކާރު",    icon: "BuildingLibrary", total: 33, solved: 8, inProgress: 13, research: 7, awareness: 5, score: 62 },
  { key: "economy",     name: "Economy",     nameDv: "އިޤްތިޞާދު",  icon: "BanknotesIcon", total: 27, solved: 6,  inProgress: 11, research: 6,  awareness: 4,  score: 60 },
  { key: "environment", name: "Environment", nameDv: "ތިމާވެށި",    icon: "Sparkles",     total: 22, solved: 5,  inProgress: 8,  research: 5,  awareness: 4,  score: 64 },
  { key: "youth",       name: "Youth",       nameDv: "ޒުވާނުން",    icon: "Bolt",         total: 48, solved: 13, inProgress: 18, research: 9,  awareness: 8,  score: 69 },
  { key: "mosques",     name: "Mosques",     nameDv: "މިސްކިތްތައް", icon: "BuildingLibrary", total: 19, solved: 8, inProgress: 6, research: 3, awareness: 2, score: 83 },
  { key: "community",   name: "Community",   nameDv: "މުޖުތަމަޢު",  icon: "UserGroup",    total: 35, solved: 10, inProgress: 13, research: 7,  awareness: 5,  score: 67 },
  { key: "technology",  name: "Technology",  nameDv: "ޓެކްނޮލޮޖީ",  icon: "CpuChip",      total: 18, solved: 4,  inProgress: 7,  research: 5,  awareness: 2,  score: 52 },
  { key: "business",    name: "Business",    nameDv: "ވިޔަފާރި",    icon: "BriefcaseIcon", total: 26, solved: 6,  inProgress: 10, research: 6,  awareness: 4,  score: 61 },
];

export const categoryName = (k: CategoryKey) =>
  categories.find((c) => c.key === k)?.name ?? k;

export const issues: Issue[] = [
  {
    id: "MV-1042",
    title: "Sports events scheduled during prayer times",
    description:
      "Major football tournaments and inter-school sports events are frequently scheduled during Maghrib and Isha congregational prayers, forcing players and spectators to miss salah.",
    category: "sports",
    location: "Malé & Atolls",
    severity: "High",
    status: "Awareness Campaign",
    dateReported: "2026-02-14",
    reporter: "Ahmed Saleem",
    votes: 218,
    comments: 47,
    scholarApproved: true,
    research: {
      statistics: [
        "73% of surveyed players reported missing at least one prayer per tournament.",
        "18 of 24 national-level events overlapped with congregational prayer in 2025.",
      ],
      studies: ["FA Maldives 2025 fixture audit", "Youth & Sports prayer-access survey (n=1,240)"],
      reports: ["Atoll Sports Council quarterly report Q4 2025"],
      fieldNotes: ["Most stadiums lack a designated musalla.", "Referees willing to add prayer breaks if scheduled."],
    },
    evidence: [
      { type: "Quran", reference: "An-Nisa 4:103", text: "Indeed, prayer has been decreed upon the believers a decree of specified times.", approved: true },
      { type: "Hadith", reference: "Sahih al-Bukhari 527", text: "The most beloved deed to Allah is prayer at its appointed time.", approved: true },
      { type: "Scholar", reference: "Permanent Committee", text: "Organising recreation must not lead to neglecting the obligatory prayers.", approved: true },
      { type: "Fiqh", reference: "Fiqh Analysis", text: "Scheduling that systematically prevents salah falls under removing a means to an obligation.", approved: false },
    ],
    solutions: [
      { kind: "Action", title: "Mandatory prayer breaks", detail: "Insert a 15-minute break aligned with prayer times in all fixtures." },
      { kind: "Action", title: "Prayer announcements", detail: "Stadium PA announces adhan and break start." },
      { kind: "Institutional", title: "Musalla facilities", detail: "Require a clean prayer space at every licensed venue." },
      { kind: "Educational", title: "Awareness materials", detail: "Posters and briefings for organisers and athletes." },
    ],
    campaigns: ["CMP-7", "CMP-3"],
    institutions: ["INS-2", "INS-5"],
    updates: [
      { date: "2026-05-30", author: "Core Team", status: "Awareness Campaign", note: "Awareness posters distributed to 9 venues." },
      { date: "2026-04-12", author: "Sheikh Ibrahim", status: "Scholar Review", note: "Evidence approved; recommendation endorsed." },
      { date: "2026-03-02", author: "Research Team", status: "Researching", note: "Fixture audit completed." },
      { date: "2026-02-14", author: "Ahmed Saleem", status: "Submitted", note: "Issue submitted with initial observations." },
    ],
  },
  {
    id: "MV-1088",
    title: "Lack of prayer facilities in regional hospitals",
    description:
      "Patients and attendants in several regional hospitals have no accessible musalla, and ward schedules do not accommodate prayer.",
    category: "healthcare",
    location: "Addu, Kulhudhuffushi",
    severity: "Moderate",
    status: "Authority Engagement",
    dateReported: "2026-01-22",
    reporter: "Fathimath Nasheed",
    votes: 156,
    comments: 31,
    scholarApproved: true,
    research: {
      statistics: ["Only 3 of 11 regional hospitals have a dedicated prayer room."],
      studies: ["Hospital facilities access review 2026"],
      reports: ["Patient experience survey"],
      fieldNotes: ["Staff supportive; space constraints are the main barrier."],
    },
    evidence: [
      { type: "Quran", reference: "Al-Baqarah 2:238", text: "Maintain with care the [obligatory] prayers.", approved: true },
      { type: "Hadith", reference: "Sahih Muslim 657", text: "Whoever maintains the prayers, they will be light and proof for him.", approved: true },
    ],
    solutions: [
      { kind: "Institutional", title: "Convert unused rooms", detail: "Repurpose available rooms into clean musallas." },
      { kind: "Policy", title: "Facility standard", detail: "Add prayer space to hospital licensing criteria." },
    ],
    campaigns: ["CMP-2"],
    institutions: ["INS-1", "INS-3"],
    updates: [
      { date: "2026-05-18", author: "Core Team", status: "Authority Engagement", note: "Health Ministry agreed to pilot two sites." },
      { date: "2026-03-10", author: "Sheikh Ibrahim", status: "Scholar Review", note: "Recommendation approved." },
    ],
  },
  {
    id: "MV-1101",
    title: "Extravagant wedding spending and un-Islamic practices",
    description:
      "Growing trend of lavish weddings causing debt, mixed-gathering concerns, and music-centred celebrations replacing simple sunnah weddings.",
    category: "family",
    location: "National",
    severity: "High",
    status: "Solution Design",
    dateReported: "2026-03-05",
    reporter: "Hassan Rasheed",
    votes: 189,
    comments: 64,
    scholarApproved: true,
    research: {
      statistics: ["Average wedding cost rose 38% over 3 years.", "1 in 4 couples reported wedding-related debt."],
      studies: ["Household finance & celebration study 2025"],
      reports: ["Community wellbeing report"],
      fieldNotes: ["Strong appetite among youth for simpler walima models."],
    },
    evidence: [
      { type: "Hadith", reference: "Sunan Abi Dawud 2117", text: "The best of marriages is the one with the least burden.", approved: true },
      { type: "Scholar", reference: "Ibn Uthaymeen", text: "Extravagance is blameworthy even in permissible matters.", approved: true },
    ],
    solutions: [
      { kind: "Educational", title: "Simple walima toolkit", detail: "A sunnah-aligned wedding planning guide." },
      { kind: "Action", title: "Model weddings", detail: "Showcase affordable, dignified celebrations." },
    ],
    campaigns: ["CMP-4"],
    institutions: [],
    updates: [
      { date: "2026-05-22", author: "Core Team", status: "Solution Design", note: "Drafting the simple-walima toolkit." },
      { date: "2026-04-01", author: "Sheikh Ibrahim", status: "Scholar Review", note: "Approved evidence and direction." },
    ],
  },
  {
    id: "MV-1133",
    title: "Weak Islamic content in school curriculum",
    description:
      "Islamic studies hours have been reduced and aqeedah fundamentals are under-emphasised across secondary schools.",
    category: "education",
    location: "National",
    severity: "Critical",
    status: "Researching",
    dateReported: "2026-04-18",
    reporter: "Aishath Leena",
    votes: 274,
    comments: 88,
    scholarApproved: false,
    research: {
      statistics: ["Islamic studies hours down 22% since 2020."],
      studies: ["Curriculum content analysis (in progress)"],
      reports: [],
      fieldNotes: ["Teachers report limited training materials."],
    },
    evidence: [
      { type: "Quran", reference: "Al-Alaq 96:1", text: "Read in the name of your Lord who created.", approved: false },
    ],
    solutions: [
      { kind: "Policy", title: "Curriculum review", detail: "Restore and modernise Islamic studies content." },
    ],
    campaigns: [],
    institutions: ["INS-4"],
    updates: [
      { date: "2026-05-28", author: "Research Team", status: "Researching", note: "Curriculum analysis underway." },
      { date: "2026-04-18", author: "Aishath Leena", status: "Submitted", note: "Issue submitted." },
    ],
  },
  {
    id: "MV-1150",
    title: "Friday prayer access for tourism-sector workers",
    description:
      "Resort staff rosters frequently prevent attendance at Jumu'ah; ferry timings and shift handovers conflict with the khutbah.",
    category: "tourism",
    location: "Resort islands",
    severity: "Moderate",
    status: "Under Review",
    dateReported: "2026-05-09",
    reporter: "Ibrahim Waheed",
    votes: 97,
    comments: 22,
    scholarApproved: false,
    research: { statistics: [], studies: [], reports: [], fieldNotes: ["Several resorts already provide on-site Jumu'ah."] },
    evidence: [
      { type: "Quran", reference: "Al-Jumu'ah 62:9", text: "When the call is made for prayer on Friday, hasten to the remembrance of Allah.", approved: false },
    ],
    solutions: [
      { kind: "Institutional", title: "On-site Jumu'ah", detail: "Designate musallas and rotate rosters for Friday." },
    ],
    campaigns: [],
    institutions: [],
    updates: [
      { date: "2026-05-12", author: "Core Team", status: "Under Review", note: "Triaging and assigning a researcher." },
    ],
  },
  {
    id: "MV-1162",
    title: "Harmful content exposure among youth online",
    description:
      "Rising exposure to harmful and immoral content via social platforms with little guidance or filtering awareness among families.",
    category: "youth",
    location: "National",
    severity: "High",
    status: "Completed",
    dateReported: "2025-11-02",
    reporter: "Mariyam Shifa",
    votes: 312,
    comments: 103,
    scholarApproved: true,
    research: {
      statistics: ["62% of teens reported encountering harmful content weekly."],
      studies: ["Youth digital wellbeing survey 2025"],
      reports: ["Parental controls awareness report"],
      fieldNotes: ["Parents requested simple Dhivehi guides."],
    },
    evidence: [
      { type: "Quran", reference: "An-Nur 24:30", text: "Tell the believing men to lower their gaze and guard their chastity.", approved: true },
      { type: "Hadith", reference: "Sahih al-Bukhari 6502", text: "Part of the perfection of one's Islam is leaving what does not concern him.", approved: true },
    ],
    solutions: [
      { kind: "Educational", title: "Digital wellbeing guide", detail: "Dhivehi guide for families on filtering and habits." },
      { kind: "Action", title: "School workshops", detail: "Delivered workshops in 14 schools." },
    ],
    campaigns: ["CMP-6"],
    institutions: ["INS-4"],
    updates: [
      { date: "2026-02-20", author: "Core Team", status: "Completed", note: "Programme concluded; materials archived." },
      { date: "2026-01-15", author: "Core Team", status: "Implemented", note: "Workshops delivered in 14 schools." },
    ],
  },
];

export const articles: Article[] = [
  { id: "KB-1", title: "Fiqh of Prayer Times for Shift Workers", type: "Fatwa", category: "tourism", author: "Sheikh Ibrahim", date: "2026-05-01", readMins: 9, excerpt: "Guidance on combining and timing prayers for those on rotating rosters." },
  { id: "KB-2", title: "A Practical Guide to a Sunnah Wedding", type: "Article", category: "family", author: "Core Team", date: "2026-04-20", readMins: 12, excerpt: "Affordable, dignified celebration aligned with the example of the Prophet ﷺ." },
  { id: "KB-3", title: "Curriculum Reform: Evidence Review", type: "Research Paper", category: "education", author: "Research Unit", date: "2026-04-10", readMins: 24, excerpt: "Analysis of Islamic studies provision in secondary schools." },
  { id: "KB-4", title: "Designing a Hospital Musalla", type: "Policy Document", category: "healthcare", author: "Core Team", date: "2026-03-28", readMins: 7, excerpt: "Minimum standards and a low-cost conversion checklist." },
  { id: "KB-5", title: "Prayer Breaks in Sport — Toolkit", type: "Awareness", category: "sports", author: "Campaign Team", date: "2026-03-15", readMins: 5, excerpt: "Posters, scripts, and scheduling templates for organisers." },
  { id: "KB-6", title: "Tawheed Fundamentals (Series)", type: "Video", category: "community", author: "Academy", date: "2026-02-25", readMins: 40, excerpt: "Foundational lessons on the oneness of Allah." },
  { id: "KB-7", title: "Digital Wellbeing for Families", type: "Presentation", category: "youth", author: "Core Team", date: "2026-02-10", readMins: 15, excerpt: "Slides for school and community sessions." },
  { id: "KB-8", title: "Manhaj of the Salaf — Introduction", type: "Article", category: "community", author: "Sheikh Ibrahim", date: "2026-01-30", readMins: 11, excerpt: "Understanding the way of the first three generations." },
];

export const courses: Course[] = [
  { id: "C1-1", level: 1, title: "Tawheed", titleAr: "التوحيد", description: "The oneness of Allah and its categories.", lessons: 12, hours: 6, enrolled: 842, progress: 100, hasCert: true },
  { id: "C1-2", level: 1, title: "Aqeedah", titleAr: "العقيدة", description: "Core creed of Ahl al-Sunnah.", lessons: 14, hours: 8, enrolled: 731, progress: 60, hasCert: true },
  { id: "C1-3", level: 1, title: "Basic Fiqh", titleAr: "الفقه", description: "Purification, prayer, fasting essentials.", lessons: 16, hours: 9, enrolled: 690, progress: 25, hasCert: true },
  { id: "C1-4", level: 1, title: "Seerah", titleAr: "السيرة", description: "Life of the Prophet ﷺ.", lessons: 18, hours: 10, enrolled: 654, progress: 0, hasCert: true },
  { id: "C2-1", level: 2, title: "Usul al-Fiqh", titleAr: "أصول الفقه", description: "Principles of Islamic jurisprudence.", lessons: 20, hours: 14, enrolled: 312, progress: 0, hasCert: true },
  { id: "C2-2", level: 2, title: "Contemporary Issues", titleAr: "النوازل", description: "Applying fiqh to modern realities.", lessons: 15, hours: 10, enrolled: 287, progress: 0, hasCert: true },
  { id: "C2-3", level: 2, title: "Da'wah Skills", titleAr: "الدعوة", description: "Calling to Allah with wisdom.", lessons: 12, hours: 7, enrolled: 256, progress: 0, hasCert: true },
  { id: "C2-4", level: 2, title: "Leadership", titleAr: "القيادة", description: "Leading teams and projects.", lessons: 10, hours: 6, enrolled: 198, progress: 0, hasCert: true },
  { id: "C3-1", level: 3, title: "Research Methodology", titleAr: "منهج البحث", description: "Rigorous societal research.", lessons: 14, hours: 12, enrolled: 96, progress: 0, hasCert: true },
  { id: "C3-2", level: 3, title: "Public Policy", titleAr: "السياسة العامة", description: "Designing effective policy.", lessons: 12, hours: 10, enrolled: 84, progress: 0, hasCert: true },
  { id: "C3-3", level: 3, title: "Community Reform", titleAr: "الإصلاح", description: "Sustainable grassroots change.", lessons: 13, hours: 9, enrolled: 79, progress: 0, hasCert: true },
  { id: "C3-4", level: 3, title: "Media Skills", titleAr: "الإعلام", description: "Communicating with impact.", lessons: 11, hours: 7, enrolled: 73, progress: 0, hasCert: true },
];

export const campaigns: Campaign[] = [
  { id: "CMP-7", name: "Prayer Awareness in Sport", status: "Active", objective: "Ensure prayer access at all licensed sporting events.", volunteers: 64, tasksDone: 18, tasksTotal: 30, progress: 60, impact: "9 venues now schedule prayer breaks", category: "sports" },
  { id: "CMP-2", name: "Hospital Prayer Initiative", status: "Active", objective: "A musalla in every regional hospital.", volunteers: 41, tasksDone: 9, tasksTotal: 20, progress: 45, impact: "2 pilot hospitals onboard", category: "healthcare" },
  { id: "CMP-4", name: "Wedding Reform Campaign", status: "Planning", objective: "Promote simple, sunnah-aligned weddings.", volunteers: 38, tasksDone: 5, tasksTotal: 24, progress: 21, impact: "Toolkit in design", category: "family" },
  { id: "CMP-6", name: "Youth Development Campaign", status: "Completed", objective: "Digital wellbeing for youth and families.", volunteers: 88, tasksDone: 26, tasksTotal: 26, progress: 100, impact: "Workshops in 14 schools", category: "youth" },
  { id: "CMP-3", name: "Musalla Everywhere", status: "Active", objective: "Map and improve public prayer facilities.", volunteers: 52, tasksDone: 12, tasksTotal: 28, progress: 43, impact: "120 facilities mapped", category: "community" },
];

export const institutions: Institution[] = [
  { id: "INS-1", name: "Ministry of Health", type: "Ministry", contact: "Permanent Secretary's Office", meetings: 4, documentsSent: 6, lastResponse: "2026-05-18", stage: "Engaged", progress: 70 },
  { id: "INS-2", name: "Football Association of Maldives", type: "Sports Assoc.", contact: "General Secretary", meetings: 3, documentsSent: 4, lastResponse: "2026-05-30", stage: "Engaged", progress: 65 },
  { id: "INS-3", name: "Hithadhoo Regional Hospital", type: "Hospital", contact: "Hospital Manager", meetings: 2, documentsSent: 3, lastResponse: "2026-05-10", stage: "Meeting Held", progress: 50 },
  { id: "INS-4", name: "Ministry of Education", type: "Ministry", contact: "Curriculum Department", meetings: 2, documentsSent: 5, lastResponse: "2026-04-22", stage: "Contacted", progress: 35 },
  { id: "INS-5", name: "National Stadium", type: "Sports Assoc.", contact: "Facilities Manager", meetings: 1, documentsSent: 2, lastResponse: "2026-05-26", stage: "Meeting Held", progress: 45 },
  { id: "INS-6", name: "Maldives National University", type: "University", contact: "Faculty of Sharia", meetings: 3, documentsSent: 4, lastResponse: "2026-05-05", stage: "Partnered", progress: 85 },
];

export const threads: ForumThread[] = [
  { id: "T-1", title: "How can we support simple weddings in our island?", author: "Hassan R.", replies: 34, views: 612, lastActive: "2h ago", tag: "Family" },
  { id: "T-2", title: "Volunteers needed: stadium musalla mapping", author: "Campaign Team", replies: 19, views: 408, lastActive: "5h ago", tag: "Campaign" },
  { id: "T-3", title: "Best Dhivehi resources for teaching aqeedah to kids?", author: "Aishath L.", replies: 41, views: 877, lastActive: "1d ago", tag: "Education" },
  { id: "T-4", title: "Reflections on the manhaj of the Salaf", author: "Sheikh Ibrahim", replies: 58, views: 1503, lastActive: "1d ago", tag: "Knowledge" },
  { id: "T-5", title: "Resort workers & Jumu'ah — share your experience", author: "Ibrahim W.", replies: 27, views: 533, lastActive: "2d ago", tag: "Tourism" },
];

export const leaderboard: LeaderEntry[] = [
  { rank: 1, name: "Mariyam Shifa", role: "Core Team", points: 4820, badges: 14 },
  { rank: 2, name: "Ahmed Saleem", role: "Volunteer", points: 3990, badges: 11 },
  { rank: 3, name: "Aishath Leena", role: "Volunteer", points: 3640, badges: 10 },
  { rank: 4, name: "Hassan Rasheed", role: "Core Team", points: 3180, badges: 9 },
  { rank: 5, name: "Fathimath Nasheed", role: "Volunteer", points: 2760, badges: 8 },
  { rank: 6, name: "Ibrahim Waheed", role: "Volunteer", points: 2410, badges: 7 },
];

// Aggregate platform metrics
export const metrics = {
  totalIssues: issues.length * 47, // representative aggregate
  activeVolunteers: 1284,
  scholars: 18,
  campaigns: campaigns.length,
  institutions: institutions.length * 12,
  solutionsImplemented: 96,
};

// Society Score history for trend charts
export const scoreHistory: { year: number; score: number }[] = [
  { year: 2022, score: 48 },
  { year: 2023, score: 54 },
  { year: 2024, score: 60 },
  { year: 2025, score: 64 },
  { year: 2026, score: 68 },
];

export const findIssue = (id: string) => issues.find((i) => i.id === id);
export const findCampaign = (id: string) => campaigns.find((c) => c.id === id);
export const findInstitution = (id: string) => institutions.find((i) => i.id === id);
