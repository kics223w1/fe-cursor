'use client';

import { useCallback } from 'react';
import { Card } from './ui/Card';
import Leaderboard from './Leaderboard';
import { useCachedFetch } from '../lib/cache';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

interface StatItem {
  name: string;
  count: number;
}

interface TopMode {
  mode: string;
  count: number;
}

interface TopCountry {
  country: string;
  count: number;
}

interface StatsData {
  topModels: StatItem[];
  topPlans: StatItem[];
  topMode: TopMode;
  topCountries: TopCountry[];
  details: {
    modelTrends: any[];
    planFeatures: any[];
    modeUsage: any[];
    allCountries: any[];
  };
}

export default function Dashboard() {
  const fetchStats = useCallback(async () => {
    const res = await fetch('/api/stats/overview');
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json() as Promise<StatsData>;
  }, []);

  const { data, loading, error } = useCachedFetch<StatsData>(
    'stats-overview',
    fetchStats,
    { ttlMs: 5 * 60 * 1000 } // Cache for 5 minutes
  );

  if (loading) {
    return (
      <div className="w-full py-12 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-zinc-800" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full py-12 text-center text-zinc-500">
        Failed to load community stats
      </div>
    );
  }

  const { topModels, topPlans, topMode, topCountries, details } = data;

  // Chart Configurations
  const modelTrendsData = {
    labels: details.modelTrends.map((d: any) => d.day),
    datasets: [
      {
        label: 'GPT-5.1',
        data: details.modelTrends.map((d: any) => d.gpt),
        borderColor: 'rgb(6, 182, 212)', // cyan-500
        backgroundColor: 'rgba(6, 182, 212, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Opus 4.5',
        data: details.modelTrends.map((d: any) => d.opus),
        borderColor: 'rgb(59, 130, 246)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Composer',
        data: details.modelTrends.map((d: any) => d.composer),
        borderColor: 'rgb(168, 85, 247)', // purple-500
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const planFeaturesData = {
    labels: details.planFeatures.map((d: any) => d.name),
    datasets: [
      {
        label: 'Pro',
        data: details.planFeatures.map((d: any) => d.pro),
        backgroundColor: 'rgba(6, 182, 212, 0.7)', // cyan
      },
      {
        label: 'Ultra',
        data: details.planFeatures.map((d: any) => d.ultra),
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue
      },
      {
        label: 'Free',
        data: details.planFeatures.map((d: any) => d.free),
        backgroundColor: 'rgba(113, 113, 122, 0.7)', // zinc-500
      },
    ],
  };

  const modeUsageData = {
    labels: details.modeUsage.map((d: any) => d.time),
    datasets: [
      {
        label: 'Agent',
        data: details.modeUsage.map((d: any) => d.agent),
        backgroundColor: 'rgb(6, 182, 212)',
      },
      {
        label: 'Chat',
        data: details.modeUsage.map((d: any) => d.chat),
        backgroundColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Ask',
        data: details.modeUsage.map((d: any) => d.ctrl_k),
        backgroundColor: 'rgb(113, 113, 122)',
      },
    ],
  };

  const countryData = {
    labels: details.allCountries.map((d: any) => d.country),
    datasets: [
      {
        data: details.allCountries.map((d: any) => d.users),
        backgroundColor: [
          'rgba(6, 182, 212, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(100, 116, 139, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

    const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#a1a1aa',
          usePointStyle: false,
          boxWidth: 12,
          padding: 20,
          font: {
            size: 11 // Smaller font for mobile
          }
        },
      },
      title: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#71717a',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#71717a',
        },
      },
    },
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Level Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Top Cursor Mode - Primary (Cyan) */}
        <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-cyan-950/30 group hover:border-cyan-500/30 transition-all duration-300 p-4 sm:p-6">
          <div className="absolute -right-8 -top-8 h-32 sm:h-40 w-32 sm:w-40 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-colors" />
          
          <div className="relative z-10">
            <div className="mb-3 sm:mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-zinc-400">Top Cursor Mode</h3>
            </div>

            <div className="mt-4 sm:mt-6">
              <div className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {topMode?.mode || 'N/A'}
              </div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500">
                Most popular workflow
              </div>
            </div>

            {topMode && (
              <div className="mt-5 sm:mt-8">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span>Usage count</span>
                  <span className="text-cyan-400">{topMode.count}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/50">
                  <div className="h-full w-full rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Top 3 AI Models - Secondary (Blue) */}
        <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-blue-950/30 group hover:border-blue-500/30 transition-all duration-300 p-4 sm:p-6">
          <div className="absolute -right-8 -top-8 h-32 sm:h-40 w-32 sm:w-40 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-colors" />
          
          <div className="relative z-10">
            <div className="mb-4 sm:mb-6 flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
                  <path d="M12 2a10 10 0 0 1 10 10"/>
                  <path d="M12 12L2.1 12"/>
                </svg>
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-zinc-400">Top 3 AI Models</h3>
            </div>
            
            <div className="space-y-4 sm:space-y-5">
              {topModels.map((model, idx) => (
                <div key={model.name} className="group/item relative">
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                    <span className="flex items-center gap-2 sm:gap-3 text-zinc-200 font-medium">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-800/50 text-[10px] text-zinc-500 font-mono border border-zinc-700/50 group-hover/item:border-blue-500/50 group-hover/item:text-blue-400 group-hover/item:bg-blue-500/10 transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="truncate">{model.name}</span>
                    </span>
                    <span className="text-zinc-500 font-mono flex-shrink-0 ml-2">{model.count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/50">
                    <div
                      className="h-full rounded-full bg-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-500 group-hover/item:bg-blue-400"
                      style={{
                        width: `${(model.count / (topModels[0]?.count || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top 3 Plans - Primary (Cyan) */}
        <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-cyan-950/30 group hover:border-cyan-500/30 transition-all duration-300 p-4 sm:p-6">
          <div className="absolute -right-8 -top-8 h-32 sm:h-40 w-32 sm:w-40 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-colors" />

          <div className="relative z-10">
            <div className="mb-4 sm:mb-6 flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-zinc-400">Top 3 Plans</h3>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {topPlans.map((plan, idx) => (
                <div key={plan.name} className="group/item relative">
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                    <span className="flex items-center gap-2 sm:gap-3 text-zinc-200 font-medium">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-800/50 text-[10px] text-zinc-500 font-mono border border-zinc-700/50 group-hover/item:border-cyan-500/50 group-hover/item:text-cyan-400 group-hover/item:bg-cyan-500/10 transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="truncate">{plan.name}</span>
                    </span>
                    <span className="text-zinc-500 font-mono flex-shrink-0 ml-2">{plan.count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/50">
                    <div
                      className="h-full rounded-full bg-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-500 group-hover/item:bg-cyan-400"
                      style={{
                        width: `${(plan.count / (topPlans[0]?.count || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top 3 Countries - Secondary (Blue) */}
        <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-blue-950/30 group hover:border-blue-500/30 transition-all duration-300 p-4 sm:p-6">
          <div className="absolute -right-8 -top-8 h-32 sm:h-40 w-32 sm:w-40 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-colors" />

          <div className="relative z-10">
            <div className="mb-4 sm:mb-6 flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-zinc-400">Top 3 Countries</h3>
            </div>
          
            <div className="space-y-4 sm:space-y-5">
              {topCountries.map((country, idx) => (
                <div key={country.country} className="group/item relative">
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                    <span className="flex items-center gap-2 sm:gap-3 text-zinc-200 font-medium">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-800/50 text-[10px] text-zinc-500 font-mono border border-zinc-700/50 group-hover/item:border-blue-500/50 group-hover/item:text-blue-400 group-hover/item:bg-blue-500/10 transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="truncate">{country.country}</span>
                    </span>
                    <span className="text-zinc-500 font-mono flex-shrink-0 ml-2">{country.count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/50">
                    <div
                      className="h-full rounded-full bg-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-500 group-hover/item:bg-blue-400"
                      style={{
                        width: `${(country.count / (topCountries[0]?.count || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Dashboards */}
      <div>
        <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-bold text-white">Detailed Analytics</h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Model Trends */}
          <Card className="border-zinc-800 bg-zinc-900/40 p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-zinc-400">Model Popularity Trends (Last 7 Days)</h3>
            </div>
            <div className="h-[250px] sm:h-[300px] w-full min-w-0">
              <Line data={modelTrendsData} options={chartOptions} />
            </div>
          </Card>

          {/* Global Distribution */}
          <Card className="border-zinc-800 bg-zinc-900/40 p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-zinc-400">User Distribution by Country</h3>
            </div>
            <div className="flex h-[250px] sm:h-[300px] w-full items-center justify-center min-w-0">
              <div className="relative h-full w-full">
                <Doughnut 
                  data={countryData} 
                  options={{
                    ...chartOptions,
                    maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        position: 'bottom' as const,
                        labels: {
                          color: '#a1a1aa',
                          boxWidth: 8,
                          padding: 10,
                          font: { size: 10 }
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Submissions Table */}
      <Leaderboard />
    </div>
  );
}
