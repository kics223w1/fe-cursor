'use client';

import { useEffect, useState } from 'react';
import { Card } from './ui/Card';

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
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/stats/overview')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-12 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-zinc-600 border-t-zinc-200" />
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

  return (
    <div className="w-full space-y-8">
      {/* Top Level Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Top Cursor Mode */}
        <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-blue-950/30 lg:col-span-1 group hover:border-blue-500/30 transition-all duration-300">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-colors" />
          
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-zinc-400">Top Cursor Mode</h3>
            </div>

            <div className="mt-6">
              <div className="text-4xl font-bold text-white tracking-tight">
                {topMode?.mode || 'N/A'}
              </div>
              <div className="mt-2 text-sm text-zinc-500">
                Most popular workflow
              </div>
            </div>

            {topMode && (
              <div className="mt-8">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span>Usage count</span>
                  <span className="text-blue-400">{topMode.count}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/50">
                  <div className="h-full w-full rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Top 3 AI Models */}
        <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-purple-950/30 lg:col-span-1 group hover:border-purple-500/30 transition-all duration-300">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-colors" />
          
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
                  <path d="M12 2a10 10 0 0 1 10 10"/>
                  <path d="M12 12L2.1 12"/>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-zinc-400">Top 3 AI Models</h3>
            </div>
            
            <div className="space-y-5">
              {topModels.map((model, idx) => (
                <div key={model.name} className="group/item relative">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="flex items-center gap-3 text-zinc-200 font-medium">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-800/50 text-[10px] text-zinc-500 font-mono border border-zinc-700/50 group-hover/item:border-purple-500/50 group-hover/item:text-purple-400 group-hover/item:bg-purple-500/10 transition-colors">
                        0{idx + 1}
                      </span>
                      {model.name}
                    </span>
                    <span className="text-zinc-500 font-mono">{model.count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/50">
                    <div
                      className="h-full rounded-full bg-purple-500/80 shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all duration-500 group-hover/item:bg-purple-400"
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

        {/* Top 3 Plans */}
        <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-emerald-950/30 lg:col-span-1 group hover:border-emerald-500/30 transition-all duration-300">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-colors" />

          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-zinc-400">Top 3 Plans</h3>
            </div>

            <div className="space-y-5">
              {topPlans.map((plan, idx) => (
                <div key={plan.name} className="group/item relative">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="flex items-center gap-3 text-zinc-200 font-medium">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-800/50 text-[10px] text-zinc-500 font-mono border border-zinc-700/50 group-hover/item:border-emerald-500/50 group-hover/item:text-emerald-400 group-hover/item:bg-emerald-500/10 transition-colors">
                        0{idx + 1}
                      </span>
                      {plan.name}
                    </span>
                    <span className="text-zinc-500 font-mono">{plan.count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/50">
                    <div
                      className="h-full rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-500 group-hover/item:bg-emerald-400"
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

        {/* Top 3 Countries */}
        <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-orange-950/30 lg:col-span-1 group hover:border-orange-500/30 transition-all duration-300">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl group-hover:bg-orange-500/20 transition-colors" />

          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-zinc-400">Top 3 Countries</h3>
            </div>

            <div className="space-y-5">
              {topCountries.map((country, idx) => (
                <div key={country.country} className="group/item relative">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="flex items-center gap-3 text-zinc-200 font-medium">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-800/50 text-[10px] text-zinc-500 font-mono border border-zinc-700/50 group-hover/item:border-orange-500/50 group-hover/item:text-orange-400 group-hover/item:bg-orange-500/10 transition-colors">
                        0{idx + 1}
                      </span>
                      {country.country}
                    </span>
                    <span className="text-zinc-500 font-mono">{country.count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/50">
                    <div
                      className="h-full rounded-full bg-orange-500/80 shadow-[0_0_10px_rgba(249,115,22,0.3)] transition-all duration-500 group-hover/item:bg-orange-400"
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
        <h2 className="mb-6 text-xl font-bold text-white">Detailed Analytics</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Model Trends */}
          <Card className="border-zinc-800 bg-zinc-900/40">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-sm font-medium text-zinc-400">Model Popularity Trends (Last 7 Days)</h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                  <span className="h-2 w-2 rounded-full bg-purple-500"></span> GPT-5.1
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span> Opus
                </span>
              </div>
            </div>
            <div className="flex h-64 items-end justify-between gap-2 px-2">
              {details?.modelTrends.map((day, i) => (
                <div key={i} className="group flex h-full flex-1 flex-col justify-end gap-1">
                  <div className="relative w-full rounded-t-sm bg-blue-500/20 transition-all group-hover:bg-blue-500/30" style={{ height: `${day.opus * 3}%` }}>
                     <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100">{day.opus}</div>
                  </div>
                  <div className="relative w-full rounded-t-sm bg-purple-500/20 transition-all group-hover:bg-purple-500/30" style={{ height: `${day.gpt * 3}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100">{day.gpt}</div>
                  </div>
                  <div className="mt-2 text-center text-[10px] text-zinc-500">{day.day}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Plan Feature Usage */}
          <Card className="border-zinc-800 bg-zinc-900/40">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-zinc-400">Feature Usage by Plan</h3>
            </div>
            <div className="space-y-6">
              {details?.planFeatures.map((feature, i) => (
                <div key={i}>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-zinc-300">{feature.name}</span>
                    <span className="text-zinc-500">Pro vs Ultra</span>
                  </div>
                  <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div className="bg-emerald-500/50" style={{ width: `${feature.pro * 0.5}%` }} />
                    <div className="bg-emerald-400" style={{ width: `${(feature.ultra - feature.pro) * 0.5}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Mode Usage Time */}
          <Card className="border-zinc-800 bg-zinc-900/40">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-zinc-400">Daily Activity Heatmap</h3>
            </div>
            <div className="space-y-4">
               {details?.modeUsage.map((timeSlot, i) => (
                 <div key={i} className="flex items-center gap-4 text-xs">
                   <span className="w-12 text-zinc-500">{timeSlot.time}</span>
                   <div className="flex flex-1 gap-1">
                     <div className="h-8 rounded bg-blue-500/20 hover:bg-blue-500/30 transition-colors" style={{ flex: timeSlot.agent, opacity: 0.5 + (timeSlot.agent/100) }} title={`Agent: ${timeSlot.agent}%`} />
                     <div className="h-8 rounded bg-purple-500/20 hover:bg-purple-500/30 transition-colors" style={{ flex: timeSlot.chat, opacity: 0.5 + (timeSlot.chat/100) }} title={`Chat: ${timeSlot.chat}%`} />
                     <div className="h-8 rounded bg-zinc-500/20 hover:bg-zinc-500/30 transition-colors" style={{ flex: timeSlot.ctrl_k, opacity: 0.5 + (timeSlot.ctrl_k/100) }} title={`Cmd+K: ${timeSlot.ctrl_k}%`} />
                   </div>
                 </div>
               ))}
            </div>
            <div className="mt-4 flex justify-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1"><div className="h-2 w-2 rounded bg-blue-500/50"/> Agent</span>
              <span className="flex items-center gap-1"><div className="h-2 w-2 rounded bg-purple-500/50"/> Chat</span>
              <span className="flex items-center gap-1"><div className="h-2 w-2 rounded bg-zinc-500/50"/> Cmd+K</span>
            </div>
          </Card>

          {/* Global Distribution */}
          <Card className="border-zinc-800 bg-zinc-900/40">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-zinc-400">Global User Growth</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {details?.allCountries.map((country, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-3">
                  <div>
                    <div className="text-sm font-medium text-zinc-200">{country.country}</div>
                    <div className="text-xs text-zinc-500">{country.users} active users</div>
                  </div>
                  <div className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                    {country.growth}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
