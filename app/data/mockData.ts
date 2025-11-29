export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  likes: number;
  growth: number | null;
  topTip: string;
  tipDescription: string;
}

export interface FeaturedTip {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export const leaderboardUsers: User[] = [
  {
    id: "1",
    username: "@sarah_dev",
    avatar: "S",
    bio: "Full-stack developer",
    likes: 12847,
    growth: null,
    topTip: "Multi-file Editing",
    tipDescription: "Use Cmd+K to edit multiple files at once",
  },
  {
    id: "2",
    username: "@code_ninja",
    avatar: "C",
    bio: "Open source contributor",
    likes: 8932,
    growth: 12,
    topTip: "Custom Rules",
    tipDescription: "Create .cursorrules for project context",
  },
  {
    id: "3",
    username: "@devops_mike",
    avatar: "M",
    bio: "DevOps engineer",
    likes: 7654,
    growth: 8,
    topTip: "Terminal Integration",
    tipDescription: "Let AI run and debug terminal commands",
  },
  {
    id: "4",
    username: "@react_queen",
    avatar: "R",
    bio: "React specialist",
    likes: 6123,
    growth: 15,
    topTip: "Component Generation",
    tipDescription: "Generate full components with one prompt",
  },
  {
    id: "5",
    username: "@backend_bob",
    avatar: "B",
    bio: "API architect",
    likes: 5890,
    growth: -3,
    topTip: "API Documentation",
    tipDescription: "Auto-generate OpenAPI specs from code",
  },
  {
    id: "6",
    username: "@ml_maya",
    avatar: "Y",
    bio: "ML engineer",
    likes: 4567,
    growth: 22,
    topTip: "Code Explanation",
    tipDescription: "Use Chat to understand complex algorithms",
  },
  {
    id: "7",
    username: "@startup_steve",
    avatar: "T",
    bio: "Founder & CTO",
    likes: 3890,
    growth: 5,
    topTip: "Rapid Prototyping",
    tipDescription: "Build MVPs in hours, not days",
  },
  {
    id: "8",
    username: "@ui_uma",
    avatar: "U",
    bio: "UI/UX designer who codes",
    likes: 3245,
    growth: 18,
    topTip: "CSS Generation",
    tipDescription: "Describe layouts, get pixel-perfect CSS",
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
  sortBy: ["Likes", "Growth", "Recent"],
  timeRange: ["All time", "This week", "This month", "This year"],
};

