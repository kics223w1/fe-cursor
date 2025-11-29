export interface Submission {
  id: string;
  createdAt: string;
  favoriteModel: string;
  cursorPlan: string;
  country: string;
  favoriteMode: string;
  displayName: string | null;
  note: string | null;
  avatar?: string; // Keeping for UI visual
}

export interface FeaturedTip {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export const leaderboardData: Submission[] = [
  {
    id: "1",
    createdAt: "2025-11-29T10:00:00Z",
    displayName: "@sarah_dev",
    avatar: "S",
    favoriteModel: "GPT-5.1 Codex High Fast",
    cursorPlan: "Ultra",
    country: "USA",
    favoriteMode: "Plan",
    note: "Using Plan mode for 90% of my work now.",
  },
  {
    id: "2",
    createdAt: "2025-11-28T15:30:00Z",
    displayName: "@code_ninja",
    avatar: "C",
    favoriteModel: "Claude 3.5 Sonnet",
    cursorPlan: "Pro",
    country: "Japan",
    favoriteMode: "Agent",
    note: null,
  },
  {
    id: "3",
    createdAt: "2025-11-28T09:15:00Z",
    displayName: "@devops_mike",
    avatar: "M",
    favoriteModel: "GPT-4o",
    cursorPlan: "Business",
    country: "UK",
    favoriteMode: "Ask",
    note: "Great for debugging k8s configs.",
  },
  {
    id: "4",
    createdAt: "2025-11-27T14:20:00Z",
    displayName: "@react_queen",
    avatar: "R",
    favoriteModel: "GPT-5.1",
    cursorPlan: "Pro",
    country: "Canada",
    favoriteMode: "Plan",
    note: "Generating components is so fast.",
  },
  {
    id: "5",
    createdAt: "2025-11-27T11:00:00Z",
    displayName: "@backend_bob",
    avatar: "B",
    favoriteModel: "Opus 4.5",
    cursorPlan: "Team",
    country: "Germany",
    favoriteMode: "Agent",
    note: null,
  },
  {
    id: "6",
    createdAt: "2025-11-26T16:45:00Z",
    displayName: "@ml_maya",
    avatar: "Y",
    favoriteModel: "Gemini 3 Pro",
    cursorPlan: "Ultra",
    country: "France",
    favoriteMode: "Ask",
    note: "Explaining complex transformers code.",
  },
  {
    id: "7",
    createdAt: "2025-11-26T09:30:00Z",
    displayName: "@startup_steve",
    avatar: "T",
    favoriteModel: "GPT-5.1 Codex High Fast",
    cursorPlan: "Business",
    country: "Vietnam",
    favoriteMode: "Plan",
    note: "MVP shipped in 2 days.",
  },
  {
    id: "8",
    createdAt: "2025-11-25T13:15:00Z",
    displayName: "@ui_uma",
    avatar: "U",
    favoriteModel: "Sonnet 4.5",
    cursorPlan: "Pro",
    country: "India",
    favoriteMode: "Plan",
    note: "Tailwind generation is on point.",
  },
];

export const leftSideTips: FeaturedTip[] = [
  {
    id: "l1",
    icon: "⚡",
    title: "Speed Coding",
    description: "10x your coding speed with AI pair programming",
    color: "#fbbf24",
  },
  {
    id: "l2",
    icon: "🎯",
    title: "Precise Edits",
    description: "Use @codebase to reference your entire project",
    color: "#22c55e",
  },
  {
    id: "l3",
    icon: "🔧",
    title: "Debug Master",
    description: "Let Cursor find and fix bugs automatically",
    color: "#3b82f6",
  },
  {
    id: "l4",
    icon: "📚",
    title: "Doc Generator",
    description: "Generate comprehensive docs instantly",
    color: "#8b5cf6",
  },
  {
    id: "l5",
    icon: "🔄",
    title: "Refactor Pro",
    description: "Modernize legacy code with confidence",
    color: "#ec4899",
  },
];

export const rightSideTips: FeaturedTip[] = [
  {
    id: "r1",
    icon: "🚀",
    title: "Ship Faster",
    description: "Deploy features in record time",
    color: "#06b6d4",
  },
  {
    id: "r2",
    icon: "🧪",
    title: "Test Writer",
    description: "Generate unit tests for any function",
    color: "#f97316",
  },
  {
    id: "r3",
    icon: "🔒",
    title: "Security Check",
    description: "Identify vulnerabilities in your code",
    color: "#ef4444",
  },
  {
    id: "r4",
    icon: "💡",
    title: "Smart Suggest",
    description: "Context-aware code completions",
    color: "#eab308",
  },
  {
    id: "r5",
    icon: "🌐",
    title: "API Builder",
    description: "Design REST APIs with natural language",
    color: "#14b8a6",
  },
];

export const navItems = [
  "New",
  "Popular",
  "Tips",
  "Workflows",
  "Categories",
  "Beginner vs Pro",
];

export const filterOptions = {
  sortBy: ["Recent", "Model", "Mode", "Country"],
  timeRange: ["All time", "This week", "This month", "This year"],
};
