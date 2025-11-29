'use client';

import { useEffect, useState } from 'react';
import { Card } from './ui/Card';
import { Stats, Submission } from '../types';
import { Button } from './ui/Button';

function StatCard({ title, value, subtext }: { title: string; value: string | number; subtext?: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="text-sm text-zinc-400">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
      {subtext && <div className="mt-1 text-xs text-zinc-500">{subtext}</div>}
    </div>
  );
}

function SimpleBarChart({ data, labelKey, valueKey, color = "bg-blue-600" }: any) {
  if (!data?.length) return <div className="text-sm text-zinc-500">No data available</div>;
  
  const max = Math.max(...data.map((d: any) => d[valueKey]));
  
  return (
    <div className="space-y-2">
      {data.map((item: any) => (
        <div key={item[labelKey]} className="flex items-center gap-3 text-sm">
          <div className="w-24 truncate text-right text-zinc-400">{item[labelKey]}</div>
          <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${color}`} 
              style={{ width: `${(item[valueKey] / max) * 100}%` }}
            />
          </div>
          <div className="w-8 text-zinc-500">{item[valueKey]}</div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch stats and leaderboard in parallel
      const [statsRes, lbRes] = await Promise.all([
        fetch('/api/stats/overview'),
        fetch(`/api/leaderboard?page=${page}&limit=10`)
      ]);

      if (!statsRes.ok || !lbRes.ok) throw new Error('Failed to fetch data');

      const statsData = await statsRes.json();
      const lbData = await lbRes.json();

      setStats(statsData);
      setSubmissions(lbData.data);
      setTotalPages(lbData.meta.totalPages);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-900/50 bg-red-900/10 p-6 text-center">
        <h3 className="text-red-400">Couldn’t load community stats.</h3>
        <Button variant="outline" onClick={fetchData} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-white">Community overview</h2>
        
        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard title="Total submissions" value={stats ? stats.totalSubmissions : '-'} />
          <StatCard title="Top model" value={stats ? stats.topModel : '-'} />
          <StatCard title="Top plan" value={stats ? stats.topPlan : '-'} />
          <StatCard title="Top mode" value={stats ? stats.topMode : '-'} />
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Models usage">
            {loading ? <div className="h-32 animate-pulse bg-zinc-900/50 rounded" /> : (
              <SimpleBarChart data={stats?.models} labelKey="name" valueKey="count" color="bg-purple-600" />
            )}
          </Card>
          <Card title="Plans">
            {loading ? <div className="h-32 animate-pulse bg-zinc-900/50 rounded" /> : (
              <SimpleBarChart data={stats?.plans} labelKey="name" valueKey="count" color="bg-emerald-500" />
            )}
          </Card>
          <Card title="Modes">
            {loading ? <div className="h-32 animate-pulse bg-zinc-900/50 rounded" /> : (
              <SimpleBarChart data={stats?.modes} labelKey="name" valueKey="count" color="bg-blue-500" />
            )}
          </Card>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-white">All shared setups</h2>
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900 text-zinc-400">
                <tr>
                  <th className="px-6 py-3 font-medium">#</th>
                  <th className="px-6 py-3 font-medium">Display name</th>
                  <th className="px-6 py-3 font-medium">Favorite model</th>
                  <th className="px-6 py-3 font-medium">Plan</th>
                  <th className="px-6 py-3 font-medium">Mode</th>
                  <th className="px-6 py-3 font-medium">Country</th>
                  <th className="px-6 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan={7} className="px-6 py-4">
                        <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
                      </td>
                    </tr>
                  ))
                ) : submissions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-zinc-500">
                      No submissions yet. Be the first to share your Cursor setup!
                    </td>
                  </tr>
                ) : (
                  submissions.map((sub, idx) => (
                    <tr key={sub.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="px-6 py-4 text-zinc-500">{(page - 1) * 10 + idx + 1}</td>
                      <td className="px-6 py-4 font-medium text-white">{sub.displayName}</td>
                      <td className="px-6 py-4 text-zinc-300">{sub.favoriteModel}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                          {sub.cursorPlan}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-300">{sub.favoriteMode}</td>
                      <td className="px-6 py-4 text-zinc-300">{sub.country}</td>
                      <td className="px-6 py-4 text-zinc-500">
                        {new Date(sub.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="border-t border-zinc-800 px-6 py-4 flex items-center justify-between">
            <span className="text-sm text-zinc-500">
              Page {page} of {totalPages || 1}
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages || loading}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

