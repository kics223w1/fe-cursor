import { NextResponse } from 'next/server';

export async function GET() {
  // Hardcoded data as requested by user
  const data = {
    topModels: [
      { name: "GPT-5.1 Codex High Fast", count: 20 },
      { name: "Opus 4.5", count: 15 },
      { name: "Composer 1", count: 10 }
    ],
    topPlans: [
      { name: "Pro", count: 22 },
      { name: "Ultra", count: 18 },
      { name: "Free", count: 10 }
    ],
    topMode: { mode: "Agent", count: 33 },
    topCountries: [
      { country: "Vietnam", count: 15 },
      { country: "USA", count: 12 },
      { country: "Germany", count: 8 }
    ],
    // Detailed stats for the dashboards
    details: {
      modelTrends: [
        { day: "Mon", gpt: 12, opus: 8, composer: 5 },
        { day: "Tue", gpt: 15, opus: 10, composer: 6 },
        { day: "Wed", gpt: 18, opus: 12, composer: 8 },
        { day: "Thu", gpt: 20, opus: 15, composer: 10 },
        { day: "Fri", gpt: 22, opus: 14, composer: 9 },
        { day: "Sat", gpt: 25, opus: 18, composer: 12 },
        { day: "Sun", gpt: 20, opus: 15, composer: 10 }
      ],
      planFeatures: [
        { name: "Unlimited GPT-4", pro: 85, ultra: 100, free: 0 },
        { name: "Agent Mode", pro: 60, ultra: 90, free: 10 },
        { name: "Fast Apply", pro: 90, ultra: 95, free: 20 },
        { name: "Context Window", pro: 70, ultra: 100, free: 30 }
      ],
      modeUsage: [
        { time: "09:00", agent: 15, chat: 20, ctrl_k: 40 },
        { time: "12:00", agent: 30, chat: 25, ctrl_k: 35 },
        { time: "15:00", agent: 45, chat: 30, ctrl_k: 30 },
        { time: "18:00", agent: 33, chat: 28, ctrl_k: 25 }
      ],
      allCountries: [
        { country: "Vietnam", users: 150, growth: "+12%" },
        { country: "USA", users: 120, growth: "+8%" },
        { country: "Germany", users: 80, growth: "+5%" },
        { country: "Japan", users: 65, growth: "+15%" },
        { country: "UK", users: 60, growth: "+4%" },
        { country: "Canada", users: 45, growth: "+6%" },
        { country: "France", users: 40, growth: "+3%" },
        { country: "India", users: 35, growth: "+20%" }
      ]
    }
  };

  return NextResponse.json(data);
}
