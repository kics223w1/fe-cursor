import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://be-cursor.vercel.app';

export async function GET() {
  try {
    const [overviewRes, topRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/stats/overview`, { cache: 'no-store' }),
      fetch(`${API_BASE_URL}/api/stats/top`, { cache: 'no-store' })
    ]);

    if (!overviewRes.ok || !topRes.ok) {
      throw new Error('Failed to fetch stats');
    }

    const overviewData = await overviewRes.json();
    const topData = await topRes.json();

    const data = {
      topModels: topData.topModels,
      topPlans: topData.topPlans,
      topMode: topData.topMode,
      topCountries: topData.topCountries,
      details: {
        // Hardcoded trends (data not available in backend)
        modelTrends: [
          { day: "Mon", gpt: 12, opus: 8, composer: 5 },
          { day: "Tue", gpt: 15, opus: 10, composer: 6 },
          { day: "Wed", gpt: 18, opus: 12, composer: 8 },
          { day: "Thu", gpt: 20, opus: 15, composer: 10 },
          { day: "Fri", gpt: 22, opus: 14, composer: 9 },
          { day: "Sat", gpt: 25, opus: 18, composer: 12 },
          { day: "Sun", gpt: 20, opus: 15, composer: 10 }
        ],
        // Hardcoded features (data not available in backend)
        planFeatures: [
          { name: "Unlimited GPT-4", pro: 85, ultra: 100, free: 0 },
          { name: "Agent Mode", pro: 60, ultra: 90, free: 10 },
          { name: "Fast Apply", pro: 90, ultra: 95, free: 20 },
          { name: "Context Window", pro: 70, ultra: 100, free: 30 }
        ],
        // Derived from overview data
        modeUsage: [
            { 
                time: "Total", 
                agent: overviewData.modes.find((m: any) => m.mode === 'Agent')?.count || 0, 
                chat: overviewData.modes.find((m: any) => m.mode === 'Plan')?.count || 0, // Mapping Plan to Chat for UI consistency
                ctrl_k: overviewData.modes.find((m: any) => m.mode === 'Ask')?.count || 0 
            }
        ],
        allCountries: overviewData.countries.map((c: any) => ({
            country: c.country,
            users: c.count,
            growth: "+0%" // Placeholder as backend doesn't provide growth
        })),
      }
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
