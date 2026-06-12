export type Role = "Guest" | "Volunteer" | "Core Team" | "Scholar" | "Administrator";

export type IssueStatus =
  | "Submitted"
  | "Under Review"
  | "Researching"
  | "Scholar Review"
  | "Solution Design"
  | "Awareness Campaign"
  | "Authority Engagement"
  | "Implemented"
  | "Completed";

export type Severity = "Low" | "Moderate" | "High" | "Critical";

export type CategoryKey =
  | "family" | "education" | "healthcare" | "sports" | "tourism"
  | "media" | "government" | "economy" | "environment" | "youth"
  | "mosques" | "community" | "technology" | "business";

export interface Category {
  key: CategoryKey;
  name: string;
  nameDv: string;
  icon: string; // heroicon name reference handled in component
  total: number;
  solved: number;
  inProgress: number;
  research: number;
  awareness: number;
  score: number; // Society Score %
}

export interface Evidence {
  type: "Quran" | "Hadith" | "Scholar" | "Fiqh";
  reference: string;
  text: string;
  approved: boolean;
}

export interface Solution {
  kind: "Action" | "Policy" | "Educational" | "Institutional";
  title: string;
  detail: string;
}

export interface UpdateEntry {
  date: string;
  author: string;
  status: IssueStatus;
  note: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: CategoryKey;
  location: string;
  severity: Severity;
  status: IssueStatus;
  dateReported: string;
  reporter: string;
  votes: number;
  comments: number;
  scholarApproved: boolean;
  research: { statistics: string[]; studies: string[]; reports: string[]; fieldNotes: string[] };
  evidence: Evidence[];
  solutions: Solution[];
  campaigns: string[];
  institutions: string[];
  updates: UpdateEntry[];
}

export interface Article {
  id: string;
  title: string;
  type: "Article" | "Fatwa" | "Research Paper" | "Policy Document" | "Awareness" | "Video" | "Presentation";
  category: CategoryKey;
  author: string;
  date: string;
  readMins: number;
  excerpt: string;
}

export interface Course {
  id: string;
  level: 1 | 2 | 3;
  title: string;
  titleAr: string;
  description: string;
  lessons: number;
  hours: number;
  enrolled: number;
  progress: number; // for current user
  hasCert: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  status: "Planning" | "Active" | "Completed";
  objective: string;
  volunteers: number;
  tasksDone: number;
  tasksTotal: number;
  progress: number;
  impact: string;
  category: CategoryKey;
}

export interface Institution {
  id: string;
  name: string;
  type: "Ministry" | "Hospital" | "School" | "University" | "Sports Assoc." | "Business";
  contact: string;
  meetings: number;
  documentsSent: number;
  lastResponse: string;
  stage: "Identified" | "Contacted" | "Meeting Held" | "Engaged" | "Partnered";
  progress: number;
}

export interface ForumThread {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastActive: string;
  tag: string;
}

export interface LeaderEntry {
  rank: number;
  name: string;
  role: Role;
  points: number;
  badges: number;
}

export type InitiativeStatus = "Live" | "Beta" | "Building" | "Planned";

export interface Initiative {
  slug: string;
  name: string;
  tagline: string;
  status: InitiativeStatus;
  category: string;
  icon: string; // heroicon key resolved in component
  url?: string;
  summary: string;
  highlights: string[];
  stats: { label: string; value: string }[];
  revealed?: boolean; // when false, the name & details are hidden publicly
}

export interface HelplineService {
  key: string;
  name: string;
  nameDv: string;
  desc: string;
  icon: string;
  providers: number;
  avgWait: string;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  service: string;
  languages: string[];
  rating: number;
  sessions: number;
  nextSlot: string;
}

export interface DevProject {
  id: string;
  name: string;
  desc: string;
  stack: string[];
  status: "Active" | "Maintained" | "Seeking devs";
  contributors: number;
}
