import { NextResponse } from 'next/server';
import { getSubmissions } from '../../submissions/route';

export async function GET() {
  const submissions = getSubmissions();
  
  // Calculate stats
  const totalSubmissions = submissions.length;
  
  const modelCounts: Record<string, number> = {};
  const planCounts: Record<string, number> = {};
  const modeCounts: Record<string, number> = {};
  const countryCounts: Record<string, number> = {};

  submissions.forEach(sub => {
    modelCounts[sub.favoriteModel] = (modelCounts[sub.favoriteModel] || 0) + 1;
    planCounts[sub.cursorPlan] = (planCounts[sub.cursorPlan] || 0) + 1;
    modeCounts[sub.favoriteMode] = (modeCounts[sub.favoriteMode] || 0) + 1;
    countryCounts[sub.country] = (countryCounts[sub.country] || 0) + 1;
  });

  const getTop = (counts: Record<string, number>) => 
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return NextResponse.json({
    totalSubmissions,
    topModel: getTop(modelCounts),
    topPlan: getTop(planCounts),
    topMode: getTop(modeCounts),
    models: Object.entries(modelCounts).map(([name, count]) => ({ name, count })),
    plans: Object.entries(planCounts).map(([name, count]) => ({ name, count })),
    modes: Object.entries(modeCounts).map(([name, count]) => ({ name, count })),
    countries: Object.entries(countryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
  });
}

