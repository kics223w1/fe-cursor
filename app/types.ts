export interface Submission {
  id: string;
  displayName: string;
  favoriteModel: string;
  cursorPlan: string;
  country: string;
  favoriteMode: 'Plan' | 'Agent' | 'Ask';
  note: string;
  createdAt: string;
}

export interface Stats {
  totalSubmissions: number;
  topModel: string;
  topPlan: string;
  topMode: string;
  models: { name: string; count: number }[];
  plans: { name: string; count: number }[];
  modes: { name: string; count: number }[];
  countries: { name: string; count: number }[];
}

export const MODEL_OPTIONS = [
  "Composer 1",
  "GPT-5.1",
  "GPT-5.1 Codex High Fast",
  "Opus 4.5",
  "Sonnet 4.5",
  "Gemini 3 Pro",
  "Grok Code"
];

export const PLAN_OPTIONS = ["Free", "Pro", "Ultra", "Business", "Team"];

