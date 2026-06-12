import type { Initiative, HelplineService, Specialist, DevProject } from "./types";

export const initiatives: Initiative[] = [
  {
    slug: "helpline-mv",
    name: "Helpline.mv",
    tagline: "Confidential help, one appointment away",
    status: "Beta",
    category: "Wellbeing & Guidance",
    icon: "Lifebuoy",
    url: "https://helpline.mv",
    summary:
      "A safe platform where anyone in the Maldives can log in, describe what they are going through, and book a confidential appointment with a religious scholar, a psychological counsellor, or a specialist in ruqyah and treatment of sihr — all in one place.",
    highlights: [
      "Private account — share your issue once, securely",
      "Smart matching to the right kind of help",
      "Book online or in-person appointments",
      "Scholars, counsellors and ruqyah specialists, vetted",
      "Dhivehi, English and Arabic support",
    ],
    stats: [
      { label: "Specialists", value: "40+" },
      { label: "Avg. wait", value: "< 24h" },
      { label: "Confidential", value: "100%" },
      { label: "Languages", value: "3" },
    ],
  },
  {
    slug: "devs-fisabilillah",
    name: "Devs Fisabilillah",
    tagline: "Muslim developers building good, for the sake of Allah",
    status: "Live",
    category: "Technology & Da'wah",
    icon: "Code",
    url: "https://github.com/maldives-3-0",
    summary:
      "A brotherhood of Muslim developers helping one another grow in skill and deen — mentoring, reviewing code, and building beneficial, open-source technology for the ummah. Work that benefits people is sadaqah jariyah; here it is done with sincerity and excellence (ihsan).",
    highlights: [
      "Mentorship pairing — seniors guide juniors",
      "Code reviews grounded in akhlaq and ihsan",
      "Open-source projects that serve the ummah",
      "Weekly halaqah + tech study circles",
      "Job board and referrals among brothers",
    ],
    stats: [
      { label: "Developers", value: "120+" },
      { label: "Projects", value: "9" },
      { label: "Open source", value: "All" },
      { label: "Cost to join", value: "Free" },
    ],
  },
  {
    slug: "kalhuoffummi-think-tank",
    name: "Kalhuoffummi Think Tank",
    tagline: "Defending the Maldives in the ideological war",
    status: "Building",
    category: "Research & Content",
    icon: "Ship",
    summary:
      "A think tank for rigorous research and compelling content on the social and religious issues facing the Maldives. Just as the Kalhuoffummi — the ship Bodu Thakurufaanu sailed — helped liberate the Maldives from Portuguese occupation, this initiative confronts today's battle: the ideological war over the hearts, minds and identity of the Maldivian people.",
    highlights: [
      "Research on social & religious issues",
      "Content creation — essays, video, social",
      "Countering secularising & ideological narratives",
      "Grounded in the Quran & Sunnah",
      "Building intellectual resilience in society",
    ],
    stats: [
      { label: "Focus areas", value: "6" },
      { label: "Researchers", value: "12+" },
      { label: "Output", value: "Open" },
      { label: "Established", value: "2026" },
    ],
  },
];

export const findInitiative = (slug: string) =>
  initiatives.find((i) => i.slug === slug);

export const helplineServices: HelplineService[] = [
  {
    key: "scholars",
    name: "Religious Scholars",
    nameDv: "ޢިލްމުވެރިން",
    desc: "Ask about aqeedah, fiqh, family rulings and matters of the heart — answered upon the Quran and Sunnah on the understanding of the Salaf.",
    icon: "AcademicCap",
    providers: 14,
    avgWait: "Same day",
  },
  {
    key: "counsellors",
    name: "Psychological Counsellors",
    nameDv: "ނަފްސާނީ",
    desc: "Confidential, faith-sensitive support for anxiety, depression, grief, marriage and family stress from qualified counsellors.",
    icon: "Heart",
    providers: 11,
    avgWait: "< 24 hours",
  },
  {
    key: "ruqyah",
    name: "Ruqyah (Spiritual Treatment)",
    nameDv: "ރުޤްޔާ",
    desc: "Sharia-compliant ruqyah from the Quran and authentic supplications — no charms, no amulets, no fortune-telling.",
    icon: "BookOpen",
    providers: 9,
    avgWait: "1–2 days",
  },
  {
    key: "sihr",
    name: "Sihr & Evil-Eye Support",
    nameDv: "ސިޙުރު",
    desc: "Guidance and treatment for those affected by sihr or evil eye, strictly within the bounds of the Sharia.",
    icon: "ShieldCheck",
    providers: 6,
    avgWait: "2–3 days",
  },
];

export const specialists: Specialist[] = [
  { id: "S1", name: "Sheikh Ibrahim Hassan", role: "Scholar · Fiqh & Family", service: "scholars", languages: ["Dhivehi", "Arabic"], rating: 4.9, sessions: 320, nextSlot: "Today 4:00 PM" },
  { id: "S2", name: "Dr. Aishath Nadia", role: "Clinical Psychologist", service: "counsellors", languages: ["Dhivehi", "English"], rating: 4.8, sessions: 210, nextSlot: "Tomorrow 10:00 AM" },
  { id: "S3", name: "Ustadh Yoosuf Adam", role: "Ruqyah Specialist", service: "ruqyah", languages: ["Dhivehi", "Arabic"], rating: 4.9, sessions: 175, nextSlot: "Wed 2:00 PM" },
  { id: "S4", name: "Sheikh Hassan Saeed", role: "Scholar · Aqeedah", service: "scholars", languages: ["Dhivehi", "English", "Arabic"], rating: 5.0, sessions: 280, nextSlot: "Today 8:30 PM" },
  { id: "S5", name: "Fathimath Reesha", role: "Counsellor · Family & Youth", service: "counsellors", languages: ["Dhivehi"], rating: 4.7, sessions: 140, nextSlot: "Tomorrow 3:00 PM" },
  { id: "S6", name: "Ustadh Ali Manik", role: "Ruqyah & Sihr Treatment", service: "sihr", languages: ["Dhivehi", "Arabic"], rating: 4.8, sessions: 95, nextSlot: "Thu 11:00 AM" },
];

export const devProjects: DevProject[] = [
  { id: "D1", name: "Helpline.mv", desc: "The booking platform connecting people to scholars and counsellors.", stack: ["Next.js", "TypeScript", "Supabase"], status: "Active", contributors: 8 },
  { id: "D2", name: "Salah Times API", desc: "Free, accurate prayer-times API for every island in the Maldives.", stack: ["Node", "PostgreSQL"], status: "Maintained", contributors: 4 },
  { id: "D3", name: "Dhivehi Quran Reader", desc: "Open Quran reader with Dhivehi translation and tafsir.", stack: ["React Native"], status: "Seeking devs", contributors: 5 },
  { id: "D4", name: "Masjid Finder", desc: "Find the nearest mosque and jamaa'ah times wherever you are.", stack: ["Flutter", "Maps"], status: "Active", contributors: 6 },
  { id: "D5", name: "Zakat Calculator", desc: "Scholar-reviewed zakat calculator with local nisab tracking.", stack: ["Next.js"], status: "Maintained", contributors: 3 },
  { id: "D6", name: "Halaqah Notes", desc: "Shared, searchable notes from study circles and lectures.", stack: ["SvelteKit"], status: "Seeking devs", contributors: 4 },
];
